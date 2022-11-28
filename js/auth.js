import { emailRegex, pwRegex } from "./util.js";
import { authService } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import {
    GoogleAuthProvider,
    signInWithPopup,
    GithubAuthProvider,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
  

export function handleAuth(event){
    if(document.querySelector('#signup__btn').innerText === '가입하기'){
      
    event.preventDefault()
    const signUpEmail = document.getElementById('signup__email').value
    const signUpPassword = document.getElementById('signup__pw').value
    // const signUpNickname = document.getElementById('signup__nick').value

    createUserWithEmailAndPassword(authService, signUpEmail, signUpPassword)
        .then((userCredential) => {
          
          // 회원가입 시 닉네임 저장하기
          const signUpNickname = document.getElementById('signup__nick').value;
          updateProfile(authService.currentUser, {
            displayName: signUpNickname ? signUpNickname : null,
            photoURL: "/assets/blankProfile.webp" ? "/assets/blankProfile.webp" : null
          })     

          // 회원가입 시 입력한 닉네임 DB에 저장하기
          // const signUpNickname = document.getElementById('signup__nick').value
          // authService.currentUser.displayName = signUpNickname;
        
          console.log(userCredential)
          const user = userCredential.user;
          window.location.hash = "/";

          console.log(user)
          Swal.fire({
              title: '회원가입 완료"',
              icon: 'success',
              confirmButtonColor: '#94D493', // confrim 버튼 색깔 지정
              confirmButtonText: 'OK',
            });
        })

        .catch((error) => {
            console.log('error')
            const errorCode = error.code;
            const errorMessage = error.message;
        });
        
}else{
    event.preventDefault();
    const email = document.getElementById("signin__email");
    const emailVal = email.value;
    const pw = document.getElementById("signin__pw");
    const pwVal = pw.value;
  
    // 유효성 검사 진행
    if (!emailVal) {
      alert("이메일을 입력해 주세요");
      // Swal.fire({
      //   title: "이메일을 입력해 주세요",
      //   confirmButtonColor: "#94D493",
      // });
      
      email.focus();
      return;
    }
    if (!pwVal) {
      // alert("비밀번호를 입력해 주세요");
      Swal.fire({
        title: "비밀번호를 입력해 주세요",
        confirmButtonColor: "#94D493",
      });
      pw.focus();
      return;
    }
  
    const matchedEmail = emailVal.match(emailRegex);
    const matchedPw = pwVal.match(pwRegex);
  
    if (matchedEmail === null) {
      // alert("이메일 형식에 맞게 입력해 주세요");
      Swal.fire({
        title: "이메일 형식에 맞게 입력해 주세요",
        confirmButtonColor: "#94D493",
      });
      
      email.focus();
      return;
    }
    if (matchedPw === null) {
      // alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      Swal.fire({
        title: "비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.",
        confirmButtonColor: "#94D493",
      });
      pw.focus();
      return;
    }
    
    //로그인
    console.log("로그인이에요")
    event.preventDefault()
    const signInEmail = document.getElementById('signin__email').value
    const signInPassword = document.getElementById('signin__pw').value
    signInWithEmailAndPassword(authService, signInEmail, signInPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(userCredential)
            window.location.href = "/";
            // document.querySelector('#log__inout').innerText = '로그아웃'
            headerEndEl.style.display = 'none'
            headerEndLogoutEl.style.display = 'inline'


        })
        .catch((error) => {
            console.log('로그인 실패')
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}}


export const socialLogin = (str) => {
    let provider;
    if (str === "google") {
      provider = new GoogleAuthProvider();
    } else if (str === "github") {
      provider = new GithubAuthProvider();
    }
    signInWithPopup(authService, provider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("error:", error);
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  export const logout = () => {
    signOut(authService)
      .then(() => {
        // Sign-out successful.
        localStorage.clear();
        console.log("로그아웃 성공");
        window.location.href = "/"
        headerEndEl.style.display = 'inline'
        headerEndLogoutEl.style.display = 'none'
    })
      .catch((error) => {
        // An error happened.
        console.log("error:", error);
      });
  };
  