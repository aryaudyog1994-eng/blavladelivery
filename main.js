
/* BlaVlaDelivery main.js - placeholders/helpers for maps, chat, firebase (copyright-safe) */

export function initMapPlaceholder(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = '<div style="text-align:center"><strong>Map placeholder</strong><div style="color:#6b7280;margin-top:6px">Add Google Maps or Mapbox with API key</div></div>';
  el.classList.add('map-placeholder');
}

export function initChatPlaceholder(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.innerHTML = '<div style="padding:10px"><strong>Chat (demo)</strong><p style="color:#6b7280">Connect Firestore for real-time messages.</p></div>';
}

export function demoSubmitResult(elId, text){
  const el = document.getElementById(elId);
  if(el) el.textContent = text;
}
