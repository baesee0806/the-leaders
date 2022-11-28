// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";


// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyBxGYfOUnrpWSO71HG_iN4f6rRaKEgfYqk",
  authDomain: "nwitter-51c1f.firebaseapp.com",
  projectId: "nwitter-51c1f",
  storageBucket: "nwitter-51c1f.appspot.com",
  messagingSenderId: "419695487451",
  appId: "1:419695487451:web:7955a904f17e968901dffe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);




