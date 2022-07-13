import React, { Fragment, useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadImg from "./UploadImg";
import Navbar from "./Navbar/Navbar";
import Amel from "../pages/amel";
import { BsTextParagraph } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Disconnected from "./Disconnected";

import {
  logoutUser,
  auth,
  updateDoc,
  user,
  getDoc,
  setDoc,
  following,
  follower,
  deleteDoc,
  deleteFollower,
  deleteFollowing,
} from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory, useParams } from "react-router-dom";
import Menu from "./Menu/Menu";
import NbreFollowersFollowings from "./NbreFollowersFollowings";
import Information from "./Information";
import MyInformation from "./MyInformation";

toast.configure();
const Profile = () => {
  const cssProfil = {
    verticalAlign: "middle",
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    textAlign: "center",
  };

  const redirection = useHistory();
  const idUser = useParams();

  const [modifierBio, setModifierBio] = useState(false);
  const [biographie, setBiographie] = useState("");
  const [userSession, setUserSession] = useState(null);

  const [getUser, setGetUser] = useState({});
  const [getUserAuth, setGetUserAuth] = useState({});

  const afficherChampDeSaisie =
    modifierBio !== true ? (
      <div className="input-group">
        <p style={{ fontSize: "16px" }}>{biographie}</p>
      </div>
    ) : (
      <div className="input-group">
        {/* <span className="input-group-text">With textarea</span> */}
        <textarea
          className="form-control"
          aria-label="With textarea"
          value={biographie}
          maxLength={99}
          onChange={(e) => setBiographie(e.target.value)}
        ></textarea>
      </div>
    );
  const afficherButtonAnnulerEtValider = modifierBio ? (
    <Fragment>
      <button
        style={{
          backgroundColor: "#19A8D9",
          marginLeft: "10px",
          color: "white",
          borderColor: "#19A8D9",
          borderRadius: "20px",
        }}
        className="btn btn-default"
        onClick={() => {
          updateDoc(user(idUser.idProfil), { bio: biographie })
            .then(() => {
              toast.success("Modifification effectué avec succès", {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              });
              redirection.push(`/profil/${idUser.idProfil}`);
              setModifierBio(false);
            })
            .catch((error) => {
              alert(error.message);
            });
        }}
      >
        Valider
      </button>
      <button
        style={{
          backgroundColor: "#19A8D9",
          marginLeft: "5px",
          color: "white",
          borderColor: "#19A8D9",
          borderRadius: "20px",
        }}
        className="btn btn-default"
        onClick={() => {
          setModifierBio(false);
        }}
      >
        Annuler
      </button>
    </Fragment>
  ) : (
    <button className="btn btn-default" onClick={() => setModifierBio(true)}>
      <BsTextParagraph
        className="bio"
        style={{
          fontSize: "20px",
          backgroundColor: "#19A8D9",
          marginLeft: "10px",
          color: "white",
          borderColor: "#19A8D9",
          borderRadius: "5px",
        }}
      />
    </button>
  );
  const deconnecter = () => {
    toast.success("Vous vous etes déconnectés maintenant! ", {
      position: "top-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    logoutUser();
    redirection.push("/");
  };

  const sabonner = () => {
    if (userSession !== null) {
      const informationFollowing = {
        Displayname: getUser.Displayname,
        date: new Date().toISOString(),
        iduser: getUser.userId,
        imageUrl: getUser.imageUrl,
        nom: getUser.nom,
        prenom: getUser.prenom,
        pseudo: getUser.pseudo,
        id: userSession.uid,
      };
      setDoc(following(userSession.uid, getUser.userId), informationFollowing)
        .then()
        .catch((error) => {
          console.log(error.message);
        });

      const informationFollower = {
        Displayname: getUserAuth.Displayname,
        date: new Date().toISOString(),
        iduser: getUserAuth.userId,
        imageUrl: getUserAuth.imageUrl,
        nom: getUserAuth.nom,
        prenom: getUserAuth.prenom,
        pseudo: getUserAuth.pseudo,
        id: idUser.idProfil,
      };
      setDoc(follower(getUser.userId, userSession.uid), informationFollower)
        .then(() => {
          toast.success("Abonnement effectué avec succes.", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          redirection.push(`/profil/${getUser.userId}`);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const desabonner = () => {
    if (userSession !== null) {
      deleteDoc(deleteFollower(getUser.userId, userSession.uid));
      deleteDoc(deleteFollowing(userSession.uid, getUser.userId))
        .then(() => {
          toast.success("Desabonner avec succes.", {
            position: "top-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          redirection.push(`/profil/${getUser.userId}`);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (user) => {
      user
        ? setUserSession(user)
        : setTimeout(() => {
            redirection.push("/");
          }, 3000);
    });

    if (userSession !== null) {
      getDoc(user(idUser.idProfil))
        .then((userData) => {
          if (userData.exists()) {
            const data = userData.data();
            setBiographie(data.bio);
            setGetUser(data);
          } else {
            toast.error("Aucun utilisateur ne correspond à cet identifiant", {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });

            setTimeout(() => {
              redirection.push("/home");
            }, 2000);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });

      getDoc(user(userSession.uid))
        .then((userDataAuth) => {
          if (userDataAuth.exists()) {
            const data = userDataAuth.data();
            setGetUserAuth(data);
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    }

    return () => {
      listener();
    };
  }, [userSession, idUser]);

  if (userSession === null) {
    return <Disconnected />;
  } else {
    if (idUser.idProfil === userSession.uid) {
      return (
        <div className="Container">
          {/* Partie image de l'utilisateur */}

          <Navbar userData={getUser} />
          <div className="row">
            <div className="col col-lg-4">
              <div className="row text-center mt-4">
                <UploadImg userData={getUser} />
              </div>
            </div>
            <div className="col col-lg-1"></div>
            <div className="col col-lg-7">
              <div className="row pt-4">
                <div className="col col-lg-8">
                  <div className="row">
                    <div className="col col-lg-12">
                      <h4>
                        Biographie
                        {afficherButtonAnnulerEtValider}
                      </h4>
                    </div>
                    <div
                      className="col col-lg-12"
                      style={{
                        color: "#696969",
                        fontFamily: "cursive",
                        fontWeight: "200%",
                        fontSize: "16px",
                      }}
                    >
                      {afficherChampDeSaisie}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4">
                <NbreFollowersFollowings
                  sabonner={sabonner}
                  desabonner={desabonner}
                  userData={getUser}
                />
              </div>
              <div className="row pt-4">
                <div className="col col-lg-12">
                  <MyInformation userData={getUser} />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <Menu
            sabonner={sabonner}
            desabonner={desabonner}
            userData={getUser}
          />
        </div>
      );
    } else {
      return (
        <div className="Container">
          {/* Partie image de l'utilisateur */}
          <div className="text-center">
            <button className="btn btn-primary" onClick={deconnecter}>
              Deconnecter
            </button>
          </div>
          <Navbar userData={getUser} />
          <div className="row">
            <div className="col col-lg-4">
              <div className="row text-center mt-4">
                <div className="col col-lg-12">
                  <img src={getUser.imageUrl} alt="Avatar" style={cssProfil} />
                </div>
              </div>
            </div>
            <div className="col col-lg-1"></div>
            <div className="col col-lg-7">
              <div className="row pt-4">
                <div className="col col-lg-8">
                  <div className="row">
                    <div className="col col-lg-12">
                      <h4>Biographie</h4>
                    </div>
                    <div
                      className="col col-lg-12"
                      style={{
                        color: "#696969",
                        fontFamily: "cursive",
                        fontWeight: "200%",
                        fontSize: "12px",
                      }}
                    >
                      {afficherChampDeSaisie}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row pt-4">
                <NbreFollowersFollowings
                  sabonner={sabonner}
                  desabonner={desabonner}
                  userData={getUser}
                />
              </div>

              <Information
                userData={getUser}
                sabonner={sabonner}
                desabonner={desabonner}
              />
            </div>
          </div>

          <hr />

          <Menu
            sabonner={sabonner}
            desabonner={desabonner}
            userData={getUser}
          />
        </div>
      );
    }
  }
};
export default Profile;
