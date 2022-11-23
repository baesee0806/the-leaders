import { authService } from "./firebase.js";
import { socialLogin } from "./auth.js";
import { logout } from "./auth.js";
import { handleLocation,route } from "./router.js";
import { handleAuth } from "./auth.js"

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);
// 첫 랜딩 또는 새로고침 시 처리
// document.addEventListener("DOMContentLoaded", handleLocation);
// 첫 랜딩 또는 새로고침 시 handleLocation 실행하여 화면 변경
document.addEventListener("DOMContentLoaded",  () => {
    // Firebase 연결상태를 감시
    authService.onAuthStateChanged((user) => {
      // Firebase 연결되면 화면 표시
      handleLocation();
    //   const hash = window.location.hash;
      if (user) {
        // 로그인 상태이므로 항상 팬명록 화면으로 이동
        document.querySelector('#log__inout').innerText = '로그아웃'
    
    } else {
        // 로그아웃 상태이므로 로그인 화면으로 강제 이동
        
      }
    });
  });

  document.querySelector('#log__inout').addEventListener('click',()=> {
    if( document.querySelector('#log__inout').innerText === '로그아웃'){
        logout()
    }
  })


// 전역함수 리스트 
window.route = route;
window.handleAuth = handleAuth;
window.socialLogin = socialLogin;
window.logout = logout