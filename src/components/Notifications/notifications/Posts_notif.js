import React, {useState} from "react";
import "./Post.css";
// import "./TweetBox.css";
import { Avatar } from "@material-ui/core";
import { BsChatDots} from "react-icons/bs";
import { AiOutlineRetweet} from 'react-icons/ai'
import { BsHeart } from "react-icons/bs";
import { VscArrowDown } from "react-icons/vsc";
import {MdOutlineDelete} from "react-icons/md";
import Commentaire from "./commentaire";
import {BsFillEmojiSmileFill } from "react-icons/bs";
import { Picker } from "emoji-mart";
import Tooltip from "@material-ui/core/Tooltip";



const Posts =   (props) => {
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const [showEmojis, setShowEmojis] = useState(false);


  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setComment(comment + emoji);
  };

  console.log(showComment)
  

    return (
      <div className="post" >
        <div className="post__avatar">
          <Avatar src={props.avatar}/>
        </div>
        <div className="post__body">
          <div className="post__header">
            
            <div className="post__headerText">
              <div>
                <h3>
                  {props.nomComplet}
                 <span className="post__headerSpecial">
                   <br></br>@{props.pseudo}
                 </span>
                </h3>
              </div>

              <div>
                <Tooltip title="Supprimer" placement="Top">
                  <div className="Drop_down">
                    <MdOutlineDelete fontSize="1.4rem" />
                 </div> 
                </Tooltip>
              </div>
            </div>
            {/* <div className="post__headerDescription">
              <p>  {props.tweet} </p>
            </div> */}
            
          </div>
          <div className="post__headerDescription">
              <p>  {props.tweet} </p>
            </div>
          {
            props.image && ( <img 
            src={props.image}
 
            alt="wd" style={{width: "100%",height:"23rem",objectFit:"fill"}}
          />)
          }
         
          <div className="post__footer">
           
            <Tooltip title="Aimer" placement="Top">
            <div className="post__foot">
            <BsHeart fontSize="1.4rem"/>
            </div>
            </Tooltip>
            <Tooltip title="commentaire" placement="Top"> 
            <div className="post__foot">
            <BsChatDots onClick={() => setShowComment(true)} fontSize="1.4rem"/>
            </div>
            </Tooltip>
            <Tooltip title="Repost" placement="Top">
            <div className="post__foot">
            <AiOutlineRetweet fontSize="1.4rem"/>
            </div>
            </Tooltip>
            <Tooltip title="Télécharger" placement="Top">
            <div className="post__foot">
            <VscArrowDown fontSize="1.3rem"/>
            </div>
            </Tooltip>
          </div>
          {showComment ?
          <div className="tweetBox__input">
        
            <input value={comment} onChange={(e) => setComment(e.target.value)}  type="text"  placeholder="Ecrivez un commentaire" />  <Commentaire nom="Zaama Nabila" comment="c'est trop beau" date=" posted 1 minute ago" /></div> : <div></div>
            
          }
        </div>
      </div>
    );
  }

;

export default Posts;
