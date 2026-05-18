// ============================================================
// FIREBASE CONFIGURATION
// ============================================================
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (e.g. "bills-tracker")
// 3. Add a Web app — click the </> icon on the project overview
// 4. Copy your firebaseConfig object and paste it below
// 5. In the Firebase console, enable:
//    - Authentication → Sign-in method → Google
//    - Firestore Database → Create database (start in production mode)
//    - Firestore Rules → paste the rules from README.md
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyCXlHapYgdDJydThbtZUOMe1_5ZA0q2n_k",
  authDomain: "bills-tracker-bf287.firebaseapp.com",
  projectId: "bills-tracker-bf287",
  storageBucket: "bills-tracker-bf287.firebasestorage.app",
  messagingSenderId: "645483821490",
  appId: "1:645483821490:web:15ab977063805dfc024cab",
  measurementId: "G-MM9VT9V22L"
};

firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);