// -----------------------------
// YOUR FIREBASE CONFIG
// -----------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAVKm5n5o8KDxQ7mlvxfTsJdLRiTt-dKss",
  authDomain: "blavladelivery-c4175.firebaseapp.com",
  projectId: "blavladelivery-c4175",
  storageBucket: "blavladelivery-c4175.firebasestorage.app",
  messagingSenderId: "1092623155522",
  appId: "1:1092623155522:web:b5f26905a40c505c2248db",
  measurementId: "G-RDV0D4TPG7"
};

// -----------------------------
// INIT
// -----------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

// TEMP AUTO LOGIN (So website works without login)
auth.signInAnonymously();

// -----------------------------
// MULTI FILE UPLOAD FUNCTION
// -----------------------------
async function uploadFile(userId, file, name) {
  const refPath = storage.ref().child(`kyc/${userId}/${name}`);
  await refPath.put(file);
  return await refPath.getDownloadURL();
}

// -----------------------------
// SUBMIT KYC
// -----------------------------
async function submitKyc() {
  const user = auth.currentUser;
  if (!user) return alert("User not logged in");

  const userId = user.uid;
  const name = document.getElementById("name").value;

  // Collect all files
  const files = {
    aadhaarFront: document.getElementById("aadhaarFront").files[0],
    aadhaarBack: document.getElementById("aadhaarBack").files[0],
    rcFront: document.getElementById("rcFront").files[0],
    rcBack: document.getElementById("rcBack").files[0],
    selfie: document.getElementById("selfie").files[0],
  };

  if (!name) return alert("Name required");

  for (let key in files) {
    if (!files[key]) return alert(`Please upload: ${key}`);
  }

  document.body.innerHTML += "<p>Uploading... Please wait.</p>";

  const urls = {};

  for (let key in files) {
    urls[key] = await uploadFile(userId, files[key], key + ".jpg");
  }

  // SAVE IN FIRESTORE
  await db.collection("userKYC").doc(userId).set({
    userId,
    name,
    documents: urls,
    status: "PENDING",
    submittedAt: new Date().toISOString()
  });

  alert("KYC Submitted Successfully!");
}
