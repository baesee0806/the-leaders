import { addDoc, collection } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "./firebase.js";

export const uploading = async (event) => {
    event.preventDefault();
    const category = document.getElementById("category")
    const title = document.getElementById("title")
    const content = document.getElementById("content");
    const score = document.getElementById("score")
    const { uid, email, displayName } = authService.currentUser;

    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const dateString = year + '-' + month + '-' + day;

    try {
        await addDoc(collection(dbService, "post"), {
            카테고리: category.value,
            제목: title.value,
            내용: content.value,
            평점: parseInt(score.value),
            작성일: dateString,
            이메일: email,
        });
        alert("등록완료");
        console.log(authService)
    } catch (error) {
        alert(error);
        console.log("error in addDoc:", error);
    }

}

