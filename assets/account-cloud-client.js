
(function(global){
  "use strict";

  class AccountCloudError extends Error{
    constructor(code,message,detail=null){
      super(message);
      this.name="AccountCloudError";
      this.code=code||"account_cloud_error";
      this.detail=detail;
    }
  }

  const deepClone = value => JSON.parse(JSON.stringify(value));

  function requireObject(value,label){
    if(!value || typeof value!=="object" || Array.isArray(value)){
      throw new AccountCloudError("invalid_object",`${label} must be an object`);
    }
  }

  class SyntheticCanonicalStore{
    constructor(seed){
      requireObject(seed,"seed");
      this.families=new Map();
      this.adults=new Map();
      this.learners=new Map();
      this.progress=new Map();
      this.sessions=new Map();
      this.audit=[];
      if(seed.family) this.families.set(seed.family.familyId,deepClone(seed.family));
      if(seed.adult) this.adults.set(seed.adult.adultId,deepClone(seed.adult));
      if(seed.learner) this.learners.set(seed.learner.learnerId,deepClone(seed.learner));
      if(seed.progress) this.progress.set(seed.progress.progressId,deepClone(seed.progress));
    }

    mapFor(resourceType){
      const map={
        family:this.families,
        adult:this.adults,
        learner:this.learners,
        "learner-progress":this.progress
      }[resourceType];
      if(!map) throw new AccountCloudError("unsupported_resource",`Unsupported resource type: ${resourceType}`);
      return map;
    }

    read(resourceType,resourceId){
      const value=this.mapFor(resourceType).get(resourceId);
      if(!value) throw new AccountCloudError("not_found",`${resourceType}/${resourceId} not found`);
      return deepClone(value);
    }

    compareAndSwap(envelope){
      requireObject(envelope,"sync envelope");
      requireObject(envelope.patch,"sync patch");

      const map=this.mapFor(envelope.resourceType);
      const current=map.get(envelope.resourceId);

      if(!current){
        throw new AccountCloudError("not_found","Canonical record was not found.");
      }

      if(Number(envelope.baseVersion)!==Number(current.recordVersion)){
        throw new AccountCloudError(
          "version_conflict",
          "Canonical record changed on another device.",
          {
            resourceType:envelope.resourceType,
            resourceId:envelope.resourceId,
            expectedVersion:Number(envelope.baseVersion),
            currentVersion:Number(current.recordVersion),
            current:deepClone(current)
          }
        );
      }

      const next={
        ...current,
        ...deepClone(envelope.patch),
        recordVersion:Number(current.recordVersion)+1,
        updatedAt:new Date().toISOString()
      };

      map.set(envelope.resourceId,next);

      const event={
        eventId:`audit_demo_${String(this.audit.length+1).padStart(4,"0")}`,
        eventType:"record.update",
        resourceType:envelope.resourceType,
        resourceId:envelope.resourceId,
        actorId:"adult_demo_guardian",
        sourceDeviceId:String(envelope.sourceDeviceId||"unknown"),
        clientMutationId:String(envelope.clientMutationId||""),
        fromVersion:Number(current.recordVersion),
        toVersion:Number(next.recordVersion),
        at:next.updatedAt,
        synthetic:true
      };
      this.audit.push(event);

      return {
        ok:true,
        record:deepClone(next),
        auditEvent:deepClone(event)
      };
    }

    listAudit(){
      return deepClone(this.audit);
    }

    snapshot(){
      return {
        families:[...this.families.values()].map(deepClone),
        adults:[...this.adults.values()].map(deepClone),
        learners:[...this.learners.values()].map(deepClone),
        progress:[...this.progress.values()].map(deepClone),
        sessions:[...this.sessions.values()].map(deepClone),
        audit:this.listAudit()
      };
    }
  }

  class SyntheticTransport{
    constructor(store){this.store=store}
    async session(){
      return {
        authenticated:true,
        authority:"synthetic-only",
        adultId:"adult_demo_guardian",
        familyIds:["fam_demo"],
        learnerIds:["learner_demo"],
        expiresAt:null
      };
    }
    async family(id){return this.store.read("family",id)}
    async adult(id){return this.store.read("adult",id)}
    async learner(id){return this.store.read("learner",id)}
    async progress(id){return this.store.read("learner-progress",id)}
    async sync(envelope){return this.store.compareAndSwap(envelope)}
    async audit(){return this.store.listAudit()}
    async snapshot(){return this.store.snapshot()}
    async logout(){return {ok:true,synthetic:true}}
  }

  function createHttpTransport(config={}){
    const apiBase=String(config.apiBase||"").replace(/\/+$/,"");
    if(!apiBase){
      throw new AccountCloudError("missing_api_base","Protected Account Cloud API base is not configured.");
    }
    const timeoutMs=Math.max(1000,Number(config.requestTimeoutMs)||8000);

    async function request(path,options={}){
      const controller=new AbortController();
      const timer=setTimeout(()=>controller.abort(),timeoutMs);
      try{
        const response=await fetch(apiBase+path,{
          method:options.method||"GET",
          headers:{
            "Accept":"application/json",
            ...(options.body?{"Content-Type":"application/json"}:{}),
            ...(options.headers||{})
          },
          credentials:"include",
          cache:"no-store",
          body:options.body?JSON.stringify(options.body):undefined,
          signal:controller.signal
        });

        const text=await response.text();
        let payload=null;
        if(text){
          try{payload=JSON.parse(text)}
          catch{
            throw new AccountCloudError("invalid_json","Protected Account Cloud returned invalid JSON.")
          }
        }

        if(response.status===409){
          throw new AccountCloudError("version_conflict","Canonical record changed on another device.",payload);
        }

        if(!response.ok){
          throw new AccountCloudError(
            payload?.error?.code || `http_${response.status}`,
            payload?.error?.message || `Account Cloud request failed (${response.status}).`,
            payload
          );
        }

        return payload;
      }catch(error){
        if(error?.name==="AbortError"){
          throw new AccountCloudError("timeout","Account Cloud request timed out.")
        }
        throw error;
      }finally{
        clearTimeout(timer);
      }
    }

    return Object.freeze({
      session:()=>request("/v1/account/session"),
      family:id=>request(`/v1/account/families/${encodeURIComponent(id)}`),
      learner:id=>request(`/v1/account/learners/${encodeURIComponent(id)}`),
      sync:envelope=>request("/v1/account/sync",{method:"POST",body:envelope}),
      logout:()=>request("/v1/account/session",{method:"DELETE"})
    });
  }

  class AccountCloudClient{
    constructor(transport){this.transport=transport}
    session(){return this.transport.session()}
    getFamily(id){return this.transport.family(id)}
    getAdult(id){return this.transport.adult?.(id)}
    getLearner(id){return this.transport.learner(id)}
    getProgress(id){return this.transport.progress?.(id)}
    sync(envelope){return this.transport.sync(envelope)}
    audit(){return this.transport.audit?.()}
    snapshot(){return this.transport.snapshot?.()}
    logout(){return this.transport.logout()}
  }

  global.KhaemenesAccountCloud=Object.freeze({
    AccountCloudError,
    AccountCloudClient,
    SyntheticCanonicalStore,
    SyntheticTransport,
    createHttpTransport,
    deepClone
  });
})(window);
