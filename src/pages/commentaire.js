import React, { Fragment, useState } from "react";
import { Avatar, Grid, Paper, Tooltip } from "@material-ui/core";
import * as Icon from "react-bootstrap-icons";
import DeleteIcon from "@mui/icons-material/Delete";
import routeApi from "../api/routes";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import { AiFillCheckCircle } from "react-icons/ai";
import './Post.css'

const Comment = (props) => {
  const [supprimercmntr, setsupprimercmntr] = useState(false);
  const [like, setLike] = useState(props.data.isLiked);
  const [likeCount, setLikeCount] = useState(props.data.likeCount);
  const token = localStorage.getItem("FBIdToken");

  const deleteComment = async () => {
    const result = await routeApi.deleteComment(
      token,
      props.post,
      props.data.commentId
    );
    if (!result.ok) {
      console.log(result);
    } else {
      setsupprimercmntr(false);
      props.refresh();
    }
  };

  const likeHandle = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.likeComm(
      token,
      props.post,
      props.data.commentId
    );
    if (!result.ok) {
      console.log(result);
    } else {
      if (result.data.message != "liked succesffuly ") {
        alert(result.data.message);
      } else {
        setLike(!like);

        setLikeCount(likeCount + 1);
      }
    }
  };

  const unlikeHandle = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.unLikeComm(
      token,
      props.post,
      props.data.commentId
    );
    if (!result.ok) {
      console.log(result);
    } else {
      if (result.data.message != "unliked succesffuly ") {
        alert(result.data.message);
      } else {
        setLike(!like);
        if (likeCount >= 1) {
          setLikeCount(likeCount - 1);
        }
      }
    }
  };
  


  return (
    <>
    
      {/* <div>
        <Paper style={{ padding: "10px 10px", marginTop: 10, width: 500 }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item></Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>{props.nom} </h4>

              <span
                style={{
                  maxWidth: "100%",
                  textAlign: "left",
                  wordWrap: "break-word",
                }}
              >
                {props.comment}
                <span
                  style={{
                    textAlign: "left",
                    wordWrap: "break-word",
                    maxWidth: "100%",
                  }}
                >
                  {" "}
                  {afficherButtonSupprimer}
                </span>
              </span>
              <p style={{ textAlign: "left", color: "gray" }}>
                {props.dateComment}
              </p>
            </Grid>
          </Grid>
        </Paper>
      </div> */}

      <div className="div_comm_gnrl">
        <div
          style={{
            display: "flex",
            borderRadius: 7,
            flexDirection: "row",
            width: "100%",
          }}
        >
          <div className="div_comm_inside">
            <div
              style={{
                display: "flex",
                width: 60,
                height: "100%",
                alignItems: "flex-start",
              }}
            >
              <Avatar alt="image" src={props.image} />
            </div>
            <div className="user_comm">
              <span
                style={{
                  margin: 0,
                  textAlign: "left",
                  
                  fontSize: 19,
                  fontWeight: "bold",
                  whiteSpace: "pre-wrap",
                  wordBreak:"break-word",
                  wordWrap:"word-break",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {props.nom}{" "}
              </span>

              <span
                style={{
                  
                  textAlign: "left",
                  wordWrap: "break-word",
                }}
              >
                {props.comment}
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 50,
              flexDirection: "column",
              borderTopRightRadius: 7,
              borderBottomRightRadius: 7,
            }}
          >
            {!supprimercmntr && (
              <div>
                {!like ? (
                  <Tooltip title="Aimer" placement="Top">
                    <div className="post__foot">
                      <BsHeartFill
                        color="#fff"
                        style={{
                          cursor: "pointer",
                          borderWidth: 1,
                          borderColor: "red",
                        }}
                        fontSize={20}
                        onClick={likeHandle}
                      />
                    </div>
                  </Tooltip>
                ) : (
                  <Tooltip title="Ne plus aimer" placement="Top">
                    <div className="post__foot">
                      <BsHeartFill
                        color="#e33045"
                        style={{
                          cursor: "pointer",
                        }}
                        fontSize={20}
                        onClick={unlikeHandle}
                      />
                    </div>
                  </Tooltip>
                )}
              </div>
            )}

            {supprimercmntr && (
              <div>
                <Tooltip title="Confirmer" placement="Top">
                  <div className="post__foot">
                    <AiFillCheckCircle
                      color="#fff"
                      style={{
                        cursor: "pointer",
                        borderWidth: 1,
                        borderColor: "red",
                      }}
                      fontSize={24}
                      onClick={deleteComment}
                    />
                  </div>
                </Tooltip>
              </div>
            )}

            {!supprimercmntr && props.currentUser && (
              <div
                style={{
                  marginTop: 3,
                }}
              >
                <Tooltip title="Supprimer" placement="Top">
                  <div className="post__foot">
                    <TiDelete
                      color="#fff"
                      style={{
                        cursor: "pointer",
                        borderWidth: 1,
                        borderColor: "red",
                      }}
                      fontSize={28}
                      onClick={() => {
                        setsupprimercmntr(true);
                      }}
                    />
                  </div>
                </Tooltip>
              </div>
            )}
            {supprimercmntr && (
              <div
                style={{
                  marginTop: 3,
                }}
              >
                <Tooltip title="Annuler" placement="Top">
                  <div className="post__foot">
                    <TiDelete
                      color="red"
                      style={{
                        cursor: "pointer",
                        borderWidth: 1,
                        borderColor: "red",
                      }}
                      fontSize={32}
                      onClick={() => {
                        setsupprimercmntr(false);
                      }}
                    />
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Comment;
