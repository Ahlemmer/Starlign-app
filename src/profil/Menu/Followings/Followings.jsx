import React, { useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { RiUserUnfollowFill } from "react-icons/ri";
import { useHistory, useParams } from "react-router-dom";

import {MdBlockFlipped} from "react-icons/md";


import { useAuth } from "../../Firebase/firebase";

const Followings = ({
  userData,
  unFollow,
  deleteFollowerUserAuth,
  followings,
  sabonner,
  desabonner,
  friend,
  bloques,
}) => {
  const redirection = useHistory();
  const currentUser = useAuth();
  const idUser = useParams();
  useEffect(() => {}, [unFollow, desabonner, sabonner]);

  const cssProfil = {
    verticalAlign: "middle",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    textAlign: "center",
  };

  if (currentUser && currentUser.uid === userData.userId) {
    if (followings.length !== 0) {
      return (
        <>
          {followings.map((following, index) => {
            return (
              <div className="col col-lg-12 " key={index}>
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col col-lg-1">
                        <img
                          src={following.imageUrl}
                          alt="Avatar"
                          style={cssProfil}
                        />
                      </div>
                      <div className="col col-lg-10 mt-3" style={{ fontWeight:'bold' , color:"#696969" }}>
                        @{following.pseudo}
                      </div>
                      <div className="col col-lg-1 mt-2">
                        <div className="dropdown">
                          <button
                            className="btn btn-default"
                            id="dropdownMenu2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <FiMoreHorizontal className="btn_fi" />
                          </button>
                          <ul
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenu2"
                          >
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  redirection.push(
                                    `/profil/${following.iduser}`
                                  );
                                }}
                              >
                                <BsFillPersonPlusFill
                                  style={{ color: "rgb(18, 204, 211)" }}
                                />
                                Consulter
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item"
                                 onClick={() => {
                                  redirection.push(
                                    `/Messagerie/${currentUser.uid}`);
                                  
                                }}
                              >
                                <MdMessage
                                  style={{ color: "rgb(18, 204, 211)" }}
                                />
                                Contacter
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  unFollow(currentUser.uid, following.id);
                                  deleteFollowerUserAuth(
                                    following.iduser,
                                    currentUser.uid
                                  );
                                }}
                              >
                                <RiUserUnfollowFill
                                  style={{ color: "rgb(18, 204, 211)" }}
                                />
                                Se désabonner
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      );
    } else {
      return (
        <div className="row text-center">
          <div className="col col-lg-12">
            <h1  style={{ color: "#696969" , fontSize:"12px" }}>
              Vous ne suivez personne pour le moment!
            </h1>
          </div>
        </div>
      );
    }
  } else {
    if (friend.length !== 0) {
      if (followings.length !== 0) {
       
            return (
              <>
                {followings.map((following, index) => {
                  return (
                    <div className="col col-lg-12 " key={index}>
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col col-lg-1">
                              <img
                                src={following.imageUrl}
                                alt="Avatar"
                                style={cssProfil}
                              />
                            </div>
                            <div className="col col-lg-10 mt-3" style={{ fontWeight:'bold' , color:"#696969" }}>
                              @ {following.pseudo}
                            </div>
                            <div className="col col-lg-1 mt-2">
                              <div className="dropdown">
                                <button
                                  className="btn btn-default"
                                  id="dropdownMenu2"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <FiMoreHorizontal className="btn_fi" />
                                </button>
                               {
                                 bloques.includes(following.iduser) ? (

                                    <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenu2"
                                >
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      
                                    >
                                     
                                     <MdBlockFlipped  style={{ color: "rgb(18, 204, 211)" }}/> utilisateur bloqué!
                                    </button>
                                  </li>
                                  
                                </ul>
                                 ):  (

                                    <ul
                                  className="dropdown-menu"
                                  aria-labelledby="dropdownMenu2"
                                >
                                  <li>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        redirection.push(
                                          `/profil/${following.iduser}`
                                        );
                                      }}
                                    >
                                      <BsFillPersonPlusFill
                                        style={{ color: "rgb(18, 204, 211)" }}
                                      />
                                      Consulter
                                    </button>
                                  </li>
                                  {currentUser.uid === following.iduser ? (
                                    ""
                                  ) : (
                                    <li>
                                      <button className="dropdown-item" 
                                         onClick={() => {
                                          redirection.push(
                                            `/Messagerie/${currentUser.uid}`);
                                          
                                        }}
                                      
                                      >
                                        <MdMessage

                                          style={{ color: "rgb(18, 204, 211)" }}
                                        />
                                        Contacter
                                      </button>
                                    </li>
                                  )}
                                </ul>
                                 )
                               }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            );
          
        
      } else {
        return (
          <div className="row text-center">
            <div className="col col-lg-12">
              <h1 style={{ color: "#696969" , fontSize:"12px" }}>
                Cette personne ne suit aucune personne!
              </h1>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="row text-center">
          <div className="col col-lg-12">
            <h1 style={{ color: "#696969" , fontSize:"12px" }}>
              Veuillez vous abonnez pour voir ce contenu.
            </h1>
          </div>
        </div>
      );
    }
  }
};

export default React.memo(Followings);
