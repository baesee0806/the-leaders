import { authService, dbService, storageService } from "./firebase.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  ref,
  uploadString,
  getDownloadURL,
  deleteObject,
  uploadBytes,
  uploadBytesResumable,
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
  const imgFile = document.querySelector("#image").files[0];
  const storageRef = ref(storageService, "post_image/" + uuidv4());
  // const uploadfile = uploadBytes(storageRef, imgFile)
  const uploadTask = uploadBytesResumable(storageRef, imgFile);

  document.getElementById("send").disabled = true;

  uploadTask.on(
    "state_change",
    // 변화시 동작하는 함수
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    //에러시 동작하는 함수
    (error) => {
      console.error("실패사유는:", error);
    },
    //성공시 동작하는 함수
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((contentImgUrl) => {
        console.log("업로드된 경로는:", contentImgUrl);
        const category = document.getElementById("category");
        const title = document.getElementById("title");
        const content = document.getElementById("content");
        const { uid, displayName, photoURL } = authService.currentUser;
        console.log(authService.currentUser);
        function addZero(i) {
          if (i < 10) {
            i = "0" + i;
          }
          return i;
        }
        const today = new Date();
        const year = today.getFullYear();
        const month = ("0" + (today.getMonth() + 1)).slice(-2);
        const day = ("0" + today.getDate()).slice(-2);
        const h = addZero(today.getHours());
        const m = addZero(today.getMinutes());
        const s = addZero(today.getSeconds());
        const dateString = year + month + day + h + m + s;

        try {
          addDoc(collection(dbService, "post"), {
            category: category.value,
            title: title.value,
            content: content.value,
            date: parseInt(dateString),
            uid: uid,
            contentImgUrl: contentImgUrl,
            nickname: displayName,
            profileImage: photoURL ? photoURL : "/assets/blankProfile.webp",
            time: parseInt(today),
          });
        //   alert("등록완료");
          Swal.fire({
            title: "등록완료",
            confirmButtonColor: "#94D493",
          });
  
          
          window.location.hash = "#";
        } catch (error) {
        //   alert(error);
          Swal.fire({
            title: "등록에 실패했습니다",
            confirmButtonColor: "#94D493",
          });
          console.log("error in addDoc:", error);
        }
      });
    }
  );
};
