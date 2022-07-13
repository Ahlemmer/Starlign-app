import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../Firebase/firebase";
import {MdBlockFlipped} from "react-icons/md";
const Followers = ({ userData, followers, friend, bloques }) => {
  const redirection = useHistory();
  const currentUser = useAuth();

  const cssProfil = {
    verticalAlign: "middle",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    textAlign: "center",
  };

  if (currentUser && currentUser.uid === userData.userId) {
    if (followers.length !== 0) {
      return (
        <>
          {followers.map((follower, index) => {
            return (
              <div className="col col-lg-12 " key={index}>
                <div className="card">
                  <div class="card-body">
                    <div className="row">
                      <div className="col col-lg-1">
                        <img
                          src={follower.imageUrl}
                          alt="Avatar"
                          style={cssProfil}
                        />
                      </div>
                      <div className="col col-lg-10 mt-3" style={{ fontWeight:'bold' , color:"#696969" }} >
                        @{follower.pseudo}
                      </div>
                      <div className="col col-lg-1 mt-2">
                        <div className="dropdown">
                          <button
                            className="btn btn-default"
                            type="button"
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
                                type="button"
                                onClick={() => {
                                  redirection.push(
                                    `/profil/${follower.iduser}`
                                  );
                                }}
                              >
                                <BsFillPersonPlusFill
                                  style={{ color: "rgb(18, 204, 211)" }}
                                />
                                Consulter
                              </button>
                            </li>
                            {currentUser === null ? (
                              ""
                            ) : currentUser.uid === follower.iduser ? (
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
            <h1 style={{ color: "#696969" , fontSize:"12px" }}>Auncun abonné </h1>
          </div>
        </div>
      );
    }
  } else {
    if (friend.length !== 0) {
      if (followers.length !== 0) {
        return (
          <>
            {followers.map((follower, index) => {
              return (
                <div className="col col-lg-12 " key={index}>
                  <div className="card">
                    <div class="card-body">
                      <div className="row">
                        <div className="col col-lg-1">
                          <img
                            src={follower.imageUrl}
                            alt="Avatar"
                            style={cssProfil}
                          />
                        </div>
                        <div className="col col-lg-10 mt-3" style={{ fontWeight:'bold' , color:"#696969" }} >
                          @ {follower.pseudo}
                        </div>
                        <div className="col col-lg-1 mt-2">
                          <div className="dropdown">
                            <button
                              className="btn btn-default"
                              type="button"
                              id="dropdownMenu2"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <FiMoreHorizontal className="btn_fi" />
                            </button>
                            
                            {
                              bloques.includes(follower.iduser) ? (

                                <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenu2"
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  
                                >
                                  <MdBlockFlipped 
                                    style={{ color: "rgb(18, 204, 211)" }}
                                  />
                                  Utilisateur bloqué
                                </button>
                              </li>
                             
                            </ul>
                              ): (

                                <ul
                              className="dropdown-menu"
                              aria-labelledby="dropdownMenu2"
                            >
                              <li>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={() => {
                                    redirection.push(
                                      `/profil/${follower.iduser}`
                                    );
                                  }}
                                >
                                  <BsFillPersonPlusFill
                                    style={{ color: "rgb(18, 204, 211)" }}
                                  />
                                  Consulter
                                </button>
                              </li>
                              {currentUser === null ? (
                                ""
                              ) : currentUser.uid === follower.iduser ? (
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
                Auncun abonné 
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
              Veuillez vous abonner pour voir ce contenu.
            </h1>
          </div>
        </div>
      );
    }
  }
};

export default Followers;
