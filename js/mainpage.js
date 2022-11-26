import {
  collection,
  orderBy,
  query,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import {
  dbService,
  authService
} from "./firebase.js"

export const getCardlist = async () => {

  let cardObjList = [];
  const q = query(
    collection(dbService, "post")
    // orderBy("no", "desc")
  );
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.docs.map((doc) => doc.data()).length)
  querySnapshot.forEach((doc) => {
    const cardObj = {
      id: doc.id,
      ...doc.data(),
    };
    cardObjList.push(cardObj);
  });

  const cardList = document.getElementById("card__list");
  // cardList.innerHTML = "";
  cardObjList.forEach((cardObj) => {
    console.log(cardObj)
    const tempHtml = `
    <div class="thumbs__item">
        <p class="thumbs__profile">${cardObj.title}</p>
        <img src="${cardObj.postUrl}" class="thumbs__thumbnail">
        <div class="thumbs__info">${cardObj.category}
        </div>
    </div>
    `
    cardList.innerHTML(tempHtml);
  })
};