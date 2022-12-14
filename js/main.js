import { authService } from "./firebase.js";
import { route , handleLocation } from "./router.js";
import { goToProfile } from "./header.js";
import { uploading } from "./upload.js";
import { handleAuth, socialLogin, logout } from "./auth.js"
import { changeProfileImage, changeProfileNickname, onFileChange, nicknameBtn, getmypagelist } from "./profile.js";
import { urlClip, topFunction } from "./Particularity.js";
import { getpagelist } from "./mainpage.js"


// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);
// 첫 랜딩 또는 새로고침 시 처리
// document.addEventListener("DOMContentLoaded", handleLocation);
// 첫 랜딩 또는 새로고침 시 handleLocation 실행하여 화면 변경
document.addEventListener("DOMContentLoaded", () => {
  // Firebase 연결상태를 감시
  authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    handleLocation();
    //   const hash = window.location.hash;
    if (user) {
      // 로그인 상태이므로 항상 팬명록 화면으로 이동
      // document.querySelector('#log__inout').innerText = '로그아웃'
      // window.location.hash="/"
      document.querySelector(".header__end").style.display = 'none'
      document.querySelector(".header__end--logout").style.display = 'inline'
      //alert("로그인 상태");
      // 이미지, 닉네임 변경 시 업데이트 해주는 역할
        document.getElementById("headerProfileView").src =
        user.auth.currentUser.photoURL || "/assets/blankProfile.webp";
      
        // 프로필 이미지 변경했을 때 헤더의 이미지도 변경해 주기  
      document.getElementById("headerProfileView").src =
        authService.currentUser.photoURL ?? "/assets/blankProfile.webp";

      // document.getElementById("profileView").src =
      //   user.auth.currentUser.photoURL || "/assets/blankProfile.webp";
      // document.getElementById("profileNickname_val").textContent =
      //   user.auth.currentUser.displayName || "닉네임 없음";
      // document.getElementById("profileEmail").textContent =
      //   user.email ?? "이메일 없음";     
    } else {
      // 로그아웃 상태이므로 로그인 화면으로 강제 이동
      // window.location.hash="/"
    }
  });
});


// 전역함수 리스트 
window.route = route;
window.handleAuth = handleAuth;
window.socialLogin = socialLogin;
window.logout = logout;

window.onFileChange = onFileChange;
window.changeProfileImage = changeProfileImage;
window.changeProfileNickname = changeProfileNickname;
window.nicknameBtn = nicknameBtn;
window.handleLocation = handleLocation;

window.uploading = uploading;
window.route = route;
window.urlClip = urlClip;
window.topFunction = topFunction;
// window.scrollFunction = scrollFunction;
// window.delete_comment = delete_comment;

window.authService = authService;
window.getpagelist= getpagelist;
window.goToProfile = goToProfile;
window.getmypagelist = getmypagelist