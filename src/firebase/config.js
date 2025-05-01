import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE,
  messagingSenderId: import.meta.env.VITE_MESSAGE,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Giriş (email + Google için)
export const auth = getAuth(app);

// Firestore veritabanı
export const db = getFirestore(app);

// Storage (görsel/video dosyaları için)
export const storage = getStorage(app);
