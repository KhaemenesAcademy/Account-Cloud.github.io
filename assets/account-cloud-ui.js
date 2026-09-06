
(async function(){
  "use strict";

  const $=s=>document.querySelector(s);
  const config=window.KHAEMENES_ACCOUNT_CLOUD_CONFIG||{};
  const state={
    client:null,
    store:null,
    family:null,
    adult:null,
    mac:null,
    tablet:null,
    progress:null,
    loaded:false
  };

  function log(title,data){
    $("#console").textContent=`${title}\n\n${typeof data==="string"?data:JSON.stringify(data,null,2)}`;
  }

  function setStats(snapshot){
    $("#stat-families").textContent=String(snapshot.families?.length||0);
    $("#stat-adults").textContent=String(snapshot.adults?.length||0);
    $("#stat-learners").textContent=String(snapshot.learners?.length||0);
    $("#stat-audit").textContent=String(snapshot.audit?.length||0);
  }

  function renderDirectory(){
    const rows=[
      ["▣","Families","fam_demo"],
      ["◎","Adults","adult_demo_guardian"],
      ["◈","Learners","learner_demo"],
      ["#","Institutional IDs","STUDENT-DEMO-0001"],
      ["↻","Sessions","protected runtime only"],
      ["≡","Account Audit","append-only runtime target"],
      ["↺","Recovery / Migration","protected operation"]
    ];
    $("#directory-tree").innerHTML=rows.map(([icon,label,detail])=>`
      <div class="tree-row">
        <span class="tree-icon">${icon}</span>
        <strong>${label}</strong>
        <span class="small">${detail}</span>
      </div>
    `).join("");
  }

  async function renderCloud(){
    if(!state.client) return;
    const snapshot=await state.client.snapshot();
    setStats(snapshot);

    const rows=[];
    for(const f of snapshot.families||[]){
      rows.push(["Family",f.familyLabel,f.familyId,`v${f.recordVersion}`]);
    }
    for(const a of snapshot.adults||[]){
      rows.push(["Adult",a.displayName,a.adultId,`v${a.recordVersion}`]);
    }
    for(const l of snapshot.learners||[]){
      rows.push(["Learner",l.displayName,l.learnerId,`v${l.recordVersion}`]);
    }
    for(const p of snapshot.progress||[]){
      rows.push(["Progress",p.courseId,p.progressId,`v${p.recordVersion}`]);
    }

    $("#record-list").innerHTML=rows.map(([type,name,id,v])=>`
      <div class="record-row">
        <strong>${type} · ${name}</strong>
        <div class="record-meta">
          <span>${id}</span><span>${v}</span>
        </div>
      </div>
    `).join("");
  }

  async function loadSynthetic(){
    const [family,adult,learner,progress]=await Promise.all([
      fetch("./fixtures/synthetic-family.json",{cache:"no-store"}).then(r=>r.json()),
      fetch("./fixtures/synthetic-adult.json",{cache:"no-store"}).then(r=>r.json()),
      fetch("./fixtures/synthetic-learner.json",{cache:"no-store"}).then(r=>r.json()),
      fetch("./fixtures/synthetic-progress.json",{cache:"no-store"}).then(r=>r.json())
    ]);

    state.store=new KhaemenesAccountCloud.SyntheticCanonicalStore({family,adult,learner,progress});
    state.client=new KhaemenesAccountCloud.AccountCloudClient(
      new KhaemenesAccountCloud.SyntheticTransport(state.store)
    );

    state.family=await state.client.getFamily("fam_demo");
    state.adult=await state.client.getAdult("adult_demo_guardian");
    state.mac=await state.client.getLearner("learner_demo");
    state.tablet=await state.client.getLearner("learner_demo");
    state.progress=await state.client.getProgress("progress_demo");
    state.loaded=true;

    await renderCloud();
    log("SYNTHETIC ACCOUNT CLOUD RESET",{
      mode:"synthetic only",
      family:state.family,
      adult:state.adult,
      macView:state.mac,
      tabletView:state.tablet,
      warning:"No real account data is stored by this GitHub testbed."
    });
  }

  async function macWrite(){
    if(!state.loaded) await loadSynthetic();
    try{
      const result=await state.client.sync({
        schemaVersion:"1.0",
        resourceType:"learner",
        resourceId:"learner_demo",
        baseVersion:state.mac.recordVersion,
        clientMutationId:"mutation_mac_demo_001",
        sourceDeviceId:"device_mac_demo",
        patch:{
          activePathway:"grade-09",
          continuityNote:"Synthetic Mac continuity update"
        }
      });
      state.mac=result.record;
      await renderCloud();
      log("MAC WRITE · PASS",result);
    }catch(error){
      log(`MAC WRITE · ${error.code||"ERROR"}`,error.detail||error.message);
    }
  }

  async function tabletStaleWrite(){
    if(!state.loaded) await loadSynthetic();
    try{
      const result=await state.client.sync({
        schemaVersion:"1.0",
        resourceType:"learner",
        resourceId:"learner_demo",
        baseVersion:state.tablet.recordVersion,
        clientMutationId:"mutation_tablet_demo_stale",
        sourceDeviceId:"device_tablet_demo",
        patch:{continuityNote:"Synthetic stale tablet update"}
      });
      state.tablet=result.record;
      await renderCloud();
      log("TABLET STALE WRITE · UNEXPECTED PASS",result);
    }catch(error){
      if(error.code==="version_conflict"){
        log("TABLET STALE WRITE · CORRECTLY BLOCKED",error.detail);
      }else{
        log(`TABLET WRITE · ${error.code||"ERROR"}`,error.detail||error.message);
      }
    }
  }

  async function tabletRefresh(){
    if(!state.loaded) await loadSynthetic();
    state.tablet=await state.client.getLearner("learner_demo");
    log("TABLET REFRESHED FROM CANONICAL",state.tablet);
  }

  async function tabletWrite(){
    if(!state.loaded) await loadSynthetic();
    try{
      const result=await state.client.sync({
        schemaVersion:"1.0",
        resourceType:"learner",
        resourceId:"learner_demo",
        baseVersion:state.tablet.recordVersion,
        clientMutationId:"mutation_tablet_demo_002",
        sourceDeviceId:"device_tablet_demo",
        patch:{continuityNote:"Synthetic tablet update after canonical refresh"}
      });
      state.tablet=result.record;
      await renderCloud();
      log("TABLET WRITE AFTER REFRESH · PASS",result);
    }catch(error){
      log(`TABLET WRITE · ${error.code||"ERROR"}`,error.detail||error.message);
    }
  }

  async function showAudit(){
    const audit=await state.client.audit();
    log("SYNTHETIC ACCOUNT AUDIT",audit);
  }

  async function showFamily(){
    log("FAMILY AUTHORITY VIEW",await state.client.getFamily("fam_demo"));
  }

  async function showLearner(){
    log("LEARNER AUTHORITY VIEW",await state.client.getLearner("learner_demo"));
  }

  async function runCommand(){
    const raw=$("#command").value.trim().toLowerCase();
    const commands={
      "show cloud":async()=>log("CLOUD SNAPSHOT",await state.client.snapshot()),
      "show directory":async()=>log("DIRECTORY",{
        families:["fam_demo"],
        adults:["adult_demo_guardian"],
        learners:["learner_demo"],
        institutionalIds:["STUDENT-DEMO-0001"],
        sessions:"protected runtime only",
        audit:"append-only runtime target",
        recovery:"protected runtime operation"
      }),
      "show family":showFamily,
      "show learner":showLearner,
      "show audit":showAudit,
      "mac write":macWrite,
      "tablet stale":tabletStaleWrite,
      "tablet refresh":tabletRefresh,
      "tablet write":tabletWrite,
      "reset":loadSynthetic,
      "help":async()=>log("ACCOUNT CLOUD COMMANDS",
`show cloud
show directory
show family
show learner
show audit
mac write
tablet stale
tablet refresh
tablet write
reset
help`)
    };
    if(commands[raw]) await commands[raw]();
    else log("COMMAND NOT RECOGNIZED",'Type "help" for the Account Cloud synthetic command set.');
    $("#command").value="";
  }

  $("#reset-cloud").addEventListener("click",loadSynthetic);
  $("#show-family").addEventListener("click",showFamily);
  $("#show-learner").addEventListener("click",showLearner);
  $("#mac-write").addEventListener("click",macWrite);
  $("#tablet-stale").addEventListener("click",tabletStaleWrite);
  $("#tablet-refresh").addEventListener("click",tabletRefresh);
  $("#tablet-write").addEventListener("click",tabletWrite);
  $("#show-audit").addEventListener("click",showAudit);
  $("#run-command").addEventListener("click",runCommand);
  $("#command").addEventListener("keydown",e=>{if(e.key==="Enter")runCommand()});

  renderDirectory();
  await loadSynthetic();
})();
