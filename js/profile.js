import { authService, storageService, dbService } from "./firebase.js";
import {
  
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
 getDocs,
 collection,
 setDoc,
 doc,
 query,
 where
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";


// 프로필 이미지 변경 함수
export const changeProfileImage = async (event) => {
  event.preventDefault();
  // .disabled로 profileBtn 한 번만 클릭할 수 있도록 함 (한 번 클릭하면 비활성화됨)
  document.getElementById("profileImageBtn").disabled = true;

  const imgRef = ref(storageService, "profile_image/" + uuidv4());

  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl; //새로운 프로필 이미지 url
  if (imgDataUrl) {
    // 파일 저장 API. response는 정상적으로 Storage에 업로드되었다는 의미
    // imgRef -> 스토리지 어디에 저장되어 있는지 위치를 담고 있음
    // imgDataUrl은 이미지 업로드하기 위한 임시적인 값
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    // 최종적으로 downloadUrl이 업로드한 프로필 이미지의 영구적 url이 되는 것
    // 앞으로 화면에 프로필 이미지를 출력할 때 downloadUrl을 이용 할 것임
    downloadUrl = await getDownloadURL(response.ref);

    await updateProfile(authService.currentUser, {
      photoURL: downloadUrl ? downloadUrl : "/assets/blankProfile.webp",
      // photoURL: downloadUrl ? downloadUrl : null,
    })
      .then(() => {
        // alert("이미지 수정 완료");
        Swal.fire({
          text: "프로필 이미지 변경 완료",
          confirmButtonColor: "#3085d6",
        });

        // 프로필 이미지 변경 시 헤더의 이미지도 바로 업데이트해줌
        const newProfileImage = authService.currentUser.photoURL;
        document.getElementById("headerProfileView").src = newProfileImage;
      })

      .catch((error) => {
        // alert("프로필 수정 실패");
        Swal.fire("프로필 이미지 변경 실패");
        console.log("error:", error);
      });
  }
};

// 닉네임 변경 함수
export const changeProfileNickname = async (event) => {
  event.preventDefault();
  // document.getElementById("profileNicknameBtn").disabled = true;

  const newNickname = document.getElementById("profileNickname").value;

  // input 창에 입력값이 있을 때만 닉네임 변경 기능이 작동함
  if (document.getElementById("profileNickname").value !== "") {
    await updateProfile(authService.currentUser, {
      displayName: newNickname ? newNickname : null,
    })
      .then(() => {
        // alert("닉네임 수정 완료");
        Swal.fire({
          title: "닉네임 수정 완료",
          confirmButtonColor: "#94D493",
        });

        // 닉네임 수정 시 수정된 닉네임으로 새로고침 없이 자동 업데이트됨
        const updatedDisplayName = authService.currentUser.displayName;
        document.getElementById("profileNickname_val").textContent =
          updatedDisplayName;
        // input창 입력값 리셋하기
        document.getElementById("profileNickname").value = null;
      })
      .catch((error) => {
        Swal.fire("닉네임 수정 실패");
        // alert("프로필 수정 실패");
        console.log("error:", error);
      });
  }
};

// 마이페이지의 프로필 이미지를 클릭해서 업로드할 이미지 파일을 선택하고
// '열기'를 눌렀을 때 onFileChange 함수가 실행됨
export const onFileChange = (event) => {
  const theFile = event.target.files[0]; // file 객체를 theFile라는 변수에 담았음
  // FileReader는 JS가 자체적으로 제공하는 API
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  // FileReader가 파일객체를 data URL로 변환 작업을 끝냈을 때
  // finishedEvent 이벤트가 발생해서 result 값을 imgDataUrl에 담음
  reader.onloadend = (finishedEvent) => {
    const imgDataUrl = finishedEvent.currentTarget.result;
    // 이미지를 업로드만 하고 업로드 버튼을 누르지 않았을 때는 스토리지에 저장하지 않기 위해
    // localStorage에 imgDataUrl을 임시로 보관함
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profileView").src = imgDataUrl;
  };
};

// 닉네임 버튼 클릭했을 때 input 창 띄우기 토글
export const nicknameBtn = () => {
  const nameVal = document.getElementById("profileNickname_val");
  const nameInput = document.getElementById("profileNickname");

  if (nameVal.style.display !== "block") {
    nameVal.style.display = "block";
    nameInput.style.display = "none";
  } else {
    nameVal.style.display = "none";
    nameInput.style.display = "block";
  }
};

// 내가 쓴글 보여주는 함수
export const getmypagelist = async () => {
  console.log("성공");
 
  const profileid = authService.currentUser.uid
 //  const { uid, displayName, photoURL } = authService.currentUser;
  const q = query(collection(dbService, "post"), where("uid", "==", profileid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, "->", doc.data());
    let dates = doc.data().date.toString()
    const 템플릿 = `
    <section class="mypost-list">
      <a class="main__card" href="/post.html?id=${doc.id}"> 
          <div class="product">
              <div class="thumbnail" style="background-image: url('${doc.data().contentImgUrl}')">
              </div>
              <div class="description">
                  <h5 class="title">${doc.data().title}</h5>
                  <p class="nicknames"><span class="card__nickname">${
                    doc.data().nickname
                  }</span>님의 오늘의 먹을텐데</p>
                  <p class="date">${dates.slice(0,4)}-${dates.slice(4,6)}-${dates.slice(6,-6)}</p>
              </div>
          </div>
      </a>
    </section>`;
    $(".mypost__wrap").append(템플릿);
      
    
  });
 



//  const postRef = collection(dbService, 'post')
//   await setDoc(doc(postRef, updatedDisplayName)).then((결과) => {
//       결과.forEach((doc) => {
//           let dates = doc.data().date.toString()
//           const 템플릿 = `
//       <a href="/post.html?id=${doc.id}"> 
//           <div class="product">
//           <div class="thumbnail" style="background-image: url('${doc.data().contentImgUrl}')"></div>
//               <div class="description">
//                   <h5 class="title">${doc.data().title}</h5>
//                   <p class="nicknames">${doc.data().nickname}님의 오늘의 먹을텐데</p>
//                   <p class="date">${dates.slice(0,4)}-${dates.slice(4,6)}-${dates.slice(6)}</p>
//               </div>
//           </div></a>`
//           $('.mypost__container').append(템플릿)
//       })
//   })
}
