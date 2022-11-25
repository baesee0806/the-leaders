
import { storageService } from "./firebase.js";
import { dbService } from "./firebase.js";
import { authService } from "./firebase.js";

import {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    orderBy,
    query,
    getDocs,
    getDoc
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";





export const editing = async (event) => {


    const 쿼리스트링 = new URLSearchParams(window.location.search)
    console.log(쿼리스트링.get('id'))
    
    const docRef = doc(dbService, "post", "Uv30N3tKOIR5UUq3jgJw");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        // const template = 0
        
        // $('#title').val(docSnap.data().제목)
        // $('#content').val(docSnap.data().내용)
        // $('#price').val(docSnap.data().평점)
    
    
    
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    // db.collection('post').doc(쿼리스트링.get('id')).get().then((result) => {
    //     console.log(result.data());
    //     $('#title').val(result.data().제목)
    //     $('#content').val(result.data().내용)
    //     $('#price').val(result.data().가격)
    // })
    // $('#send').click(() => {
    //     var 바꿀꺼 = {
    //         제목: $('#title').val(),
    //         내용: $('#content').val(),
    //         가격: $('#price').val()
    //     }
    //     db.collection('post').doc(쿼리스트링.get('id')).update(바꿀꺼).then(() => {
    //         alert('수정완료')
    //         window.location.href = '/detail.html?id=' + 쿼리스트링.get('id')
    //     })
    // })
}
