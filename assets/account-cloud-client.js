(function attachKhaemenesAccountCloud(global){
  "use strict";

  const VERSION="0.2.0";
  const SCHEMA_VERSION="2.0";
  const FORBIDDEN_RESPONSE_KEYS=/password|passcode|secret|token|otp|verification.?code|recovery.?code|cookie|hash|pepper|private.?key|refresh.?credential|session.?secret/i;
  const IMMUTABLE_KEYS=new Set(["learnerId","familyId","institutionalId","accountSubjectRef","authSubjectRef","recordVersion","createdAt","updatedAt","masteryPercent","permissions","adultIds","learnerIds"]);
  const MUTATIONS=Object.freeze({
    "family.label.update":Object.freeze({resourceType:"family",allowed:Object.freeze(["familyLabel"])}),
    "learner.profile.update":Object.freeze({resourceType:"learner",allowed:Object.freeze(["displayName"])}),
    "learner.placement.update":Object.freeze({resourceType:"learner",allowed:Object.freeze(["stage","grade"])}),
    "learner.continuity.update":Object.freeze({resourceType:"learner",allowed:Object.freeze(["activePathway","continuityNote"])})
  });
  const STAGES=new Set(["preschool","kindergarten","elementary","middle","high","higher"]);
  const GRADES=new Set(["pre-k","k","01","02","03","04","05","06","07","08","09","10","11","12",null]);

  class AccountCloudError extends Error{
    constructor(code,message,detail=null){super(message);this.name="AccountCloudError";this.code=code||"account_cloud_error";this.detail=detail}
  }

  const deepClone=value=>JSON.parse(JSON.stringify(value));
  const clean=(v,max=400)=>String(v??"").trim().slice(0,max);
  function requireObject(value,label){if(!value||typeof value!=="object"||Array.isArray(value))throw new AccountCloudError("invalid_object",`${label} must be an object`)}
  function assertNoSecretKeys(value,path="payload"){
    if(value===null||value===undefined)return;
    if(Array.isArray(value)){value.forEach((item,i)=>assertNoSecretKeys(item,`${path}[${i}]`));return}
    if(typeof value!=="object")return;
    for(const [key,item] of Object.entries(value)){
      if(FORBIDDEN_RESPONSE_KEYS.test(key))throw new AccountCloudError("secret_field_rejected",`Protected response contained a forbidden field at ${path}.${key}`);
      assertNoSecretKeys(item,`${path}.${key}`);
    }
  }
  function assertPlacement(stage,grade){
    if(!STAGES.has(stage))throw new AccountCloudError("invalid_stage","Stage is not canonical.");
    if(!GRADES.has(grade))throw new AccountCloudError("invalid_grade","Grade is not canonical.");
    const ok=(stage==="preschool"&&grade==="pre-k")||(stage==="kindergarten"&&grade==="k")||(stage==="elementary"&&["01","02","03","04","05"].includes(grade))||(stage==="middle"&&["06","07","08"].includes(grade))||(stage==="high"&&["09","10","11","12"].includes(grade))||(stage==="higher"&&grade===null);
    if(!ok)throw new AccountCloudError("placement_mismatch","Grade does not belong to stage.");
  }
  function validateMutation(envelope){
    requireObject(envelope,"sync envelope");
    requireObject(envelope.changes,"sync changes");
    const policy=MUTATIONS[envelope.operation];
    if(!policy)throw new AccountCloudError("unsupported_operation","Unsupported mutation operation.");
    if(envelope.resourceType!==policy.resourceType)throw new AccountCloudError("operation_resource_mismatch","Operation does not match resource type.");
    const keys=Object.keys(envelope.changes);
    if(!keys.length)throw new AccountCloudError("empty_change_set","Mutation changes cannot be empty.");
    for(const key of keys){
      if(IMMUTABLE_KEYS.has(key)||!policy.allowed.includes(key))throw new AccountCloudError("field_not_mutable",`Field is not mutable for ${envelope.operation}: ${key}`);
    }
    if(envelope.operation==="learner.placement.update"){
      if(!("stage" in envelope.changes)||!("grade" in envelope.changes))throw new AccountCloudError("placement_pair_required","Stage and grade must be changed together.");
      assertPlacement(envelope.changes.stage,envelope.changes.grade);
    }
    return policy;
  }
  function safeSession(raw){
    if(!raw||typeof raw!=="object")return Object.freeze({authenticated:false,sessionBoundary:"wend-v0.1",authorizationAuthority:false});
    assertNoSecretKeys(raw,"session");
    // Deliberately ignore role/roles/metadata from any upstream handoff.
    const placement=raw.placement&&typeof raw.placement==="object"?Object.freeze({stage:clean(raw.placement.stage,40)||null,grade:raw.placement.grade===null?null:(clean(raw.placement.grade,20)||null)}):null;
    return Object.freeze({
      authenticated:raw.authenticated===true,
      sessionBoundary:"wend-v0.1",
      authorizationAuthority:false,
      actorType:clean(raw.actorType,30)||null,
      adultId:clean(raw.adultId,160)||null,
      learnerId:clean(raw.learnerId,160)||null,
      familyIds:Object.freeze(Array.isArray(raw.familyIds)?raw.familyIds.slice(0,100).map(v=>clean(v,160)).filter(Boolean):[]),
      learnerIds:Object.freeze(Array.isArray(raw.learnerIds)?raw.learnerIds.slice(0,100).map(v=>clean(v,160)).filter(Boolean):[]),
      institutionalId:clean(raw.institutionalId,80)||null,
      displayPermissions:Object.freeze(Array.isArray(raw.displayPermissions)?raw.displayPermissions.slice(0,100).map(v=>clean(v,80)).filter(Boolean):[]),
      placement,
      expiresAt:raw.expiresAt?clean(raw.expiresAt,50):null
    });
  }
  function assertApiBase(value,{allowInsecureLoopback=false}={}){
    const url=new URL(value,global.location?.href||"https://vervenveda.com/");
    if(url.protocol==="https:")return url;
    const loopback=url.protocol==="http:"&&["127.0.0.1","localhost","::1"].includes(url.hostname);
    if(loopback&&allowInsecureLoopback===true)return url;
    throw new AccountCloudError("https_required","Protected Account Cloud requires HTTPS; HTTP is allowed only for explicit loopback commissioning.");
  }

  class SyntheticCanonicalStore{
    constructor(seed={}){
      this.maps={family:new Map(),adult:new Map(),"family-access":new Map(),learner:new Map(),"learner-progress":new Map(),"course-state":new Map(),"session-view":new Map()};
      this.audit=[];
      const inserts=[
        ["family",seed.family,"familyId"],["adult",seed.adult,"adultId"],["family-access",seed.access,"accessId"],["learner",seed.learner,"learnerId"],["learner-progress",seed.progress,"progressId"],["course-state",seed.courseState,"courseStateId"],["session-view",seed.sessionView,"sessionViewId"]
      ];
      for(const [type,record,key] of inserts)if(record)this.maps[type].set(record[key],deepClone(record));
    }
    mapFor(type){const map=this.maps[type];if(!map)throw new AccountCloudError("unsupported_resource",`Unsupported resource type: ${type}`);return map}
    read(type,id){const value=this.mapFor(type).get(id);if(!value)throw new AccountCloudError("not_found",`${type}/${id} not found`);return deepClone(value)}
    compareAndSwap(envelope){
      validateMutation(envelope);
      const map=this.mapFor(envelope.resourceType),current=map.get(envelope.resourceId);
      if(!current)throw new AccountCloudError("not_found","Canonical record was not found.");
      if(Number(envelope.baseVersion)!==Number(current.recordVersion))throw new AccountCloudError("version_conflict","Canonical record changed on another device.",{resourceType:envelope.resourceType,resourceId:envelope.resourceId,expectedVersion:Number(envelope.baseVersion),currentVersion:Number(current.recordVersion),current:deepClone(current)});
      const next={...current,...deepClone(envelope.changes),recordVersion:Number(current.recordVersion)+1,updatedAt:new Date().toISOString()};
      map.set(envelope.resourceId,next);
      const event={schemaVersion:"1.0",eventId:`audit_demo_${String(this.audit.length+1).padStart(4,"0")}`,eventType:envelope.operation,resourceType:envelope.resourceType,resourceId:envelope.resourceId,actorType:"adult",actorId:"adult_demo_guardian",decision:"allowed",sourceDeviceId:clean(envelope.sourceDeviceId,180)||"unknown",clientMutationId:clean(envelope.clientMutationId,180),fromVersion:Number(current.recordVersion),toVersion:Number(next.recordVersion),at:next.updatedAt,synthetic:true,detailCodes:[]};
      this.audit.push(event);
      return {ok:true,record:deepClone(next),auditEvent:deepClone(event)};
    }
    listAudit(){return deepClone(this.audit)}
    snapshot(){return {families:[...this.maps.family.values()].map(deepClone),adults:[...this.maps.adult.values()].map(deepClone),access:[...this.maps["family-access"].values()].map(deepClone),learners:[...this.maps.learner.values()].map(deepClone),progress:[...this.maps["learner-progress"].values()].map(deepClone),courseState:[...this.maps["course-state"].values()].map(deepClone),sessionViews:[...this.maps["session-view"].values()].map(deepClone),audit:this.listAudit()}}
  }

  class SyntheticTransport{
    constructor(store){this.store=store}
    async session(){return safeSession({authenticated:true,actorType:"adult",adultId:"adult_demo_guardian",familyIds:["fam_demo"],learnerIds:["learner_demo"],displayPermissions:["learner.view"],expiresAt:null,metadata:{roles:["ignored-admin"]},roles:["ignored-admin"]})}
    async family(id){return this.store.read("family",id)}
    async adult(id){return this.store.read("adult",id)}
    async learner(id){return this.store.read("learner",id)}
    async progress(id){return this.store.read("learner-progress",id)}
    async courseState(id){return this.store.read("course-state",id)}
    async sync(envelope){return this.store.compareAndSwap(envelope)}
    async audit(){return this.store.listAudit()}
    async snapshot(){return this.store.snapshot()}
    async logout(){return {ok:true,synthetic:true}}
  }

  function createHttpTransport(config={}){
    const apiBase=String(config.apiBase||"").replace(/\/+$/,"");
    if(!apiBase)throw new AccountCloudError("missing_api_base","Protected Account Cloud API base is not configured.");
    const parsed=assertApiBase(apiBase,{allowInsecureLoopback:config.allowInsecureLoopback===true});
    const timeoutMs=Math.max(1000,Math.min(30000,Number(config.requestTimeoutMs)||8000));
    async function request(path,options={}){
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),timeoutMs);
      try{
        const url=new URL(String(path||"").replace(/^\/+/,""),parsed.href.endsWith("/")?parsed.href:parsed.href+"/");
        if(url.origin!==parsed.origin)throw new AccountCloudError("origin_escape_rejected","Request escaped configured Account Cloud origin.");
        const response=await fetch(url.href,{method:options.method||"GET",headers:{"Accept":"application/json",...(options.body?{"Content-Type":"application/json"}:{}),...(options.headers||{})},credentials:"include",cache:"no-store",redirect:"error",referrerPolicy:"no-referrer",body:options.body?JSON.stringify(options.body):undefined,signal:controller.signal});
        const type=response.headers.get("content-type")||"",text=await response.text();
        let payload=null;
        if(text){if(!type.includes("application/json"))throw new AccountCloudError("unexpected_content_type","Protected Account Cloud did not return JSON.");try{payload=JSON.parse(text)}catch{throw new AccountCloudError("invalid_json","Protected Account Cloud returned invalid JSON.")}}
        if(response.status===409)throw new AccountCloudError("version_conflict","Canonical record changed on another device.",payload);
        if(!response.ok)throw new AccountCloudError(payload?.error?.code||`http_${response.status}`,payload?.error?.message||`Account Cloud request failed (${response.status}).`,payload);
        assertNoSecretKeys(payload,"response");
        return payload;
      }catch(error){if(error?.name==="AbortError")throw new AccountCloudError("timeout","Account Cloud request timed out.");throw error}finally{clearTimeout(timer)}
    }
    return Object.freeze({
      session:async()=>safeSession(await request("v1/account/session")),
      family:id=>request(`v1/account/families/${encodeURIComponent(id)}`),
      learner:id=>request(`v1/account/learners/${encodeURIComponent(id)}`),
      sync:envelope=>{validateMutation(envelope);return request("v1/account/sync",{method:"POST",body:envelope})},
      logout:()=>request("v1/account/session",{method:"DELETE"}),
      health:()=>request("v1/account/health")
    });
  }

  class AccountCloudClient{
    constructor(transport){if(!transport)throw new AccountCloudError("transport_required","A transport is required.");this.transport=transport}
    session(){return this.transport.session()}
    getFamily(id){return this.transport.family(id)}
    getAdult(id){return this.transport.adult?.(id)}
    getLearner(id){return this.transport.learner(id)}
    getProgress(id){return this.transport.progress?.(id)}
    getCourseState(id){return this.transport.courseState?.(id)}
    sync(envelope){validateMutation(envelope);return this.transport.sync(envelope)}
    audit(){return this.transport.audit?.()}
    snapshot(){return this.transport.snapshot?.()}
    logout(){return this.transport.logout()}
    health(){return this.transport.health?.()}
  }

  global.KhaemenesAccountCloud=Object.freeze({version:VERSION,schemaVersion:SCHEMA_VERSION,AccountCloudError,AccountCloudClient,SyntheticCanonicalStore,SyntheticTransport,createHttpTransport,safeSession,validateMutation,deepClone});
})(window);
