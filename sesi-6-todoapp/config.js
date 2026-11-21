import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBwZAcbA7vTBoyUEZqfSlKLBsGPyPwV-s4",
  authDomain: "todosappfirebase.firebaseapp.com",
  projectId: "todosappfirebase",
  storageBucket: "todosappfirebase.firebasestorage.app",
  messagingSenderId: "88287311687",
  appId: "1:88287311687:web:69dcd3c07ffe6bb5fa3e62",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);