/* Home Record Keeper — shared sample data, store and UI helpers for the Spaces flow.
   Example data for Vail Residence. Edits are kept for this browser tab (sessionStorage). */
(function(){
  const FLOORS = [
    {id:'main', name:'Main floor', short:'Main'},
    {id:'upper', name:'Upper floor', short:'Upper'},
    {id:'base', name:'Basement', short:'Basement'},
    {id:'out', name:'Outside', short:'Outside'}
  ];
  const R = p => p ? `assets/rooms/${p}.jpg` : null;

  /* item: [name, model/brand, subspace id or '', category, docs, warranty note] */
  const SEED = [
    {id:'kitchen', name:'Kitchen', floor:'main', photo:R('kitchen'),
      subs:[{id:'island', name:'Island', photo:R('kitchen'), pos:'78% 70%'}, {id:'butlers-pantry', name:"Butler's pantry", photo:null}, {id:'pantry', name:'Pantry', photo:null}],
      items:[['Sub-Zero refrigerator','BI-36UFD','', 'appliance',2,'Through 2028'],['Wolf range','DF366','island','appliance',1,''],['Microwave drawer','Wolf MD24','island','appliance',1,''],
             ['Bosch dishwasher','800 Series','butlers-pantry','appliance',1,'Through 2029'],['Wine fridge','Sub-Zero 424','butlers-pantry','appliance',0,''],['Range hood','Vent-A-Hood','', 'fixture',1,''],
             ['Garbage disposal','InSinkErator Evo','', 'fixture',0,''],['Water filter','Everpure H-300','pantry','system',0,''],['Pull-out shelving','Rev-A-Shelf','pantry','furniture',0,'']]},
    {id:'great-room', name:'Great room', floor:'main', photo:R('great-room'),
      subs:[{id:'fireplace-nook', name:'Fireplace nook', photo:R('great-room'), pos:'20% 50%'}, {id:'reading-corner', name:'Reading corner', photo:null}],
      items:[['Gas fireplace','Mendota FV44','fireplace-nook','system',2,''],['Samsung Frame TV','QN65LS03','', 'electronics',1,''],['Sonos Arc','Soundbar','', 'electronics',0,''],
             ['Ceiling fan','Minka-Aire','', 'fixture',0,''],['Motorized shades','Lutron Serena','reading-corner','fixture',0,'']]},
    {id:'laundry', name:'Laundry', floor:'main', photo:R('laundry'),
      subs:[{id:'mudroom-bench', name:'Mudroom bench', photo:null}],
      items:[['Washer and dryer','LG WM4000','', 'appliance',3,'Through 2027'],['Utility sink','Kohler','', 'fixture',1,'']]},
    {id:'garage', name:'Garage', floor:'main', photo:R('garage'),
      subs:[{id:'storage-bay', name:'Storage bay', photo:R('garage'), pos:'15% 50%'}, {id:'workbench', name:'Workbench', photo:null}],
      items:[['Snowblower','Ariens Deluxe 28','storage-bay','outdoor',1,''],['Ski rack','StoreYourBoard','storage-bay','furniture',0,''],['Garage door opener','LiftMaster 87504','', 'system',1,''],
             ['EV charger','ChargePoint Home Flex','', 'electronics',0,''],['Chest freezer','GE 7 cu ft','', 'appliance',0,''],['Tool chest','Husky 52"','workbench','furniture',0,''],['Air compressor','DeWalt 6 gal','workbench','outdoor',0,'']]},
    {id:'powder-room', name:'Powder room', floor:'main', photo:R('powder-room'), subs:[],
      items:[['Toilet','Toto Drake','', 'fixture',1,'']]},
    {id:'office', name:'Office', floor:'main', photo:R('office'),
      subs:[{id:'office-closet', name:'Closet', photo:null}],
      items:[['Standing desk','Uplift V2','', 'furniture',1,''],['Printer','Brother HL-L3270','', 'electronics',1,''],['Wi-Fi router','Eero Pro 6E','office-closet','electronics',0,'']]},
    {id:'primary-suite', name:'Primary suite', floor:'upper', photo:R('primary-suite'),
      subs:[{id:'walk-in-closet', name:'Walk-in closet', photo:null}, {id:'sitting-area', name:'Sitting area', photo:R('primary-suite'), pos:'85% 60%'}],
      items:[['King bed frame','RH Cloud','', 'furniture',1,''],['Mini split','Mitsubishi MSZ','', 'system',1,'Through 2030'],['Closet system','California Closets','walk-in-closet','furniture',0,''],['Reading chair','Room & Board','sitting-area','furniture',0,'']]},
    {id:'primary-bath', name:'Primary bath', floor:'upper', photo:R('primary-bath'),
      subs:[{id:'shower', name:'Shower', photo:R('primary-bath'), pos:'20% 50%'}, {id:'vanity', name:'Vanity', photo:null}],
      items:[['Steam shower','ThermaSol','shower','system',2,''],['Heated floor','Nuheat','', 'system',1,''],['Double vanity','Kohler','vanity','fixture',0,'']]},
    {id:'guest-bedroom', name:'Guest bedroom', floor:'upper', photo:R('guest-bedroom'), subs:[],
      items:[['Queen bed','Casper','', 'furniture',0,''],['Ceiling fan','Hunter','', 'fixture',0,'']]},
    {id:'bunk-room', name:'Bunk room', floor:'upper', photo:R('bunk-room'), subs:[], items:[]},
    {id:'mechanical-room', name:'Mechanical room', floor:'base', photo:R('mechanical-room'),
      subs:[{id:'furnace-bay', name:'Furnace bay', photo:R('mechanical-room'), pos:'50% 40%'}, {id:'utility-closet', name:'Utility closet', photo:null}],
      items:[['Lennox furnace','SLP99V','furnace-bay','system',3,'Ends Nov 14'],['Whole-house humidifier','Aprilaire 800','furnace-bay','system',1,''],['Rheem water heater','Performance 50 gal','utility-closet','system',2,'Through 2031'],
             ['Water softener','Culligan HE','utility-closet','system',2,''],['Electrical panel','Square D 200A','', 'system',2,''],['Sump pump','Zoeller M53','', 'system',1,'']]},
    {id:'crawl-space', name:'Crawl space', floor:'base', photo:null, subs:[],
      items:[['Vapor barrier','20 mil liner','', 'system',2,'']]},
    {id:'deck-hot-tub', name:'Deck and hot tub', floor:'out', photo:R('deck-hot-tub'),
      subs:[{id:'lower-deck', name:'Lower deck', photo:R('deck-hot-tub'), pos:'50% 60%'}, {id:'upper-deck', name:'Upper deck', photo:null}],
      items:[['Hot tub','Sundance Optima','lower-deck','outdoor',3,''],['Gas grill','Weber Genesis','upper-deck','outdoor',1,''],['Patio heater','Bromic Tungsten','upper-deck','outdoor',0,'']]},
    {id:'driveway', name:'Driveway', floor:'out', photo:R('driveway'), subs:[],
      items:[['Snowmelt boiler','Viessmann Vitodens','', 'system',1,'']]}
  ];
  const seed = () => SEED.map(s => ({...s, subs:s.subs.map(x => ({...x})),
    items:s.items.map((it, n) => ({id:`${s.id}-i${n}`, name:it[0], model:it[1], sub:it[2], cat:it[3], docs:it[4], warranty:it[5]}))}));

  const KEY = 'hrk-spaces-v1';
  function load(){ try { const raw = sessionStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch(_){} return seed(); }
  let spaces = load();
  function save(){ try { sessionStorage.setItem(KEY, JSON.stringify(spaces)); } catch(_){} }

  const slug = s => s.toLowerCase().replace(/['’]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'space';
  const uniq = (base, taken) => { let id = base, n = 2; while (taken.includes(id)) id = `${base}-${n++}`; return id; };
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const store = {
    floors: FLOORS,
    floor: id => FLOORS.find(f => f.id === id) || {id, name:id, short:id},
    all: () => spaces,
    get: id => spaces.find(s => s.id === id),
    docs: s => s.items.reduce((a, i) => a + (i.docs || 0), 0),
    addSpace(data){ const id = uniq(slug(data.name), spaces.map(s => s.id)); spaces.push({id, subs:[], items:[], ...data}); save(); return id; },
    updateSpace(id, data){ Object.assign(this.get(id), data); save(); },
    deleteSpace(id){ spaces = spaces.filter(s => s.id !== id); save(); },
    addSub(sid, data){ const s = this.get(sid); const id = uniq(slug(data.name), s.subs.map(x => x.id)); s.subs.push({id, photo:null, ...data}); save(); return id; },
    updateSub(sid, subId, data){ Object.assign(this.get(sid).subs.find(x => x.id === subId), data); save(); },
    deleteSub(sid, subId){ const s = this.get(sid); s.subs = s.subs.filter(x => x.id !== subId); s.items.forEach(i => { if (i.sub === subId) i.sub = ''; }); save(); },
    addItem(sid, data){ const s = this.get(sid); s.items.unshift({id:`${sid}-i${Date.now()}`, docs:0, warranty:'', model:'', ...data}); save(); },
    deleteItem(sid, itemId){ const s = this.get(sid); s.items = s.items.filter(i => i.id !== itemId); save(); },
    reset(){ spaces = seed(); save(); }
  };

  /* ---------- Icons ---------- */
  const SPRITE = `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></symbol>
  <symbol id="i-right" viewBox="0 0 24 24"><path d="m9 18 6-6-6-6"/></symbol>
  <symbol id="i-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
  <symbol id="i-left" viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></symbol>
  <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></symbol>
  <symbol id="i-x" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></symbol>
  <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>
  <symbol id="i-more" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.1"/><circle cx="12" cy="12" r="1.1"/><circle cx="19" cy="12" r="1.1"/></symbol>
  <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></symbol>
  <symbol id="i-edit" viewBox="0 0 24 24"><path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17v3z"/><path d="m14.5 7.5 3 3"/></symbol>
  <symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5M14 11v5"/></symbol>
  <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/></symbol>
  <symbol id="i-image" viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-5 4 4 3-3 4 4"/></symbol>
  <symbol id="i-upload" viewBox="0 0 24 24"><path d="M12 15V4M7 9l5-5 5 5"/><path d="M4 15v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/></symbol>
  <symbol id="i-layers" viewBox="0 0 24 24"><path d="M12 3 3 8l9 5 9-5z"/><path d="m3 12.5 9 5 9-5M3 17l9 5 9-5"/></symbol>
  <symbol id="i-box" viewBox="0 0 24 24"><path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/></symbol>
  <symbol id="i-file" viewBox="0 0 24 24"><path d="M14 3H6v18h12V7z"/><path d="M14 3v4h4"/></symbol>
  <symbol id="i-sub" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 12h8.5V3.5M12 12v8.5"/></symbol>
  <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8.4 7.5 9.5 4.3-1.1 7.5-4.9 7.5-9.5V6z"/><path d="m9 12 2 2 4-4"/></symbol>
  <symbol id="c-appliance" viewBox="0 0 24 24"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M5 9h14M8 6h1M8 12v3"/></symbol>
  <symbol id="c-fixture" viewBox="0 0 24 24"><path d="M12 3v5M7 8h10l-1.5 5h-7z"/><path d="M12 13v8M9 21h6"/></symbol>
  <symbol id="c-system" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1"/></symbol>
  <symbol id="c-furniture" viewBox="0 0 24 24"><path d="M5 11V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"/><path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3z"/><path d="M5 18v2M19 18v2"/></symbol>
  <symbol id="c-electronics" viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="12" rx="1.5"/><path d="M9 20h6M12 16.5V20"/></symbol>
  <symbol id="c-outdoor" viewBox="0 0 24 24"><path d="M12 3 6 11h3l-4 6h14l-4-6h3z"/><path d="M12 17v4"/></symbol>
</svg>`;
  document.body.insertAdjacentHTML('afterbegin', SPRITE);
  const ico = id => `<svg class="i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const CATS = {appliance:'Appliance', fixture:'Fixture', system:'System', furniture:'Furniture', electronics:'Electronics', outdoor:'Outdoor'};

  /* ---------- Toast ---------- */
  let toastEl;
  function toast(msg){
    if (!toastEl){ toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role','status'); toastEl.hidden = true; toastEl.innerHTML = ico('check') + '<span></span>'; document.body.appendChild(toastEl); }
    toastEl.querySelector('span').textContent = msg; toastEl.hidden = false;
    clearTimeout(toastEl._h); toastEl._h = setTimeout(() => toastEl.hidden = true, 3000);
  }
  /* Message carried to the next page (e.g. after deleting a space) */
  function flashNext(msg){ try { sessionStorage.setItem('hrk-flash', msg); } catch(_){} }
  try { const m = sessionStorage.getItem('hrk-flash'); if (m){ sessionStorage.removeItem('hrk-flash'); setTimeout(() => toast(m), 150); } } catch(_){}

  /* ---------- Dialog helper ---------- */
  function dialog({title, body, ok = 'Save', danger = false, onOk, onOpen, size = ''}){
    const bg = document.createElement('div'); bg.className = 'dlg-bg';
    bg.innerHTML = `<form class="dlg ${size}" role="dialog" aria-modal="true" aria-labelledby="dlgT" novalidate>
      <div class="dlg-h"><h3 id="dlgT">${title}</h3><button type="button" class="ib" data-x aria-label="Close">${ico('x')}</button></div>
      <div class="dlg-b">${body}</div>
      <div class="dlg-f"><button type="button" class="btn" data-x>Cancel</button><button type="submit" class="btn ${danger ? 'red' : 'primary'}">${ok}</button></div>
    </form>`;
    const back = document.activeElement;
    const close = () => { bg.remove(); document.removeEventListener('keydown', onKey); back && back.focus && back.focus(); };
    const onKey = e => { if (e.key === 'Escape') close(); };
    bg.addEventListener('click', e => { if (e.target === bg || e.target.closest('[data-x]')) close(); });
    bg.querySelector('form').addEventListener('submit', e => { e.preventDefault(); if (onOk(bg) !== false) close(); });
    document.addEventListener('keydown', onKey);
    document.body.appendChild(bg);
    onOpen && onOpen(bg);
    (bg.querySelector('input:not([type=file]),select') || bg.querySelector('[type=submit]')).focus();
    return bg;
  }

  /* ---------- Popover menu ---------- */
  let openPop = null;
  function closePop(){ if (openPop){ openPop.btn.setAttribute('aria-expanded','false'); openPop.el.remove(); openPop = null; } }
  function menu(btn, items){
    if (openPop && openPop.btn === btn) return closePop();
    closePop();
    const el = document.createElement('div'); el.className = 'pop'; el.setAttribute('role','menu');
    el.innerHTML = items.map(it => it === '-' ? '<hr>' : `<button type="button" role="menuitem" class="${it.danger ? 'danger' : ''}">${ico(it.icon)}${it.label}</button>`).join('');
    document.body.appendChild(el);
    const r = btn.getBoundingClientRect();
    el.style.top = (r.bottom + scrollY + 4) + 'px';
    el.style.left = Math.max(12, Math.min(r.right + scrollX - el.offsetWidth, innerWidth - el.offsetWidth - 12)) + 'px';
    const acts = items.filter(it => it !== '-');
    el.querySelectorAll('button').forEach((b, n) => b.onclick = () => { closePop(); acts[n].run(); });
    btn.setAttribute('aria-expanded','true');
    openPop = {btn, el};
    el.querySelector('button').focus();
  }
  document.addEventListener('click', e => { if (openPop && !openPop.el.contains(e.target) && e.target.closest('[aria-haspopup]') !== openPop.btn) closePop(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && openPop){ const b = openPop.btn; closePop(); b.focus(); } });

  /* ---------- Photos: downscale so they survive page changes ---------- */
  function readPhoto(file, max = 1200){
    return new Promise((res, rej) => {
      if (!file || !file.type.startsWith('image/')) return rej(new Error('Choose an image file, such as JPG or PNG'));
      const img = new Image(), url = URL.createObjectURL(file);
      img.onload = () => {
        const k = Math.min(1, max / Math.max(img.width, img.height));
        const c = document.createElement('canvas'); c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
        c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
        URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', .82));
      };
      img.onerror = () => rej(new Error("That image couldn't be opened"));
      img.src = url;
    });
  }
  function pickPhoto(){
    return new Promise(res => {
      const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*';
      inp.onchange = () => res(inp.files[0] || null); inp.click();
    });
  }

  /* Thumbnail markup: photo, or watermark + add-photo button */
  function thumb({photo, pos, tag, label, addAttr = '', kebab = ''}){
    return photo
      ? `<span class="thumb"><img src="${esc(photo)}" alt="" loading="lazy" style="object-position:${pos || '50% 50%'}">${tag ? `<span class="tag">${tag}</span>` : ''}${kebab}</span>`
      : `<span class="thumb empty">${tag ? `<span class="tag">${tag}</span>` : ''}<button type="button" class="add-ph" ${addAttr} aria-label="Add a photo of ${esc(label)}"><span class="plus">${ico('plus')}</span><span>Add photo</span></button>${kebab}</span>`;
  }

  /* Space edit/add dialog shared by both pages */
  function spaceDialog({space = null, floor: defFloor = 'main', onSaved}){
    let photo = space ? space.photo : null;
    const opts = FLOORS.map(f => `<option value="${f.id}" ${(space ? space.floor : defFloor) === f.id ? 'selected' : ''}>${f.name}</option>`).join('');
    dialog({
      title: space ? `Edit ${esc(space.name)}` : 'Add space',
      ok: space ? 'Save changes' : 'Add space',
      body: `
        <div class="field"><label for="spName">Space name<span class="req">*</span></label>
          <div class="ctl"><input id="spName" maxlength="40" value="${space ? esc(space.name) : ''}" placeholder="e.g. Kitchen"></div>
          <span class="msg" hidden>Enter a name for the space.</span></div>
        <div class="field"><label for="spFloor">Floor</label><div class="ctl sel"><select id="spFloor">${opts}</select></div></div>
        <div class="field"><span class="lab">Photo</span>
          <div class="photo-pick"><span class="pv" id="spPv"></span>
            <span class="acts"><button type="button" class="btn" id="spPick">${ico('upload')}<span>Upload</span></button><button type="button" class="btn" id="spDrop">${ico('trash')}Remove</button></span></div>
          <span class="help">A clear, wide photo helps people recognise the space at a glance.</span></div>`,
      onOpen(bg){
        const draw = () => {
          bg.querySelector('#spPv').innerHTML = photo ? `<img src="${esc(photo)}" alt="" style="object-position:${space && space.pos || '50% 50%'}">` : ico('image');
          bg.querySelector('#spPick span').textContent = photo ? 'Replace' : 'Upload';
          bg.querySelector('#spDrop').hidden = !photo;
        };
        draw();
        bg.querySelector('#spPick').onclick = async () => { const f = await pickPhoto(); if (!f) return; try { photo = await readPhoto(f); draw(); } catch(err){ toast(err.message); } };
        bg.querySelector('#spDrop').onclick = () => { photo = null; draw(); };
      },
      onOk(bg){
        const name = bg.querySelector('#spName').value.trim();
        const f = bg.querySelector('#spName').closest('.field');
        f.classList.toggle('err', !name); f.querySelector('.msg').hidden = !!name;
        if (!name){ bg.querySelector('#spName').focus(); return false; }
        const data = {name, floor: bg.querySelector('#spFloor').value, photo};
        if (space){ store.updateSpace(space.id, data); onSaved && onSaved(space.id); toast(`${name} updated`); }
        else { const id = store.addSpace(data); onSaved && onSaved(id); toast(`${name} added`); }
      }
    });
  }

  function deleteSpaceDialog(space, onDone){
    const docs = store.docs(space), n = space.items.length;
    dialog({
      title: `Delete ${esc(space.name)}?`, ok: 'Delete space', danger: true, size: 'sm',
      body: `<p>This removes <b>${esc(space.name)}</b>${space.subs.length ? ` and its ${plural(space.subs.length, 'subspace')}` : ''} from Vail Residence.</p>
             ${n ? `<p>Its ${plural(n, 'item')} and ${plural(docs, 'document')} move to <b>Unassigned</b>, so nothing is lost.</p>` : ''}`,
      onOk(){ store.deleteSpace(space.id); onDone && onDone(); }
    });
  }

  window.HRK = {store, ico, esc, plural, toast, flashNext, dialog, menu, closePop, readPhoto, pickPhoto, thumb, spaceDialog, deleteSpaceDialog, CATS};
})();
