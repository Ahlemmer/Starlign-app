import React, { useEffect } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BsCardImage, BsFillEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import routeApi from "../api/routes";
import Tooltip from "@material-ui/core/Tooltip";

function TweetBox({ onSuccess }) {
  const token = localStorage.getItem("FBIdToken");
  const [tweetBox, SetTweetBox] = useState("");
  //const [selectedFile, setSelectedFile]= useState(null);
  const [tweet, setTweet] = useState("");
  const [images, setImages] = useState(false);
  const [imageObject, setImageObject] = useState(false);
  const [user, setUser] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showEmojis, setShowEmojis] = useState(false);
  const filePickerRef = useRef(null);

  const addImagepost = (event) => {
    if (event.target.files) {
      setImageObject(event.target.files[0]);

      var reader = new FileReader();

      reader.onload = function (e) {
        setImages(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setTweet(tweet + emoji);
  };
  

  // console.log(tweet)
  const TweetHandler = async () => {
    const token = localStorage.getItem("FBIdToken");
    
      const result = await routeApi.addPub(
        token,
        tweet,
        imageObject,
        (prog) => {
          setProgress(prog);
        }
      );
      if (!result.ok) {
        console.log(result);
        setProgress(0);
        setShowEmojis(false);
      } else {
        setTweet("");
        setImageObject(false);
        setImages(false);

        setProgress(0);
        setShowEmojis(false);
        onSuccess();
      }
   
  };

  const getData = async () => {
    const result = await routeApi.getUser(token);
    if (!result.ok) return console.log(result);

    setUser(result.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
        <div className="tweet_box_img_input">  
         <div style={{display : 'flex',
                     padding: '10px',
                     'margin-left': '15px',
                     }}> 
          {user && <Avatar src={user.credentials.imageUrl} />} </div> 
         <div className="divtext">
          <textarea style={{ 
                borderRadius: 7,
                outline: "none",
                borderWidth: 0,
                resize:"none",
                overflow: "auto",
                wordBreak: 'break-word',
                wordWrap:"break-word",
                whiteSpace:"pre-wrap"
              }}
            className="text_tweet"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            placeholder="Exprimez-vous ..."

            type="text"
            rows="3"
            cols="10"
          />
          </div>
        </div>
        

        {images && (
          <div className="boximg"
            // style={{
            //   width: "100%",
            //   paddingLeft: 25,
            //   paddingRight: 17,
            //   paddingBottom: 15,
            //   position: "relative",
            // }}
          >
            <div className="boxclose"
              onClick={() => {
                setImages(false);
                setImageObject(false);
                
              }}
              // style={{
              //   cursor: "pointer",
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   position: "absolute",
              //   right: 30,
              //   top: 7,
              //   height: 30,
              //   width: 30,
              //   backgroundColor: "#000",
              //   borderRadius: 100,
              // }}
            >
              <span onClick={() => {
                setImages(false);
                setImageObject(false);
              }}
                style={{
                  paddingBottom: 7,
                  color: "#fff",
                  fontSize: 25,
                  fontWeight: "normal",
                }}
              >
                x
              </span>
            </div>
            <img className="postimg"
              src={images}
              // style={{
              //   width: "100%",
              //   height: 170,
              //   borderRadius: 10,
              //   objectFit: "cover",
              // }}
            />
          </div>



        )}

          
        <div className="Btns">
          <div className="Icon">
            <div className="Btns_icon_tweet">
             <div className="chaipas">

              <Tooltip title="Médias" placement="Top"   >
                <div 
                // className="Btns_icon"
                  onClick={() => filePickerRef.current.click()}
                 >
                <BsCardImage fontSize="1.5rem" color="#19A8D9" margin-right= "10px;" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    addImagepost(e);
                  }}
                  ref={filePickerRef}
                />
                </div>
              </Tooltip>
             </div>
             <div className="chaipas2">
             <Tooltip title="Emoji" placement="Top"  >
              <div
                // className="Btns_icon"
                onClick={() => setShowEmojis(!showEmojis)}
              >
                <BsFillEmojiSmileFill fontSize="1.5rem" color="#19A8D9" />
              </div>
             </Tooltip>
            
             {showEmojis && (
              <Picker 
                onSelect={addEmoji}
                style={{
                  zIndex: 999,
                  position: 'absolute',
                  maxWidth: 250,
                  borderRadius: 20,
                  transform: 'translate(-55px, 6px)',
                  cursor: 'pointer',
                }}
                theme="clear"
              />
             )}
             </div>
           </div> 
            
           <div style={{width:40, height:40}}></div> 

            <div>
              <Button className="tweetBox__tweetButton " onClick={TweetHandler} > 
                {progress ? progress.toFixed(0) + "%" : "Post"}
             </Button>  
             </div>   
          </div>      
        </div>

        </div>
      </form>
      <div
        style={{
          width: "100%",
          height: "1px",
          'background-color' : 'rgb(239, 243, 244)',
        }}
      ></div>
    </div>
  );
}

export default TweetBox;

