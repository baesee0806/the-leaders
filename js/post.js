export const getPostList = async () => {
    let cmtObjList = [];
    const q = query(
      collection(dbService, "post"),
      orderBy("createdAt", "desc")
    );