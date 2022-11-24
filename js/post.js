import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
  getDoc,
  where,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {
  getPostContent();
});

export const getPostContent = async () => {
  let createdObjpost = []; //작성했던 게시글 이라는 배열을 생성
  const postContainer = document.getElementById("component__page");
  postContainer.innerHTML = "";

  // const q = query(
  //   collection(dbService, "upload"),
  //   where("제목", "==", "1")
  //   //클릭한 게시물을 post를 통해 져온다.
  //   // orderBy("createAt", "")
  // );
  // const querySnapshot = await getDocs(q);
  const docRef = doc(dbService, "post", "E8ZxOYSHUfSX9Z58QJse");
  const docSnap = await getDoc(docRef);
  docSnap.data();
  console.log(docSnap.data());
  const {
    title,
    kategory,
    creatorNickname,
    creatorProfileImg,
    date,
    postUrl,
    content,
  } = docSnap.data();

  // if (querySnapshot.exists) {
  //   for (let doc in querySnapshot.data()) {
  //     console.log(`key:${doc}, value : ${querySnapshot.data()[doc]}`);
  //   }
  // } else {
  //   console.log("No such document!");
  // }
  const html = `
  <article class="foodContent__wrap">
    <section class="foodContent__post-Header">
      <section class="foodContent__get-title">
        ${title}
        <span>( 카테고리 : ${kategory} )</span>
      </section>
    </section>
    <!-- 프로필 이미지 닉네임 작성시간 -->
    <div class="foodContent__user-Date">
      <div>
        <img
          class="foodContent__user-img"
          src="${creatorProfileImg}"
          alt="userimg"
        />
      </div>
      

      <div class="foodContent__user-Name">${creatorNickname}</div>
      <div class="foodContent__register-Date">작성일 : ${date}</div>
    </div>
    <!--현재 페이지 URL을 로드-->
    <div class="foodContent__post-Url">
      <div id="Content-Url">${postUrl}</div>
      <div
        class="foodContent__post-Url-clip"
        onclick="urlClip(); return false;"
      >
        <img
          src="/img/file_copy_FILL0_wght400_GRAD0_opsz48.png"
          class="url-lmg"
          alt="copy"
        />
      </div>
    </div>
    <!-- Top scroll button -->
    <button onclick="topFunction()" id="top__scroll-Btn" title="Go to top">
      Top
    </button>
    <!-- 게시글 내용 란 -->
    <section class="foodContent__post-Content">
      <div class="foodContent__contents">
        <div>
         ${content}
        </div>
      </div>
    </section>
    <!-- 좋아요 게시글 수정,  삭제버튼-->
    <section>
      <div class="foodContent__btn-wrap">
        <button type="button" class="foodContent__post-like">공감해요</button>
        <button type="button" class="foodContent__post-revert">수정</button>
        <button type="button" class="foodContent__post-del">삭제</button>
      </div>
    </section>
    <!-- 댓글 창 -->
    <textarea class="comment" placeholder="댓글을 입력해주세요 :)"></textarea>
    <!-- 댓글 수정, 삭제 -->
    <div class="comment__btn-wrap">
      <button onclick="save_comment(event)" type="button" class="comment__sumit">작성</button>
      <button type="button" class="comment__del">삭제</button>
    </div>
  </article>
    `;

  const div = document.createElement("div");
  div.innerHTML = html;
  postContainer.appendChild(div);
  // });
};;

// const q = query(collection(dbService, "post"), where("createdId", "==", true));
// // post라는 컬렉션의 문서 중 createdId이라는 key의 값이 true인 문서들만 담기

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });