// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyB3MMTH8QP9Lkb0sV-LSdbxzhWvkEYtvJk",
  authDomain: "the-leaders-65e8b.firebaseapp.com",
  projectId: "the-leaders-65e8b",
  storageBucket: "the-leaders-65e8b.appspot.com",
  messagingSenderId: "64173971484",
  appId: "1:64173971484:web:429786c568e80ed13b27d9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);