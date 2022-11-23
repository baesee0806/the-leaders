export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  404: "/pages/404.html",
  '/': "/pages/mainpage.html",
  upload: "/pages/upload.html",
  login: "/pages/login.html",
  profile: "/pages/profile.html"
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