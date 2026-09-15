const { packs, games } = window.PARTY_CATALOGUE;
const app = document.getElementById('app');
const gameDialog = document.getElementById('gameDialog');
const settingsDialog = document.getElementById('settingsDialog');

const packColours = [
  ['#ff5aa5','#7b61ff'],['#20d7c9','#1e88ff'],['#ff8558','#ffca5a'],['#b15cff','#ff6ba8'],
  ['#5ae0ff','#5e7dff'],['#a4f07b','#38c5a0'],['#ff6b7a','#ffb04c'],['#59d7ff','#9e76ff'],
  ['#f0d467','#f779a8'],['#62e2aa','#4aa5ff'],['#ff7fb2','#7f77ff'],['#66e6ff','#ffd05b']
];

const packArtwork = {
  1:'https://cms-assets.jackboxgames.com/pp1_splash_wide_22a0a84424.png?format=auto&width=1000',
  2:'https://cms-assets.jackboxgames.com/pp2_splash_wide_90bd70e2ac.png?format=auto&width=1000',
  3:'https://cms-assets.jackboxgames.com/pp3_splash_wide_18d1cece65.png?format=auto&width=1000',
  4:'https://cms-assets.jackboxgames.com/pp4_splash_wide_1a98151ad5.png?format=auto&width=1000',
  5:'https://cms-assets.jackboxgames.com/pp5_splash_wide_e67e65f132.png?format=auto&width=1000',
  6:'https://cms-assets.jackboxgames.com/pp6_splash_wide_5b0b4ba388.png?format=auto&width=1000',
  7:'https://cms-assets.jackboxgames.com/pp7_splash_wide_0a1dff82a6.png?format=auto&width=1000',
  8:'https://cms-assets.jackboxgames.com/pp8_splash_wide_378998be15.png?format=auto&width=1000',
  9:'https://cms-assets.jackboxgames.com/pp9_splash_wide_1ebc38bb64.png?format=auto&width=1000',
  10:'https://cms-assets.jackboxgames.com/pack_10_wide_splash_c2d86713ae.jpg?format=auto&width=1000',
  11:'https://cms-assets.jackboxgames.com/pp11_splash_wide_e46c09f390.png?format=auto&width=1000',
  12:'https://cms-assets.jackboxgames.com/PP_12_wishlist_cdd8904c43.png?format=auto&width=1000',
  'survey-scramble':'assets/hero-pattern.png'
};
function packArtUrl(id){return packArtwork[id] || 'assets/hero-pattern.png'}
function gameArtUrl(g){return g.art || packArtUrl(g.pack)}
function artStyle(id){return `style="background-image:linear-gradient(180deg,rgba(6,10,20,.18),rgba(6,10,20,.78)),url('${packArtUrl(id)}')"`}
function gameArtStyle(g){return `style="background-image:linear-gradient(180deg,rgba(6,10,20,.12),rgba(6,10,20,.78)),url('${gameArtUrl(g)}')"`}
function gameArtOnlyStyle(g){return `style="background-image:url('${gameArtUrl(g)}')"`}
const wheelOverlayFamilies={
  female:['assets/wheel-overlays/female-1.png','assets/wheel-overlays/female-2.png','assets/wheel-overlays/female-3.png'],
  male:['assets/wheel-overlays/male-1.png','assets/wheel-overlays/male-2.png','assets/wheel-overlays/male-3.png'],
  smarty:['assets/wheel-overlays/smarty-1.png','assets/wheel-overlays/smarty-2.png'],
  robot:['assets/wheel-overlays/robot-1.png','assets/wheel-overlays/robot-2.png','assets/wheel-overlays/robot-3.png'],
  cat:['assets/wheel-overlays/cat-1.png','assets/wheel-overlays/cat-2.png'],
  pizza:['assets/wheel-overlays/pizza-1.png','assets/wheel-overlays/pizza-2.png'],
  disco:['assets/wheel-overlays/disco-1.png','assets/wheel-overlays/disco-2.png'],
  penguin:['assets/wheel-overlays/penguin-1.png','assets/wheel-overlays/penguin-2.png'],
  dog:['assets/wheel-overlays/dog-1.png'],
  lava:['assets/wheel-overlays/lava-1.png'],
  bee:['assets/wheel-overlays/bee-1.png'],
  alien:['assets/wheel-overlays/alien-1.png','assets/wheel-overlays/alien-2.png'],
  platypus:['assets/wheel-overlays/platypus-1.png'],
  unicorn:['assets/wheel-overlays/unicorn-1.png']
};
function randomFrom(list){return list[Math.floor(Math.random()*list.length)]}
function chooseWheelOverlaySet(){
  const families=Object.keys(wheelOverlayFamilies).sort(()=>Math.random()-.5);
  const selected=families.slice(0,2);
  return selected.map(family=>({family,src:randomFrom(wheelOverlayFamilies[family])}));
}
const sessionWheelOverlays=chooseWheelOverlaySet();
function wheelOverlayMarkup(){return sessionWheelOverlays.map((item,i)=>`<img class="wheel-character wheel-character-${i+1}" src="${item.src}" alt="" aria-hidden="true">`).join('')}

const tagMeta = {
  drawing:{label:'Drawing',icon:'assets/categories/drawing.png'},
  quiz:{label:'Quiz',icon:'assets/categories/quiz.png'},
  speaking:{label:'Speaking',icon:'assets/categories/speaking.png'},
  typing:{label:'Typing',icon:'assets/categories/typing.png'}
};
const state = {
  view:'home', search:'', pack:'all', players:null, tags:new Set(), match:'any', ownedOnly:false, favOnly:false,
  owned:new Set(JSON.parse(localStorage.getItem('partyPickerOwned') || '[]')),
  favourites:new Set(JSON.parse(localStorage.getItem('partyPickerFavourites') || '[]')),
  launcher:{base:'http://127.0.0.1:8765',token:localStorage.getItem('partyPickerLauncherToken') || '',configured:new Set(),online:false},
  wheel:{players:null,tags:new Set(),packs:new Set(packs.filter(p=>p.status==='released').map(p=>p.id)),scope:'selected',games:new Set(JSON.parse(localStorage.getItem('partyPickerWheelGames') || '[]')),explicit:JSON.parse(localStorage.getItem('partyPickerWheelGames') || '[]').length>0,match:'any',angle:0,spinning:false,result:null}
};

function save(){
  localStorage.setItem('partyPickerOwned', JSON.stringify([...state.owned]));
  localStorage.setItem('partyPickerFavourites', JSON.stringify([...state.favourites]));
  localStorage.setItem('partyPickerWheelGames', JSON.stringify([...state.wheel.games]));
  localStorage.setItem('partyPickerLauncherToken', state.launcher.token || '');
}
function packInfo(id){return packs.find(p=>String(p.id)===String(id))}
function packIdFromDataset(raw){return /^\d+$/.test(String(raw))?Number(raw):raw}
function colourForPack(id){if(String(id)==='survey-scramble')return ['#ff4f8b','#ff9f43'];const n=Number(id);return packColours[(n-1)%packColours.length]}
function packBadge(pack){return pack.kind==='standalone'?(pack.shortName||pack.name):`Pack ${pack.id}`}
function packChipLabel(pack){return pack.kind==='standalone'?'Survey':String(pack.id)}
function ownedSort(a,b){const pa=packInfo(a),pb=packInfo(b);if(pa?.kind==='standalone'&&pb?.kind!=='standalone')return 1;if(pb?.kind==='standalone'&&pa?.kind!=='standalone')return -1;return Number(a)-Number(b)}
function gameFitsPlayers(g,n){return !n || (g.min<=n && g.max>=n)}
function tagMatch(g,tags,mode='any'){
  if(!tags.size) return true;
  return mode==='all' ? [...tags].every(t=>g.tags.includes(t)) : [...tags].some(t=>g.tags.includes(t));
}
function filteredGames(overrides={}){
  const f={search:state.search,pack:state.pack,players:state.players,tags:state.tags,match:state.match,ownedOnly:state.ownedOnly,favOnly:state.favOnly,...overrides};
  const q=(f.search||'').trim().toLowerCase();
  return games.filter(g=>{
    const p=packInfo(g.pack);
    if(q && !`${g.title} ${p.name} pack ${g.pack} ${g.style.join(' ')}`.toLowerCase().includes(q)) return false;
    if(f.pack!=='all' && String(f.pack)!==String(g.pack)) return false;
    if(!gameFitsPlayers(g,f.players)) return false;
    if(!tagMatch(g,f.tags,f.match)) return false;
    if(f.ownedOnly && !state.owned.has(g.pack)) return false;
    if(f.favOnly && !state.favourites.has(g.id)) return false;
    return true;
  });
}
function resetBrowseFilters(){
  state.search='';
  state.pack='all';
  state.players=null;
  state.tags.clear();
  state.match='any';
  state.ownedOnly=false;
  state.favOnly=false;
}
function resetWheelFilters(){
  // Keep the deliberately-built wheel shortlist, but clear temporary narrowing filters.
  state.wheel.players=null;
  state.wheel.tags.clear();
  state.wheel.match='any';
  state.wheel.result=null;
}
function clearFiltersForView(view){
  if(view==='games' || view==='finder') resetBrowseFilters();
  else if(view==='wheel') resetWheelFilters();
}
function historySnapshot(){
  return {
    partyPicker:true,view:state.view,search:state.search,pack:state.pack,players:state.players,tags:[...state.tags],match:state.match,ownedOnly:state.ownedOnly,favOnly:state.favOnly,
    wheel:{players:state.wheel.players,tags:[...state.wheel.tags],packs:[...state.wheel.packs],scope:state.wheel.scope,games:[...state.wheel.games],explicit:!!state.wheel.explicit,match:state.wheel.match,angle:state.wheel.angle}
  };
}
function historyUrl(view){return `#${view}`}
function restoreHistorySnapshot(s){
  if(!s||!s.partyPicker)return false;
  state.view=s.view||'home';state.search=s.search||'';state.pack=s.pack??'all';state.players=s.players??null;state.tags=new Set(s.tags||[]);state.match=s.match||'any';state.ownedOnly=!!s.ownedOnly;state.favOnly=!!s.favOnly;
  if(s.wheel){state.wheel.players=s.wheel.players??null;state.wheel.tags=new Set(s.wheel.tags||[]);state.wheel.packs=new Set(s.wheel.packs||[]);state.wheel.scope=s.wheel.scope||'selected';state.wheel.games=new Set(s.wheel.games||[]);state.wheel.explicit=!!s.wheel.explicit;state.wheel.match=s.wheel.match||'any';state.wheel.angle=s.wheel.angle||0;state.wheel.result=null;state.wheel.spinning=false}
  return true;
}
function setView(view,{fromHistory=false}={}){
  if(!fromHistory)history.replaceState(historySnapshot(),'',historyUrl(state.view));
  if(state.view!==view&&!fromHistory)clearFiltersForView(state.view);
  state.view=view;
  if(!fromHistory)history.pushState(historySnapshot(),'',historyUrl(view));
  window.scrollTo({top:0,left:0,behavior:fromHistory?'auto':'smooth'});
  render();
}
function initHistory(){
  const validViews=new Set(['home','games','packs','finder','wheel']);
  if(history.state?.partyPicker){restoreHistorySnapshot(history.state);return}
  const hash=location.hash.replace('#','');if(validViews.has(hash))state.view=hash;
  history.replaceState(historySnapshot(),'',historyUrl(state.view));
}
function esc(s=''){return s.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]))}
function playerLabel(g){return `${g.min}–${g.max} players`}
function playerOptionValues(){return [1,2,3,4,5,6,7,8,9,10,11,12,13]}
function playerOptionLabel(n){return n===13?'13+ players':`${n} player${n===1?'':'s'}`}
function showToast(message){const t=document.getElementById('toast');if(!t)return;t.textContent=message;t.classList.add('show');clearTimeout(showToast._timer);showToast._timer=setTimeout(()=>t.classList.remove('show'),1800)}
async function launcherRequest(path,method='GET'){
  const headers={'X-Party-Picker-Token':state.launcher.token};
  if(method==='POST')headers['Content-Type']='application/json';
  const res=await fetch(`${state.launcher.base}${path}`,{method,headers,body:method==='POST'?'{}':undefined,cache:'no-store'});
  let data={};try{data=await res.json()}catch{}
  if(!res.ok)throw new Error(data.error||`Launcher error ${res.status}`);
  return data;
}
async function refreshLauncherStatus(){
  try{
    const health=await fetch(`${state.launcher.base}/health`,{cache:'no-store'});if(!health.ok)throw new Error('offline');
    state.launcher.online=true;
    if(state.launcher.token){const s=await launcherRequest('/status');state.launcher.configured=new Set((s.configured||[]).map(String))}
    else state.launcher.configured=new Set();
  }catch{state.launcher.online=false;state.launcher.configured=new Set()}
  return state.launcher.online;
}
function tidyAfterLaunch(){
  clearTimeout(tidyAfterLaunch._timer);
  tidyAfterLaunch._timer=setTimeout(()=>{if(gameDialog.open)gameDialog.close();if(settingsDialog.open)settingsDialog.close();window.scrollTo({top:0,left:0,behavior:'auto'})},5000);
}
async function launchPack(id){
  if(!state.launcher.token){showToast('Open Settings and pair the local launcher first');return}
  try{await launcherRequest(`/launch/${encodeURIComponent(id)}`,'POST');showToast(`▶ Launching ${packBadge(packInfo(id))}`);tidyAfterLaunch()}
  catch(err){showToast(err.message||'Launcher unavailable')}
}
function launchButton(packId,label='Launch Pack'){
  const configured=state.launcher.configured.has(String(packId));
  return `<button class="launch-btn ${configured?'ready':''}" data-launch-pack="${packId}">▶ ${label}</button>`;
}
function updateWheelNav(){document.querySelectorAll('[data-view="wheel"]').forEach(b=>{b.innerHTML=`<img class="wheel-badge-icon" src="assets/ui/partycipate-wheel.png" alt=""><span>Wheel</span>`})}

function renderNav(){
  updateWheelNav();
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===state.view));
}
function render(){
  if(state.view==='home') renderHome();
  else if(state.view==='games') renderGames();
  else if(state.view==='packs') renderPacks();
  else if(state.view==='finder') renderFinder();
  else if(state.view==='wheel') renderWheel();
  renderNav();
}

function renderHome(){
  const released=games.filter(g=>!g.upcoming).length;
  app.innerHTML=`
    <section class="hero">
      <div class="hero-card"><div class="hero-copy">
        <div class="eyebrow">JACKBOX GAMES PICKER · MADE BY PARTYCIPATE</div>
        <h1>Stop scrolling.<br><span>Start playing.</span></h1>
        <p>Browse the numbered Party Packs plus Survey Scramble, filter by group size and how you want to play, or let the wheel decide.</p>
        <div class="hero-actions"><button class="primary" data-go="finder">Find a Game</button><button class="ghost" data-go="wheel">Spin the Wheel</button></div>
      </div></div>
      <div class="hero-side panel">
        <div><h2>How many are playing?</h2><select id="homePlayerSelect" class="select stream-select"><option value="">Choose player count…</option>${playerOptionValues().map(n=>`<option value="${n}">${playerOptionLabel(n)}</option>`).join('')}</select><div class="quick-note">Choose your group size and we’ll show games where everyone can play.</div></div>
        <div class="stat-strip"><div class="stat"><b>${released}</b><span>released games & modes</span></div><div class="stat"><b>${packs.length}</b><span>collections</span></div><div class="stat"><b>4</b><span>interaction filters</span></div></div>
      </div>
    </section>
    <section class="section"><div class="section-head"><div><h2>Pick your vibe</h2><p>Games can belong to more than one interaction category.</p></div><button class="link-btn" data-go="games">Browse all games →</button></div>
      <div class="category-grid">${Object.entries(tagMeta).map(([key,m])=>`<button class="category-card" data-home-tag="${key}"><img src="${m.icon}" alt=""><div><strong>${m.label}</strong></div><small>${categoryCopy(key)}</small></button>`).join('')}</div>
    </section>
    <section class="section"><div class="section-head"><div><h2>Your library</h2><p>Mark packs and standalone titles you own and the finder/wheel can limit itself to your collection.</p></div><button class="link-btn" id="manageOwned">Manage collection →</button></div>
      ${state.owned.size?`<div class="filter-bar">${[...state.owned].sort(ownedSort).map(id=>`<span class="pack-chip active">${packBadge(packInfo(id))}</span>`).join('')}</div>`:`<div class="empty">No packs marked as owned yet. Your choices stay on this device.</div>`}
    </section>`;
}
function categoryCopy(k){return {drawing:'Doodles, visual creation and art-based play.',quiz:'Trivia, facts, estimates and knowledge challenges.',speaking:'Discussion, bluffing, pitching and performance.',typing:'Written jokes, answers, messages and wordplay.'}[k]}

function groupedGameSections(list){
  return packs.map(p=>{
    const items=list.filter(g=>String(g.pack)===String(p.id));
    if(!items.length) return '';
    const c=colourForPack(p.id);
    const unit=p.kind==='standalone'?'modes':'games';
    return `<section class="game-pack-group">
      <div class="game-pack-heading" style="--pc1:${c[0]};--pc2:${c[1]};--pack-art:url('${packArtUrl(p.id)}')">
        <div class="game-pack-heading__backplate"></div>
        <div class="game-pack-heading__copy"><span class="game-pack-kicker">${packBadge(p)}</span><h3>${esc(p.name)}</h3></div>
        <div class="game-pack-count">${items.length} ${unit}${p.status==='upcoming'?' · Upcoming':''}</div>
      </div>
      <div class="games-grid compact-games-grid">${items.map(gameCard).join('')}</div>
    </section>`;
  }).join('');
}

function renderGames(){
  const list=filteredGames();
  app.innerHTML=`<section><div class="section-head"><div><h2>All games</h2><p>Browse by pack, then narrow by game, interaction or exact group size.</p></div></div>
    ${filtersHTML()}
    ${list.length?groupedGameSections(list):`<div class="empty">No games match those filters.</div>`}
  </section>`;
}
function filtersHTML(){return `
  <div class="filters-shell">
    <div class="toolbar toolbar-main"><div class="searchbox"><input id="searchInput" value="${esc(state.search)}" placeholder="Search games, packs or styles…"></div>
      <select class="select" id="packSelect"><option value="all">All collections</option>${packs.map(p=>`<option value="${p.id}" ${String(state.pack)===String(p.id)?'selected':''}>${packBadge(p)}${p.status==='upcoming'?' · Upcoming':''}</option>`).join('')}</select>
      <select class="select" id="playerSelect"><option value="">Any players</option>${playerOptionValues().map(n=>`<option value="${n}" ${state.players===n?'selected':''}>${playerOptionLabel(n)}</option>`).join('')}</select></div>
    <div class="filter-bar filter-bar-clean"><div class="filter-chip-row"><span class="filter-label">Interaction</span>${Object.keys(tagMeta).map(t=>`<button class="tag-chip ${state.tags.has(t)?'active':''}" data-filter-tag="${t}" data-tag="${t}"><img class="tag-chip-icon" src="${tagMeta[t].icon}" alt="">${tagMeta[t].label}</button>`).join('')}
      <button class="tag-chip utility-chip ${state.ownedOnly?'active':''}" data-filter-owned>Owned</button><button class="tag-chip utility-chip ${state.favOnly?'active':''}" data-filter-fav>★ Favourites</button></div>
      <div class="filter-meta-row"><select class="select" id="matchSelect" ${state.tags.size<2?'disabled':''}><option value="any" ${state.match==='any'?'selected':''}>Match any</option><option value="all" ${state.match==='all'?'selected':''}>Match all</option></select><span class="result-count">${filteredGames().length} games</span></div></div>
  </div>`}
function gameCard(g){
  const p=packInfo(g.pack), c=colourForPack(g.pack);
  return `<article class="game-card" style="--pack-color:linear-gradient(90deg,${c[0]},${c[1]})">
    <div class="game-art" ${gameArtStyle(g)}><div class="game-art-overlay"><span class="pack-badge">${packBadge(p)}</span>${g.upcoming?'<span class="status-badge">Upcoming</span>':''}</div></div>
    <div class="game-body">
      <div class="game-meta"><div class="game-title-wrap"><h3>${esc(g.title)}</h3></div><button class="fav-btn ${state.favourites.has(g.id)?'active':''}" data-fav="${g.id}" aria-label="Favourite ${esc(g.title)}">★</button></div>
      <div class="mini-row"><span class="mini-tag player">👥 ${playerLabel(g)}</span>${g.tags.map(t=>`<span class="mini-tag" data-tag="${t}">${tagMeta[t].label}</span>`).join('')}${!g.tags.length?'<span class="mini-tag">Other interaction</span>':''}</div>
      <div class="card-actions"><button class="card-secondary" data-detail="${g.id}">Details</button><button class="card-primary ${state.wheel.games.has(g.id)?'added':''}" data-wheel-add="${g.id}" ${g.upcoming?'disabled title="Not released yet"':''}>${state.wheel.games.has(g.id)?'✓ On Wheel':'＋ Wheel'}</button></div>
    </div></article>`;
}

function renderPacks(){
  app.innerHTML=`<section><div class="section-head"><div><h2>Packs & standalone titles</h2><p>Official pack artwork with a cleaner stream-first box selection layout.</p></div></div><div class="packs-grid">${packs.map(packCard).join('')}</div></section>`;
}
function packCard(p){const c=colourForPack(p.id), items=games.filter(g=>String(g.pack)===String(p.id)), count=items.length, unit=p.kind==='standalone'?'modes':'games', art=p.kind==='standalone'?'SS':p.id;return `<article class="pack-card" data-pack-open="${p.id}" style="--pc1:${c[0]};--pc2:${c[1]}"><div class="pack-art" ${artStyle(p.id)}><div class="pack-art-fade"></div><div class="pack-num">${art}</div></div><div class="pack-card-body"><div class="pack-card-topline">${p.year} · ${count} ${unit}${p.status==='upcoming'?' · Upcoming':''}</div><h3>${p.name}</h3><div class="pack-controls pack-controls-clean">${p.status==='released'?launchButton(p.id,p.kind==='standalone'?'Launch Survey Scramble':`Launch Pack ${p.id}`):''}<button class="owned-toggle ${state.owned.has(p.id)?'active':''}" data-owned="${p.id}" ${p.status==='upcoming'?'disabled':''}>${state.owned.has(p.id)?'✓ Owned':'Mark owned'}</button></div></div></article>`}

function renderFinder(){
  const list=filteredGames();
  app.innerHTML=`<section><div class="section-head"><div><h2>Find a Game</h2><p>Build a shortlist around the people actually in the room.</p></div></div>
  <div class="finder-grid"><aside class="filters-panel panel">
    <h3>Your group</h3>
    <div class="field"><label class="title">Players</label><select id="finderPlayerSelect" class="select stream-select" style="width:100%"><option value="" ${state.players===null?'selected':''}>Any group size</option>${playerOptionValues().map(n=>`<option value="${n}" ${state.players===n?'selected':''}>${playerOptionLabel(n)}</option>`).join('')}</select></div>
    <div class="field"><label class="title">Interaction</label><div class="range-row">${Object.keys(tagMeta).map(t=>`<button class="tag-chip ${state.tags.has(t)?'active':''}" data-filter-tag="${t}"><img class="tag-chip-icon" src="${tagMeta[t].icon}" alt="">${tagMeta[t].label}</button>`).join('')}</div></div>
    <div class="field"><label class="title">When several are selected</label><select class="select" id="matchSelect" style="width:100%"><option value="any" ${state.match==='any'?'selected':''}>Match any category</option><option value="all" ${state.match==='all'?'selected':''}>Match every category</option></select></div>
    <div class="toggle-row"><div><b>Only packs I own</b><div class="wheel-small">Stored on this device</div></div><button class="toggle ${state.ownedOnly?'active':''}" data-toggle-owned></button></div>
    <div class="toggle-row"><div><b>Only favourites</b><div class="wheel-small">Your saved game shortlist</div></div><button class="toggle ${state.favOnly?'active':''}" data-toggle-fav></button></div>
    <button class="ghost" style="width:100%;margin-top:14px" data-clear-filters>Clear filters</button>
  </aside><div><div class="section-head"><div><h2 style="font-size:32px">${list.length} matches</h2><p>${finderSummary()}</p></div>${list.length?'<button class="primary" data-send-wheel>Send matches to wheel</button>':''}</div>${list.length?groupedGameSections(list):'<div class="empty">Try widening the player count or interaction filters.</div>'}</div></div></section>`;
}
function finderSummary(){let bits=[];if(state.players)bits.push(playerOptionLabel(state.players));if(state.tags.size)bits.push([...state.tags].map(t=>tagMeta[t].label).join(state.match==='all'?' + ':' or '));if(state.ownedOnly)bits.push('owned packs');if(state.favOnly)bits.push('favourites');return bits.length?`Matching ${bits.join(' · ')}`:'No filters applied yet.'}

function wheelPool(){
  if(state.wheel.explicit&&state.wheel.games.size)return games.filter(g=>!g.upcoming&&state.wheel.games.has(g.id));
  let pool=games.filter(g=>!g.upcoming && gameFitsPlayers(g,state.wheel.players) && tagMatch(g,state.wheel.tags,state.wheel.match));
  if(state.wheel.scope==='owned') pool=pool.filter(g=>state.owned.has(g.pack));
  else if(state.wheel.scope==='favourites') pool=pool.filter(g=>state.favourites.has(g.id));
  else if(state.wheel.scope==='selected') pool=pool.filter(g=>state.wheel.packs.has(g.pack));
  return pool;
}
function renderWheel(){
  const pool=wheelPool();
  app.innerHTML=`<section class="wheel-page">
    <div class="wheel-layout"><div class="wheel-stage panel"><div class="wheel-wrap"><canvas id="wheelCanvas" width="900" height="900" aria-label="Random game wheel"></canvas>${wheelOverlayMarkup()}</div>
      <button class="primary spin-btn" id="spinBtn" ${pool.length<2?'disabled':''}>${pool.length<2?'Add at least 2 games':'SPIN'}</button>
      <div class="wheel-result" id="wheelResult">${state.wheel.result?winnerHTML(state.wheel.result):`<div class="winner-sub">${pool.length} eligible games on the wheel</div>`}</div>
    </div><aside class="wheel-config panel">
      <h3>Build your wheel</h3>${state.wheel.explicit&&state.wheel.games.size?`<div class="explicit-wheel-note">Using ${state.wheel.games.size} selected game${state.wheel.games.size===1?'':'s'}</div>`:''}
      <div class="field"><label class="title">Players</label><select id="wheelPlayers" class="select" style="width:100%"><option value="">Any group size</option>${playerOptionValues().map(n=>`<option value="${n}" ${state.wheel.players===n?'selected':''}>${playerOptionLabel(n)}</option>`).join('')}</select></div>
      <div class="field"><label class="title">Interaction</label><div class="range-row">${Object.keys(tagMeta).map(t=>`<button class="tag-chip ${state.wheel.tags.has(t)?'active':''}" data-wheel-tag="${t}"><img class="tag-chip-icon" src="${tagMeta[t].icon}" alt="">${tagMeta[t].label}</button>`).join('')}</div></div>
      <div class="field"><label class="title">Category matching</label><select class="select" id="wheelMatch" style="width:100%"><option value="any" ${state.wheel.match==='any'?'selected':''}>Match any selected category</option><option value="all" ${state.wheel.match==='all'?'selected':''}>Match all selected categories</option></select></div>
      <div class="field"><label class="title">Source</label><select class="select" id="wheelScope" style="width:100%"><option value="selected" ${state.wheel.scope==='selected'?'selected':''}>Selected packs</option><option value="owned" ${state.wheel.scope==='owned'?'selected':''}>Packs I own</option><option value="favourites" ${state.wheel.scope==='favourites'?'selected':''}>Favourites only</option></select></div>
      ${state.wheel.scope==='selected'?`<div class="field"><label class="title">Packs</label><div class="range-row">${packs.filter(p=>p.status==='released').map(p=>`<button class="pack-chip ${state.wheel.packs.has(p.id)?'active':''}" data-wheel-pack="${p.id}">${packChipLabel(p)}</button>`).join('')}</div></div>`:''}
      <div class="field"><label class="title">Exact game selection <span class="wheel-small">(optional)</span></label><div class="wheel-small" style="margin-bottom:8px">Leave every game unticked to use the whole filtered pool.</div><div class="wheel-list">${wheelBaseForChecklist().map(g=>`<label class="check-row"><input type="checkbox" data-wheel-game="${g.id}" ${state.wheel.games.has(g.id)?'checked':''}><span>${esc(g.title)}</span></label>`).join('')}</div></div>
      <div class="range-row"><button class="ghost" data-wheel-clear-games>Clear game picks</button><button class="ghost" data-wheel-reset>Reset wheel</button></div>
    </aside></div></section>`;
  requestAnimationFrame(drawWheel);
}
function wheelBaseForChecklist(){let pool=games.filter(g=>!g.upcoming&&gameFitsPlayers(g,state.wheel.players)&&tagMatch(g,state.wheel.tags,state.wheel.match));if(state.wheel.scope==='selected')pool=pool.filter(g=>state.wheel.packs.has(g.pack));if(state.wheel.scope==='owned')pool=pool.filter(g=>state.owned.has(g.pack));if(state.wheel.scope==='favourites')pool=pool.filter(g=>state.favourites.has(g.id));return pool}
function winnerHTML(g){const p=packInfo(g.pack);return `<div class="winner-showcase"><div class="winner-card"><div class="winner-art-frame"><img class="winner-art-rotated-img" src="${esc(gameArtUrl(g))}" alt="" loading="lazy"><img class="winner-burst" src="assets/ui/winner-burst.png" alt=""></div><div class="winner-copy"><span class="pack-badge">${packBadge(p)}</span><div class="winner">${esc(g.title)}</div><div class="winner-sub">${playerLabel(g)} · ${g.tags.length?g.tags.map(t=>tagMeta[t].label).join(' · '):'Other interaction'}</div></div></div><div class="winner-actions">${launchButton(g.pack,packInfo(g.pack).kind==='standalone'?'Launch Survey Scramble':`Launch ${packBadge(packInfo(g.pack))}`)}<button class="ghost" data-spin-again>Spin again</button><button class="danger" data-remove-winner="${g.id}">Remove & spin again</button></div></div>`}
function drawWheel(angle=state.wheel.angle){
  const canvas=document.getElementById('wheelCanvas');if(!canvas)return;const ctx=canvas.getContext('2d'),pool=wheelPool(),W=canvas.width,H=canvas.height,cx=W/2,cy=H/2,r=H*.46;ctx.clearRect(0,0,W,H);
  if(!pool.length){ctx.fillStyle='#1c2741';ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.fill();ctx.fillStyle='#aeb8d0';ctx.font='700 34px system-ui';ctx.textAlign='center';ctx.fillText('No games match',cx,cy);return}
  const step=Math.PI*2/pool.length;
  pool.forEach((g,i)=>{const start=angle+i*step-Math.PI/2,end=start+step,c=colourForPack(g.pack);ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,start,end);ctx.closePath();ctx.fillStyle=i%2?c[0]:c[1];ctx.globalAlpha=.92;ctx.fill();ctx.globalAlpha=1;ctx.strokeStyle='rgba(9,13,26,.55)';ctx.lineWidth=4;ctx.stroke();
    ctx.save();ctx.translate(cx,cy);ctx.rotate(start+step/2);ctx.textAlign='right';ctx.fillStyle='#fff';ctx.font=`900 ${pool.length>28?16:pool.length>18?20:pool.length>10?24:28}px system-ui`;const label=g.title.length>24?g.title.slice(0,23)+'…':g.title;ctx.fillText(label,r-24,8);ctx.restore();});
  ctx.beginPath();ctx.arc(cx,cy,r*.15,0,Math.PI*2);ctx.fillStyle='#0b1020';ctx.fill();ctx.lineWidth=10;ctx.strokeStyle='rgba(255,255,255,.14)';ctx.stroke();ctx.fillStyle='#fff';ctx.font='1000 32px system-ui';ctx.textAlign='center';ctx.fillText('GO',cx,cy+11);
}
function spinWheel(){
  const pool=wheelPool();if(pool.length<2||state.wheel.spinning)return;state.wheel.spinning=true;state.wheel.result=null;const start=performance.now(),duration=4600,startAngle=state.wheel.angle,turns=(6+Math.random()*4)*Math.PI*2,target=startAngle+turns+Math.random()*Math.PI*2;
  const ease=t=>1-Math.pow(1-t,4);function frame(now){const t=Math.min(1,(now-start)/duration);state.wheel.angle=startAngle+(target-startAngle)*ease(t);drawWheel(state.wheel.angle);if(t<1)requestAnimationFrame(frame);else{state.wheel.spinning=false;const step=Math.PI*2/pool.length;let pointer=(-state.wheel.angle)%(Math.PI*2);if(pointer<0)pointer+=Math.PI*2;const idx=Math.floor(pointer/step)%pool.length;state.wheel.result=pool[idx];document.getElementById('wheelResult').innerHTML=winnerHTML(pool[idx]);}}
  requestAnimationFrame(frame);
}

function showGame(id){const g=games.find(x=>x.id===id),p=packInfo(g.pack);gameDialog.innerHTML=`<div class="dialog-inner"><div class="detail-art" ${gameArtStyle(g)}><div class="dialog-head"><div><span class="pack-badge">${packBadge(p)}</span>${g.upcoming?' <span class="status-badge">Upcoming</span>':''}<h2 class="detail-title">${esc(g.title)}</h2></div><button class="close-btn" data-close>×</button></div></div><p class="detail-desc">${esc(g.desc)}</p><div class="detail-grid"><div class="detail-cell"><span>Players</span><b>${playerLabel(g)}</b></div><div class="detail-cell"><span>Release</span><b>${p.year}${g.upcoming?' · Upcoming':''}</b></div><div class="detail-cell"><span>Audience</span><b>${g.audience===null?'TBC':g.audience?'Supported':'Not supported'}</b></div><div class="detail-cell"><span>Extended timers</span><b>${g.extended===null?'TBC':g.extended?'Available':'Not listed'}</b></div></div><div class="field"><label class="title">Interaction</label><div class="range-row">${g.tags.length?g.tags.map(t=>`<span class="tag-chip active">${tagMeta[t].label}</span>`).join(''):'<span class="tag-chip">Other</span>'}</div></div><div class="field"><label class="title">Game style</label><div class="range-row">${g.style.map(s=>`<span class="mini-tag">${esc(s)}</span>`).join('')}</div></div><div class="hero-actions">${!g.upcoming?launchButton(g.pack,p.kind==='standalone'?'Launch Survey Scramble':`Launch ${packBadge(p)}`):''}<button class="ghost" data-fav="${g.id}">${state.favourites.has(g.id)?'★ Favourited':'☆ Add favourite'}</button>${!g.upcoming?`<button class="primary ${state.wheel.games.has(g.id)?'added':''}" data-wheel-add="${g.id}">${state.wheel.games.has(g.id)?'✓ On Wheel':'Add to wheel'}</button>`:''}</div><p class="asset-note">Jackbox Games Picker is an unofficial fan-made tool by Partycipate. Official Jackbox game and pack artwork belongs to Jackbox Games.</p></div>`;if(!gameDialog.open) gameDialog.showModal()}
function showSettings(){settingsDialog.innerHTML=`<div class="dialog-inner"><div class="dialog-head"><div><div class="eyebrow">Preferences</div><h2 style="margin:0">Jackbox Games Picker settings</h2></div><button class="close-btn" data-close>×</button></div>
  <section class="settings-section"><h3>My Jackbox collection</h3><p class="detail-desc">These choices stay in this browser and can be used by Find a Game and the wheel.</p><div class="settings-packs">${packs.filter(p=>p.status==='released').map(p=>`<button class="owned-toggle ${state.owned.has(p.id)?'active':''}" data-owned="${p.id}">${state.owned.has(p.id)?'✓ ':''}${packBadge(p)}</button>`).join('')}</div><button class="ghost" data-clear-owned>Clear owned packs</button></section>
  <section class="settings-section launcher-settings"><div class="settings-title-row"><div><h3>Local launcher</h3><p class="detail-desc">Pair the Windows helper once, then Jackbox Games Picker can open your local Jackbox shortcuts.</p></div><span class="launcher-status ${state.launcher.online?'online':'offline'}">${state.launcher.online?'● Helper online':'● Helper offline'}</span></div>
    <label class="title" for="launcherToken">Pairing token</label><div class="launcher-token-row"><input id="launcherToken" class="launcher-token-input" value="${esc(state.launcher.token)}" placeholder="Paste token from the launcher helper"><button class="primary" data-save-launcher>Save & test</button></div>
    <div class="launcher-note">Helper address: <code>${state.launcher.base}</code>. Keep the helper running while you play.</div>
    ${state.launcher.online&&state.launcher.token?`<div class="launcher-configured"><b>${state.launcher.configured.size}</b> shortcut${state.launcher.configured.size===1?'':'s'} configured</div>`:''}
  </section></div>`;if(!settingsDialog.open)settingsDialog.showModal();refreshLauncherStatus().then(()=>{if(settingsDialog.open){const badge=settingsDialog.querySelector('.launcher-status');if(badge){badge.className=`launcher-status ${state.launcher.online?'online':'offline'}`;badge.textContent=state.launcher.online?'● Helper online':'● Helper offline'}}})}

function resetWheel(){state.wheel={players:null,tags:new Set(),packs:new Set(packs.filter(p=>p.status==='released').map(p=>p.id)),scope:'selected',games:new Set(),explicit:false,match:'any',angle:0,spinning:false,result:null};save();renderWheel()}

// Global click handling
document.addEventListener('click',e=>{
  const b=e.target.closest('button,[data-pack-open]');if(!b)return;
  if(b.dataset.view){setView(b.dataset.view);return}
  if(b.dataset.go){setView(b.dataset.go);return}
  if(b.id==='settingsBtn'||b.id==='manageOwned'){showSettings();return}
  if(b.dataset.close!==undefined){b.closest('dialog').close();return}
  if(b.dataset.homeTag){state.tags=new Set([b.dataset.homeTag]);setView('games');return}
  if(b.dataset.filterTag){const t=b.dataset.filterTag;state.tags.has(t)?state.tags.delete(t):state.tags.add(t);render();return}
  if(b.dataset.filterOwned!==undefined){state.ownedOnly=!state.ownedOnly;render();return}
  if(b.dataset.filterFav!==undefined){state.favOnly=!state.favOnly;render();return}
  if(b.dataset.toggleOwned!==undefined){state.ownedOnly=!state.ownedOnly;render();return}
  if(b.dataset.toggleFav!==undefined){state.favOnly=!state.favOnly;render();return}
  if(b.dataset.clearFilters!==undefined){state.players=null;state.tags.clear();state.match='any';state.ownedOnly=false;state.favOnly=false;render();return}
  if(b.dataset.detail){showGame(b.dataset.detail);return}
  if(b.dataset.fav){state.favourites.has(b.dataset.fav)?state.favourites.delete(b.dataset.fav):state.favourites.add(b.dataset.fav);save();if(gameDialog.open)showGame(b.dataset.fav);else render();return}
  if(b.dataset.owned){const id=packIdFromDataset(b.dataset.owned);state.owned.has(id)?state.owned.delete(id):state.owned.add(id);save();if(settingsDialog.open)showSettings();else render();return}
  if(b.dataset.clearOwned!==undefined){state.owned.clear();save();showSettings();return}
  if(b.dataset.packOpen){state.pack=String(b.dataset.packOpen);setView('games');return}
  if(b.dataset.launchPack){e.stopPropagation();launchPack(String(b.dataset.launchPack));return}
  if(b.dataset.saveLauncher!==undefined){state.launcher.token=(document.getElementById('launcherToken')?.value||'').trim();save();refreshLauncherStatus().then(()=>{showToast(state.launcher.online?'✓ Launcher connected':'Launcher not reachable');showSettings()});return}
  if(b.dataset.wheelAdd){const id=b.dataset.wheelAdd;const g=games.find(x=>x.id===id);const already=state.wheel.games.has(id);state.wheel.games.add(id);state.wheel.explicit=true;state.wheel.packs.add(g.pack);state.wheel.scope='selected';save();showToast(already?`${g.title} is already on the wheel`:`✓ ${g.title} added to wheel`);b.textContent='✓ Added';b.classList.add('added');setTimeout(()=>{if(document.body.contains(b)){b.textContent='✓ On Wheel';b.classList.add('added')}},1400);return}
  if(b.dataset.sendWheel!==undefined){const list=filteredGames().filter(g=>!g.upcoming);state.wheel.games=new Set(list.map(g=>g.id));state.wheel.explicit=true;state.wheel.scope='selected';state.wheel.packs=new Set(list.map(g=>g.pack));state.wheel.players=null;state.wheel.tags.clear();state.wheel.match='any';state.wheel.result=null;save();showToast(`✓ ${list.length} match${list.length===1?'':'es'} sent to wheel`);setView('wheel');return}
  if(b.dataset.wheelTag){const t=b.dataset.wheelTag;state.wheel.tags.has(t)?state.wheel.tags.delete(t):state.wheel.tags.add(t);state.wheel.games.clear();state.wheel.explicit=false;state.wheel.result=null;save();renderWheel();return}
  if(b.dataset.wheelPack){const id=packIdFromDataset(b.dataset.wheelPack);state.wheel.packs.has(id)?state.wheel.packs.delete(id):state.wheel.packs.add(id);state.wheel.games.clear();state.wheel.explicit=false;state.wheel.result=null;save();renderWheel();return}
  if(b.dataset.wheelClearGames!==undefined){state.wheel.games.clear();state.wheel.explicit=false;state.wheel.result=null;save();renderWheel();return}
  if(b.dataset.wheelReset!==undefined){resetWheel();return}
  if(b.id==='spinBtn'||b.dataset.spinAgain!==undefined){spinWheel();return}
  if(b.dataset.removeWinner){state.wheel.games.size?state.wheel.games.delete(b.dataset.removeWinner):state.wheel.games=new Set(wheelPool().filter(g=>g.id!==b.dataset.removeWinner).map(g=>g.id));state.wheel.result=null;save();renderWheel();setTimeout(()=>spinWheel(),100);return}
});

document.addEventListener('input',e=>{
  if(e.target.id==='searchInput'){state.search=e.target.value;renderGames();const n=document.getElementById('searchInput');n.focus();n.setSelectionRange(n.value.length,n.value.length)}
  if(e.target.matches('[data-wheel-game]')){e.target.checked?state.wheel.games.add(e.target.dataset.wheelGame):state.wheel.games.delete(e.target.dataset.wheelGame);state.wheel.explicit=state.wheel.games.size>0;state.wheel.result=null;save();drawWheel()}
});
document.addEventListener('change',e=>{
  if(e.target.id==='homePlayerSelect'){state.players=e.target.value?Number(e.target.value):null;if(state.players!==null)setView('finder')}
  if(e.target.id==='finderPlayerSelect'){state.players=e.target.value?Number(e.target.value):null;render()}
  if(e.target.id==='packSelect'){state.pack=e.target.value;render()}
  if(e.target.id==='playerSelect'){state.players=e.target.value?Number(e.target.value):null;render()}
  if(e.target.id==='matchSelect'){state.match=e.target.value;render()}
  if(e.target.id==='wheelPlayers'){state.wheel.players=e.target.value?Number(e.target.value):null;state.wheel.games.clear();state.wheel.explicit=false;state.wheel.result=null;save();renderWheel()}
  if(e.target.id==='wheelMatch'){state.wheel.match=e.target.value;state.wheel.games.clear();state.wheel.explicit=false;state.wheel.result=null;save();renderWheel()}
  if(e.target.id==='wheelScope'){state.wheel.scope=e.target.value;state.wheel.games.clear();state.wheel.explicit=false;state.wheel.result=null;save();renderWheel()}
});

// Close dialogs on backdrop click
[gameDialog,settingsDialog].forEach(d=>d.addEventListener('click',e=>{if(e.target===d)d.close()}));

window.addEventListener('popstate',e=>{if(!e.state?.partyPicker)return;if(gameDialog.open)gameDialog.close();if(settingsDialog.open)settingsDialog.close();restoreHistorySnapshot(e.state);window.scrollTo({top:0,left:0,behavior:'auto'});render()});

initHistory();
render();
refreshLauncherStatus().then(()=>renderNav());
