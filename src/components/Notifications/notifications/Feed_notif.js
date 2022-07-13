import React, { useEffect, useState } from "react";
import Posts from "../../../pages/Posts";
import RePost from "../../../pages/RePost";
import "./Feed_notif.css";
import { useHistory, useParams } from "react-router-dom";
import routeApi from "../../../api/routes";
import { Repeat } from "@material-ui/icons";




function Feed() {

  var pubb = useParams();
  

  const [post, setpost] = useState(false);

  const getpost = async () => {
    const token = localStorage.getItem("FBIdToken");
    var posteId = pubb.idpost; 

    const result = await routeApi.getPost(token, posteId);
    if (!result.ok) {
      console.log(result);
    } else {
      // if (!result.data) return;
      setpost(result.data);
      console.log(result);
    }
  };

  useEffect(() => {
    getpost();
    
  }, []);


  return (
    
    <div className="feed">
      {post  && post.etat == 'post' &&   (
      <Posts 
      refresh={() => {
        getpost();
      }}
      data={post}/>
       )}
       {post  &&  post.recreatedAt && (
        <RePost 
        refresh={() => {
          getpost();
        }}
        data={post}/>
      )}
    </div>
  );
}

export default Feed;
