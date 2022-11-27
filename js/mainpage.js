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
            let dates = doc.data().date.toString()
            const 템플릿 = `
        <a href="/post.html?id=${doc.id}"> 
            <div class="product">
            <div class="thumbnail" style="background-image: url('${doc.data().contentImgUrl}')"></div>
                <div class="description">
                    <h5 class="title">${doc.data().title}</h5>
                    <p class="nicknames">${doc.data().nickname}님의 오늘의 먹을텐데</p>
                    <p class="date">${dates.slice(0,4)}-${dates.slice(4,6)}-${dates.slice(6)}</p>
                </div>
            </div></a>`
            $('.container').append(템플릿)
        })
    })

    console.log("test");   
}

