import Client from "./client";

const login = (email ,password) =>
  Client.apiClient.post(
    "/login",
    {
      email: email,
      password: password},
    {}
  );

  const signup = (email ,password , confirmPassword, nom, prenom, pseudo) =>
  Client.apiClient.post(
    "/signup",
    {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      nom: nom,
      prenom: prenom,
      pseudo: pseudo,
    },
    {}
  );

const getPublications = (token) =>
  Client.apiClient.get(
    "publications",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const getUser = (token) =>
  Client.apiClient.get(
    "user/",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const addPub = (token, body, image, onProgress) => {
  if (image) {
    const form = new FormData();
    form.append("image", image);
    form.append("body", body);
    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };
    return Client.apiClient.post("pub", form, {
      headers,
      onUploadProgress: (progress) =>
        onProgress((progress.loaded / progress.total) * 100),
    });
  } else {
    const headers = {
      Authorization: token,
    };
    return Client.apiClient.post(
      "publication",
      { body },
      {
        headers,
      }
    );
  }
};

const rePost = (token, post) =>
  Client.apiClient.post(
    "/publication/" + post + "/repost",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const like = (token, post) =>
  Client.apiClient.post(
    "/publication/" + post + "/like",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const likeComm = (token, post, comment) =>
  Client.apiClient.post(
    "/" + post + "/" + comment + "/like",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const unLike = (token, post) =>
  Client.apiClient.post(
    "/publication/" + post + "/unlike",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const unLikeComm = (token, post, comment) =>
  Client.apiClient.post(
    "/" + post + "/" + comment + "/unlike",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const getOnePublication = (token, id) =>
  Client.apiClient.get(
    "publication/" + id,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const addComment = (token, post, body) =>
  Client.apiClient.post(
    "publication/" + post + "/comment",
    { body },
    {
      headers: {
        Authorization: token,
      },
    }
  );

const deleteComment = (token, post, comment) =>
  Client.apiClient.delete(
    "/publication/" + post + "/" + comment,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const deleteStory = (token, story) =>
  Client.apiClient.delete(
    "/story/" + story,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const deletePost = (token, post) =>
  Client.apiClient.delete(
    "publication/" + post,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const blouquePostUser = (token, user) =>
  Client.apiClient.post(
    "/user/" + user + "/bloquer",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const deconnecter = (token) =>
  Client.apiClient.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const emails = () =>
  Client.apiClient.get(
    "/emails",
    {},
    {}
  );


  const setinfos = (token, nom ,prenom ,pseudo) =>
  Client.apiClient.post(
    "/setinfos",
    {
      pseudo: pseudo,
      nom: nom,
      prenom: prenom,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );


  const FollowUser = (token, userid ,pseudo) =>
  Client.apiClient.post(
    "/add/",
    {
      AccountName: pseudo,
      AccountUid: userid,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

const unFollowUser = (token, user) =>
  Client.apiClient.post(
    "/desabonner/",
    {
      AccountUid: user,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const getPost = (token, screamId) =>
  Client.apiClient.get(
    "/publication/" + screamId,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  
const getPostComments = (token, post) =>
  Client.apiClient.get(
    "comment/" + post,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  

  const getnotif = (token) =>
  Client.apiClient.get(
    "notifications",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const getnbrnotif = (token) =>
  Client.apiClient.get(
    "/nbrnotif",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const getnbrmess = (token) =>
  Client.apiClient.get(
    "/nbrmess",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const getsugg = (token) =>
  Client.apiClient.get(
    "suggestions",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  const getrech = (token) =>
  Client.apiClient.get(
    "recherche",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const getbloque = (token) =>
  Client.apiClient.get(
    "bloquer",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const getblk = (token) =>
  Client.apiClient.get(
    "blk",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const debloquer = (token, userid ) =>
  Client.apiClient.post(
    "/debloquer",
    { 
      idb: userid,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );


  const onepub = (token , screamId) =>
  Client.apiClient.get(
    "/publication/" + screamId,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

  
const getStories = (token) =>
  Client.apiClient.get(
    "storys",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );

const addStory = (token, image, body, onProgress) => {
  const form = new FormData();
  form.append("image", image);
  form.append("body", body);
  const headers = {
    Authorization: token,
    "Content-Type": "multipart/form-data",
  };
  return Client.apiClient.post("story", form, {
    headers,
    onUploadProgress: (progress) =>
      onProgress((progress.loaded / progress.total) * 100),
  });
};


const update = (token, imageUrl ) =>
  Client.apiClient.post(
    "/update",
    { 
      imageUrl: imageUrl,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const uploadimage = (token, image) => {
    const form = new FormData();
    form.append("image", image , image.name);
    const headers = {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    };
    return Client.apiClient.post("user/image", form, {
      headers,
    });
  };


  const uids = () =>
  Client.apiClient.get(
    "/uids",
    {},
    {}
  );
export default {
  uids,
  addPub,
  deleteStory,
  getPostComments,
  deleteComment,
  like,
  addComment,
  getUser,
  deletePost,
  blouquePostUser,
  getStories,
  unFollowUser,
  addStory,
  unLike,
  getOnePublication,
  getPublications,
  likeComm,
  unLikeComm,
  rePost,
  getsugg,
  FollowUser,
  getrech,
  getbloque,
  debloquer,
  emails,
  deconnecter,
  getnotif,
  setinfos,
  getPost,
  onepub,
  update,
  uploadimage,
  getblk,
  getnbrnotif,
  getnbrmess,
  login,
  signup
};
