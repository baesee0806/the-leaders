
import { authService } from "./firebase.js";


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";


export function handleAuth(event){
    if(document.querySelector('#signup__btn').innerText === '가입하기'){

    event.preventDefault()
    const signUpEmail = document.getElementById('signup__email').value
    const signUpPassword = document.getElementById('signup__pw').value
    const signUpNickname = document.getElementById('signup__pw').value

    createUserWithEmailAndPassword(authService, signUpEmail, signUpPassword)
        .then((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user;
            console.log(user)
         
        })
        .catch((error) => {
            console.log('error')
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}else{
//로그인
    event.preventDefault()
    const signInEmail = document.getElementById('signin__email').value
    const signInPassword = document.getElementById('signin__pw').value
    signInWithEmailAndPassword(authService, signInEmail, signInPassword)
        .then((userCredential) => {
            console.log(userCredential)
            const user = userCredential.user;
            
        })
        .catch((error) => {
            console.log('로그인 실패')
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}}



