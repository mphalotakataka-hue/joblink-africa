const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const STORAGE = { cv: "joblink_cv_v1", jobs: "joblink_jobs_v1" };

const demoJobs = [
  {id:"demo1",title:"Retail Shop Assistant (Demo)",company:"Example Retail Store",location:"Pretoria, Gauteng",type:"Full-time",description:"Example listing for testing only. Customer service, stocking shelves and assisting customers. Always confirm the vacancy directly.",apply:"Contact the employer through its official website.",demo:true},
  {id:"demo2",title:"Junior Office Administrator (Demo)",company:"Example Office Services",location:"Johannesburg, Gauteng",type:"Internship",description:"Example listing for testing only. Basic computer skills, communication and filing.",apply:"Contact the employer through its official website.",demo:true},
  {id:"demo3",title:"Entry-level Call Centre Agent (Demo)",company:"Example Contact Centre",location:"Remote / South Africa",type:"Full-time",description:"Example listing for testing only. Clear communication and customer support skills.",apply:"Contact the employer through its official website.",demo:true}
];
let customJobs = JSON.parse(localStorage.getItem(STORAGE.jobs) || "[]");
let cvData = JSON.parse(localStorage.getItem(STORAGE.cv) || "{}");

function toast(message) {
  const el=$("#toast"); el.textContent=message; el.classList.add("show");
  setTimeout(()=>el.classList.remove("show"),2600);
}
function showView(view) {
  $$(".view").forEach(el=>el.hidden=true);
  $("#"+view+"View").hidden=false;
  $$(".tab").forEach(el=>el.classList.toggle("active",el.dataset.view===view));
  if(view==="jobs") renderJobs();
  window.scrollTo({top:0,behavior:"smooth"});
}
$$("[data-view]").forEach(btn=>btn.addEventListener("click",()=>showView(btn.dataset.view)));

function renderJob(job) {
  const safe = (v)=>String(v||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  return `<article class="job-card">
    <h3>${safe(job.title)}</h3><div><b>${safe(job.company)}</b></div>
    <div class="job-meta">📍 ${safe(job.location)} · ${safe(job.type)}</div>
    ${job.demo?'<span class="tag">DEMO — NOT A LIVE VACANCY</span>':'<span class="tag">USER-SUBMITTED — NOT VERIFIED</span>'}
    <p>${safe(job.description)}</p>
    <div class="job-meta"><b>How to apply:</b> ${safe(job.apply)}</div>
  </article>`;
}
function renderJobs() {
  const q=($("#jobSearch")?.value||"").toLowerCase();
  const all=[...customJobs,...demoJobs].filter(j=>[j.title,j.company,j.location,j.type].join(" ").toLowerCase().includes(q));
  $("#jobsList").innerHTML=all.length?all.map(renderJob).join(""):"<p class='muted'>No matching listings. Try another search.</p>";
  $("#homeJobs").innerHTML=[...customJobs,...demoJobs].slice(0,2).map(renderJob).join("");
}
$("#jobSearch").addEventListener("input",renderJobs);

function fillCvForm() {
  const form=$("#cvForm");
  Object.entries(cvData).forEach(([key,value])=>{if(form.elements[key])form.elements[key].value=value;});
}
$("#cvForm").addEventListener("submit",e=>{
  e.preventDefault();
  cvData=Object.fromEntries(new FormData(e.currentTarget).entries());
  localStorage.setItem(STORAGE.cv,JSON.stringify(cvData));
  $("#cvStatus").textContent="Your CV has been saved on this device.";
  toast("CV saved on this device.");
});

function escapeHtml(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("#printCv").addEventListener("click",()=>{
  const form=$("#cvForm");
  cvData=Object.fromEntries(new FormData(form).entries());
  localStorage.setItem(STORAGE.cv,JSON.stringify(cvData));
  const fields=[
    ["Professional summary","summary"],["Education","education"],
    ["Work experience","experience"],["Skills","skills"],["References","references"]
  ];
  const win=window.open("","_blank");
  if(!win){toast("Allow pop-ups to preview your CV, then try again.");return;}
  win.document.write(`<!doctype html><html><head><title>CV - ${escapeHtml(cvData.name)}</title>
  <meta name="viewport" content="width=device-width"><style>
  body{font:14px Arial,sans-serif;color:#17263a;max-width:760px;margin:35px auto;padding:0 22px;line-height:1.55}
  h1{color:#102744;margin-bottom:3px}h2{font-size:16px;color:#2463a6;border-bottom:1px solid #ddd;padding-bottom:4px;margin-top:22px}
  .sub{color:#596a7e;margin:0 0 22px}.block{white-space:pre-wrap}
  @media print{button{display:none}}
  </style></head><body><h1>${escapeHtml(cvData.name||"Your Name")}</h1>
  <p class="sub">${escapeHtml(cvData.headline)}<br>${escapeHtml(cvData.location)} · ${escapeHtml(cvData.phone)} · ${escapeHtml(cvData.email)}</p>
  ${fields.map(([title,key])=>cvData[key]?`<h2>${title}</h2><div class="block">${escapeHtml(cvData[key])}</div>`:"").join("")}
  <p style="margin-top:35px;color:#777;font-size:11px">Prepared with JOBLINK AFRICA CV Builder</p>
  <script>window.onload=()=>window.print()<\/script></body></html>`);
  win.document.close();
});

$("#jobForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  delete data.confirm;
  data.id="local-"+Date.now(); data.demo=false;
  customJobs.unshift(data);
  localStorage.setItem(STORAGE.jobs,JSON.stringify(customJobs));
  e.currentTarget.reset();
  $("#jobStatus").textContent="Vacancy saved on this device only. It is not yet public or verified.";
  toast("Vacancy saved locally.");
  renderJobs();
});

fillCvForm(); renderJobs();
if("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
let installPrompt;
window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault(); installPrompt=e; $("#installBtn").hidden=false;
});
$("#installBtn").addEventListener("click",async()=>{
  if(!installPrompt)return;
  installPrompt.prompt(); await installPrompt.userChoice; installPrompt=null; $("#installBtn").hidden=true;
});
