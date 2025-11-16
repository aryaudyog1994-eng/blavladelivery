
/*
  main.js - Placeholder helpers for Firebase, Maps, Chat and Tracking.
  IMPORTANT: Add your Firebase config and map API keys where noted.
*/

// --- Firebase placeholder ---
// 1) npm install firebase (or include CDN SDK in HTML)
// 2) Replace the firebaseConfig object with your project's config and initialize Firebase
export const firebasePlaceholder = {
  requiredSteps: [
    "Create Firebase project at https://console.firebase.google.com/",
    "Enable Authentication (Phone or Email) and Storage and Firestore",
    "Add firebaseConfig below and uncomment initialization code"
  ],
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID"
  }
};

/* Example init (uncomment when firebase SDK is added)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js';

const app = initializeApp(firebasePlaceholder.firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
*/

// --- Map placeholder helper ---
export function initMapPlaceholder(containerId) {
  const el = document.getElementById(containerId);
  if(!el) return;
  el.classList.add('map-placeholder');
  el.innerHTML = '<div><strong>Map placeholder</strong><div class="muted">Add Google Maps / Mapbox here using API key</div></div>';
}

// --- Chat placeholder ---
export function initChatPlaceholder(containerId) {
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = '<div class="card"><h3>Chat (demo)</h3><div class="muted">Connect Firestore collection & implement UI here</div></div>';
}

// --- Simple demo tracking status (local only) ---
export function demoTrackingStatus(id) {
  if(!id) return null;
  const states = ['Created','Assigned to driver','In transit','Delivered'];
  const idx = id.length % states.length;
  return {id, status: states[idx], updated: new Date().toISOString()};
}
