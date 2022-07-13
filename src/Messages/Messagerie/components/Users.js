import React, { useEffect, useState } from "react";

import {
  onSnapshot,
  doc,
  orderBy,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../profil/Firebase/firebase";
import Img from "./icone-de-profil.jpg";

const Users = ({ user1, user, selectUser_2, chat }) => {
  const user2 = user?.userId;
  const [data, setData] = useState("");
  const [f, setf] = useState([]);
  const [isonline, setisonline] = useState([]);
  const [users, setusers] = useState([]);
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });

    return () => unsub();
  }, []);
  useEffect(() => {
    let v = collection(db, "lastMsg");
    let r = query(v, orderBy("createdAt", "desc"));
    let e = onSnapshot(r, (on) => {
      let f = [];
      on.forEach((doc) => {
        f.push(doc.data());
      });
      setf(f);
    });
    return () => e();
  }, []);
  // console.log(f);
  useEffect(() => {
    const connect = collection(db, "Users", user1, "abonnements");
    const inquire = query(connect);
    const dem = onSnapshot(inquire, (on) => {
      let isonline = [];
      on.forEach((doc) => {
        isonline.push(doc.data());
      });
      setisonline(isonline);
    });
    return dem;
  }, []);
  useEffect(() => {
    const usersRef = collection(db, "Users");
    const q = query(usersRef, where("userId", "not-in", [user1]));
    const unsub5 = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setusers(users);
    });
    return () => unsub5();
  }, []);
  let connect = [];
  isonline.forEach((x) => {
    users.forEach((z) => {
      if (x.iduser === z.userId) {
        connect.push(z);
      }
    });
  });

  return (
    <>
      <div
        className={`user_wrapper ${
          chat.nom === user.nom &&
          chat.prenom === user.prenom &&
          "selected_user"
        }`}
        onClick={() => selectUser_2(user)}
      >
        <div className="user_info">
          <div >
          <img src={user.imageUrl || Img} alt="avatar" className="avatar" />
          <div className="user_detail">
            
            {connect.map((value) => {
              if (value.userId === user2) {
                return (
                  <div
                    className={`user_status ${
                      value.isOnLign ? "online" : "offline"
                    }`}
                  >
                  </div>
                );
              }
            })}

          </div>
          </div>
        <div className="div_info_msg">
            <span className="nom">{user.nom} {user.prenom}</span>
  
          

        
         {data && (
          <>
            {data.to === user2 ? (
              <span className="truncate">
                <strong>{data.from === user1 ? "Me:" : null}</strong>
                {data.text}
              </span>
            ) : (
              f.map((u) => {
                if (u.to === user2 && u.from === user1) {
                  return (
                    <span className="truncate">
                      <strong>{data.from === user1 ? "Me:" : null}</strong>

                      {u.text}
                    </span>
                  );
                }
                if (u.from !== user1 && u.to == user1 && u.from === user2) {
                  return (
                    <>
                      <span><small className="unread">New</small></span>
                    </>
                  );
                }
              })
            )}
          </>
        )}
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
        <img
          src={user.imageUrl || Img}
          alt="avatar"
          className="avatar sm_screen"
        />
      </div>
    </>
  );
};

export default Users;
