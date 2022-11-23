// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyDDdTEEJKUUF1o4u_MSWq9QMrmZobL7U4U",
  authDomain: "the-leaders-test.firebaseapp.com",
  databaseURL: "https://the-leaders-test-default-rtdb.firebaseio.com",
  projectId: "the-leaders-test",
  storageBucket: "the-leaders-test.appspot.com",
  messagingSenderId: "399981586166",
  appId: "1:399981586166:web:7a65ed04f2f2c922fd6ed7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);