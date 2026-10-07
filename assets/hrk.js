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
  /* Item photos (Unsplash placeholders); items without one show an add-photo tile */
  const ITEM_PHOTOS = {
    'Sub-Zero refrigerator':'refrigerator', 'Wolf range':'range', 'Microwave drawer':'microwave', 'Bosch dishwasher':'dishwasher',
    'Wine fridge':'wine-fridge', 'Garbage disposal':'sink', 'Water filter':'water-filter', 'Gas fireplace':'fireplace',
    'Samsung Frame TV':'tv', 'Motorized shades':'shades', 'Washer and dryer':'washer-dryer', 'Snowblower':'snowblower',
    'Ski rack':'ski-rack', 'Garage door opener':'garage-door', 'EV charger':'ev-charger', 'Toilet':'toilet', 'Standing desk':'desk',
    'Printer':'printer', 'Wi-Fi router':'router', 'King bed frame':'king-bed', 'Closet system':'closet', 'Reading chair':'chair',
    'Steam shower':'shower', 'Heated floor':'heated-floor', 'Double vanity':'vanity', 'Queen bed':'queen-bed',
    'Lennox furnace':'furnace', 'Rheem water heater':'water-heater', 'Sump pump':'sump-pump', 'Hot tub':'hot-tub',
    'Gas grill':'grill', 'Patio heater':'patio-heater'
  };
  const itemPhoto = (space, name) => {
    if (name === 'Ceiling fan') return `assets/items/${space === 'guest-bedroom' ? 'ceiling-fan-2' : 'ceiling-fan'}.jpg`;
    return ITEM_PHOTOS[name] ? `assets/items/${ITEM_PHOTOS[name]}.jpg` : null;
  };
  const seed = () => SEED.map(s => ({...s, subs:s.subs.map(x => ({...x})),
    items:s.items.map((it, n) => ({id:`${s.id}-i${n}`, name:it[0], model:it[1], sub:it[2], cat:it[3], docs:it[4], warranty:it[5], photo:itemPhoto(s.id, it[0])}))}));

  const KEY = 'hrk-spaces-v2';
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
    updateItem(sid, itemId, data){ Object.assign(this.get(sid).items.find(i => i.id === itemId), data); save(); },
    addItem(sid, data){ const s = this.get(sid); s.items.unshift({id:`${sid}-i${Date.now()}`, docs:0, warranty:'', model:'', ...data}); save(); },
    /* Update an item and move it to another space if needed (keeps its id, docs and history) */
    moveItem(fromSid, itemId, toSid, data){
      const from = this.get(fromSid), it = from.items.find(i => i.id === itemId), oldName = it.name;
      Object.assign(it, data);
      /* documents point at an item by space + name, so keep them attached */
      docData.docs.forEach(d => { if (d.type === 'item' && d.space === fromSid && d.item === oldName){ d.space = toSid; d.item = it.name; } }); saveDocs();
      if (toSid !== fromSid){ from.items = from.items.filter(i => i !== it); this.get(toSid).items.unshift(it); }
      save();
    },
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
  <symbol id="i-folder" viewBox="0 0 24 24"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.2l2 2.2h8.8A1.5 1.5 0 0 1 21 8.7v9.8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/></symbol>
  <symbol id="i-folder-plus" viewBox="0 0 24 24"><path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.2l2 2.2h8.8A1.5 1.5 0 0 1 21 8.7v9.8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 18.5z"/><path d="M12 10.5v6M9 13.5h6"/></symbol>
  <symbol id="i-repeat" viewBox="0 0 24 24"><path d="M4 9h13l-3-3M20 15H7l3 3"/></symbol>
  <symbol id="i-cal" viewBox="0 0 24 24"><rect x="4" y="5.5" width="16" height="14.5" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/></symbol>
  <symbol id="i-checklist" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="m8.5 12 2.5 2.5 4.5-5"/></symbol>
  <symbol id="i-template" viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="2"/><path d="M3.5 9h17M9 9v11.5"/></symbol>
  <symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/></symbol>
  <symbol id="i-undo" viewBox="0 0 24 24"><path d="M9 7 4 12l5 5"/><path d="M4 12h11a5 5 0 0 1 0 10h-2"/></symbol>
  <symbol id="i-pulse" viewBox="0 0 24 24"><path d="M3 12h4l2.5-6 5 12 2.5-6h4"/></symbol>
  <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.8"/><path d="M4.5 20a7.5 7.5 0 0 1 15 0"/></symbol>
  <symbol id="i-useradd" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M19 8v6M16 11h6"/></symbol>
  <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/></symbol>
  <symbol id="i-send" viewBox="0 0 24 24"><path d="M21 3 10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></symbol>
  <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/></symbol>
  <symbol id="i-minus-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M8.5 12h7"/></symbol>
  <symbol id="i-alert" viewBox="0 0 24 24"><path d="M12 4 2.8 19.5h18.4z"/><path d="M12 10v4.5M12 17.2v.1"/></symbol>
  <symbol id="i-alarm" viewBox="0 0 24 24"><circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2.5 1.5M4.5 5.5 7 3.5M19.5 5.5 17 3.5M7 19.5l-1.5 1.5M17 19.5l1.5 1.5"/></symbol>
  <symbol id="i-wrench" viewBox="0 0 24 24"><path d="M14.5 6.5a4 4 0 0 0 5.2 5.2L12 19.4a2.1 2.1 0 0 1-3-3l7.7-7.7"/><path d="M14.5 6.5 17 4l3 3-2.5 2.5"/></symbol>
  <symbol id="i-check-circle" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.2 2.3 2.3 4.7-4.8"/></symbol>
  <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.1"/></symbol>
  <symbol id="i-sparkle" viewBox="0 0 24 24"><path d="M12 3.5 13.9 9a1.6 1.6 0 0 0 1.1 1.1l5.5 1.9-5.5 1.9a1.6 1.6 0 0 0-1.1 1.1L12 20.5 10.1 15a1.6 1.6 0 0 0-1.1-1.1L3.5 12 9 10.1A1.6 1.6 0 0 0 10.1 9z"/><path d="M19 3v3M17.5 4.5h3"/></symbol>
  <symbol id="i-sys-wrench" viewBox="0 0 24 24"><path d="M14.7 6.3a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.7-7.7z"/><path d="M14.7 6.3 17.5 3.5l3 3-2.8 2.8"/><circle cx="10.5" cy="17.5" r=".6"/></symbol>
  <symbol id="i-sys-bolt" viewBox="0 0 24 24"><path d="M13 2.5 4.5 13.5H12l-1 8 8.5-11H12z"/></symbol>
  <symbol id="i-sys-appliance" viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="18" rx="1.5"/><path d="M3 10h8M8.5 6v2M8.5 12.5v3"/><rect x="13" y="7" width="8" height="14" rx="1.5"/><circle cx="17" cy="15" r="2.6"/><path d="M15 9.6h.01M17 9.6h.01"/></symbol>
  <symbol id="i-sys-monitor" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M12 16v4M8 20h8"/></symbol>
  <symbol id="i-sys-house" viewBox="0 0 24 24"><path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"/><rect x="10" y="12" width="4" height="4" rx=".5"/></symbol>
  <symbol id="i-sys-bulb" viewBox="0 0 24 24"><path d="M9 17.5h6M10 21h4"/><path d="M12 6a5 5 0 0 0-3 9c.6.5 1 1.3 1 2.5h4c0-1.2.4-2 1-2.5a5 5 0 0 0-3-9z"/><path d="M12 1.5V3M4.2 4.7l1 1M19.8 4.7l-1 1M2 11h1.5M20.5 11H22"/></symbol>
  <symbol id="i-sys-car" viewBox="0 0 24 24"><path d="M3.5 16.5V12l2.2-5a1.6 1.6 0 0 1 1.5-1h9.6a1.6 1.6 0 0 1 1.5 1l2.2 5v4.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1z"/><path d="M3.5 12h17"/><circle cx="7.5" cy="14.8" r=".9"/><circle cx="16.5" cy="14.8" r=".9"/><path d="M6 17.5V19M18 17.5V19"/></symbol>
  <symbol id="i-sys-siren" viewBox="0 0 24 24"><path d="M7 18v-5a5 5 0 0 1 10 0v5"/><path d="M4.5 18h15v3h-15z"/><path d="M12 3v2M4.4 6.4l1.4 1.4M19.6 6.4l-1.4 1.4M2.5 13H4M20 13h1.5"/><path d="M10.5 13a1.5 1.5 0 0 1 1.5-1.5"/></symbol>
  <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 0 0 5.2 5.2l1.4-2.1 4.2 1.6V17a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2z"/></symbol>
  <symbol id="i-camera" viewBox="0 0 24 24"><path d="M4 7.5h3l1.6-2.5h6.8L17 7.5h3a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.2" r="3.6"/></symbol>
  <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M15.5 4.8a3.5 3.5 0 0 1 0 6.4M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/></symbol>
  <symbol id="i-link" viewBox="0 0 24 24"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3A4.5 4.5 0 0 0 13 4.6l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3A4.5 4.5 0 0 0 11 19.4l1-1"/></symbol>
  <symbol id="i-home" viewBox="0 0 24 24"><path d="M3.5 10.5 12 3.5l8.5 7"/><path d="M5.5 9v11h13V9"/><path d="M10 20v-5.5h4V20"/></symbol>
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
      body: `<p>This removes <b>${esc(space.name)}</b>${space.subs.length ? ` and its ${plural(space.subs.length, 'sub-space')}` : ''} from Vail Residence.</p>
             ${n ? `<p>Its ${plural(n, 'item')} and ${plural(docs, 'document')} move to <b>Unassigned</b>, so nothing is lost.</p>` : ''}`,
      onOk(){ store.deleteSpace(space.id); onDone && onDone(); }
    });
  }

  /* ---------- Documents ----------
     Two types: item documents (linked to an item in a space) and property documents.
     Each type has folders; every document lives in one folder. */
  const DOC_FOLDERS = {
    item: ['Invoices', 'Manuals', 'Warranties', 'Estimates', 'Media', 'Other'],
    property: ['Legal', 'Insurance', 'Tax', 'Permit']
  };
  /* [name, type, folder, date (ISO), size KB, space id, item name, thumbnail] */
  const DOC_SEED = [
    ['Lennox furnace warranty.pdf','item','Warranties','2026-10-06',1240,'mechanical-room','Lennox furnace'],
    ['Homeowners policy 2026–27.pdf','property','Insurance','2026-10-07',2310],
    ['Furnace service invoice.pdf','item','Invoices','2026-10-07',240,'mechanical-room','Lennox furnace'],
    ['Warranty deed, 123 Alpine Dr.pdf','property','Legal','2026-09-30',880],
    ['Sub-Zero BI-36 use and care.pdf','item','Manuals','2026-09-28',4810,'kitchen','Sub-Zero refrigerator'],
    ['Hot tub cover receipt.jpg','item','Invoices','2026-09-22',3100,'deck-hot-tub','Hot tub','assets/items/hot-tub.jpg'],
    ['Home contents inventory.xlsx','property','Insurance','2026-09-18',96],
    ['HOA covenants and rules.docx','property','Legal','2026-09-10',412],
    ['Deck re-stain permit B26-0418.pdf','property','Permit','2026-08-30',610],
    ['Bosch dishwasher warranty.pdf','item','Warranties','2026-08-26',880,'kitchen','Bosch dishwasher'],
    ['Wolf range manual.pdf','item','Manuals','2026-07-14',6200,'kitchen','Wolf range'],
    ['Rheem water heater warranty.pdf','item','Warranties','2026-06-02',520,'mechanical-room','Rheem water heater'],
    ['Washer and dryer receipt.pdf','item','Invoices','2026-05-19',180,'laundry','Washer and dryer'],
    ['2026 property tax statement.pdf','property','Tax','2026-04-15',330],
    ['Flood insurance declaration.pdf','property','Insurance','2026-03-02',290],
    ['Snowblower manual.pdf','item','Manuals','2026-01-11',3400,'garage','Snowblower'],
    ['2025 property tax receipt.pdf','property','Tax','2025-12-01',150],
    ['Hot tub owner\'s manual.pdf','item','Manuals','2025-11-03',7800,'deck-hot-tub','Hot tub'],
    ['Survey and plat map.pdf','property','Legal','2025-08-12',2050],
    ['Gas grill invoice.pdf','item','Invoices','2025-06-21',120,'deck-hot-tub','Gas grill']
  ];
  const docSeed = () => ({
    folders: {item:[...DOC_FOLDERS.item], property:[...DOC_FOLDERS.property]},
    docs: DOC_SEED.map((d, n) => ({id:'d' + n, name:d[0], type:d[1], folder:d[2], date:d[3], size:d[4], space:d[5] || '', item:d[6] || '', thumb:d[7] || null}))
  });
  const DKEY = 'hrk-docs-v2';
  let docData = (() => { try { const raw = sessionStorage.getItem(DKEY); if (raw) return JSON.parse(raw); } catch(_){} return docSeed(); })();
  const saveDocs = () => { try { sessionStorage.setItem(DKEY, JSON.stringify(docData)); } catch(_){} };

  const docs = {
    TYPES: {item:'Item documents', property:'Property documents'},
    all: () => docData.docs,
    recent: n => [...docData.docs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, n),
    folders: type => docData.folders[type],
    inFolder: (type, folder) => docData.docs.filter(d => d.type === type && d.folder === folder).sort((a, b) => b.date.localeCompare(a.date)),
    get: id => docData.docs.find(d => d.id === id),
    add(data){ const d = {id:'d' + Date.now() + Math.random().toString(36).slice(2, 6), date:new Date().toISOString().slice(0, 10), size:0, space:'', item:'', thumb:null, ...data}; docData.docs.unshift(d); saveDocs(); return d; },
    update(id, data){ Object.assign(this.get(id), data); saveDocs(); },
    remove(id){ docData.docs = docData.docs.filter(d => d.id !== id); saveDocs(); },
    addFolder(type, name){ if (!docData.folders[type].includes(name)) docData.folders[type].push(name); saveDocs(); },
    renameFolder(type, from, to){ const f = docData.folders[type]; f[f.indexOf(from)] = to; docData.docs.forEach(d => { if (d.type === type && d.folder === from) d.folder = to; }); saveDocs(); },
    removeFolder(type, name){ docData.folders[type] = docData.folders[type].filter(f => f !== name); docData.docs = docData.docs.filter(d => !(d.type === type && d.folder === name)); saveDocs(); },
    /* Where an item document lives: space › sub-space › item */
    where(d){
      if (d.type !== 'item') return {path:['Vail Residence'], label:'Vail Residence'};
      const s = store.get(d.space); if (!s) return {path:[d.item || 'Item'], label:d.item || 'Item'};
      const it = s.items.find(i => i.name === d.item);
      const sub = it && it.sub ? (s.subs.find(x => x.id === it.sub) || {}).name : '';
      const path = [s.name, sub, d.item].filter(Boolean);
      return {path, label:path.join(' › ')};
    },
    /* Every item, grouped by "Space › Sub-space", for pickers */
    itemGroups(){
      const g = {};
      store.all().forEach(s => s.items.forEach(i => {
        const sub = i.sub ? (s.subs.find(x => x.id === i.sub) || {}).name : '';
        (g[[s.name, sub].filter(Boolean).join(' › ')] ||= []).push({space:s.id, name:i.name});
      }));
      return g;
    },
    fmtDate(iso){ const d = new Date(iso + 'T12:00:00'); const now = new Date(); return d.toLocaleDateString('en-US', d.getFullYear() === now.getFullYear() ? {month:'short', day:'numeric'} : {month:'short', day:'numeric', year:'numeric'}); },
    fmtSize(kb){ return kb >= 1024 ? (kb / 1024).toFixed(1).replace(/\.0$/, '') + ' MB' : Math.max(1, Math.round(kb)) + ' KB'; },
    reset(){ docData = docSeed(); saveDocs(); }
  };
  const ext = n => (n.split('.').pop() || '').toLowerCase();
  /* File-type icon in the format's own colour; photos show their thumbnail */
  function fileIcon(d, big){
    const f = ext(d.name), cls = big ? 'ficon big' : 'ficon';
    if ((f === 'jpg' || f === 'jpeg' || f === 'png' || f === 'heic') && d.thumb) return `<span class="${cls} ficon-img"><img src="${esc(d.thumb)}" alt=""><b>${f.toUpperCase()}</b></span>`;
    return `<span class="${cls} f-${f}"><svg viewBox="0 0 32 40" aria-hidden="true"><path d="M3 2h18l8 8v26a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" class="pg"/><path d="M21 2v6a2 2 0 0 0 2 2h6" class="fold"/></svg><b>${f.toUpperCase()}</b></span>`;
  }

  /* ---------- Checklists ----------
     A checklist can come from a template (e.g. "Monthly routine") or be custom.
     Status is active until the owner completes it; completed ones can be reopened. */
  const today = () => new Date().toISOString().slice(0, 10);
  const daysAgo = n => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0, 10); };
  const CL_SEED = () => {
    const tpl = (id, name, cadence, tasks) => ({id, name, cadence, tasks});
    const t = (text, doneAt) => ({id:'t' + Math.random().toString(36).slice(2, 9), text, done:!!doneAt, doneAt:doneAt || null});
    return {
      templates: [
        tpl('monthly-routine', 'Monthly routine', 'Monthly', ['Replace batteries in all four outdoor cameras', 'Put sleds back up into attic over garage', 'Clean grill and reinstall cover']),
        tpl('seasonal-fall', 'Seasonal: fall', 'Seasonal', ['Blow out irrigation lines', 'Drain exterior hose bibs', 'Install heat tape on north gutters', 'Service snowblower', 'Check attic insulation depth', 'Stake driveway edges']),
        tpl('seasonal-spring', 'Seasonal: spring', 'Seasonal', ['Open hot tub', 'Pull driveway stakes', 'Service air conditioning']),
        tpl('quarterly-inspection', 'Quarterly inspection', 'Quarterly', ['Test smoke and CO detectors', 'Check under-sink supply lines', 'Inspect window seals'])
      ],
      checklists: [
        {id:'routine-work', name:'Routine work', template:'monthly-routine', created:'2026-09-30', status:'active',
          tasks:[t('Replace batteries in all four outdoor cameras', today()), t('Put sleds back up into attic over garage', daysAgo(1)), t('Clean grill and reinstall cover')]},
        {id:'winterization', name:'Winterization', template:'seasonal-fall', created:'2026-10-06', status:'active',
          tasks:['Blow out irrigation lines', 'Drain exterior hose bibs', 'Install heat tape on north gutters', 'Service snowblower', 'Check attic insulation depth', 'Stake driveway edges'].map(x => t(x))},
        {id:'crawl-space', name:'Crawl space maintenance', template:null, created:'2026-09-12', status:'active',
          tasks:[t('Inspect vapor barrier seams'), t('Check sump pump float'), t('Look for rodent activity')]},
        {id:'main-floor', name:'Main floor inspection', template:'quarterly-inspection', created:'2026-09-28', status:'active',
          tasks:[t('Test smoke and CO detectors', '2026-10-02'), t('Check under-sink supply lines', '2026-10-02'), t('Inspect window seals', '2026-10-02')]},
        {id:'gas-leak', name:'Gas leak on side of house', template:null, created:'2026-08-31', status:'completed', completed:'2026-09-01',
          tasks:[t('Gas company inspection', '2026-09-01')]},
        {id:'summer-routine', name:'August routine', template:'monthly-routine', created:'2026-08-01', status:'completed', completed:'2026-08-29',
          tasks:[t('Replace batteries in all four outdoor cameras', '2026-08-12'), t('Put sleds back up into attic over garage', '2026-08-20'), t('Clean grill and reinstall cover', '2026-08-29')]},
        {id:'deck-prep', name:'Deck re-stain prep', template:null, created:'2026-08-14', status:'completed', completed:'2026-08-22',
          tasks:[t('Power wash deck boards', '2026-08-18'), t('Replace two cracked boards', '2026-08-20'), t('Tape off hot tub surround', '2026-08-22')]},
        {id:'spring-opening', name:'Spring opening', template:'seasonal-spring', created:'2026-04-20', status:'completed', completed:'2026-05-02',
          tasks:[t('Open hot tub', '2026-05-02'), t('Pull driveway stakes', '2026-05-02'), t('Service air conditioning', '2026-04-28')]}
      ]
    };
  };
  const CKEY = 'hrk-checklists-v1';
  let clData = (() => { try { const raw = sessionStorage.getItem(CKEY); if (raw) return JSON.parse(raw); } catch(_){} return CL_SEED(); })();
  const saveCl = () => { try { sessionStorage.setItem(CKEY, JSON.stringify(clData)); } catch(_){} };
  clData.checklists.forEach(c => { if (c.status === 'active' && c.tasks.length && c.tasks.every(t => t.done)){ c.status = 'completed'; c.completed = c.tasks.reduce((m, t) => t.doneAt > m ? t.doneAt : m, ''); } });
  saveCl();  /* pin generated task ids so every page in this tab sees the same ones */
  const newId = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  const checklists = {
    all: () => clData.checklists,
    active: () => clData.checklists.filter(c => c.status === 'active').sort((a, b) => b.created.localeCompare(a.created)),
    completed: () => clData.checklists.filter(c => c.status === 'completed').sort((a, b) => (b.completed || '').localeCompare(a.completed || '')),
    get: id => clData.checklists.find(c => c.id === id),
    templates: () => clData.templates,
    template: id => clData.templates.find(t => t.id === id),
    progress: c => ({done: c.tasks.filter(t => t.done).length, total: c.tasks.length}),
    source: c => { const tp = c.template && clData.templates.find(t => t.id === c.template); return tp ? tp.name : 'Custom'; },
    usage: tid => clData.checklists.filter(c => c.template === tid).length,
    create({name, template = null, tasks = []}){
      const c = {id:newId('c'), name, template, created:today(), status:'active', tasks:tasks.map(text => ({id:newId('t'), text, done:false, doneAt:null}))};
      clData.checklists.unshift(c); saveCl(); return c;
    },
    update(id, data){ Object.assign(this.get(id), data); saveCl(); },
    remove(id){ clData.checklists = clData.checklists.filter(c => c.id !== id); saveCl(); },
    /* Returns true when this tick finished the checklist (it then moves to Completed) */
    toggle(id, taskId, done){ const c = this.get(id), t = c.tasks.find(x => x.id === taskId); t.done = done; t.doneAt = done ? today() : null;
      const finished = done && c.status === 'active' && c.tasks.length && c.tasks.every(x => x.done);
      if (finished){ c.status = 'completed'; c.completed = today(); }
      saveCl(); return finished; },
    addTask(id, text){ this.get(id).tasks.push({id:newId('t'), text, done:false, doneAt:null}); saveCl(); },
    editTask(id, taskId, text){ this.get(id).tasks.find(x => x.id === taskId).text = text; saveCl(); },
    removeTask(id, taskId){ const c = this.get(id); c.tasks = c.tasks.filter(x => x.id !== taskId); saveCl(); },
    complete(id){ Object.assign(this.get(id), {status:'completed', completed:today()}); saveCl(); },
    reopen(id){ const c = this.get(id); c.status = 'active'; delete c.completed; saveCl(); },
    addTemplate({name, cadence = 'One-time', tasks = []}){ const tp = {id:newId('tpl'), name, cadence, tasks}; clData.templates.push(tp); saveCl(); return tp; },
    updateTemplate(id, data){ Object.assign(this.template(id), data); saveCl(); },
    removeTemplate(id){ clData.templates = clData.templates.filter(t => t.id !== id); clData.checklists.forEach(c => { if (c.template === id) c.template = null; }); saveCl(); },
    fmtDate(iso){ return docs.fmtDate(iso); },
    checkedLabel(iso){ if (!iso) return ''; if (iso === today()) return 'Checked today'; if (iso === daysAgo(1)) return 'Checked yesterday'; return 'Checked ' + docs.fmtDate(iso); },
    reset(){ clData = CL_SEED(); saveCl(); }
  };
  /* Keep the top-nav badge in step with the number of active checklists */
  document.querySelectorAll('.nav a .nav-n').forEach(n => { n.textContent = checklists.active().length; });

  /* ---------- Activity ----------
     A shared feed. Seeded with recent history; actions taken in the prototype are logged as "You". */
  const svgUri = s => 'data:image/svg+xml,' + encodeURIComponent(s);
  const PEOPLE = {
    brady: {name:'Brady Ricci', short:'You', avatar:'assets/avatar-brady.png'},
    alice: {name:'Alice Johnson', short:'Alice Johnson', avatar:svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#EADBC8"/><path d="M9 30c0-11 4-20 11-20s11 9 11 20z" fill="#5A3A26"/><path d="M6 40c1-7 7-10 14-10s13 3 14 10z" fill="#5E8C6A"/><ellipse cx="20" cy="19" rx="7" ry="8" fill="#EDBE9C"/><path d="M12.5 19c0-6 3.5-9.5 7.5-9.5s7.5 3.5 7.5 9.5c-2-3-4.5-4.5-7.5-5.5-2 2-5 4-7.5 5.5z" fill="#5A3A26"/></svg>')},
    michael: {name:'Michael Brown', short:'Michael Brown', avatar:svgUri('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#D5E0EC"/><path d="M6 40c1-7 7-10 14-10s13 3 14 10z" fill="#3E5878"/><ellipse cx="20" cy="19" rx="7" ry="8" fill="#C48B63"/><path d="M13 22c0 5 3 8 7 8s7-3 7-8c-1 2-3 3-7 3s-6-1-7-3z" fill="#2E241D"/><path d="M12.8 18c-.5-6 3-9 7.2-9s7.8 3 7.2 9c-1-2.5-3.5-4-7.2-4s-6.2 1.5-7.2 4z" fill="#2E241D"/></svg>')},
    hrk: {name:'Home Record Keeper', short:'Home Record Keeper', avatar:'assets/logo-mark.png', logo:true}
  };
  const ACT_TYPES = {document:'Documents', checklist:'Checklists', space:'Spaces', access:'Access', property:'Property'};
  const at = (days, hm) => { const d = new Date(); d.setDate(d.getDate() - days); const [hh, mm] = hm.split(':'); d.setHours(+hh, +mm, 0, 0); return d.toISOString(); };
  /* [days ago, time, who, type, verb, target, context] */
  const ACT_SEED = [
    [0,'14:14','brady','checklist','checked off','Replace batteries in all four outdoor cameras','Routine work'],
    [0,'11:02','alice','document','uploaded','Furnace service invoice.pdf','Item documents › Invoices'],
    [1,'17:40','brady','checklist','checked off','Put sleds back up into attic over garage','Routine work'],
    [1,'09:15','hrk','checklist','assigned','Winterization','6 tasks'],
    [2,'16:48','michael','document','viewed','Homeowners policy 2026–27.pdf','Property documents › Insurance'],
    [3,'20:30','brady','access','shared access with','alex@gmail.com','Viewer · until Nov 6'],
    [4,'13:12','alice','space','added','Hot tub','Deck and hot tub › Lower deck'],
    [5,'10:05','brady','checklist','completed','Main floor inspection','3 tasks'],
    [6,'15:20','brady','document','uploaded','Lennox furnace warranty.pdf','Item documents › Warranties'],
    [8,'09:02','brady','property','updated','property details','Bathrooms changed to 2'],
    [10,'18:22','brady','access',"changed the role of",'Michael Brown','Editor → Viewer'],
    [12,'12:40','alice','space','added a photo to','Laundry','Main floor'],
    [15,'08:55','brady','checklist','created','Crawl space maintenance','Custom · 3 tasks'],
    [19,'14:31','alice','document','uploaded','Sub-Zero BI-36 use and care.pdf','Item documents › Manual'],
    [23,'19:10','michael','document','viewed','Warranty deed, 123 Alpine Dr.pdf','Property documents › Legal'],
    [27,'10:47','brady','space','added','Coffee bar','Kitchen'],
    [34,'16:05','hrk','checklist','assigned','Quarterly inspection','Template'],
    [38,'11:20','brady','document','deleted','Old dryer receipt.pdf','Item documents › Invoices'],
    [46,'09:33','alice','checklist','completed','August routine','3 tasks'],
    [53,'15:58','brady','access','shared access with','Alice Johnson','Editor · until Nov 6'],
    [61,'13:14','brady','document','uploaded','Survey and plat map.pdf','Property documents › Legal'],
    [75,'10:00','brady','property','added a cover photo to','Vail Residence','Property details'],
    [96,'17:26','alice','checklist','completed','Spring opening','3 tasks'],
    [118,'09:41','brady','property','created','Vail Residence','9 properties in your account']
  ];
  const AKEY = 'hrk-activity-v1';
  let actData = (() => { try { const raw = sessionStorage.getItem(AKEY); if (raw) return JSON.parse(raw); } catch(_){} return ACT_SEED.map((a, i) => ({id:'a' + i, at:at(a[0], a[1]), who:a[2], type:a[3], verb:a[4], target:a[5], context:a[6] || ''})); })();
  const saveAct = () => { try { sessionStorage.setItem(AKEY, JSON.stringify(actData)); } catch(_){} };
  saveAct();
  const activity = {
    PEOPLE, TYPES: ACT_TYPES,
    all: () => [...actData].sort((a, b) => b.at.localeCompare(a.at)),
    log(e){ actData.push({id:'a' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), at:new Date().toISOString(), who:'brady', context:'', ...e}); saveAct(); },
    dayLabel(iso){
      const d = new Date(iso), t = new Date(); const strip = x => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
      const diff = Math.round((strip(t) - strip(d)) / 864e5);
      if (diff === 0) return 'Today'; if (diff === 1) return 'Yesterday';
      return d.toLocaleDateString('en-US', d.getFullYear() === t.getFullYear() ? {weekday:'long', month:'short', day:'numeric'} : {weekday:'short', month:'short', day:'numeric', year:'numeric'});
    },
    time: iso => new Date(iso).toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit'}),
    reset(){ actData = []; saveAct(); }
  };

  /* Log actions taken in the prototype */
  const wrap = (obj, fn, after) => { const orig = obj[fn].bind(obj); obj[fn] = (...args) => { const before = after.pre ? after.pre(...args) : null; const r = orig(...args); try { after(r, args, before); } catch(_){} return r; }; };
  wrap(docs, 'add', d => activity.log({type:'document', verb:'uploaded', target:d.name, context:`${docs.TYPES[d.type]} › ${d.folder}`}));
  { const f = (r, a, d) => d && activity.log({type:'document', verb:'deleted', target:d.name, context:`${docs.TYPES[d.type]} › ${d.folder}`}); f.pre = id => ({...docs.get(id)}); wrap(docs, 'remove', f); }
  wrap(checklists, 'create', c => activity.log({type:'checklist', verb:'created', target:c.name, context:`${checklists.source(c)} · ${plural(c.tasks.length, 'task')}`}));
  wrap(checklists, 'toggle', (finished, [id, taskId, done]) => {
    const c = checklists.get(id); if (!c || !done) return;
    activity.log({type:'checklist', verb:'checked off', target:(c.tasks.find(t => t.id === taskId) || {}).text || 'a task', context:c.name});
    if (finished) activity.log({type:'checklist', verb:'completed', target:c.name, context:plural(c.tasks.length, 'task')});
  });
  { const f = (r, a, c) => c && activity.log({type:'checklist', verb:'deleted', target:c.name}); f.pre = id => ({...checklists.get(id)}); wrap(checklists, 'remove', f); }
  wrap(store, 'addSpace', (id, [data]) => activity.log({type:'space', verb:'added', target:data.name, context:store.floor(data.floor).name}));
  { const f = (r, a, s) => s && activity.log({type:'space', verb:'deleted', target:s.name}); f.pre = id => ({...store.get(id)}); wrap(store, 'deleteSpace', f); }
  wrap(store, 'addItem', (r, [sid, data]) => activity.log({type:'space', verb:'added', target:data.name, context:(store.get(sid) || {}).name || ''}));
  wrap(store, 'addSub', (r, [sid, data]) => activity.log({type:'space', verb:'added', target:data.name, context:(store.get(sid) || {}).name || ''}));

  /* ---------- Property access ----------
     Owner (fixed), editors and viewers, each with an optional end date; plus pending invites. */
  const isoIn = n => { const d = new Date(); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); };
  const ACCESS_SEED = () => [
    {id:'brady', name:'Brady Ricci', email:'trusttheprocess58@gmail.com', role:'owner', until:null, status:'active', person:'brady'},
    {id:'alice', name:'Alice Johnson', email:'alice@yahoo.com', role:'editor', until:'2026-11-06', status:'active', person:'alice', added:'2026-08-15'},
    {id:'michael', name:'Michael Brown', email:'mike@hotmail.com', role:'viewer', until:'2026-11-06', status:'active', person:'michael', added:'2026-09-01'},
    {id:'inv-alex', name:'', email:'alex@gmail.com', role:'viewer', until:isoIn(30), status:'pending', invited:daysAgo(3)}
  ];
  const XKEY = 'hrk-access-v1';
  let accData = (() => { try { const raw = sessionStorage.getItem(XKEY); if (raw) return JSON.parse(raw); } catch(_){} return ACCESS_SEED(); })();
  const saveAcc = () => { try { sessionStorage.setItem(XKEY, JSON.stringify(accData)); } catch(_){} };
  saveAcc();
  const ROLES = {
    owner:{label:'Owner', blurb:'Full control, including sharing and deleting the property', can:['View and edit all records','Upload and delete documents','Share access and change roles','Edit or delete the property']},
    editor:{label:'Editor', blurb:'Can add, edit and upload records', can:['View all records','Add and edit spaces, items and documents','Tick off checklists'], cannot:['Share access','Delete the property']},
    viewer:{label:'Viewer', blurb:'Can look but not change anything', can:['View spaces, items and documents','See checklists and activity'], cannot:['Change or upload anything','Share access']}
  };
  const access = {
    ROLES,
    all: () => accData,
    active: () => accData.filter(m => m.status === 'active'),
    pending: () => accData.filter(m => m.status === 'pending'),
    get: id => accData.find(m => m.id === id),
    display: m => m.name || m.email,
    avatar: m => m.person && PEOPLE[m.person] ? PEOPLE[m.person].avatar : null,
    invite({emails, role, until, note}){
      const added = [];
      emails.forEach(email => {
        if (accData.some(m => m.email.toLowerCase() === email.toLowerCase())) return;
        const m = {id:'inv-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), name:'', email, role, until, status:'pending', invited:today(), note:note || ''};
        accData.push(m); added.push(m);
        activity.log({type:'access', verb:'shared access with', target:email, context:`${ROLES[role].label} · ${until ? 'until ' + docs.fmtDate(until) : 'unlimited'}`});
      });
      saveAcc(); return added;
    },
    setRole(id, role){ const m = this.get(id), from = m.role; m.role = role; saveAcc();
      activity.log({type:'access', verb:'changed the role of', target:this.display(m), context:`${ROLES[from].label} → ${ROLES[role].label}`}); },
    setUntil(id, until){ const m = this.get(id); m.until = until; saveAcc();
      activity.log({type:'access', verb:'changed access length for', target:this.display(m), context: until ? 'Until ' + docs.fmtDate(until) : 'Unlimited'}); },
    resend(id){ const m = this.get(id); m.invited = today(); saveAcc(); activity.log({type:'access', verb:'resent the invite to', target:m.email}); },
    remove(id){ const m = this.get(id); accData = accData.filter(x => x.id !== id); saveAcc();
      activity.log({type:'access', verb: m.status === 'pending' ? 'cancelled the invite to' : 'removed access for', target:this.display(m)}); },
    daysLeft: until => until ? Math.ceil((new Date(until + 'T23:59:59') - new Date()) / 864e5) : null,
    reset(){ accData = ACCESS_SEED(); saveAcc(); }
  };

  /* Rename the nav link to "Activity" and point it at the Activity screen on every page */
  document.querySelectorAll('.nav a').forEach(a => { if (/^\s*Property access\s*$/.test(a.textContent)){ a.setAttribute('href', 'access.html'); a.removeAttribute('data-sec'); } });
  document.querySelectorAll('.nav a').forEach(a => { if (/^\s*(Recent activity|Activity)\s*$/.test(a.textContent)){ a.textContent = 'Activity'; a.setAttribute('href', 'activity.html'); a.removeAttribute('data-sec'); } });


  /* ---------- Notifications ----------
     Bell on every page opens an overview; "View all notifications" opens notifications.html. */
  const NOTE_KINDS = {
    warning:{icon:'alert', label:'Reminder'},
    reminder:{icon:'alarm', label:'Scheduled'},
    service:{icon:'wrench', label:'Service'},
    approved:{icon:'check-circle', label:'Approved'},
    info:{icon:'info', label:'Update'}
  };
  const nd = (days, hm = '09:00') => { const d = new Date(); d.setDate(d.getDate() - days); const [h, m] = hm.split(':'); d.setHours(+h, +m, 0, 0); return d.toISOString(); };
  const NOTE_SEED = () => [
    ['warning','Lennox furnace warranty ends Nov 14','Vail Residence',nd(0,'08:30'),false],
    ['info','alex@gmail.com hasn\'t accepted your invite yet','Vail Residence',nd(1,'10:00'),false],
    ['reminder','Winterization checklist assigned by Home Record Keeper','Vail Residence',nd(1,'09:15'),false],
    ['warning','Change batteries 2x annually. 2 AA','Brady\'s',nd(6,'09:00'),false],
    ['warning','Change batteries 2x annually. 2 AA','Brady\'s','2026-09-30T09:00:00',false],
    ['warning','Change batteries 2x annually. 2 AA','Brady\'s','2026-09-29T09:00:00',false],
    ['warning','Change batteries 2x annually. 2 AA','Brady\'s','2026-09-28T09:00:00',false],
    ['approved','The service request has been approved by Brady.','Ahumada Residence','2026-09-25T15:20:00',false],
    ['reminder','Bring chairs and table to Sunny\'s','Brady\'s','2026-09-24T18:00:00',false],
    ['reminder','Hyatt Shift','Brady\'s','2026-09-24T07:00:00',false],
    ['service','Service "Testing" is scheduled for today','Brady\'s','2026-09-24T08:00:00',false],
    ['reminder','Bring chairs and table to Sunny\'s','Brady\'s','2026-09-23T18:00:00',false],
    ['service','Service "Electrical Power Issue" is scheduled for today','Ahumada Residence','2026-09-23T08:00:00',true],
    ['approved','Snow removal contract renewed','Vail Residence','2026-09-15T11:00:00',true]
  ].map((n, i) => ({id:'n' + i, kind:n[0], title:n[1], where:n[2], at:n[3], read:n[4]}));
  const NKEY = 'hrk-notes-v1';
  let noteData = (() => { try { const raw = sessionStorage.getItem(NKEY); if (raw) return JSON.parse(raw); } catch(_){} return NOTE_SEED(); })();
  const saveNotes = () => { try { sessionStorage.setItem(NKEY, JSON.stringify(noteData)); } catch(_){} };
  saveNotes();
  const notes = {
    KINDS: NOTE_KINDS,
    all: () => [...noteData].sort((a, b) => b.at.localeCompare(a.at)),
    unread: () => noteData.filter(n => !n.read).length,
    read(id, v = true){ const n = noteData.find(x => x.id === id); if (n){ n.read = v; saveNotes(); syncBell(); } },
    readAll(){ noteData.forEach(n => n.read = true); saveNotes(); syncBell(); },
    remove(id){ noteData = noteData.filter(n => n.id !== id); saveNotes(); syncBell(); },
    when(iso){
      const d = new Date(iso), t = new Date(); const strip = x => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
      const diff = Math.round((strip(t) - strip(d)) / 864e5);
      if (diff === 0) return 'Today, ' + d.toLocaleTimeString('en-US', {hour:'numeric', minute:'2-digit'});
      if (diff === 1) return 'Yesterday';
      if (diff < 7) return diff + ' days ago';
      return d.toLocaleDateString('en-US', d.getFullYear() === t.getFullYear() ? {month:'short', day:'numeric'} : {month:'short', day:'numeric', year:'numeric'});
    },
    row(n, tag = 'li'){
      const k = NOTE_KINDS[n.kind] || NOTE_KINDS.info;
      return `<${tag} class="nt${n.read ? '' : ' unread'}" data-note="${n.id}" tabindex="0" role="button" aria-label="${esc(n.title)}${n.read ? '' : ', unread'}">
        <span class="nt-ic"><img src="assets/logo-mark.png" alt=""></span>
        <span class="nt-tx"><b>${esc(n.title)}</b><small><span>${esc(n.where)}</span><span class="nt-dot-sep">·</span><span>${notes.when(n.at)}</span></small></span>
        <span class="nt-dot" aria-hidden="true"></span></${tag}>`;
    }
  };

  /* Shared styles for notification rows + the bell overview (pages without base.css still get them) */
  document.head.insertAdjacentHTML('beforeend', `<style>
    .nt{display:grid;grid-template-columns:44px minmax(0,1fr) 10px;gap:14px;align-items:center;padding:14px 18px;border-bottom:1px solid var(--line);cursor:pointer;text-align:left}
    .nt:last-child{border-bottom:0}
    .sys{display:inline-flex;align-items:center;gap:9px;min-width:0;max-width:100%;color:var(--ink);white-space:nowrap}
    .sys-ic{width:30px;height:30px;border-radius:9px;display:grid;place-items:center;flex:none}
    .sys-ic svg.i{width:16px;height:16px;color:inherit}
    .nt:hover,.nt:focus-visible{background:var(--hover);outline:none}
    .nt-ic{width:44px;height:44px;border-radius:50%;display:grid;place-items:center}
    .nt-ic{background:var(--surface);border:1px solid var(--line)}
    .nt-ic img{width:70%;height:70%;object-fit:contain;display:block}
    .k-warning{background:#FDF1DD}.k-warning svg.i{color:#B7700E}
    .k-reminder{background:#EFEBFA}.k-reminder svg.i{color:#6A55B8}
    .k-service{background:#E3F2F1}.k-service svg.i{color:#2B7F78}
    .k-approved{background:#E5F4EA}.k-approved svg.i{color:#2F8F57}
    .k-info{background:#E8EEF7}.k-info svg.i{color:#24518A}
    .nt-tx{min-width:0}
    .nt-tx b{display:block;font-weight:500;font-size:14.5px;color:var(--ink);line-height:1.35}
    .nt.unread .nt-tx b{font-weight:600}
    .nt-tx small{display:flex;flex-wrap:wrap;gap:2px 6px;margin-top:3px;font-size:12.5px;color:var(--ink-3)}
    .nt-dot{width:9px;height:9px;border-radius:50%;background:transparent;justify-self:end}
    .nt.unread .nt-dot{background:#42BA6F}
    .bell-pop{position:absolute;z-index:45;width:400px;max-width:calc(100vw - 24px);background:var(--surface);border:1px solid var(--line);border-radius:14px;box-shadow:0 16px 40px rgba(15,22,30,.18);overflow:hidden}
    .bell-pop .bp-h{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:14px 16px 12px;border-bottom:1px solid var(--line)}
    .bell-pop .bp-h h3{margin:0;font-size:15px;font-weight:600;display:flex;align-items:center;gap:8px}
    .bell-pop .bp-h h3 span{font-size:11.5px;font-weight:600;padding:1px 8px;border-radius:10px;background:var(--brand-tint);color:var(--brand)}
    .bell-pop .bp-h button{font-size:13px;font-weight:500;color:var(--brand)}
    .bell-pop .bp-h button:hover{text-decoration:underline}
    .bell-pop .bp-list{list-style:none;margin:0;padding:0;max-height:420px;overflow:auto}
    .bell-pop .nt{padding:12px 16px;grid-template-columns:40px minmax(0,1fr) 10px;gap:12px}
    .bell-pop .nt-ic{width:40px;height:40px}
    .bell-pop .nt-tx b{font-size:14px}
    .bell-pop .bp-f{display:block;padding:12px 16px;text-align:center;font-size:13.5px;font-weight:600;color:var(--brand);border-top:1px solid var(--line);background:var(--hover)}
    .bell-pop .bp-f:hover{text-decoration:underline}
    .bell-pop .bp-empty{padding:28px 16px;text-align:center;color:var(--ink-3)}
    .bell .bell-n{position:absolute;top:2px;right:0;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#B23A30;color:#fff;font-size:10.5px;font-weight:700;display:grid;place-items:center;box-shadow:0 0 0 2px var(--surface);line-height:1}
  </style>`);

  let bellPop = null;
  function syncBell(){
    const n = notes.unread();
    document.querySelectorAll('.bell').forEach(b => {
      const dot = b.querySelector('i'); if (dot) dot.remove();
      let c = b.querySelector('.bell-n'); if (!c){ c = document.createElement('span'); c.className = 'bell-n'; b.appendChild(c); }
      c.textContent = n > 99 ? '99+' : n; c.hidden = !n;
      b.setAttribute('aria-label', n ? `Notifications, ${n} unread` : 'Notifications');
    });
    if (bellPop) drawBellPop();
  }
  function drawBellPop(){
    const list = notes.all().slice(0, 6), n = notes.unread();
    bellPop.innerHTML = `<div class="bp-h"><h3>Notifications${n ? `<span>${n} new</span>` : ''}</h3>${n ? '<button type="button" data-readall>Mark all as read</button>' : ''}</div>
      ${list.length ? `<ul class="bp-list">${list.map(x => notes.row(x)).join('')}</ul>` : '<div class="bp-empty">You\'re all caught up.</div>'}
      <a class="bp-f" href="notifications.html">View all notifications</a>`;
  }
  function closeBell(){ if (bellPop){ bellPop.remove(); bellPop = null; document.querySelectorAll('.bell').forEach(b => b.setAttribute('aria-expanded', 'false')); } }
  function openBell(btn){
    closeBell();
    bellPop = document.createElement('div'); bellPop.className = 'bell-pop'; bellPop.setAttribute('role', 'dialog'); bellPop.setAttribute('aria-label', 'Notifications');
    document.body.appendChild(bellPop); drawBellPop();
    const r = btn.getBoundingClientRect();
    bellPop.style.top = (r.bottom + scrollY + 8) + 'px';
    bellPop.style.left = Math.max(12, Math.min(r.right + scrollX - bellPop.offsetWidth, innerWidth - bellPop.offsetWidth - 12)) + 'px';
    btn.setAttribute('aria-expanded', 'true');
    bellPop.addEventListener('click', e => {
      if (e.target.closest('[data-readall]')){ notes.readAll(); return; }
      const row = e.target.closest('[data-note]'); if (row) notes.read(row.dataset.note);
    });
    bellPop.addEventListener('keydown', e => { const row = e.target.closest('[data-note]'); if (row && (e.key === 'Enter' || e.key === ' ')){ e.preventDefault(); notes.read(row.dataset.note); } });
  }
  document.querySelectorAll('.bell').forEach(b => {
    b.setAttribute('aria-haspopup', 'dialog'); b.setAttribute('aria-expanded', 'false');
    b.addEventListener('click', e => { e.stopPropagation(); bellPop ? closeBell() : openBell(b); });
  });
  document.addEventListener('click', e => { if (bellPop && !e.composedPath().includes(bellPop)) closeBell(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && bellPop){ closeBell(); const b = document.querySelector('.bell'); b && b.focus(); } });
  syncBell();


  /* ---------- HRK systems: the 8 home systems, used by Items and Item detail ---------- */
  /* Home systems (with icon + colour), and a best guess for items saved before systems existed */
  const SYSTEMS = {
    'Plumbing & Mechanical': {icon:'sys-wrench', bg:'#FFF4C2', fg:'#8A6A00'},
    'Electrical':            {icon:'sys-bolt', bg:'#D6F5EA', fg:'#16775A'},
    'Appliances':            {icon:'sys-appliance', bg:'#FFE8D1', fg:'#A4561B'},
    'Audio & Visual':        {icon:'sys-monitor', bg:'#ECE6FF', fg:'#5B45B0'},
    'Exterior & Finishes':   {icon:'sys-house', bg:'#E1EAFF', fg:'#2F55B5'},
    'Interior & Lighting':   {icon:'sys-bulb', bg:'#EEF7D2', fg:'#5A7713'},
    'Vehicle & Recreation':  {icon:'sys-car', bg:'#D8F4FA', fg:'#1D6F86'},
    'Troubleshoot':          {icon:'sys-siren', bg:'#FDE2E4', fg:'#B23A48'}
  };
  const CAT_SYSTEM = {appliance:'Appliances', fixture:'Interior & Lighting', system:'Plumbing & Mechanical', furniture:'Interior & Lighting', electronics:'Audio & Visual', outdoor:'Vehicle & Recreation'};
  const systemOf = i => SYSTEMS[i.system] ? i.system : (guessSystem(i.name) || CAT_SYSTEM[i.cat] || '');
  const sysChip = name => { const s = SYSTEMS[name]; return s ? `<span class="sys"><span class="sys-ic" style="background:${s.bg};color:${s.fg}">${ico(s.icon)}</span>${esc(name)}</span>` : '<span class="none">—</span>'; };
  const SYS_HINTS = [[/water heater|furnace|boiler|(?<!patio )heater|hvac|air ?con|\bac\b|split|thermostat|humidif|vent|sink|faucet|toilet|shower|pump|softener|pipe|tap|filter|disposal|steam|vapor/i, 'Plumbing & Mechanical'],
    [/panel|outlet|charger|switch|wiring|generator|breaker|opener/i, 'Electrical'], [/fridge|refrigerator|range|oven|washer|dryer|dishwasher|microwave|stove|hood/i, 'Appliances'],
    [/\btv\b|router|speaker|sonos|soundbar|camera|printer|projector|wi-?fi/i, 'Audio & Visual'], [/light|lamp|fan|shade|chair|bed|desk|table|sofa|closet|shelf|shelving|vanity|floor|fireplace/i, 'Interior & Lighting'],
    [/car|bike|ski|snow|tub|grill|boat|kayak|golf|heater/i, 'Vehicle & Recreation'], [/roof|gutter|shingle|deck|fence|siding|window|door|paint|driveway|boiler|liner/i, 'Exterior & Finishes'], [/alarm|smoke|detector|leak|extinguisher/i, 'Troubleshoot']];
  const guessSystem = name => { const hit = SYS_HINTS.find(([re]) => re.test(name || '')); return hit ? hit[1] : ''; };
  const systems = {SYSTEMS, systemOf, sysChip, guessSystem};

  /* ---------- Add item modal (Items page and Space pages) ---------- */
  document.head.insertAdjacentHTML('beforeend', `<style>
/* One dropdown for space + sub-space: spaces as headings, sub-spaces indented below */
.dd{position:relative;flex:none}
.dd-btn{position:relative;display:flex;align-items:center;height:36px;min-width:190px;max-width:280px;padding:0 34px 0 12px;border:1px solid var(--line-2);border-radius:8px;background:var(--surface);color:var(--ink);font-size:13.5px;font-weight:500;text-align:left}
.dd-btn span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dd-btn::after{content:"";position:absolute;right:10px;top:50%;width:16px;height:16px;margin-top:-8px;background:var(--ink-3);transition:transform .15s;
  -webkit-mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center/contain no-repeat;
  mask:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E") center/contain no-repeat}
.dd-btn[aria-expanded="true"]::after{transform:rotate(180deg)}
.dd-btn:hover{border-color:var(--ink-3)}
.dd-btn:focus-visible{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-tint)}
.dd.on .dd-btn{background:var(--brand-tint);border-color:transparent;color:var(--brand)}
.dd.on .dd-btn::after{background:var(--brand)}
.dd-pop{position:absolute;z-index:30;top:calc(100% + 6px);left:0;width:260px;max-height:400px;overflow:auto;margin:0;padding:6px 0;list-style:none;background:var(--surface);border:1px solid var(--line);border-radius:12px;box-shadow:0 12px 32px rgba(20,32,46,.14)}
.dd-pop li{display:flex;align-items:center;justify-content:space-between;gap:8px;min-height:38px;padding:0 14px;font-size:14px;color:var(--ink);cursor:pointer}
.dd-pop li.sp{font-weight:500}
.dd-pop li.sp.has{border-bottom:1px solid var(--line)}
.dd-pop li.sb{padding-left:32px;color:var(--ink-2)}
.dd-pop li.sb + li.sp{margin-top:4px}
.dd-pop li:hover,.dd-pop li.kb{background:var(--hover)}
.dd-pop li[aria-selected="true"]{color:var(--brand);background:var(--brand-tint)}
.dd-pop li svg.i{width:16px;height:16px;color:var(--brand);flex:none}
.dd-pop li small{font-size:12px;color:var(--ink-3)}
.dd-pop.fixed{position:fixed;z-index:60;top:auto;left:auto}
.dd-pop.dd-panel{display:flex;flex-direction:column;padding:0;overflow:hidden}
.dd-panel ul{list-style:none;margin:0;padding:4px 0 6px;overflow:auto;flex:1;min-height:0}
.dd-search{position:relative;display:flex;align-items:center;flex:none;margin:8px;}
.dd-search svg.i{position:absolute;left:11px;width:16px;height:16px;color:var(--ink-3);pointer-events:none}
.dd-search input{width:100%;height:38px;padding:0 12px 0 34px;border:1px solid var(--line-2);border-radius:8px;background:var(--surface);color:var(--ink);font:inherit;font-size:14px;-webkit-appearance:none;appearance:none}
.dd-search input::placeholder{color:var(--ink-3)}
.dd-search input:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-tint)}
.dd-search input::-webkit-search-cancel-button{cursor:pointer}
.dd-panel mark{background:var(--amber-tint);color:inherit;border-radius:3px;padding:0 1px}
.dd-none{padding:18px 14px;font-size:13.5px;color:var(--ink-3);text-align:center;cursor:default}
.dd-none:hover{background:none}
.sys-list li{min-height:46px}
.sys-list .sys-ic{width:28px;height:28px;border-radius:8px}
.dlg .dd-btn.has-chip{padding-left:6px}
.dlg .dd-btn.has-chip .sys-ic{width:28px;height:28px;border-radius:7px}
.dlg .dd-btn #aiSysLbl{display:flex;align-items:center;min-width:0}

/* Add item modal */
.dlg.wide{width:min(560px,100%)}
.ai-photos{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:10px}
.ai-ph{position:relative;aspect-ratio:1;border-radius:10px;overflow:hidden;border:1px solid var(--line);background:var(--hover)}
.ai-ph img{width:100%;height:100%;object-fit:cover;display:block}
.ai-ph .cover{position:absolute;left:6px;bottom:6px;padding:2px 7px;border-radius:999px;background:rgba(15,22,30,.7);color:#fff;font-size:11px;font-weight:600}
.ai-ph .rm{position:absolute;top:5px;right:5px;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:rgba(15,22,30,.65);color:#fff;opacity:0;transition:opacity .15s}
.ai-ph:hover .rm,.ai-ph .rm:focus-visible{opacity:1}
.ai-ph .rm svg.i{width:13px;height:13px;color:#fff}
.ai-add{position:relative;aspect-ratio:1;border-radius:10px;border:1.5px dashed var(--line-2);display:grid;place-content:center;justify-items:center;gap:4px;color:var(--brand);font-size:12px;font-weight:600;cursor:pointer;background:var(--surface);transition:border-color .15s,background .15s}
.ai-add:hover,.ai-add.over{border-color:var(--brand);background:var(--brand-tint)}
.ai-add input{position:absolute;inset:0;opacity:0;cursor:pointer}
.ai-add svg.i{width:20px;height:20px}
.ai-photos.empty{grid-template-columns:1fr}
.ai-photos.empty .ai-add{aspect-ratio:auto;padding:24px 16px;gap:6px;color:var(--ink-2);font-weight:400;font-size:13.5px}
.ai-photos.empty .ai-add .ic{width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:var(--surface);border:1px solid var(--line);color:var(--icon)}
.ai-photos.empty .ai-add b{color:var(--ink);font-weight:600}
.ai-photos.empty .ai-add u{color:var(--brand);text-decoration:none;font-weight:600}
.ai-photos.empty .ai-add small{color:var(--ink-3);font-size:12px}
.ctl textarea{width:100%;min-height:84px;padding:10px 12px;border:1px solid var(--line-2);border-radius:8px;background:var(--surface);color:var(--ink);font:inherit;font-size:14px;resize:vertical}
.ctl textarea:hover{border-color:var(--ink-3)}
.ctl textarea:focus{outline:none;border-color:var(--brand);box-shadow:0 0 0 3px var(--brand-tint)}
.lab-row{display:flex;align-items:center;justify-content:space-between;gap:8px}
.lab-row label{font-size:13px;font-weight:600}
.ai-write{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px;border-radius:999px;font-size:12.5px;font-weight:600;color:var(--brand);background:var(--brand-tint);transition:background .15s,transform .15s}
.ai-write:hover{background:#d9e3f2}
.ai-write:active{transform:scale(.97)}
.ai-write:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
.ai-write svg.i{width:14px;height:14px;color:var(--brand)}
.ai-write[aria-busy="true"]{pointer-events:none;opacity:.85}
.ai-write[aria-busy="true"] svg.i{animation:spark 1s ease-in-out infinite}
@keyframes spark{50%{transform:scale(.7) rotate(20deg);opacity:.6}}
.ai-ta{position:relative}
.ai-ta.busy input,.ai-ta.busy textarea{border-color:var(--brand);background:linear-gradient(90deg,var(--surface) 0%,var(--brand-tint) 50%,var(--surface) 100%) 0 0/200% 100%;animation:shim 1.2s linear infinite}
@keyframes shim{to{background-position:-200% 0}}
.sys-pick{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
.sys-pick button{display:grid;justify-items:center;align-content:center;gap:7px;min-height:92px;padding:12px 6px;border-radius:14px;background:var(--bg);color:var(--ink);font-size:12.5px;font-weight:500;line-height:1.25;text-align:center;border:2px solid transparent;transition:transform .15s,border-color .15s,box-shadow .15s}
.sys-pick button:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(20,32,46,.08)}
.sys-pick button:focus-visible{outline:2px solid var(--brand);outline-offset:2px}
.sys-pick button[aria-checked="true"]{border-color:var(--fg);box-shadow:0 0 0 3px color-mix(in srgb,var(--fg) 18%,transparent)}
.sys-pick .sp-ic svg.i{width:22px;height:22px;color:var(--fg)}
@media (max-width:560px){.sys-pick{grid-template-columns:repeat(2,minmax(0,1fr))}}
.ai-row{display:grid;grid-template-columns:1fr 1.4fr;gap:12px}
.dd-pop li.fh{min-height:30px;padding:8px 14px 2px;font-size:11.5px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);cursor:default}
.dd-pop li.fh:hover{background:none}
.dd-pop li.fh:not(:first-child){margin-top:6px;border-top:1px solid var(--line);padding-top:12px}
.dd-pop.fixed li.sp{padding-left:22px}
.dd-pop.fixed li.sb{padding-left:40px}
.dlg .dd-btn{width:100%;max-width:none;height:40px;font-size:14px;font-weight:400}
.dlg .dd-btn.ph span{color:var(--ink-3)}
.field.err .ctl input,.field.err .dd-btn{border-color:var(--red)}
.pic .n{position:absolute;right:3px;bottom:3px;padding:0 5px;border-radius:999px;background:rgba(15,22,30,.7);color:#fff;font-size:10.5px;font-weight:600;line-height:16px}
@media (max-width:560px){.ai-row{grid-template-columns:1fr}}
</style>`);
  const {SYSTEMS: SYSTEMS_, guessSystem: guessSystem_} = systems;
  /* Prototype "recognition": reads the photo's file name (e.g. lennox-furnace.jpg → Lennox furnace) and guesses the system */
  function guessFromPhoto(file = ''){
    let base = file.replace(/\.[a-z0-9]+$/i, '').replace(/[_.\-]+/g, ' ').replace(/\b(img|dsc|pxl|photo|image|screenshot|whatsapp|copy)\b/gi, '').replace(/\d+/g, '').replace(/\s+/g, ' ').trim();
    if (!/[a-z]{3}/i.test(base)) base = 'Household item';
    const name = base.charAt(0).toUpperCase() + base.slice(1).toLowerCase();
    return {name, system: guessSystem_(name)};
  }

  /* ---------- Add item: photos, name, description, floor, space / sub-space (one dropdown), system ---------- */
  function addItemDialog({space = '', sub = '', onAdded, item = null, onSaved} = {}){
    const photos0 = item ? (item.photos && item.photos.length ? [...item.photos] : item.photo ? [item.photo] : []) : [];
    const st = {photos:photos0, names:photos0.map(() => ''), space, sub: item ? item.sub || '' : sub, open:false};
    dialog({
      title: item ? 'Edit item' : 'Add item', ok: item ? 'Save changes' : 'Add item', size: 'wide',
      body: `
        <div class="field"><span class="lab">Photos</span><div class="ai-photos" id="aiPhotos"></div></div>
        <div class="field"><label for="aiName">Item name</label><div class="ctl"><input id="aiName" maxlength="60" placeholder="Leave empty and AI names it from the photo" autocomplete="off"></div></div>
        <div class="field"><div class="lab-row"><label for="aiDesc">Description</label>
            <button type="button" class="ai-write" id="aiWrite">${ico('sparkle')}<span>Write with AI</span></button></div>
          <div class="ctl ai-ta"><textarea id="aiDesc" maxlength="400" placeholder="Brand, model, serial number, where it was bought…"></textarea></div>
          <span class="msg" id="aiWriteMsg" hidden>Add a photo or an item name so AI knows what to write about.</span></div>
        <div class="field"><span class="lab" id="aiSpaceL">Location</span>
          <div class="dd" id="aiSpaceWrap"><button type="button" class="dd-btn" id="aiSpaceBtn" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="aiSpaceL aiSpaceLbl"><span id="aiSpaceLbl"></span></button></div>
          <span class="msg" hidden>Choose where the item is.</span></div>
        <div class="field"><span class="lab" id="aiSysL">System</span><input type="hidden" id="aiSystem" value="">
          <div class="dd"><button type="button" class="dd-btn" id="aiSysBtn" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="aiSysL aiSysLbl"><span id="aiSysLbl"></span></button></div></div>`,
      onOpen(bg){
        const $ = s => bg.querySelector(s), btn = $('#aiSpaceBtn');
        /* Location popover: search box + Floor › Space › Sub-space list */
        const pop = document.createElement('div'); pop.className = 'dd-pop fixed dd-panel'; pop.hidden = true;
        pop.innerHTML = `<label class="dd-search">${ico('search')}<input type="search" id="aiLocQ" placeholder="Search spaces and sub-spaces" autocomplete="off" aria-label="Search spaces and sub-spaces"></label><ul role="listbox" aria-label="Location" id="aiLocList"></ul>`;
        bg.appendChild(pop);
        const list = pop.querySelector('ul'), qIn = pop.querySelector('input');

        /* System dropdown: the 8 systems with their icons */
        const sBtn = $('#aiSysBtn'), sPop = document.createElement('ul');
        sPop.className = 'dd-pop fixed sys-list'; sPop.setAttribute('role', 'listbox'); sPop.setAttribute('aria-label', 'System'); sPop.hidden = true;
        bg.appendChild(sPop);
        const chip = (n, s) => `<span class="sys"><span class="sys-ic" style="background:${s.bg};color:${s.fg}">${ico(s.icon)}</span>${esc(n)}</span>`;
        const drawSys = () => {
          const v = $('#aiSystem').value;
          sPop.innerHTML = Object.entries(SYSTEMS_).map(([n, s]) => `<li role="option" data-sys="${esc(n)}" aria-selected="${n === v}">${chip(n, s)}${n === v ? ico('check') : ''}</li>`).join('');
          $('#aiSysLbl').innerHTML = v ? chip(v, SYSTEMS_[v]) : 'Choose a system';
          sBtn.classList.toggle('ph', !v); sBtn.classList.toggle('has-chip', !!v);
        };
        const setSys = v => { $('#aiSystem').value = v; drawSys(); };

        const drawPhotos = () => {
          const box = $('#aiPhotos'), add = (big) => `<label class="ai-add" id="aiDrop"><input type="file" accept="image/*" multiple aria-label="Add photos">
            ${big ? `<span class="ic">${ico('upload')}</span><span><b>Drag photos here</b> or <u>browse</u></span><small>Add as many as you like · the first one is the cover</small>` : `${ico('plus')}<span>Add</span>`}</label>`;
          box.classList.toggle('empty', !st.photos.length);
          box.innerHTML = st.photos.map((src, n) => `<div class="ai-ph"><img src="${src}" alt="Photo ${n + 1}">${n === 0 ? '<span class="cover">Cover</span>' : ''}
            <button type="button" class="rm" data-rmph="${n}" aria-label="Remove photo ${n + 1}">${ico('x')}</button></div>`).join('') + add(!st.photos.length);
          const dz = $('#aiDrop');
          ['dragenter', 'dragover'].forEach(t => dz.addEventListener(t, e => { e.preventDefault(); dz.classList.add('over'); }));
          ['dragleave', 'drop'].forEach(t => dz.addEventListener(t, e => { e.preventDefault(); dz.classList.remove('over'); }));
          dz.addEventListener('drop', e => addFiles(e.dataTransfer.files));
          dz.querySelector('input').onchange = e => addFiles(e.target.files);
        };
        const addFiles = async files => {
          const first = !st.photos.length;
          for (const f of [...files].filter(f => f.type.startsWith('image/'))){ try { st.photos.push(await readPhoto(f, 600)); st.names.push(f.name); } catch(err){ toast(err.message); } }
          drawPhotos();
          /* First photo in and no name yet: AI names the item from the photo (and picks a system) */
          const nm = $('#aiName');
          if (first && st.photos.length && !nm.value.trim()){
            const g = guessFromPhoto(st.names[0]);
            nm.value = ''; nm.placeholder = 'Recognising item from photo…'; nm.closest('.ctl').classList.add('ai-ta', 'busy');
            $('#aiWriteMsg').hidden = true;
            setTimeout(() => {
              nm.closest('.ctl').classList.remove('busy'); nm.placeholder = 'Leave empty and AI names it from the photo';
              if (nm.value.trim()) return;
              typeInto(nm, g.name);
              if (g.system && !$('#aiSystem').value) setSys(g.system);
            }, 900);
          }
        };
        $('#aiPhotos').addEventListener('click', e => { const r = e.target.closest('[data-rmph]'); if (r){ e.preventDefault(); st.photos.splice(+r.dataset.rmph, 1); st.names.splice(+r.dataset.rmph, 1); drawPhotos(); } });

        const drawSpace = () => {
          const sp = store.get(st.space), cur = st.sub ? st.space + '--' + st.sub : st.space;
          const q = qIn.value.trim().toLowerCase(), has = t => t.toLowerCase().includes(q);
          const mark = t => { if (!q) return esc(t); const i = t.toLowerCase().indexOf(q); return i < 0 ? esc(t) : esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + q.length)) + '</mark>' + esc(t.slice(i + q.length)); };
          const opt = (v, label, cls) => `<li role="option" class="${cls}" data-v="${v}" aria-selected="${v === cur}"><span>${mark(label)}</span>${v === cur ? ico('check') : ''}</li>`;
          list.innerHTML = store.floors.map(f => {
            /* a space shows when it (or its floor) matches — then with all its sub-spaces — or when one of its sub-spaces matches */
            const rows = store.all().filter(s => s.floor === f.id).map(s => {
              const all = !q || has(f.name) || has(s.name), subs = all ? s.subs : s.subs.filter(x => has(x.name));
              return all || subs.length ? opt(s.id, s.name, 'sp') + subs.map(x => opt(s.id + '--' + x.id, x.name, 'sb')).join('') : '';
            }).join('');
            return rows ? `<li class="fh" role="presentation">${esc(f.name)}</li>` + rows : '';
          }).join('') || `<li class="dd-none" role="presentation">No spaces match “${esc(qIn.value.trim())}”</li>`;
          $('#aiSpaceLbl').textContent = !sp ? 'Choose floor, space and sub-space' : [store.floor(sp.floor).name, sp.name, st.sub ? sp.subs.find(x => x.id === st.sub).name : ''].filter(Boolean).join(' › ');
          btn.classList.toggle('ph', !sp);
        };
        /* Shared popover behaviour: fixed position under (or above) its button, arrow keys, Enter, Escape */
        const place = (b, p, maxH) => {
          const r = b.getBoundingClientRect(), below = innerHeight - r.bottom - 12;
          p.style.width = r.width + 'px'; p.style.left = r.left + 'px';
          p.style.maxHeight = Math.max(200, Math.min(maxH, below > 240 ? below : r.top - 12)) + 'px';
          if (below > 240){ p.style.top = (r.bottom + 6) + 'px'; p.style.bottom = 'auto'; } else { p.style.bottom = (innerHeight - r.top + 6) + 'px'; p.style.top = 'auto'; }
        };
        const keys = (e, p, onPick, close) => {
          if (e.key === 'Escape'){ e.stopPropagation(); e.preventDefault(); return close(); }
          if (!['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) return;
          e.preventDefault();
          const li = [...p.querySelectorAll('[data-v],[data-sys]')], at = li.findIndex(x => x.classList.contains('kb'));
          if (e.key === 'Enter'){ const t = at >= 0 ? li[at] : li.length === 1 ? li[0] : null; if (t) onPick(t); return; }
          const next = Math.max(0, Math.min(li.length - 1, at + (e.key === 'ArrowDown' ? 1 : -1)));
          li.forEach((x, i) => x.classList.toggle('kb', i === next)); if (li[next]) li[next].scrollIntoView({block:'nearest'});
        };
        const setOpen = open => {
          if (open) setSysOpen(false);
          st.open = open; pop.hidden = !open; btn.setAttribute('aria-expanded', open);
          if (!open) return;
          qIn.value = ''; drawSpace(); place(btn, pop, 380);
          const s = list.querySelector('[aria-selected="true"]'); if (s) s.scrollIntoView({block:'nearest'});
          qIn.focus();
        };
        const setSysOpen = open => {
          if (open) setOpen(false);
          sPop.hidden = !open; sBtn.setAttribute('aria-expanded', open);
          if (open){ drawSys(); place(sBtn, sPop, 360); }
        };
        const pick = v => {
          [st.space, st.sub = ''] = v.split('--');
          const f = btn.closest('.field'); f.classList.remove('err'); f.querySelector('.msg').hidden = true;
          drawSpace(); setOpen(false); btn.focus();
        };
        btn.onclick = () => setOpen(!st.open);
        btn.onkeydown = e => { if (!st.open && (e.key === 'ArrowDown' || e.key === 'Enter')){ e.preventDefault(); setOpen(true); } };
        list.onclick = e => { const li = e.target.closest('[data-v]'); if (li) pick(li.dataset.v); };
        qIn.oninput = () => { drawSpace(); const first = list.querySelector('[data-v]'); if (first && qIn.value.trim()) first.classList.add('kb'); };
        qIn.onkeydown = e => keys(e, list, li => pick(li.dataset.v), () => { setOpen(false); btn.focus(); });
        sBtn.onclick = () => setSysOpen(sPop.hidden);
        sBtn.onkeydown = e => {
          if (sPop.hidden){ if (e.key === 'ArrowDown' || e.key === 'Enter'){ e.preventDefault(); setSysOpen(true); } return; }
          keys(e, sPop, li => { setSys(li.dataset.sys); setSysOpen(false); }, () => setSysOpen(false));
        };
        sPop.onclick = e => { const li = e.target.closest('[data-sys]'); if (li){ setSys(li.dataset.sys); setSysOpen(false); sBtn.focus(); } };
        bg.addEventListener('click', e => {
          const path = e.composedPath();
          if (st.open && !path.some(n => n === pop || n === btn)) setOpen(false);
          if (!sPop.hidden && !path.some(n => n === sPop || n === sBtn)) setSysOpen(false);
        });
        $('.dlg').addEventListener('scroll', () => { if (st.open) setOpen(false); if (!sPop.hidden) setSysOpen(false); });
        drawSys();
        $('#aiName').oninput = e => { if (e.target.value.trim()) $('#aiWriteMsg').hidden = true; };
        /* Write with AI (prototype): drafts a description from the name, system and location, typed in */
        const aiBtn = $('#aiWrite'), ta = $('#aiDesc');
        const typeInto = (el, text, done) => { let n = 0; el.value = ''; const t = setInterval(() => { n = Math.min(text.length, n + 4); el.value = text.slice(0, n); el.scrollTop = el.scrollHeight; if (n >= text.length){ clearInterval(t); done && done(); } }, 16); };
        aiBtn.onclick = () => {
          let name = $('#aiName').value.trim();
          const fromPhoto = !name && st.photos.length;
          $('#aiWriteMsg').hidden = !!(name || fromPhoto);
          if (!name && !fromPhoto) return;
          if (fromPhoto){
            const g = guessFromPhoto(st.names[0]); name = g.name;
            setTimeout(() => typeInto($('#aiName'), name), 900);
            if (g.system && !$('#aiSystem').value) setSys(g.system);
          }
          const sys = $('#aiSystem').value, sp = store.get(st.space), x = sp && sp.subs.find(s => s.id === st.sub);
          const where = sp ? (x ? `the ${x.name.toLowerCase()} of the ${sp.name.toLowerCase()}` : `the ${sp.name.toLowerCase()}`) : '';
          const text = [
            `${name}${sys ? ` (${sys})` : ''}${where ? ` located in ${where}` : ''} at Vail Residence.`,
            `Keep the brand, model and serial number here, along with the purchase date and installer, so warranty claims and service visits are quick.`,
            `Note any recurring maintenance, such as filter changes or annual servicing, and attach the manual and receipts under Documents.`
          ].join(' ');
          aiBtn.setAttribute('aria-busy', 'true'); aiBtn.querySelector('span').textContent = 'Writing…';
          ta.closest('.ctl').classList.add('busy'); ta.readOnly = true;
          setTimeout(() => {
            ta.closest('.ctl').classList.remove('busy');
            typeInto(ta, text, () => { ta.readOnly = false; aiBtn.removeAttribute('aria-busy'); aiBtn.querySelector('span').textContent = 'Rewrite with AI'; });
          }, 900);
        };

        /* Edit mode: start from the item's saved details */
        if (item){
          $('#aiName').value = item.name || '';
          $('#aiDesc').value = item.desc || '';
          setSys(systems.systemOf(item));
        }
        drawPhotos(); drawSpace();
        bg._st = st;
      },
      onOk(bg){
        const st = bg._st, $ = s => bg.querySelector(s);
        const name = $('#aiName').value.trim() || (item ? item.name : st.photos.length ? guessFromPhoto(st.names[0]).name : 'Untitled item');
        const flag = (el, bad) => { const f = el.closest('.field'); f.classList.toggle('err', bad); f.querySelector('.msg').hidden = !bad; return bad; };
        if (flag($('#aiSpaceBtn'), !st.space)){ $('#aiSpaceBtn').focus(); return false; }
        const data = {name, desc: $('#aiDesc').value.trim(), sub: st.sub, system: $('#aiSystem').value, photo: st.photos[0] || null, photos: st.photos};
        const sp = store.get(st.space), x = sp.subs.find(s => s.id === st.sub), where = x ? sp.name + ' › ' + x.name : sp.name;
        if (item){
          store.moveItem(space, item.id, st.space, data);
          onSaved && onSaved(st.space, st.sub);
          toast(`${name} saved`);
          return;
        }
        store.addItem(st.space, {...data, cat: ''});
        onAdded && onAdded(st.space, st.sub);
        toast(`${name} added to ${where}`);
      }
    });
  }

  window.HRK = {addItemDialog, systems, store, docs, checklists, activity, access, notes, fileIcon, ext, ico, esc, plural, toast, flashNext, dialog, menu, closePop, readPhoto, pickPhoto, thumb, spaceDialog, deleteSpaceDialog, CATS};
})();
