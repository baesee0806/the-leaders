export const handleAuth = (event) => {
    event.preventDefault();
    const email = document.getElementById("id");
    const emailVal = email.value;
    const pw = document.getElementById("pw");
    const pwVal = pw.value;
  
    // 유효성 검사 진행
    if (!emailVal) {
      alert("이메일을 입력해 주세요");
      email.focus();
      return;
    }
    if (!pwVal) {
      alert("비밀번호를 입력해 주세요");
      pw.focus();
      return;
    }
  
    const matchedEmail = emailVal.match(emailRegex);
    const matchedPw = pwVal.match(pwRegex);
  
    if (matchedEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요");
      email.focus();
      return;
    }
    if (matchedPw === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pw.focus();
      return;
    }
  
    // 유효성 검사 통과 후 로그인 또는 회원가입 API 요청
    const authBtnText = document.querySelector("#login__btn--area-submit").value;
    if (authBtnText === "로그인") {
      // 유효성검사 후 로그인 성공 시 팬명록 화면으로
  
      signInWithEmailAndPassword(authService, emailVal, pwVal)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          window.location.hash = "#로그인후 페이지";
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log("errorMessage:", errorMessage);
          if (errorMessage.includes("user-not-found")) {
            alert("가입되지 않은 회원입니다.");
            return;
          } else if (errorMessage.includes("wrong-password")) {
            alert("비밀번호가 잘못 되었습니다.");
          }
        });
    } else {
      // 회원가입 버튼 클릭의 경우
      createUserWithEmailAndPassword(authService, emailVal, pwVal)
        .then((userCredential) => {
          // Signed in
          console.log("회원가입 성공!");
          // const user = userCredential.user;
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log("errorMessage:", errorMessage);
          if (errorMessage.includes("email-already-in-use")) {
            alert("이미 가입된 이메일입니다.");
          }
        });
    }
  };