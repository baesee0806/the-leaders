
// < !--JavaScript Bundle with Popper-- >


// const db = firebase.firestore();
// // const storage = firebase.storage();
const storageRef = firebase.storage().ref();
export function uploading() {$('#send').click(() => {
    var file = document.querySelector('#image').files[0];
    var 저장할경로 = storageRef.child('image/' + file.name);
    var 업로드작업 = 저장할경로.put(file)
    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var dateString = year + '-' + month + '-' + day;

    업로드작업.on('state_changed',
        // 변화시 동작하는 함수 
        null,
        //에러시 동작하는 함수
        (error) => {
            console.error('실패사유는', error);
        },
        // 성공시 동작하는 함수
        () => {
            업로드작업.snapshot.ref.getDownloadURL().then((url) => {
                console.log('업로드된 경로는', url);
                const 저장할거 = {
                    분류: $('#category').val(),
                    제목: $('#title').val(),
                    평점: parseInt($('#score').val()),
                    내용: $('#content').val(),
                    작성일: dateString,
                    이미지: url,
                    // uid: JSON.parse(localStorage.getItem('user')).uid,
                    // 이름: JSON.parse(localStorage.getItem('user')).displayName
                }
                db.collection('product').add(저장할거).then(() => {
                    alert('저장완료');
                    window.location.href = '/index.html'
                }).catch((err) => {
                    alert(err);
                    window.location.href = '/index.html'
                })

            });
        }
    );


})}
