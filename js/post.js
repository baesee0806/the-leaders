import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
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
  const q = query(
    collection(dbService, "post") //클릭한 게시물을 post를 통해 가져온다.
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const {
      postTitle,
      createdAt,
      creatorId,
      creatorNickname,
      creatorProfileImg,
      postBody,
      postUrl,
    } = data;
    console.log(
      "🚀 ~ file: post.js ~ line 22 ~ querySnapshot.forEach ~ data",
      data
    );
    const html = `
  <article class="foodContent__wrap">
    <section class="foodContent__post-Header">
      <section class="foodContent__get-title">
        ${postTitle}
      </section>
    </section>
    <!-- 프로필 이미지 닉네임 작성시간 -->
    <div class="foodContent__user-Date">
      <div>
        <img
          class="foodContent__user-img"
          src="${creatorProfileImg}.png"
          alt="userimg"
        />
      </div>

      <div class="foodContent__user-Name">${creatorNickname}</div>
      <!-- 5분전, 1시간전, 5일전 표현 고려 -->
      <div class="foodContent__register-Date">작성일 : ${createdAt}</div>
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
         ${postBody}
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
      <button type="button" class="comment__sumit">작성</button>
      <button type="button" class="comment__del">삭제</button>
    </div>
  </article>
    `;

    const div = document.createElement("div");
    div.innerHTML = html;
    postContainer.appendChild(div);
  });
};

// const q = query(collection(dbService, "post"), where("createdId", "==", true));
// // post라는 컬렉션의 문서 중 createdId이라는 key의 값이 true인 문서들만 담기

// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
//   // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
// });

console.log("포스트 상세 페이지입니다");
