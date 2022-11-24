// 로그인 ,회원가입 클릭시 헤더변경 후 로그인 페이지로 이동
const headerEndEl = document.querySelector('.header__end')
const headerEndLogoutEl = document.querySelector('.header__end--logout')
const loginEl = document.querySelector('#login')

export const onToggle = () => {
  headerEndEl.style.display = 'none'
  headerEndLogoutEl.style.display = 'flex'
  window.location.hash = "#";  
}

export const toLogout = () => {
  localStorage.clear();
  alert('logout 성공')
  headerEndEl.style.display = 'inline'
  headerEndLogoutEl.style.display = 'none'
}

export const toWrite = () => {
  if (loginEl.innerText === '로그인') {
    return alert ('로그인을 먼저 하세요')
  }
}

export const goToProfile = () => {
  window.location.hash = '#profile';
}