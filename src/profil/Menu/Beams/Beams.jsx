import React, { useState } from "react";

import { dateFrParser } from "../../Date/FormatDateFr";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsChatDots } from "react-icons/bs";
import { useAuth } from "../../Firebase/firebase";
import { FiChevronDown } from "react-icons/fi";
import { FiChevronUp } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import { AiOutlineRetweet } from "react-icons/ai";
import { useEffect } from "react";
import routeApi from "../../../api/routes";
import { useHistory } from "react-router-dom";

import likeVide from "../icons/heart.svg";

const Beams = ({
  userData,
  beams,
  deleteBeamUser,
  getComments,
  friend,
  addComment,
  deleteComment,
  like,
  unlike,
  rePost,
}) => {
  const redirection = useHistory();
  const currentUser = useAuth();
  const cssProfil = {
    verticalAlign: "middle",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    textAlign: "center",
  };

  const cssProfile = {
    verticalAlign: "middle",
    width: "45px",
    height: "45px",
    marginLeft: "10px",
    borderRadius: "50%",
    textAlign: "center",
  };
  const [comment, setComment] = useState("");
  const [seeComment, setSeeComment] = useState(false);
  const [seeComment0, setSeeComment0] = useState(false);
  const [see, setSee] = useState(false);
  const [comments, setComments] = useState([]);
  const [likee, setlikee] = useState([]);
  const [userr, setUserr] = useState();
  const token = localStorage.getItem("FBIdToken");

  const getData = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.getUser(token);
    if (!result.ok) return console.log(result);

    setUserr(result.data.credentials.userId);
  };

  useEffect(() => {
    getData();
  }, [userr]);

  if (currentUser && currentUser.uid === userData.userId) {
    if (beams.length !== 0) {
      return (
        <>
          {beams.map((beam, index) => {
            return (
              <div className="col col-sm-12" key={index}>
                <div className="card">
                  <div>
                    <div className="row  mt-3">
                      <div className="col col-lg-11">
                        <div className="row">
                          <div className="col-lg-1">
                            <img
                              src={userData.imageUrl}
                              alt="Photo de profile"
                              style={cssProfile}
                            />
                          </div>
                          <div className="col-lg-auto mt-2">
                            <span
                              style={{
                                fontSize: "18px",
                                color: "#19A8D9",
                                marginLeft: "5px",
                              }}
                            >
                              @{userData.pseudo} <br />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "#696969",
                                  marginLeft: "5px",
                                }}
                              >
                                {dateFrParser(beam.createdAt)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="col col-lg-1">
                        {currentUser === null ? (
                          ""
                        ) : currentUser.uid === userData.userId ? (
                          <RiDeleteBin5Fill
                            className="btn_delete"
                            onClick={() => {
                              deleteBeamUser(beam.id);
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12">
                        {beam.body && beam.body.length < 320 ? (
                          <p
                            className="card-text  "
                            style={{ textAlign: "justify" }}
                          >
                            {beam.body}
                            <br />
                            <br />
                            {beam.image ? (
                              <div style={{    maxWidth: '100%',
                                               minWidth: 500,
                                               width: "calc((100vh + -325px) * 1)"}}>
                                <img
                                  src={beam.image}
                                  className="img-fluid img-thumbnail"
                                  style={{
                                    width: "100% ",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 10,
                                  }}
                                  alt="photo du post"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </p>
                        ) : (
                          <p
                            className="card-text"
                            style={{ textAlign: "justify" }}
                          >
                            {beam.body} <br />
                            {beam.image ? (
                              <div style={{    maxWidth: '100%',
                                               minWidth: 500,
                                               width: "calc((100vh + -325px) * 1)"}}>
                                <img
                                  src={beam.image}
                                  className="img-fluid img-thumbnail"
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    borderRadius: 10,
                                  }}
                                  alt="photo du post"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                          </p>
                        )}
                      </div>
                    </div>

                    <hr style={{ marginBottom: "5px", marginTop: "12px" }} />
                    <div className="row">
                      <div className="col-lg-3 col-sm-3">
                        {currentUser &&
                        beam.like &&
                        beam.like.includes(currentUser.uid) ? (
                          <span style={{ marginLeft: "2rem" }}>
                            <FcLike
                              style={{ fontSize: "20px" }}
                              onClick={() => {
                                unlike(beam.id);
                              }}
                            />
                            {beam.likeCount === 0 ? "" : beam.likeCount}
                          </span>
                        ) : (
                          <span style={{ marginLeft: "2rem" }}>
                            <img
                              src={likeVide}
                              alt="likevide"
                              onClick={() => {
                                like(beam.id);
                              }}
                            />
                            {beam.likeCount === 0 ? "" : beam.likeCount}
                          </span>
                        )}
                      </div>

                      <div className="col-lg-6 col-sm-6">
                        <span>
                          <BsChatDots BsChatDots style={{ fontSize: "20px" }} />
                          {beam.commentCount === 0 ? "" : beam.commentCount}
                        </span>
                        {beam.commentCount !== 0 ? (
                          <button
                            onClick={() => {
                              getComments(beam.id, setComments);
                              setSeeComment0(false);
                              setSeeComment(!seeComment);
                            }}
                            className="btn btn-default"
                            style={{ marginBottom: "0px", marginTop: "0px" }}
                          >
                            Voir Commentaire
                            {seeComment === false ? (
                              <FiChevronDown />
                            ) : (
                              <FiChevronUp />
                            )}
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              getComments(beam.id, setComments);
                              setSeeComment(false);
                              setSeeComment0(!seeComment0);
                            }}
                            className="btn btn-default"
                            style={{ marginBottom: "0px", marginTop: "0px" }}
                          >
                            Ajout commentaire
                            {seeComment === false ? (
                              <FiChevronDown />
                            ) : (
                              <FiChevronUp />
                            )}
                          </button>
                        )}

                        {seeComment && beam.commentCount !== 0 && (
                          <div style={{marginLeft: "5%", width: "90%"  }}>
                            <div className="row">
                              <div className="col col-lg-10 col-sm-10">
                                <label
                                  htmlFor="adComment"
                                  className="form-label"
                                >
                                  Ajout commentaire
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="adComment"
                                  placeholder="Commentaire ..."
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                />
                              </div>
                              <div className="col-lg-2 col-sm-2 mt-4">
                                <button
                                  style={{
                                    backgroundColor: "#19A8D9",
                                    borderColor: "#19A8D9",
                                    color: "white",
                                    borderRadius: "20px",
                                  }}
                                  className="btn btn-primary"
                                  onClick={() => {
                                    addComment(
                                      beam.id,
                                      comment,
                                      setComment,
                                      setSeeComment
                                    );
                                  }}
                                >
                                  valider
                                </button>
                              </div>
                            </div>

                            {comments.map((comment, index) => {
                              if (comment.screamId === beam.id)
                                return (
                                  <div
                                    key={index}
                                    className="card-footer mt-1"
                                    style={{
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                                      borderRadius: "20px",
                                    }}
                                  >
                                    <div className="row">
                                      <div className="col-lg-auto">
                                        <img
                                          src={comment.userImage}
                                          alt="Avatar"
                                          style={cssProfil}
                                        />
                                      </div>
                                      <div className="col-lg-auto">
                                        <span
                                          style={{
                                            fontSize: "18px",
                                            color: "#19A8D9",
                                          }}
                                        >
                                          @{comment.pseudoUser}
                                        </span>
                                        <br />
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "#696969",
                                          }}
                                        >
                                          {dateFrParser(comment.createdAt)}
                                        </span>
                                      </div>
                                      <div className="col-lg-auto"></div>
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-12">
                                        <p style={{ textAlign: "justify" }}>
                                          {comment.body}
                                          {currentUser === null ? (
                                            ""
                                          ) : currentUser.uid ===
                                            comment.userid ? (
                                            <RiDeleteBin5Fill
                                              style={{ marginLeft: "5%" }}
                                              className="btn_delete"
                                              onClick={() => {
                                                deleteComment(
                                                  beam.id,
                                                  comment.id,
                                                  setSeeComment
                                                );
                                              }}
                                            />
                                          ) : (
                                            ""
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                            })}
                          </div>
                        )}

                        {seeComment0 && beam.commentCount === 0 && (
                          <div style={{marginLeft: "5%", width: "90%"  }}>
                            <div className="row">
                              <div className="col col-lg-10 col-sm-10">
                                <label
                                  htmlFor="adComment"
                                  className="form-label"
                                >
                                  Ajout commentaire
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="adComment"
                                  placeholder="Commentaire ..."
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                />
                              </div>
                              <div className="col-lg-2 col-sm-2 mt-4">
                                <button
                                  style={{
                                    backgroundColor: "#19A8D9",
                                    borderColor: "#19A8D9",
                                    color: "white",
                                    borderRadius: "20px",
                                  }}
                                  className="btn btn-primary"
                                  onClick={() => {
                                    addComment(
                                      beam.id,
                                      comment,
                                      setComment,
                                      setSeeComment,
                                      setSeeComment0
                                    );
                                  }}
                                >
                                  valider
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-lg-3 col-sm-3">
                        <span style={{}}>
                          <AiOutlineRetweet
                            onClick={() => {
                              rePost(beam.id);
                            }}
                            style={{ color: "#696969", fontSize: "20px" }}
                          />
                          {beam.repost}
                        </span>
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
        <div className="row ">
          <div className="col col-lg-12">
            <h1 style={{ color: "#696969", fontSize: "12px" }}>
              Aucune publication
            </h1>
          </div>
        </div>
      );
    }
  } else {
    if (friend.length !== 0) {
      if (beams.length !== 0) {
        return (
          <>
            {beams.map((beam, index) => {
              return (
                <div className="col col-sm-12" key={index}>
                  <div className="card">
                    <div>
                      <div className="row  mt-3">
                        <div className="col col-lg-11">
                          <div className="row">
                            <div className="col-lg-1">
                              <img
                                src={userData.imageUrl}
                                alt="Photo de profile"
                                style={cssProfile}
                              />
                            </div>
                            <div className="col-lg-auto mt-2">
                              <span
                                style={{
                                  fontSize: "18px",
                                  color: "#19A8D9",
                                  marginLeft: "5px",
                                }}
                              >
                                @{userData.pseudo} <br />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "#696969",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {dateFrParser(beam.createdAt)}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="col col-lg-1">
                          {currentUser === null ? (
                            ""
                          ) : currentUser.uid === userData.userId ? (
                            <RiDeleteBin5Fill
                              className="btn_delete"
                              onClick={() => {
                                deleteBeamUser(beam.id);
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12">
                          {beam.body && beam.body.length < 320 ? (
                            <p
                              className="card-text  "
                              style={{ textAlign: "justify" }}
                            >
                              {beam.body}
                              <br />
                              <br />
                              {beam.image ? (
                                <div style={{    maxWidth: '100%',
                                               minWidth: 500,
                                               width: "calc((100vh + -325px) * 1)"}}>
                                  <img 
                                    src={beam.image}
                                    className="img-fluid img-thumbnail"
                                    style={{
                                      width: "100% ",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: 10,
                                    }}
                                    alt="photo du post"
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </p>
                          ) : (
                            <p
                              className="card-text"
                              style={{ textAlign: "justify" }}
                            >
                              {beam.body} <br />
                              {beam.image ? (
                                <div style={{    maxWidth: '100%',
                                minWidth: 500,
                                width: "calc((100vh + -325px) * 1)"}}>
                                  <img
                                    src={beam.image}
                                    className="img-fluid img-thumbnail"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover",
                                      borderRadius: 10,
                                    }}
                                    alt="photo du post"
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </p>
                          )}
                        </div>
                      </div>

                      <hr style={{ marginBottom: "5px", marginTop: "12px" }} />
                      <div className="row">
                        <div className="col-lg-3 col-sm-3">
                          {currentUser &&
                          beam.like &&
                          beam.like.includes(currentUser.uid) ? (
                            <span style={{ marginLeft: "2rem" }}>
                              <FcLike
                                style={{ fontSize: "20px" }}
                                onClick={() => {
                                  unlike(beam.id);
                                }}
                              />
                              {beam.likeCount === 0 ? "" : beam.likeCount}
                            </span>
                          ) : (
                            <span style={{ marginLeft: "2rem" }}>
                              <img
                                src={likeVide}
                                alt="likevide"
                                onClick={() => {
                                  like(beam.id);
                                }}
                              />
                              {beam.likeCount === 0 ? "" : beam.likeCount}
                            </span>
                          )}
                        </div>

                        <div className="col-lg-6 col-sm-6">
                          <span>
                            <BsChatDots
                              BsChatDots
                              style={{ fontSize: "20px" }}
                            />
                            {beam.commentCount === 0 ? "" : beam.commentCount}
                          </span>
                          {beam.commentCount !== 0 ? (
                            <button
                              onClick={() => {
                                getComments(beam.id, setComments);
                                setSeeComment0(false);
                                setSeeComment(!seeComment);
                              }}
                              className="btn btn-default"
                              style={{ marginBottom: "0px", marginTop: "0px" }}
                            >
                              Voir Commentaire
                              {seeComment === false ? (
                                <FiChevronDown />
                              ) : (
                                <FiChevronUp />
                              )}
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                getComments(beam.id, setComments);
                                setSeeComment(false);
                                setSeeComment0(!seeComment0);
                              }}
                              className="btn btn-default"
                              style={{ marginBottom: "0px", marginTop: "0px" }}
                            >
                              Ajouter un commentaire
                              {seeComment === false ? (
                                <FiChevronDown />
                              ) : (
                                <FiChevronUp />
                              )}
                            </button>
                          )}

                          {seeComment && beam.commentCount !== 0 && (
                            <div style={{marginLeft: "5%", width: "90%"  }}>
                              <div className="row">
                                <div className="col col-lg-10 col-sm-10">
                                  <label
                                    htmlFor="adComment"
                                    className="form-label"
                                  >
                                    Ajouter un commentaire
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="adComment"
                                    placeholder="Commentaire ..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  />
                                </div>
                                <div className="col-lg-2 col-sm-2 mt-4">
                                  <button
                                    style={{
                                      backgroundColor: "#19A8D9",
                                      borderColor: "#19A8D9",
                                      color: "white",
                                      borderRadius: "20px",
                                    }}
                                    className="btn btn-primary"
                                    onClick={() => {
                                      addComment(
                                        beam.id,
                                        comment,
                                        setComment,
                                        setSeeComment
                                      );
                                    }}
                                  >
                                    Valider
                                  </button>
                                </div>
                              </div>

                              {comments.map((comment, index) => {
                                if (comment.screamId === beam.id)
                                  return (
                                    <div
                                      key={index}
                                      className="card-footer mt-1"
                                      style={{
                                        boxShadow:
                                          "rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px",
                                        borderRadius: "20px",
                                      }}
                                    >
                                      <div className="row">
                                        <div className="col-lg-auto">
                                          <img
                                            src={comment.userImage}
                                            alt="Avatar"
                                            style={cssProfil}
                                          />
                                        </div>
                                        <div className="col-lg-auto">
                                          <span
                                            style={{
                                              fontSize: "18px",
                                              color: "#19A8D9",
                                            }}
                                          >
                                            @{comment.pseudoUser}
                                          </span>
                                          <br />
                                          <span
                                            style={{
                                              fontSize: "12px",
                                              color: "#696969",
                                            }}
                                          >
                                            {dateFrParser(comment.createdAt)}
                                          </span>
                                        </div>
                                        <div className="col-lg-auto"></div>
                                      </div>
                                      <div className="row">
                                        <div className="col-lg-12">
                                          <p style={{ textAlign: "justify" }}>
                                            {comment.body}
                                            {currentUser === null ? (
                                              ""
                                            ) : currentUser.uid ===
                                              comment.userid ? (
                                              <RiDeleteBin5Fill
                                                style={{ marginLeft: "5%" }}
                                                className="btn_delete"
                                                onClick={() => {
                                                  deleteComment(
                                                    beam.id,
                                                    comment.id,
                                                    setSeeComment
                                                  );
                                                }}
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                              })}
                            </div>
                          )}

                          {seeComment0 && beam.commentCount === 0 && (
                            <div style={{marginLeft: "5%", width: "90%"  }}>
                              <div className="row">
                                <div className="col col-lg-10 col-sm-10">
                                  <label
                                    htmlFor="adComment"
                                    className="form-label"
                                  >
                                    Ajouter un commentaire
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="adComment"
                                    placeholder="Commentaire ..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                  />
                                </div>
                                <div className="col-lg-2 col-sm-2 mt-4">
                                  <button
                                    style={{
                                      backgroundColor: "#19A8D9",
                                      borderColor: "#19A8D9",
                                      color: "white",
                                      borderRadius: "20px",
                                    }}
                                    className="btn btn-primary"
                                    onClick={() => {
                                      addComment(
                                        beam.id,
                                        comment,
                                        setComment,
                                        setSeeComment,
                                        setSeeComment0
                                      );
                                    }}
                                  >
                                    Valider
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="col-lg-3 col-sm-3">
                          <span style={{}}>
                            <AiOutlineRetweet
                              onClick={() => {
                                rePost(beam.id);
                              }}
                              style={{ color: "#696969", fontSize: "20px" }}
                            />
                            {beam.repost}
                          </span>
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
          <div className="row ">
            <div className="col col-lg-12">
              <h1 style={{ color: "#696969", fontSize: "12px" }}>
                Aucune publication
              </h1>
            </div>
          </div>
        );
      }
    } else {
      return (
        <div className="row ">
          <div className="col col-lg-12">
            <h1 style={{ color: "#696969", fontSize: "12px" }}>
              Veuillez vous abonner pour voir ce contenu.
            </h1>
          </div>
        </div>
      );
    }
  }
};

export default Beams;
