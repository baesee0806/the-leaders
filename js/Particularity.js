window.onload = function () {
  //해당 페이지 링크 표기
  const contentUrl = document.getElementById("Content-Url");
  if (contentUrl) {
    contentUrl.innerHTML = window.location.href;
  }
};
export function urlClip() {
  var url = ""; //<a>태그에서 호출한 urlClip 함수 생성.
  var textarea = document.createElement("textarea"); // url 변수 생성, textarea 변수에 textarea 요소생성
  document.body.appendChild(textarea); //</body> 바로위에 textarea 추가
  url = window.document.location.href; //현재 주소값 삽입.
  textarea.value = url; // textarea 값에 url 삽입
  textarea.select(); // textarea 설정
  document.execCommand("copy"); //복사
  document.body.removeChild(textarea); //extarea 요소를 삭제
  alert("URL이 복사되었습니다."); // 복사alert팝업
}

// Top scroll button
//버튼 가져오기
let mybutton = document.getElementById("top__scroll-Btn");

// 버튼 표시 조건 (40px 아래로 이동 시)
window.onscroll = function () {
  scrollFunction();
};

export function scrollFunction() {
  if (mybutton) {
    if (
      document.body.scrollTop > 40 ||
      document.documentElement.scrollTop > 40
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
}

// 버튼 click 시 게시글의 Top으로 이동
export function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// 댓글 등록
