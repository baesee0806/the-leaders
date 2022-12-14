import { authService } from "./firebase.js";
import { getpagelist } from "./mainpage.js";
import { getmypagelist } from "./profile.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  // 키: 값
  404: "/pages/404.html",
  '/': "/pages/mainpage.html",
  upload: "/pages/upload.html",
  login: "/pages/login__page.html",
  membership: "/pages/membership.html",
  profile: "/pages/profile.html",
  // post: "/pages/post.html",
  edit: "/pages/edit.html",
};
// www.mysite.com/#post 도착하면
// "/pages/particularity.html" 보여주세요

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", ""); //#about -> about
  // #post => post
  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length === 0) {
    path = "/";
    
  }

  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("component__page").innerHTML = html;

  // 현재 띄워진 화면에서만 DOM 조작 가능
  // 꼭 handleLocation 안에서 if문으로 path(어떤 화면인지)를 선택해야 함
  if (path === "/" ) {
    // 프로필 이미지 변경했을 때 헤더의 이미지도 변경해 주기
    // document.getElementById("headerProfileView").src =
    //   authService.currentUser.photoURL ?? "/assets/blankProfile.webp";

    getpagelist()
  }

  if (path === "profile") {
    console.log(authService)
    getmypagelist()

    // 프로필 관리 화면일 때 현재 프로필 사진, 닉네임, 이메일 주소 띄우기
    document.getElementById("profileView").src =
      authService.currentUser.photoURL ?? "/assets/blankProfile.webp";
    document.getElementById("profileNickname_val").textContent =
      authService.currentUser.displayName ?? "닉네임 없음";
    document.getElementById("profileEmail").textContent =
      authService.currentUser.email ?? "이메일 없음";  
      
  };

};

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);
window.route = route;
// 첫 랜딩 또는 새로고침 시 처리
// document.addEventListener("DOMContentLoaded", handleLocation);