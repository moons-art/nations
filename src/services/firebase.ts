import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLmZfYdJAQu4x2OAYrdP29yOooLXTzHeo",
  authDomain: "nations-ym.firebaseapp.com",
  projectId: "nations-ym",
  storageBucket: "nations-ym.firebasestorage.app",
  messagingSenderId: "949990892606",
  appId: "1:949990892606:web:e225b84491c243c80b1d6f",
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
