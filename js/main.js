// import { authService } from "./firebase.js";
import { route , handleLocation } from "./router.js";
import { onToggle , toLogout , toWrite , goToProfile } from "./header.js";
import { getCardlist } from "./mainpage.js"

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);
// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", handleLocation);

// 전역함수 리스트 
window.route = route;
window.onToggle = onToggle;
window.toLogout = toLogout;
window.toWrite = toWrite;
window.goToProfile = goToProfile;
window.getCardlist = getCardlist;