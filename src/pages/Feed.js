import React, { useEffect, useRef, useState } from "react";
import TweetBox from "./TweetBox";
import Posts from "./Posts";
import "./Feed.css";
import routeApi from "../api/routes";
import { Avatar } from "@mui/material";
import { height } from "@mui/system";
// import MoonLoader from "react-spinners/MoonLoader";
// import DotLoader from "react-spinners/DotLoader";
import RePost from "./RePost";
import MenuStory from "./menuStory";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import Disconnected from '../profil/Loader';


function Feed() {
  const [posts, setPosts] = useState(false);
  const [allStories, setAllStories] = useState(false);
  const [currentStory, setCurrentStory] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [images, setImages] = useState(false);
  const [currentImage, setCurrentImage] = useState(false);
  const [progress, setProgress] = useState(0);
  const [body, setBody] = useState("");
  const [successRate, setSuccessRate] = useState(0);
  const [addStory, setAddStory] = useState(false);
  const imageRef = useRef();
  const [Loading, setLoading] = useState(true);
    let history = useHistory();


  const addImagepost = (event) => {
    if (event.target.files) {
      setImages(event.target.files);

      var reader = new FileReader();

      reader.onload = function (e) {
        setCurrentImage(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const getData = async () => {
    const token = localStorage.getItem("FBIdToken");

    setPosts(false);

    // console.log('######')
    const result = await routeApi.getPublications(token);
    if (!result.ok) {
      console.log(result);
      setSuccessRate(successRate + 1);
    } else {
      //console.log(result.data)
      setPosts(result.data);
    }
  };

  const getAllStories = async () => {
    setAllStories(false);
    const token = localStorage.getItem("FBIdToken");

    const storyRes = await routeApi.getStories(token);
    if (!storyRes.ok) {
      console.log(storyRes);
      setSuccessRate(successRate + 1);
    } else {
      //console.log(storyRes.data)
      setAllStories(storyRes.data);
      //setCurrentStory(storyRes.data[0]);
    }
  };

  const addDBStory = async () => {
    const token = localStorage.getItem("FBIdToken");

    setDisabled(true);
    const result = await routeApi.addStory(token, images[0], body, (prog) => {
      setProgress(prog);
    });
    if (!result.ok) {
      console.log(result);
      setDisabled(false);
      setSuccessRate(successRate + 1);
    } else {
      setSuccessRate(successRate + 1);
      setDisabled(false);
      setAddStory(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("FBIdToken");
    const refresh_token = localStorage.getItem("RefToken");
    if (!token){
        history.push('/')
    }else{
        let authenticated;
        const token = localStorage.FBIdToken;
        const refresh_token = localStorage.RefToken;
        const decodedToken = jwtDecode(token);
        if((decodedToken.exp * 1000 - Date.now()) < 600000){
            try { 
                let data = {
                    grant_type:"refresh_token",
                    refresh_token: refresh_token 
                }
                axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
                    localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`);
                    localStorage.setItem("RefToken", `${res.data.refresh_token}`);   
                })
                authenticated = false;
                
                } catch (error) {
                    console.log(error);
                }
        } else {
          if (successRate > 2) return;
            getAllStories();
            getData();
            authenticated = true;
        }
        
    }
  return  setLoading(false)
  }, [successRate]);

  // useEffect(() => {
  //   setLoading(true);
  //   const token = localStorage.getItem("FBIdToken");
  //   const refresh_token = localStorage.getItem("RefToken");
  //   if (!token){
  //       history.push('/')
  //   }else{
  //       let authenticated;
  //       const token = localStorage.FBIdToken;
  //       const refresh_token = localStorage.RefToken;
  //       if(token){
  //       const decodedToken = jwtDecode(token);
  //       if(decodedToken.exp * 1000 < Date.now()-600000){

  //           try {
                
  //               let data = {
  //                   grant_type:"refresh_token",
  //                   refresh_token: refresh_token 
  //               }
  //               axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
  //                   localStorage.removeItem("FBIdToken");
  //                   localStorage.removeItem("RefToken");
  //                   localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`);
  //                   localStorage.setItem("RefToken", `${res.data.refresh_token}`);
                    
  //               })
  //               authenticated = false;
                
  //           } catch (error) {
  //               console.log(error);
  //           }
  //       } else {
  //         if (successRate > 2) return;
  //         getAllStories();
  //         getData();
  //         authenticated = true;
  //       }
  //       }
  //   }
  // return  setLoading(false)
  // }, [successRate]);



  return (
    <div className="feed">
      <div className="feed_container">
      <div className="feed_header">
        <h2>Fil d'actualité</h2>
      </div>

      {currentStory && (
        <div
          style={{
            marginTop: 37,
            display: "flex",
            position: "fixed",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            top: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            onClick={() => {
              setCurrentStory(false);
            }}
            style={{
              cursor: "pointer",
              display: "flex",
              position: "absolute",
              right: 30,
              top: 30,
              height: 35,
              zIndex: 999999,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 1000,
            }}
          >
            <span
              style={{
                fontSize: 24,
                paddingBottom: 7,
              }}
            >
              {"x"}
            </span>
          </div>

          <img
            src={currentStory.image}
            className={"storyStyle"}
            style={{
              objectFit: "contain",
              position: "fixed",
              zIndex: 1000,

              backgroundColor: "#000",
            }}
          />

          <div
            className={"storyStyle"}
            style={{
              
              display: "flex",
              position: "relative",
              zIndex: 1002,
              flexDirection: "column",

              justifyContent: "flex-end",
              alignItems: "flex-start",
              padding: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: 0,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                left: 5,
                width: "100%",
                // padding: "20px 0px 0px  30px",
                //backgroundColor: "red",
                marginTop: 10,
              }}
            >
              {currentStory && currentStory.userImage && (
                <Avatar
                  style={{
                    
                    backgroundColor: "#000",
                  }}
                  src={currentStory.userImage}
                />
              )}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                {currentStory && currentStory.Displayname && (
                  <span
                    style={{
                      // backgroundColor: "#000",
                      padding: 10,
                      paddingTop: 5,
                      paddingBottom: 0,

                      fontSize: 15,
                      borderRadius: 7,
                      color: "#fff",
                    }}
                  >
                    {currentStory.Displayname}
                  </span>
                )}
                {currentStory && currentStory.time && (
                  <span
                    style={{
                      // backgroundColor: "#000",
                      padding: 10,
                      paddingTop: 0,
                      paddingBottom: 5,
                      fontSize: 10,
                      borderRadius: 7,
                      color: "#fff",
                    }}
                  >
                    {currentStory.time}
                  </span>
                )}
              </div>
              {currentStory.own && (
                <MenuStory
                  posteId={currentStory.storyid}
                  refresh={() => {
                    setCurrentStory(false);
                    setAllStories(false);
                    getAllStories();
                  }}
                />
              )}
            </div>

            {currentStory && currentStory.body && (
              <span
                style={{
                  
                  maxWidth: "100%",
                  backgroundColor: "#000",
                  padding: 10,
                  wordWrap: "break-word",
                  paddingRight: 10,
                  paddingTop: 5,
                  paddingBottom: 5,

                  fontSize: 17,
                  borderRadius: 7,
                  color: "#fff",
                }}
              >
                {currentStory.body}
              </span>
            )}
          </div>
        </div>
      )}

      {addStory && (
        <div
          style={{
            marginTop: 37,
            display: "flex",
            position: "fixed",
            width: "100vw",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            top: 0,
            right: 0,
            zIndex: 999,
            backgroundColor: "#E6ECF0",
          }}
        >
          
          <div
            onClick={() => {
              setAddStory(false);
            }}
            style={{
              cursor: "pointer",
              display: "flex",
              position: "absolute",
              right: 30,
              top: 30,
              height: 35,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 1000,
            }}
          > 
            <span
              style={{
                fontSize: 24,
                paddingBottom: 7,
              }}
            >
              
              {"x"}
            </span>
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              zIndex: 1002,
              flexDirection: "column",
              height: "calc(100vh - 60px)",
              width: 350,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: 20,
              overflow: "hidden",
              backgroundColor: "#fff",
              borderRadius: 12,
            }}
          >
            <input
              style={{
                width: "100%",
              }}
              type="file"
              accept="image/*"
              onChange={(e) => {
                addImagepost(e);
              }}
            />
            <input
              style={{
                width: "100%",
                height: 40,
                marginTop: 10,
                borderRadius: 7,
                outline: "none",
                borderWidth: 0,
              }}
              value={body}
              placeholder="Commentaire"
              type="text"
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
            {currentImage && (
              <div
                style={{
                  width: "100%",

                  position: "relative",
                }}
              >
                <img
                  src={currentImage}
                  style={{
                    width: "100%",
                    height: 170,
                    borderRadius: 10,
                    objectFit: "contain",
                  }}
                />
              </div>
            )}
            <a
              onClick={(e) => {
                addDBStory();
                setTimeout(() => {
                     getAllStories();
                     setCurrentImage(false);
                }, 3000);
              }}
              style={{
                position: "absolute",
                bottom: 20,
                display: "flex",
                height: 35,
                borderRadius: 5,
                width: "calc(100% - 40px)",
                backgroundColor: disabled ? "rgba(0,0,0,0.1)" : "#2c71d1",
                justifyContent: "center",
                alignItems: "center",

                cursor: "pointer",
              }}
            >
              {!disabled && (
                <span
                  style={{
                    color: "#fff",

                    fontSize: 15,
                  }}
                >
                  Post
                </span>
              )}
              {disabled && (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Disconnected loading={true}  />

                  {progress && (
                    <span
                      style={{
                        position: "absolute",
                        right: 20,
                      }}
                    >
                      {progress.toFixed(0) + "%"}
                    </span>
                  )}
                </div>
              )}
            </a>
          </div>
        </div>
      )}

      <div
        style={{
          minHeight: 100,
          width: "100%",

        }}
      >
        <div
          style={{
            display: "flex",
            padding: 20,
            marginBottom: 1,
            flexDirection: "row",
            alignItems: "center",
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
          }}
        >
          <div>
            
            <div
              onClick={() => {
                setAddStory(true);
              }}
              style={{
                cursor: "pointer",
                display: "flex",
                contentFit:"contain",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgb(239, 243, 244)",
                height: 55,
                marginRight: 15,
                width: 55,
                borderRadius: 1000,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                }}
              >
                {"+"}
              </span>
              
            </div>
            <p
                style={{
                  marginBottom : -16,
                  marginLeft:-16,
                  fontSize: 11,
                }}
              >
                {"Ajouter une story"}
              </p>
          </div>
          {!allStories && (
            <div
              style={{
                display: "flex",
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Disconnected loading={true}  />
            </div>
          )}
          {allStories &&
            allStories[0] &&
            allStories.map((item, index) => (
              <div
                key={item.storyid}
                onClick={() => {
                  setCurrentStory(item);
                }}
                style={{
                  cursor: "pointer",
                  display: "flex",
                  backgroundColor: "green",
                  marginRight: 15,
                  borderRadius: 1000,
                }}
              >
                <img
                  src={item.userImage}
                  style={{
                    backgroundColor: "#000",
                    display: "flex",
                    margin: 3,
                    height: 55,

                    width: 55,
                    borderRadius: 1000,
                  }}
                />
              </div>
            ))}
        </div>
        <div
        style={{
          width: "100%",
          height: "1px",
          'background-color' : 'rgb(239, 243, 244)',
          'margin-bottom': '4px',
          'margin-top': '4px'
        }}
      ></div>
      </div>

      <TweetBox
        onSuccess={() => {
          setSuccessRate(successRate + 1);
        }}
      />

      {!posts && (
        <div
          style={{
            display: "flex",
            height: 100,
            width: "100%",
            justifyContent: "center",
            paddingTop: 40,
          }}
        >
          <Disconnected loading={true}  />
        </div>
      )}

      {posts &&
        posts.map((post, index) => (
          <>
            {!post.recreatedAt && (
              <Posts
                key={index}
                refresh={() => {
                  getData();
                }}
                key={index}
                data={post}
              />
            )}
            {post.recreatedAt && (
              <RePost
                key={index}
                refresh={() => {
                  getData();
                }}
                key={index}
                data={post}
              />
            )}
          </>
        ))}
       </div> 
    </div>
  );
}

export default Feed;
