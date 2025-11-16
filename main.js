
// main.js - extended features: auth, kyc, parcels, chat, admin (client-side)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc, collection, getDocs, query, where, updateDoc, getDoc, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js";

const firebaseConfig = {"apiKey": "AIzaSyAVKm5n5o8KDxQ7mlvxfTsJdLRiTt-dKss", "authDomain": "blavladelivery-c4175.firebaseapp.com", "projectId": "blavladelivery-c4175", "storageBucket": "blavladelivery-c4175.appspot.com", "messagingSenderId": "1092623155522", "appId": "1:1092623155522:web:b5f26905a40c505c2248db", "measurementId": "G-RDV0D4TPG7"};
const app = initializeApp(firebaseConfig);
try{ getAnalytics(app); }catch(e){}
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Helper: only admin email can access admin UI (change to your admin email)
const ADMIN_EMAIL = "admin@yourdomain.com";

// Auth state
onAuthStateChanged(auth, user => {
  if(user){
    console.log("Signed in:", user.uid, user.email || user.phoneNumber);
  } else {
    console.log("Not signed in");
  }
});

// ----- KYC - Driver & User handled on their pages -----
async function uploadFileToStorage(path, file){
  const ref = storageRef(storage, path);
  await uploadBytes(ref, file);
  return await getDownloadURL(ref);
}

// Driver KYC
if(document.getElementById("btn-driver-kyc")){
  document.getElementById("btn-driver-kyc").onclick = async function(){
    const user = auth.currentUser;
    if(!user) return alert("Login first");
    const name = document.getElementById("d-name").value;
    const phone = document.getElementById("d-phone").value;
    const vehicle = document.getElementById("d-vehicle").value;
    const vdim = document.getElementById("d-vehicle-dims").value;
    const pan = document.getElementById("d-pan").value;
    const rcFile = document.getElementById("d-rc").files[0];
    const selfie = document.getElementById("d-selfie").files[0];
    if(!name||!phone||!pan) return alert("Fill required");
    try{
      const uid = user.uid;
      const data = { name, phone, vehicle, vdim, pan, uid, role: "driver", status: "PENDING", createdAt: Date.now() };
      if(rcFile) data.rcUrl = await uploadFileToStorage("kyc/" + uid + "/rc_" + rcFile.name, rcFile);
      if(selfie) data.selfieUrl = await uploadFileToStorage("kyc/" + uid + "/selfie_" + selfie.name, selfie);
      await setDoc(doc(db, "drivers", uid), data);
      document.getElementById("kyc-result").innerText = "KYC submitted. Admin will review.";
    }catch(e){ alert(e.message); }
  }
}

// User KYC
if(document.getElementById("btn-user-kyc")){
  document.getElementById("btn-user-kyc").onclick = async function(){
    const user = auth.currentUser;
    if(!user) return alert("Login first");
    const name = document.getElementById("u-name").value;
    const phone = document.getElementById("u-phone").value;
    const pan = document.getElementById("u-pan").value;
    const aad = document.getElementById("u-aadhaar").value;
    const selfie = document.getElementById("u-selfie").files[0];
    if(!name||!phone) return alert("Fill required");
    try{
      const uid = user.uid;
      const data = { name, phone, pan, aad, uid, status: "PENDING", createdAt: Date.now() };
      if(selfie) data.selfieUrl = await uploadFileToStorage("kyc/" + uid + "/selfie_" + selfie.name, selfie);
      await setDoc(doc(db, "users", uid), data);
      document.getElementById("u-kyc-result").innerText = "KYC submitted.";
    }catch(e){ alert(e.message); }
  }
}

// Add parcel
if(document.getElementById("btn-add-parcel")){
  document.getElementById("btn-add-parcel").onclick = async function(){
    const user = auth.currentUser;
    if(!user) return alert("Login first");
    const from = document.getElementById("parcel-from").value;
    const to = document.getElementById("parcel-to").value;
    const weight = document.getElementById("parcel-weight").value;
    const dims = document.getElementById("dimensions").value;
    const person = document.getElementById("parcel-person").value;
    const file = document.getElementById("parcel-image").files[0];
    if(!from||!to||!weight) return alert("Fill required");
    try{
      const parcel = { from, to, weight, dims, person, createdBy: user.uid, status: "OPEN", createdAt: Date.now() };
      const docRef = await addDoc(collection(db, "parcels"), parcel);
      if(file){
        const url = await uploadFileToStorage("parcels/" + docRef.id + "/" + file.name, file);
        await updateDoc(doc(db, "parcels", docRef.id), { imageUrl: url });
      }
      document.getElementById("add-result").innerText = "Parcel added — ID: " + docRef.id;
    }catch(e){ alert(e.message); }
  }
}

// Parcel tracking
if(document.getElementById("btn-track")){
  document.getElementById("btn-track").onclick = async function(){
    const id = document.getElementById("track-id").value;
    if(!id) return alert("Enter ID");
    try{
      const d = await getDoc(doc(db, "parcels", id));
      if(!d.exists()) return document.getElementById("track-result").innerText = "Parcel not found";
      const p = d.data();
      document.getElementById("track-result").innerText = "Status: " + p.status + " | From: " + p.from + " → " + p.to;
    }catch(e){ alert(e.message); }
  }
}

// Drivers list
if(document.getElementById("drivers-container")){
  (async ()=>{
    const snap = await getDocs(collection(db, "drivers"));
    const container = document.getElementById("drivers-container");
    container.innerHTML = "";
    snap.forEach(s=>{
      const d = s.data();
      const div = document.createElement("div");
      div.className = "card small";
      div.innerHTML = "<strong>" + (d.name||"Driver") + "</strong><div>Vehicle: " + (d.vehicle||"-") + "</div><div>Phone: " + (d.phone||"-") + "</div><div>Status: " + (d.status||"-") + "</div>";
      container.appendChild(div);
    });
  })();
}

// Chat per parcel (chat.html)
if(document.getElementById("btn-send-msg")){
  document.getElementById("btn-send-msg").onclick = async function(){
    const user = auth.currentUser;
    if(!user) return alert("Login first");
    const parcelId = document.getElementById("chat-parcel-id").value;
    const text = document.getElementById("chat-text").value;
    if(!parcelId||!text) return alert("Enter parcel ID and message");
    try{
      await addDoc(collection(db, "chats"), { parcelId, text, from: user.uid, createdAt: Date.now() });
      document.getElementById("chat-text").value = "";
    }catch(e){ alert(e.message); }
  }

  // realtime listener for selected parcel
  document.getElementById("chat-parcel-id").addEventListener("change", function(){
    const id = this.value;
    const messagesDiv = document.getElementById("messages");
    messagesDiv.innerHTML = "";
    if(!id) return;
    // unsubscribe previous if any (simple approach)
    if(window._chatUnsub) window._chatUnsub();
    const q = query(collection(db, "chats"), where("parcelId", "==", id), orderBy("createdAt"));
    window._chatUnsub = onSnapshot(q, snap=>{
      messagesDiv.innerHTML = "";
      snap.forEach(docSnap=>{
        const m = docSnap.data();
        const el = document.createElement("div");
        el.innerText = (m.from || "anon") + ": " + m.text;
        messagesDiv.appendChild(el);
      });
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
  });
}

// Admin panel (admin.html): only allow if signed in as ADMIN_EMAIL
if(document.getElementById("pending-kyc")){
  onAuthStateChanged(auth, async user=>{
    if(!user || user.email !== ADMIN_EMAIL){
      document.getElementById("pending-kyc").innerText = "Admin access only. Sign in with admin email: " + ADMIN_EMAIL;
      return;
    }
    // load pending drivers
    const snap = await getDocs(collection(db, "drivers"));
    const out = document.getElementById("pending-kyc");
    out.innerHTML = "";
    snap.forEach(s=>{
      const d = s.data();
      if(d.status === "PENDING"){
        const div = document.createElement("div");
        div.className = "card small";
        div.innerHTML = "<strong>" + (d.name||"Driver") + "</strong><div>" + (d.phone||"") + "</div><button data-uid='" + s.id + "' class='approve'>Approve</button> <button data-uid='" + s.id + "' class='reject'>Reject</button>";
        out.appendChild(div);
      }
    });
    // bind actions
    document.addEventListener("click", async function(e){
      if(e.target && e.target.classList.contains("approve")){
        const uid = e.target.getAttribute("data-uid");
        await updateDoc(doc(db, "drivers", uid), { status: "APPROVED", reviewedAt: Date.now() });
        alert("Approved");
      }
      if(e.target && e.target.classList.contains("reject")){
        const uid = e.target.getAttribute("data-uid");
        await updateDoc(doc(db, "drivers", uid), { status: "REJECTED", reviewedAt: Date.now() });
        alert("Rejected");
      }
    });
  });
}

// Simple helper: add a sample driver if none present
(async ()=>{
  try{
    const p = await getDocs(collection(db, "drivers"));
    if(p.size === 0){
      await addDoc(collection(db, "drivers"), { name: "Sample Driver", phone: "+911234567890", vehicle: "Small Van", status: "APPROVED" });
    }
  }catch(e){ console.log(e); }
})();
