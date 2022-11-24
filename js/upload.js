<<<<<<< HEAD
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
const app = initializeApp(firebaseConfig);
const dbService = getFirestore(app);
const authService = getAuth(app);
const storageService = getStorage(app);
=======
import { addDoc, collection,} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService } from "./firebase.js";

// const db = firebase.firestore();
// const storage = firebase.storage();
// const storageRef = firebase.storage().ref();

export const uploading = async (event) => {
    // event.preventDefault();
    // textarea 태그에 연결된 id 값이 "comment"
    // const post = document.getElementById("comment");
    // const { uid, photoURL, displayName } = authService.currentUser;
    
    // var file = document.querySelector('#image').files[0];
    // var 저장할경로 = storageRef.child('image/' + file.name);
    // var 업로드작업 = 저장할경로.put(file)

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;

        
    
    try {
      // addDoc(DB에 저장) API 이용해서 "product" collection에 
      // 다섯 개의 속성(text, nickname...)을 가진 객채를 하나의 Document로 신규 등록함
      await addDoc(collection(dbService, "product"), {
        분류: $('#category').val(),
        제목: $('#title').val(),
        평점: parseInt($('#score').val()),
        내용: $('#content').val(),
        작성일: dateString,
        // 이미지: 
       });
        
       alert('저장완료');

        // 유저 본인의 게시물에만 수정, 삭제 버튼을 나타내기 위해서 uid 값이 필요함
    //     creatorId: uid,
    //     profileImg: photoURL,
    //     nickname: displayName,
>>>>>>> e3b47ab27840b4f7c6970792409b25e68cf85302

    } catch (error) {
         alert(error);
         console.log("error in addDoc:", error);
    };

<<<<<<< HEAD
import {
    ref,
    uploadString,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

import {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    orderBy,
    query,
    getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";




export const uploading = async (event) => {
    event.preventDefault();
    const category = document.getElementById("category")
    const title = document.getElementById("title")
    const content = document.getElementById("content");
    const score = document.getElementById("score")
    // const { uid, photoURL, displayName } = authService.currnetUser.uid

    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = year + '-' + month + '-' + day;

    try {
        await addDoc(collection(dbService, "upload"), {
            카테고리: category.value,
            제목: title.value,
            내용: content.value,
            평점: parseInt(score.value),
            작성일: dateString,
            // 작성자: uid
        });
        alert("등록완료");
    } catch (error) {
        alert(error);
        console.log("error in addDoc:", error);
    }

}

