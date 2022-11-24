// // Import the functions you need from the SDKs you need
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
// import { getStorage} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { storageService } from "./firebase.js";
import { dbService } from "./firebase.js";
import { authService } from "./firebase.js";
// // 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
// const firebaseConfig = {
//   apiKey: "AIzaSyB3MMTH8QP9Lkb0sV-LSdbxzhWvkEYtvJk",
//   authDomain: "the-leaders-65e8b.firebaseapp.com",
//   projectId: "the-leaders-65e8b",
//   storageBucket: "the-leaders-65e8b.appspot.com",
//   messagingSenderId: "64173971484",
//   appId: "1:64173971484:web:429786c568e80ed13b27d9",
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const dbService = getFirestore(app);
// export const authService = getAuth(app);
// export const storageService = getStorage(app);


import {
    ref,
    uploadString,
    getDownloadURL,
    deleteObject,
    uploadBytes,
    uploadBytesResumable
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

    const imgFile = document.querySelector('#image').files[0]
    const storageRef = ref(storageService, 'image/' + imgFile.name)
    const uploadfile = uploadBytes(storageRef, imgFile)
    const uploadTask = uploadBytesResumable(storageRef, imgFile)

    uploadTask.on('state_change',
        // 변화시 동작하는 함수
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done')
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }

        },
        //에러시 동작하는 함수
        (error) => {
            console.error("실패사유는:", error);
        },
        //성공시 동작하는 함수 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((photoURL) => {
                console.log('업로드된 경로는:', photoURL);
                const category = document.getElementById("category")
                const title = document.getElementById("title")
                const content = document.getElementById("content");
                const score = document.getElementById("score")
                const { uid, photoURL, displayName } = authService.currnetUser

                const today = new Date();
                const year = today.getFullYear();
                const month = ('0' + (today.getMonth() + 1)).slice(-2);
                const day = ('0' + today.getDate()).slice(-2);
                const dateString = year + '-' + month + '-' + day;

                try {
                    addDoc(collection(dbService, "post"), {
                        카테고리: category.value,
                        제목: title.value,
                        내용: content.value,
                        평점: parseInt(score.value),
                        작성일: parseInt(dateString),
                        작성자: uid,
                        이미지: photoURL,
                        닉네임: displayName

                    });
                    alert("등록완료");
                } catch (error) {
                    alert(error);
                    console.log("error in addDoc:", error);
                }

            })
        })

}