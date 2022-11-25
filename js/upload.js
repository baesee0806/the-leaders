
import { storageService } from "./firebase.js";
import { dbService } from "./firebase.js";
import { authService } from "./firebase.js";


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
import { v4 as uuidv4 } from "https://jspm.dev/uuid";




export const uploading = async (event) => {

    const imgFile = document.querySelector('#image').files[0]
    const storageRef = ref(storageService, 'post_image/' + uuidv4())
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
                // const { uid, displayName } = authService.currnetUser

                const today = new Date();
                const year = today.getFullYear();
                const month = ('0' + (today.getMonth() + 1)).slice(-2);
                const day = ('0' + today.getDate()).slice(-2);
                const dateString = year + month + day;

                try {
                    addDoc(collection(dbService, "post"), {
                        category: category.value,
                        title: title.value,
                        content: content.value,
                        score: parseInt(score.value),
                        date: parseInt(dateString),
                        // uid: uid,
                        postUrl: photoURL,
                        // nickname: displayName

                    });
                    alert("등록완료");
                } catch (error) {
                    alert(error);
                    console.log("error in addDoc:", error);
                }

            })
        })

}