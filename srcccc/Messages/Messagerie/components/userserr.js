import React, { useEffect, useState } from "react";
import { AppBar,Toolbar, makeStyles, Typography, InputBase, alpha, Avatar, Chip } from '@material-ui/core';


import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../../profil/Firebase/firebase";

const UserSea = ({ user, selectUser_2, chat }) => {
  const user2 = user?.userId;

  return (
    <>

                <div onClick={() => selectUser_2(user)}>
    
                <div  onClick={() => selectUser_2(user)} className='infos-suggestion'>
                {user && <Avatar src={user.imageUrl} />}

                <div className="info-suggestion" >
                    <span className='dr'>{user &&user.Displayname}</span>
                    <p className='dr'>{user && "@" +user.pseudo}</p>
                     
                </div>
               

                </div></div>
                
      {/* <div
        className={`user_wrapper ${
          chat.nom === user.nom &&
          chat.prenom === user.prenom &&
          "selected_user"
        }`}
        onClick={() => selectUser_2(user)}
      >
        
          <div className="user_info">          
           <img src={user.imageUrl} alt="avatar" className="avatar" />
           <div className="user_detail1">
             <span>{user.nom} {user.prenom}</span>
             <span>@{user.pseudo}</span>
           </div>
          
        </div>  
      </div>
      <div
        onClick={() => selectUser_2(user)}
        className={`sm_container ${
          chat.nom === user.nom &&
          chat.prenom === user.prenom &&
          "selected_user"
        }`}
      >
        <img src={user.imageUrl} alt="avatar" className="avatar sm_screen" />
      </div> */}
    </>
  );
};

export default UserSea;
