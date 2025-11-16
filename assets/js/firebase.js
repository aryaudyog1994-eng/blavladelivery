// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAVKm5n5o8KDxQ7mlvxfTsJdLRiTt-dKss",
  authDomain: "blavladelivery-c4175.firebaseapp.com",
  projectId: "blavladelivery-c4175",
  storageBucket: "blavladelivery-c4175.firebasestorage.app",
  messagingSenderId: "1092623155522",
  appId: "1:1092623155522:web:b5f26905a40c505c2248db",
  measurementId: "G-RDV0D4TPG7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.getAnalytics(app);

// Firebase Services
const auth = firebase.getAuth();
const db = firebase.getFirestore();
const storage = firebase.getStorage();

console.log("🔥 Firebase Connected Successfully!");
