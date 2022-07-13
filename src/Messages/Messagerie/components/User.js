import React, { useEffect, useState } from "react";

import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../profil/Firebase/firebase";
import Img from "./icone-de-profil.jpg";

const User = ({ user, selectUser, chat }) => {
  const user2 = user?.iduser;

  const [isonline, setisonline] = useState("");

  useEffect(() => {
    let unsub2 = onSnapshot(doc(db, "Users", user2), (doc) => {
      setisonline(doc.data().isOnLign);
    });
    return () => unsub2();
  }, []);

  return (
    <>
      <div
        className={`user_wrapper2 ${
          chat.nom === user.nom &&
          chat.prenom === user.prenom &&
          "selected_user"
        }`}
        onClick={() => selectUser(user)}
      >
        <div className="user_info">
         <div>
          <img src={user.imageUrl} alt="avatar" className="avatar" />
          <div className="user_detail">

           

            <div
              className={`user_status ${isonline ? "online" : "offline"}`}
            ></div>
            
            
          </div>
          </div> 
          <div className="div_info_msg">
            <span className="nom">{user.nom} {user.prenom}</span>
          </div>
  
        </div>
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${
          chat.nom === user.nom &&
          chat.prenom === user.prenom &&
          "selected_user"
        }`}
      >
        <img src={user.imageUrl} alt="avatar" className="avatar sm_screen" />
      </div>
    </>
  );
};

export default User;
