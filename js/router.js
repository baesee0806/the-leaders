import { authService } from "./firebase.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  404: "/pages/404.html",
  '/': "/pages/main.html",
  write: "/pages/write.html",
  login: "/pages/login__page.html",
  membership:"/pages/membership.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", ""); //#about -> about

  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length === 0) {
    path = "/";
  }
  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById("component__page").innerHTML = html;
};


// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);
window.route = route;
// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", handleLocation);