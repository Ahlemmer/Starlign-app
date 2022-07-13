import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  where,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import React, { useRef, useEffect, useState } from "react";
import Moment from "react-moment";
import { db } from "../../../profil/Firebase/firebase";
import Delet from "../svg/Delet";
const Message = ({ msg, user1 }) => {
  
  
  const [k, setk] = useState([]);
  const [e, sete] = useState([]);
  const [data, setData] = useState("");
  const [Etat, setEtat] = useState(false);


  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollIntoView({ behavior: "smooth",block: "nearest" });
    // console.log(msg.uid)
    // console.log(msg.delid)
    
  }, [msg]);


  const user2 = msg.to;
  const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const ad = collection(db, "messages", id, "chat");
    const r = query(ad);

    const d = onSnapshot(r, (g) => {
      let k = [];
      let e = [];
      g.forEach((doc) => {
        k.push(doc.id);
        e.push(doc.data().text);
      });
      setk(k);
      sete(e);
    });

    return () => d();
  }, []);
  useEffect(() => {
    
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data());
    });

    return () => unsub();
  }, []);

  const supprime = async () => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    const z = e.indexOf(msg.text);

    const docSnap = await getDoc(doc(db, "lastMsg", id));

    if (docSnap.data().text === msg.text){
      await updateDoc(doc(db, "lastMsg", id), { text: "" });
      await deleteDoc(doc(db, "messages", id, "chat", k[z]));
      setEtat(false);
    }
    else{
      await deleteDoc(doc(db, "messages", id, "chat", k[z]));
      setEtat(false);
    }


  };
  const clik = async () => {
    if (Etat == true ){
      setEtat(false)
    }
    else if (Etat == false ){
      setEtat(true)
    }
  };

  return (
    <div>
    <div
      className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
        ref={scrollRef}
    >
      
      <p onClick={clik} className={msg.from === user1 ? "me" : "friend"}>
        {msg.media ?  <a onClick={()=>{window.open(msg.media, '_blank');}}> <img src={msg.media} alt={msg.text} /> </a> : null}
        {msg.file ? <a onClick={()=>{window.open(msg.file, '_blank');}}> Télécharger </a> : null}
        {msg.text}
        {(msg.from === user1 && Etat === true) ? (
          <a onClick={supprime} id="unsent">
            <Delet />
          </a>
        ) : null}
      </p>

      <div>
        <small>
          <Moment fromNow>{msg.createdAt.toDate()}</Moment>
        </small>
        
        
      </div>
      
    </div>
    </div>
  );
};

export default Message;




// import {
//   doc,
//   deleteDoc,
//   where,
//   collection,
//   query,
//   onSnapshot,
// } from "firebase/firestore";
// import React, { useRef, useEffect, useState } from "react";
// import Moment from "react-moment";
// import { db } from "../../../profil/Firebase/firebase";
// import Delet from "../svg/Delet";
// const Message = ({ msg, user1 }) => {
//   const scrollRef = useRef();
//   const [k, setk] = useState([]);
//   const [e, sete] = useState([]);
//   const [data, setData] = useState("");
//   const [Etat, setEtat] = useState(false);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [msg]);
//   const user2 = msg.to;
//   const id = user2 + user1;
//   useEffect(() => {
//     const ad = collection(db, "messages", id, "chat");
//     const r = query(ad);

//     const d = onSnapshot(r, (g) => {
//       let k = [];
//       let e = [];
//       g.forEach((doc) => {
//         k.push(doc.id);
//         e.push(doc.data().text);
//       });
//       setk(k);
//       sete(e);
//     });

//     return () => d();
//   }, []);
//   useEffect(() => {
//     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

//     let unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
//       setData(doc.data());
//     });

//     return () => unsub();
//   }, []);

//   const supprime = async () => {
//     const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
//     const z = e.indexOf(msg.text);

//     await deleteDoc(doc(db, "messages", id, "chat", k[z]));
//     setEtat(false);
//   };

//   const clik = async () => {
//     if (Etat == true ){
//       setEtat(false)
//     }
//     else if (Etat == false ){
//       setEtat(true)
//     }
//   };

//   return (
//     <div
//       className={`message_wrapper ${msg.from === user1 ? "own" : ""}`}
//       ref={scrollRef}
//     >
//       <p onClick={clik} className={msg.from === user1 ? "me" : "friend"}>
//         {msg.media ?  <a onClick={()=>{window.open(msg.media, '_blank');}}> <img src={msg.media} alt={msg.text} /> </a> : null}
//         {msg.file ? <a onClick={()=>{window.open(msg.file, '_blank');}}> Ouvrir </a> : null}
//         {msg.text}
//         {(msg.from === user1 ) ? (
//           <a onClick={supprime} id="unsent">
//             <Delet />
//           </a>
//         ) : null}
//       </p>

//       <div>
//         <small>
//           <Moment fromNow>{msg.createdAt.toDate()}</Moment>
//         </small>
//       </div>
//     </div>
//   );
// };

// export default Message;
