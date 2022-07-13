import React, { useEffect, useState } from "react";
 import routeApi from '../../api/routes';
 import { Badge, Container, List, makeStyles, Typography } from '@material-ui/core';
 import { Redirect, NavLink , Link, useHistory} from 'react-router-dom';
 import {  Home, Person, Notifications } from '@material-ui/icons';
 import {BsArrowLeftCircle , BsSearch } from 'react-icons/bs';
import { db, auth, storage, user } from "../../profil/Firebase/firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import User from "./components/User";
import Users from "./components/Users";
import UserSearch from "./components/UserSearch";
import UserSea from "./components/userserr";
import MessageForm from "./components/MessageForm";
import MessageForm2 from "./components/MessageForm2";
import Message from "./components/Message";
import { useParams } from "react-router-dom";
import Img from "./magnifier.png";
import axios from "axios";
import jwtDecode from "jwt-decode";
import './Messagerie.css'


const Messagerie = () => {
  const idUser = useParams();
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [img, setImg] = useState("");
  const [doce, setFile] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [isonline, setisonline] = useState("");
  const [usersugges, setusersugges] = useState([]);
  const [search, setsearch] = useState([]);
  const [invit, setinvit] = useState([]);
  const [g, setg] = useState([]);
  const [bloque, setbloque] = useState([]);
  const user1 = idUser.idMessage;

  const [Etat, setEtat] = useState(false);
  const [booli, setbooli] = useState(false);
  
   const [usersuggest, setusersuggest] = useState([]);
   const token = localStorage.getItem('FBIdToken');
  



  useEffect(() => {

    const bloc = collection(db, "Users", user1, "bloquer");
    const qr = query(bloc);
    const unsub = onSnapshot(qr, (querySnapshot) => {
      let bloque = [];
      querySnapshot.forEach((doc) => {
        bloque.push(doc.data());
      });
      setbloque(bloque);
    });

    return () => unsub();
  }, []);
  useEffect(() => {
    const usersRef = collection(db, "Users", user1, "abonnements");
    // create query object

    const q = query(usersRef);

    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setUsers(users);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const usersRef = collection(db, "Users");
    // create query object
    const q = query(usersRef);
    // execute query
    const unsub2 = onSnapshot(q, (querySnapshot) => {
      let g = [];
      querySnapshot.forEach((doc) => {
        g.push(doc.data());
      });
      setg(g);
    });
    return () => unsub2();
  }, []);
  useEffect(() => {
    const usersRef = collection(db, "Users");
    // create query object
    const q = query(usersRef, where("userId", "not-in", [user1]));
    // execute query
    const unsub5 = onSnapshot(q, (querySnapshot) => {
      let usersugges = [];
      querySnapshot.forEach((doc) => {
        usersugges.push(doc.data());
      });
      setusersugges(usersugges);
    });
    return () => unsub5();
  }, []);

  const selectUser = async (user) => {
    setChat(user);

    const user2 = user.iduser;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const is = collection(db, "Users");
    const qr = query(is, where("userId", "==", [user2]));
    onSnapshot(qr, (querySnapshot) => {
      let isonline = [];
      querySnapshot.forEach((doc) => {
        isonline.push(doc.data().isOnLign);
      });
      setisonline(isonline);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));

    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user2 = chat.iduser;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url = '';
    let url1 = '';
    if (img) {
      const imgRef = ref(
        storage,
        `imagesM/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    } else {
      if (doce) {
        const doceRef = ref(
          storage,
          `files/${new Date().getTime()} - ${doce.name}`
        );
        const snap1 = await uploadBytes(doceRef, doce);
        const dlUrl1 = await getDownloadURL(ref(storage, snap1.ref.fullPath));
        url1 = dlUrl1;
      }
    }

    if (text !== ""  ||(text == "" && url !== "") ||(text == "" && url1 !== "")){
      await addDoc(collection(db, "messages", id, "chat"), {
        text,
  
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
        media: url || "",
        file: url1 || "",
      });

      await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      file: url1 || "",
      unread: true,
    });
  }
    
    

    setText("");
    setText2("");
    setImg("");
    setFile("");
  };
  const selectUser_2 = async (user) => {
    setbooli(false);
    setEtat(true);
    setChat(user);

    const user2 = user.userId;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "messages", id, "chat");
    const q = query(msgsRef, orderBy("createdAt", "asc"));

    onSnapshot(q, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });

    const docSnap = await getDoc(doc(db, "lastMsg", id));

    if (docSnap.data() && docSnap.data().from !== user1) {
      await updateDoc(doc(db, "lastMsg", id), { unread: false });
    }
  };

  const handleSubmit_2 = async (e) => {
    e.preventDefault();

    const user2 = chat.userId;

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    let url = '';
    let url1 = '';
    if (img) {
      const imgRef = ref(
        storage,
        `imagesM/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    } else {
      if (doce) {
        const doceRef = ref(
          storage,
          `files/${new Date().getTime()} - ${doce.name}`
        );
        const snap1 = await uploadBytes(doceRef, doce);
        const dlUrl1 = await getDownloadURL(ref(storage, snap1.ref.fullPath));
        url1 = dlUrl1;
      }
    }

    if (text !== ""  ||(text == "" && url !== "") ||(text == "" && url1 !== "")){
    await addDoc(collection(db, "messages", id, "chat"), {
      text,

      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      file: url1 || "",
    });

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      file: url1 || "",
      unread: true,
    });
    }

    setText("");
    setText2("");
    setImg("");
    setFile("");
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const user2 = chat.iduser;

  //   const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  //   let url;
  //   let url1;
  //   if (img) {
  //     const imgRef = ref(
  //       storage,
  //       `imagesM/${new Date().getTime()} - ${img.name}`
  //     );
  //     const snap = await uploadBytes(imgRef, img);
  //     const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
  //     url = dlUrl;
  //   } else {
  //     if (doce) {
  //       const doceRef = ref(
  //         storage,
  //         `files/${new Date().getTime()} - ${doce.name}`
  //       );
  //       const snap1 = await uploadBytes(doceRef, doce);
  //       const dlUrl1 = await getDownloadURL(ref(storage, snap1.ref.fullPath));
  //       url1 = dlUrl1;
  //     }
  //   }

  //   await addDoc(collection(db, "messages", id, "chat"), {
  //     text,

  //     from: user1,
  //     to: user2,
  //     createdAt: Timestamp.fromDate(new Date()),
  //     media: url || "",
  //     file: url1 || "",
  //   });

  //   await setDoc(doc(db, "lastMsg", id), {
  //     text,
  //     from: user1,
  //     to: user2,
  //     createdAt: Timestamp.fromDate(new Date()),
  //     media: url || "",
  //     file: url1 || "",
  //     unread: true,
  //   });

  //   setText("");
  //   setText2("");
  //   setImg("");
  //   setFile("");
  // };
  // const selectUser_2 = async (user) => {
  //   setChat(user);

  //   const user2 = user.userId;
  //   const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  //   const msgsRef = collection(db, "messages", id, "chat");
  //   const q = query(msgsRef, orderBy("createdAt", "asc"));

  //   onSnapshot(q, (querySnapshot) => {
  //     let msgs = [];
  //     querySnapshot.forEach((doc) => {
  //       msgs.push(doc.data());
  //     });
  //     setMsgs(msgs);
  //   });

  //   const docSnap = await getDoc(doc(db, "lastMsg", id));

  //   if (docSnap.data() && docSnap.data().from !== user1) {
  //     await updateDoc(doc(db, "lastMsg", id), { unread: false });
  //   }
  // };

  // const handleSubmit_2 = async (e) => {
  //   e.preventDefault();

  //   const user2 = chat.userId;

  //   const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

  //   let url;
  //   let url1;
  //   if (img) {
  //     const imgRef = ref(
  //       storage,
  //       `imagesM/${new Date().getTime()} - ${img.name}`
  //     );
  //     const snap = await uploadBytes(imgRef, img);
  //     const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
  //     url = dlUrl;
  //   } else {
  //     if (doce) {
  //       const doceRef = ref(
  //         storage,
  //         `files/${new Date().getTime()} - ${doce.name}`
  //       );
  //       const snap1 = await uploadBytes(doceRef, doce);
  //       const dlUrl1 = await getDownloadURL(ref(storage, snap1.ref.fullPath));
  //       url1 = dlUrl1;
  //     }
  //   }

  //   await addDoc(collection(db, "messages", id, "chat"), {
  //     text,

  //     from: user1,
  //     to: user2,
  //     createdAt: Timestamp.fromDate(new Date()),
  //     media: url || "",
  //     file: url1 || "",
  //   });

  //   await setDoc(doc(db, "lastMsg", id), {
  //     text,
  //     from: user1,
  //     to: user2,
  //     createdAt: Timestamp.fromDate(new Date()),
  //     media: url || "",
  //     file: url1 || "",
  //     unread: true,
  //   });

  //   setText("");
  //   setText2("");
  //   setImg("");
  //   setFile("");
  // };
  let y = [];
  let w = [];
  usersugges.map((o) => {
    if (true) {
      y.push(o);
    } else {
      w.push(o);
    }
  });

     const getrech = async () => {
       const result = await routeApi.getrech(token);
       if (!result.ok) return console.log(result);
  
       setusersuggest(result.data);
     };


  const handlefilter = (e) => {
    setEtat(false);

    const searchWord = e.target.value;
    const newfilter = usersuggest.filter((value) => {
      return (
        value.prenom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.nom.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.pseudo.toLowerCase().includes(searchWord.toLowerCase())
      );
    });
    if (searchWord === "") {
      setsearch([]);
    } else {
      setsearch(newfilter);
    }
  };




  useEffect(() => {
    try {
      const invite = collection(db, "lastMsg");
      const rt = query(invite, orderBy("createdAt", "desc"));

      const unsub3 = onSnapshot(rt, (querySnapshot) => {
        let invit = [];
        let order = [];

        querySnapshot.forEach((doc) => {
          var b = doc.data().to;

          if (user1 === doc.data().from) {
            invit.push(b);
          } else {
            if (user1 === doc.data().to) {
              invit.push(doc.data().from);
            }
          }
        });
        setinvit(invit);
      });

      return () => unsub3();
    } catch (error) {
      console.log(error);
    }
  }, []);
  let connect = [];
  users.forEach((x) => {
    usersugges.forEach((z) => {
      if (x.iduser === z.userId) {
        connect.push(z);
      }
    });
  });

  let v = [];
  let j = [];

  g.map((i) => {
    v.push(i);
  });

  invit.map((d) => {
    j.push(d);
  });

  let f = [];

  for (let i = 0; i < j.length; i++) {
    let d = v.find((o) => o.userId === j[i]);
    f.push(d);
  }



  const [user, setUser] = useState(false);

 
  let history = useHistory();

  const go =() => {
      history.push('/home');
      window.location.reload('/home');
  }

//   const goprofil =() => {
//     history.push(`/profil/${user1}`);
//     window.location.reload(`/profil/${user1}`);
// }

//   const gotohell =() => {
//       history.push('/Notifications');
//       window.location.reload('/Notifications');
//   }


  const [nbrnotif, setNbrnotif] = useState();

  const getnbrnotif = async () => {
      const token = localStorage.getItem("FBIdToken");
      const result = await routeApi.getnbrnotif(token);
      if (result.ok){
          if(result.data.nbr !== 0 ){
          setNbrnotif(result.data.nbr);
          } 
      }
  }

  useEffect(() => {
    getrech();
    getnbrnotif();
    
  }, []);


  const [Loading, setLoading] = useState(false);

useEffect(() => {
    
    const token = localStorage.getItem("FBIdToken");
    const refresh_token = localStorage.getItem("RefToken");
    if (!token){
        history.push('/')
    }else{
        let authenticated;
        const token = localStorage.FBIdToken;
        const refresh_token = localStorage.RefToken;
        
        if(token){

        const decodedToken = jwtDecode(token);
        
        if((decodedToken.exp * 1000 - Date.now()) < 600000){
            setLoading(true);
            try {
                let data = {
                    grant_type:"refresh_token",
                    refresh_token: refresh_token 
                }
                axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => { 
                    localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`);
                    localStorage.setItem("RefToken", `${res.data.refresh_token}`); 
                    
                    setLoading(false)
                })
                .catch((err) => {
                    if(err.response.data.error.message == "USER_NOT_FOUND"){
                        localStorage.removeItem("FBIdToken");
                        localStorage.removeItem("RefToken");
                        history.push('/');
                    }else if(err.response.data.error.message == "INVALID_REFRESH_TOKEN"){
                      localStorage.removeItem("FBIdToken");
                      localStorage.removeItem("RefToken");
                      history.push('/');
                     }
                  });
                authenticated = false;
                
                } catch (error) {
                    console.log(error);
                }
        } else {
            
            authenticated = true;
        }
        }
    }
  return  
  }, []);


  return (



    <div className="home_container">
      <div className="users_container">

           {/* <div className="navmess"> 

           <div >
            <NavLink onClick={go} to="/home" exact >
              <Home />
            </NavLink>
           </div>

         <div  >
            <NavLink onClick={goprofil} to='/profil/user' exact >
              <Person />
            </NavLink>
          
         </div>
         <div >
            <Link onClick={gotohell} to='/Notifications' exact >
               <Badge badgeContent={nbrnotif} color="secondary" >
                 <Notifications />
               </Badge>
             </Link>
         </div>
      

         </div> */}
         <div style={{display:'flex', flexDirection:'column'}}>
         <div style={{display:'flex', flexDirection:'row', margin:15}}> 
          
          <div> < BsArrowLeftCircle style={{fontSize:30, marginRight:10, paddingLeft:5}}  onClick={go}/> </div>






          <div> <h4 className="descution"> Discussions</h4> </div>
          </div>
          <div
             style={{
          width: "100%",
          height: "1px",
          'background-color' : 'rgb(239, 243, 244)',
        }}
      ></div>
      </div>

      <div>
      {booli ?(<div className="telephonser">
        <input className="rech_mess"
          type="text"
          name="recherche"
          id="recherche"
          placeholder="Chercher..."
          onChange={handlefilter}
        />
        {search.length !== 0 && Etat == false &&(
          <div className="popupp">
            {search.slice(0, 15).map((user) => (
              <p className="info-suggestion">
                <UserSea
                  key={user.uid}
                  user={user}
                  selectUser_2={selectUser_2}
                  chat={chat}
                />
              </p>
            ))}
          </div>
        )}
       
      </div>) : (
      <div className="telephonser"> < BsSearch style={{fontSize:25, transform:'translate(10px,5px)'}}  onClick={()=>{setbooli(true)}}/> </div>)}
      </div>

      
        <div className="div_list_users"> 
        {f.map((user) => {
          return (

            
            <Users
              key={user.userId}
              user={user}
              selectUser_2={selectUser_2}
              user1={user1}
              chat={chat}
            />
            
          );
        })}
        </div>
      </div>
     
      <div className="messages_container">
        {chat ? (
          <>
            <div className="messages_user"  >
              <div  style={{cursor:'pointer'}} onClick={()=>{ history.push(`/profil/${chat.userId}`);  }}> <img src={chat.imageUrl} alt="avatar" className="mu_image" /> </div>
               <h3 style={{cursor:'pointer'}} onClick={()=>{ history.push(`/profil/${chat.userId}`);  }}
                    >{chat.nom} {chat.prenom}</h3>
             
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            {chat.iduser ? (
              <MessageForm
                handleSubmit={handleSubmit}
                text={text}
                text2={text2}
                setText2={setText2}
                setText={setText}
                setImg={setImg}
                setFile={setFile}
              />
            ) : (
              <MessageForm2
                handleSubmit_2={handleSubmit_2}
                text={text}
                text2={text2}
                setText2={setText2}
                setText={setText}
                setImg={setImg}
                setFile={setFile}
              />
            )}
          </>
        ) : (
          <h3 className="no_conv">
            Sélectionner un utilisateur pour démarrer une conversation
          </h3>
        )}
      </div>

      <div className="recherche_container">
        <input
          type="text"
          name="recherche"
          id="recherche"
          placeholder="Chercher..."
          onChange={handlefilter}
        />
        {search.length !== 0  && Etat == false && (
          <div className="dataResult">
            {search.slice(0, 15).map((user) => (
              <p className="dataItem">
                <UserSearch
                  key={user.uid}
                  user={user}
                  selectUser_2={selectUser_2}
                  chat={chat}
                />
              </p>
            ))}
          </div>
        )}
      <div>
       <h5 className="descution">Abonnements</h5>
        <div className="section_abonnements">
         {users.map((user) => (
           <User
             key={user.iduser}
             user={user}
             selectUser={selectUser}
             chat={chat}
           />
         ))}
        </div> 
      </div>  
      </div>
    </div>
  );
};

export default Messagerie;


