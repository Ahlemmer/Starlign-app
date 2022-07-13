import React, { useEffect, useState } from "react";
import "./Post.css";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import { BsChatDots, BsHeartFill } from "react-icons/bs";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import MenuIcon from "@mui/icons-material/Menu";
import Commentaire from "./commentaire";
import LongMenu from "./menu";
import routeApi from "../api/routes";
import { VscArrowDown } from "react-icons/vsc";
import SendIcon from "@mui/icons-material/Send";
import { BsCardImage, BsFillEmojiSmileFill } from "react-icons/bs";
import { Picker } from "emoji-mart";
import Tooltip from "@material-ui/core/Tooltip";

const RePost = ({ data, refresh }) => {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [like, setLike] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [comments, setComments] = useState(false);
  const [currentUser, setCurrentUser] = useState(false);
  const [userUID, setUserUID] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const getComments = async () => {
    const token = localStorage.getItem("FBIdToken");
    setComments(false);
    const result = await routeApi.getPostComments(token, data.posteId);
    if (!result.ok) {
      console.log(result);
    } else {
      if (!result.data.comments[0]) return;
      setComments(result.data.comments);
    }
  };

  const addComment = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.addComment(token, data.posteId, comment);
    if (!result.ok) {
      console.log(result);
    } else {
      setComment("");
      getComments();
    }
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };

  const likeHandle = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.like(token, data.posteId);
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

  const handleRePost = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.rePost(token, data.posteId);
    if (!result.ok) {
      console.log(result);
    } else {
      refresh();
    }
  };

  const unlikeHandle = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.unLike(token, data.posteId);
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

  const getUserInfo = async () => {
    const token = localStorage.getItem("FBIdToken");
    const result = await routeApi.getUser(token);
    if (!result.ok) {
      console.log(result);
    } else {
      if (result.data.credentials.userId == data.userid) {
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
      setUserUID(result.data.credentials.userId);
      setLoaded(true);
    }
  };

  useEffect(() => {
    getUserInfo();
    // getComments();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          padding: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 100,
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          {data && data.userImage && <Avatar src={data.userImage} />}
        </div>
        <div className="info_user_repost">
          {/* div : displayname + pseudo + menu */}

          <div className="info_user_body_pub">
            {/* div displayname + pseudo + menu publication */}
            <div className="contenu_pub_gnrl">

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <div >
                <span
                  style={{
                    // backgroundColor: "red",
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "#000",
                    width: 300,
                    whiteSpace: "nowrap",
                    wordBreak: "break-word",
                  }}
                >
                  {data && data.Displayname ? data.Displayname : "User"}
                </span>
                </div> 

                <div>  <span style={{ width: "100%" }}>{"@" + data.pseudo}</span> </div>
              </div>

              <div
                style={{
                  width: 30,
                }}
              >
                <LongMenu
                  victime={data.userid}
                  isUser={data.own}
                  refresh={() => {
                    refresh();
                  }}
                  loaded={loaded}
                  pseudo={data.pseudo}
                  posteId={data.posteId}
                  user={data.userid}
                />
              </div>
            </div>
            <div className="post__headerDescription">
              {data && data.body && <p> {data.body} </p>}
            </div>
          </div>
          {/* <div className="info_user_gnrl">
            
            <div className="contenu_pub_gnrl">
              <div className="khra"> 
                <div>
                  <span
                  style={{
                    
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "#000",
                    width: 300,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {data && data.Displayname ? data.Displayname : "User"}
                </span>
                </div>
                 <div><span style={{ width: "100%" }}>{"@" + data.pseudo}</span></div>
              </div>

              
              
              <div
                style={{
                  width: 30,
                }}
              >
                <LongMenu
                  victime={data.userid}
                  isUser={currentUser}
                  refresh={() => {
                    refresh();
                  }}
                  loaded={loaded}
                  pseudo={data.pseudo}
                  posteId={data.posteId}
                  user={data.userid}
                />
              </div>
            </div>
            <div className="post__headerDescription">
              {data && data.body && <p> {data.body} </p>}
            </div>
          </div> */}

          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              backgroundColor: "rgba(0,0,0,0.04)",
              borderRadius: 8,
              padding: 20,
            }}
          >
            <div
              style={{
                display: "flex",

                width: "100%",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  display: "flex",
                  height: "100%",

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {data && data.reuserImage && <Avatar src={data.reuserImage} />}
              </div>
              <div
                style={{
                  display: "flex",
                  paddingLeft: 12,
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <span
                  style={{
                    // backgroundColor: "red",
                    fontSize: 17,
                    fontWeight: "bold",
                    color: "#000",
                    width: '100%',
                    
                  }}
                >
                  {data && data.reDisplayname ? data.reDisplayname : "User"}
                </span>

                <span style={{  
                                width: "100%" }}>
                  {"@" + data.repseudo}
                </span>
              </div>
            </div>
            <span style={{ width: "100%", marginTop: 5, paddingLeft: 14 }}>
              {data.rebody}
            </span>
            {data && data.reimage && (
              <img
                src={data.reimage}
                alt="profile"
                style={{
                  marginTop: 11,
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            )}
          </div>

          <div className="post__footer">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <>
                {" "}
                {!like ? (
                  <Tooltip title="Aimer" placement="Top">
                    <div className="post__foot">
                      <BsHeart
                        style={{
                          cursor: "pointer",
                        }}
                        fontSize="1.4rem"
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
                        fontSize="1.4rem"
                        onClick={unlikeHandle}
                      />
                    </div>
                  </Tooltip>
                )}{" "}
              </>
              {data && likeCount != 0 && (
                <span
                  style={{
                    marginLeft: 5,
                  }}
                >
                  {likeCount ? likeCount : ""}
                </span>
              )}
            </div>

            <Tooltip title="Commentaire" placement="Top">
              <div className="post__foot">
                <BsChatDots
                  onClick={() => {
                    setShowComment(!showComment);
                    getComments();
                  }}
                  fontSize="1.4rem"
                />
              </div>
            </Tooltip>
            <Tooltip title="Repost" placement="Top">
              <div className="post__foot">
                <AiOutlineRetweet onClick={handleRePost} fontSize="1.4rem" />
              </div>
            </Tooltip>
            <a
              color={data.reimage ? "blue" : "#000"}
              onClick={() => {
                if (!data.reimage) return;
                window.open(data.reimage, '_blank');
              }}
              download="image"
            >
              {" "}
              <Tooltip title="Télécharger" placement="Top">
                <div className="post__foot">
                  <VscArrowDown
                    color={data.reimage ? "blue" : "#000"}
                    fontSize="1.4rem"
                  />
                </div>
              </Tooltip>
            </a>
          </div>
          {showComment ? (
            <div className="show_comm">
            <div className="div_comm"> 

               <div className="comm_input_div"> 
                  <textarea className="comm_input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Ecrire un commentaire"
                    rows="3"
                    resize='none'
                  />

                 
                    <span
                      onClick={() => setShowEmojis(!showEmojis)}
                       style={{
                         cursor: "pointer",
                         display: "flex",
                         height: 40,
                         justifyContent: "center",
                         alignItems: "center",
                         paddingLeft: 7,
                         paddingRight: 10,
                         transform:"translate(-35px,0px)",
                         borderRadius: "10px",
                        }}>
                         <Tooltip title="Insérez un emoji" placement="Top">
                           <div className="post__foot">
                              <BsFillEmojiSmileFill style={{color:"#778899", fontSize: "1.1rem"}} />
                           </div>
                         </Tooltip>
                    </span>
                 

                </div>

                <div className="comm_emoji" >



                <div className="c2">
                <a
                  onClick={() => {
                    addComment();
                  }}
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    transform: "translate(-15px, 0px)",
                  }}
                >
                  <span
                    style={{
                      color: "#778899",
                    }}
                  >
                    <SendIcon />
                  </span>
                  
                </a>
                </div>
          </div>
           </div>
              {showEmojis && (
                <Picker className="emoji-mart"
                  onSelect={addEmoji}
                  cursor="pointer"
                  theme="clear"
                />
              )}

              {comments &&
                comments[0] &&
                comments.map((item, index) => (
                  <Commentaire
                    key={index}
                    image={item.userImage}
                    nom={item.Displayname}
                    comment={item.body}
                    currentUser={userUID == item.userid}
                    post={data.posteId}
                    data={item}
                    refresh={() => {
                      getComments();
                    }}
                    date={item.createdAt}
                  />
                ))}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "1px",
          'background-color' : 'rgb(239, 243, 244)',
          // 'margin-bottom': '4px',
          // 'margin-top': '4px'
        }}
      ></div>
    </div>
  );
};

export default RePost;
