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

    } catch (error) {
         alert(error);
         console.log("error in addDoc:", error);
    };

};
