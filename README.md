# Bills Tracker — Setup Guide

A Progressive Web App (PWA) for tracking bills and managing a fortnightly bills fund.
Installable on iPhone/Android, backed by Firebase.

---

## Step 1 — Set up Firebase (5 minutes)

1. Go to https://console.firebase.google.com and sign in with a Google account
2. Click **Add project** → give it a name (e.g. "bills-tracker") → Create project
3. On the project overview, click the **</>** (Web) icon → Register app → name it "Bills Tracker"
4. Copy the `firebaseConfig` object shown — you'll need it shortly
5. In the left sidebar, go to **Authentication** → Get started → Sign-in method → Enable **Google**
6. Go to **Firestore Database** → Create database → Start in **production mode** → choose a region
7. Go to **Firestore → Rules** and paste these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

8. Click **Publish**

---

## Step 2 — Configure the app

Open `firebase-config.js` and replace the placeholder values with your actual Firebase config:

```js
const firebaseConfig = {
  apiKey:            "your-actual-api-key",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123:web:abc123"
};
```

---

## Step 3 — Add icons

Generate icons at https://favicon.io (use text "💰" or upload a logo):
- Download and place `icon-192.png` and `icon-512.png` in the `/icons/` folder

---

## Step 4 — Deploy to GitHub Pages

1. Create a new GitHub repo (e.g. `bills-tracker`)
2. Push all files to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial bills tracker"
   git remote add origin https://github.com/YOUR_USERNAME/bills-tracker.git
   git push -u origin main
   ```
3. Go to repo Settings → Pages → Source: **Deploy from branch** → branch: `main` / folder: `/ (root)`
4. Your app will be live at `https://YOUR_USERNAME.github.io/bills-tracker`

---

## Step 5 — Add Firebase authorised domain

1. In Firebase Console → Authentication → Settings → Authorised domains
2. Add your GitHub Pages URL: `YOUR_USERNAME.github.io`

---

## Step 6 — Install on phone

**iPhone:** Open the URL in Safari → tap the Share button → **Add to Home Screen**
**Android:** Open in Chrome → tap the three-dot menu → **Add to Home Screen** (or Chrome will prompt automatically)

---

## File structure

```
bills-tracker/
├── index.html          ← Main app (all HTML, CSS, JS)
├── manifest.json       ← PWA manifest
├── sw.js               ← Service worker (offline support)
├── firebase-config.js  ← Your Firebase credentials
├── icons/
│   ├── icon-192.png    ← Add this (see Step 3)
│   └── icon-512.png    ← Add this (see Step 3)
└── README.md
```

---

## How the Bills Fund works

**Steady state** — the amount she needs to contribute every fortnight once fully caught up.
This equals the sum of all bills converted to their fortnightly equivalent.

**Current liability** — what the bills account *should* contain right now.
Calculated per bill based on how far through the current billing cycle we are.
e.g. A $900 quarterly bill due in 30 days → 61 days into a 91-day cycle → $598 should be set aside.

**Shortfall** — the gap between current liability and actual balance.
If she's behind, a catch-up top-up is added to her fortnightly contribution for 1–4 fortnights.
Once caught up, the contribution automatically drops back to steady state.
