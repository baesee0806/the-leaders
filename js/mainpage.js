import { authService, dbService, storageService } from "./firebase.js";

import {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    orderBy,
    query,
    getDocs,
    where
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";




export const getpagelist = async (event) => {

    const querySnapshot = await getDocs(collection(dbService, 'post')).then((결과) => {
        결과.forEach((doc) => {
            const 템플릿 = ` <div class="product">
      <div class="thumbnail" style="background-image: url('${doc.data().postUrl}')"></div>
      <div class="flex-grow-1 p-4">
        <h5 class="title"><a href="#post?uid=${doc.data().uid}" onclick="querySnapshot()">${doc.data().title}</a></h5>
        <p class="date">${doc.data().date}</p>
        <p class="price">${doc.data().score}점</p>
        <p class="float-end">❤️0</p>
      </div>
    </div>`
            $('.container').append(템플릿)
        })
    })




    console.log("test");
    
}
