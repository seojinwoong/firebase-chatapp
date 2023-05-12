import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDdytUPhspeXvgkYdTPsNmeDkoVw6oAcD4",
  authDomain: "portfolio-firebase-chatapp.firebaseapp.com",
  projectId: "portfolio-firebase-chatapp",
  storageBucket: "portfolio-firebase-chatapp.appspot.com",
  messagingSenderId: "203990436650",
  appId: "1:203990436650:web:e10aa3c644f0617881ec53",
  measurementId: "G-YC6EZSD9V1"
};

const app = initializeApp(firebaseConfig);

export default app;