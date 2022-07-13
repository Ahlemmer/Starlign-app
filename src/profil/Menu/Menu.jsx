import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteDoc,
  deleteFollowing,
  deleteFollower,
  getDocs,
  getFollowing,
  getFollower,
  getBeam,
  getReBeam,
  deleteBeam,
  deleteReBeam,
  getComment,
  getReComment,
  verifyFollowing,
  useAuth,
  getBloque,
} from "../Firebase/firebase";

import Followers from "./Followers/Followers";
import Followings from "./Followings/Followings";
import Beams from "./Beams/Beams";
import ReBeams from "./ReBeams/ReBeams";
import { useHistory } from "react-router-dom";
import routeApi from "../../api/routes";

toast.configure();

const Menu = ({ userData, sabonner, desabonner }) => {
  const currentUser = useAuth();

  const [followings, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [beams, setBeams] = useState([]);
  const [reBeams, setReBeams] = useState([]);
  const [friend, setFriend] = useState([]);
  const [bloques, setBloques] = useState([]);

  const redirection = useHistory();

  const unFollow = (uid, id) => {
    deleteDoc(deleteFollowing(uid, id))
      .then(() => {
        redirection.push(`/profil/${userData.userId}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const deleteFollowerUserAuth = (idFollower, uid) => {
    deleteDoc(deleteFollower(idFollower, uid))
      .then(() => {
        toast.success("Désabonner avec succès", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        redirection.push(`/profil/${userData.userId}`);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const deleteBeamUser = (idBeam) => {
    deleteDoc(deleteBeam(idBeam))
      .then(() => {
        toast.success("Suppression réussie", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        redirection.push(`/profil/${userData.userId}`);
      })

      .catch((error) => {
        console.log(error.message);
      });
  };
  const deleteReBeamUser = (idReBeam) => {
    deleteDoc(deleteReBeam(idReBeam))
      .then(() => {
        toast.success("Suppression réussie", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        redirection.push(`/profil/${userData.userId}`);
      })

      .catch((error) => {
        console.log(error.message);
      });
  };

  const getComments = async (idBeam, setComments) => {
    const data = await getDocs(getComment(idBeam));
    setComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    redirection.push(`/profil/${userData.userId}`);
    return setComments;
  };
  const getReComments = async (idBeam, setReComments) => {
    const data = await getDocs(getReComment(idBeam));
    setReComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    redirection.push(`/profil/${userData.userId}`);
    return setReComments;
  };

  const addComment = async (
    posterId,
    comment,
    setComment,
    setSeeComment,
    setAddComment
  ) => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.addComment(token, posterId, comment);
    if (!result.ok) {
      console.log(result);
    } else {
      setComment("");
      redirection.push(`/profil/${userData.userId}`);
      setSeeComment(false);
      setAddComment(false);
    }
  };

  const deleteComment = async (posterId, commentId, setSeeComment) => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.deleteComment(token, posterId, commentId);
    if (!result.ok) {
      console.log(result);
    } else {
      toast.success("Suppression reussie avec succès !", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      redirection.push(`/profil/${userData.userId}`);
      setSeeComment(false);
    }
  };

  const like = async (postId) => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.like(token, postId);
    if (!result.ok) {
      console.log(result);
    } else {
      redirection.push(`/profil/${userData.userId}`);
    }
  };

  const unlike = async (postId) => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.unLike(token, postId);
    if (!result.ok) {
      console.log(result);
    } else {
      redirection.push(`/profil/${userData.userId}`);
    }
  };

  const rePost = async (postId) => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.rePost(token, postId);
    if (!result.ok) {
      console.log(result);
    } else {
      redirection.push(`/profil/${userData.userId}`);
    }
  };

  useEffect(() => {
    const getFollowings = async () => {
      const data = await getDocs(getFollowing(userData.userId));
      setFollowing(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getFollowers = async () => {
      const data = await getDocs(getFollower(userData.userId));
      setFollowers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getBeams = async () => {
      const data = await getDocs(getBeam(userData.userId));
      setBeams(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getReBeams = async () => {
      const data = await getDocs(getReBeam(userData.userId));
      setReBeams(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getFriends = async () => {
      if (currentUser !== null) {
        const data = await getDocs(
          verifyFollowing(userData.userId, currentUser.uid)
        );
        setFriend(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };
    const getBloques = async () => {
      if (currentUser !== null) {
        const data = await getDocs(getBloque(currentUser.uid));
        setBloques(data.docs.map((doc) => doc.data().userId));
      }
    };

    getFollowings();
    getFollowers();
    getBeams();
    getReBeams();
    getFriends();
    getBloques();
  }, [userData.userId, sabonner, desabonner]);

  return (
    <Fragment>
      {/* Partie Menu */}
      <div className="row" style={{ marginLeft: "3px" }}>
        {/* nav-justified permet de agrandir les menus  */}
        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              style={{ fontSize: "20px", color: "#19A8D9" }}
              className="nav-link active "
              id="tweets-tab"
              data-bs-toggle="tab"
              data-bs-target="#tweets"
              type="button"
              role="tab"
              aria-controls="tweets"
              aria-selected="true"
            >
              Posts
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              style={{ fontSize: "20px", color: "#19A8D9" }}
              className="nav-link"
              id="reBeams-tab"
              data-bs-toggle="tab"
              data-bs-target="#reBeams"
              type="button"
              role="tab"
              aria-controls="reBeams"
              aria-selected="false"
            >
              Re-Posts
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              style={{ fontSize: "20px", color: "#19A8D9" }}
              className="nav-link"
              id="followers-tab"
              data-bs-toggle="tab"
              data-bs-target="#followers"
              type="button"
              role="tab"
              aria-controls="followers"
              aria-selected="false"
            >
              Abonnés
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              style={{ fontSize: "20px", color: "#19A8D9" }}
              className="nav-link"
              id="following-tab"
              data-bs-toggle="tab"
              data-bs-target="#following"
              type="button"
              role="tab"
              aria-controls="following"
              aria-selected="false"
            >
              Abonnements
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="tweets"
            role="tabpanel"
            aria-labelledby="tweets-tab"
          >
            <h3 style={{ marginTop: "1rem", color: "#696969" }}>Posts</h3>
            <div className="row">
              <Beams
                userData={userData}
                beams={beams}
                getComments={getComments}
                deleteBeamUser={deleteBeamUser}
                friend={friend}
                addComment={addComment}
                deleteComment={deleteComment}
                like={like}
                unlike={unlike}
                rePost={rePost}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="reBeams"
            role="tabpanel"
            aria-labelledby="reBeams-tab"
          >
            <h3 style={{ marginTop: "1rem", color: "#696969" }}>Re-Posts</h3>
            <div className="row">
              <ReBeams
                userData={userData}
                reBeams={reBeams}
                getReComments={getReComments}
                deleteReBeamUser={deleteReBeamUser}
                friend={friend}
                bloques={bloques}
                addComment={addComment}
                deleteComment={deleteComment}
                like={like}
                unlike={unlike}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="followers"
            role="tabpanel"
            aria-labelledby="followers-tab"
          >
            <h3 style={{ marginTop: "1rem", color: "#696969" }}>Abonnés</h3>
            <div className="row">
              <Followers
                userData={userData}
                followers={followers}
                friend={friend}
                bloques={bloques}
              />
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="following"
            role="tabpanel"
            aria-labelledby="following-tab"
          >
            <h3 style={{ marginTop: "1rem", color: "#696969" }}>Abonnemens</h3>
            <div className="row">
              <Followings
                userData={userData}
                unFollow={unFollow}
                deleteFollowerUserAuth={deleteFollowerUserAuth}
                followings={followings}
                sabonner={sabonner}
                desabonner={desabonner}
                friend={friend}
                bloques={bloques}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default React.memo(Menu);
