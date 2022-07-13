
import React, { useEffect } from "react";

import { useRef, useState } from "react";
import routeApi from "../../api/routes";
import '../index.css'
import { Avatar, Button, 
         Card, CardActionArea,
         CardActions, CardContent, 
         CardMedia, makeStyles, 
         Typography } from '@material-ui/core';
import { Favorite ,Comment ,Share , PersonAdd } from '@material-ui/icons';

import { useHistory } from "react-router-dom";
import { auth, db } from "../../profil/Firebase/firebase";
import { updateDoc, doc } from "firebase/firestore";






const useStyles = makeStyles((theme)=> ({
    card:{
        marginTop:1,
        width:'100%'

     
    },
   media:{
       height:"150px",
      
   },
   unre:{
    color: "green"
   },
   re:{
     color: "red",
   },
   item:{
     marginLeft: 380,
     color:"red",
    // display:"flex",
    // alignItems: "center",
    // marginBottom:theme.spacing(4),
    // [theme.breakpoints.up("sm")]:{
    //     marginBottom:theme.spacing(3),
    //     cursor:"pointer"
    // }
},

   
}));

const Notif = () => {
  let history = useHistory();
    const token = localStorage.getItem("FBIdToken");
    const [user, setUser] = useState(false);
    const [notif, setnotif] = useState(false);
    const [successRate, setSuccessRate] = useState(0);

  

    const getnotif = async () => {
        const token = localStorage.getItem("FBIdToken");
    
        setnotif(false);
    
        // console.log('######')
        const result = await routeApi.getnotif(token);
        if (!result.ok) {
          console.log(result);
          setSuccessRate(successRate + 1);
        } else {
          //console.log(result.data)
          setnotif(result.data);
        }
      };
      const refresh=() => {
        getnotif();
      }

      const getData = async () => {
        const result = await routeApi.getUser(token);
        if (!result.ok) return console.log(result);
    
        setUser(result.data);
      };
    
      useEffect(() => {
        getData();
        getnotif();
      }, []);
    

    const classes = useStyles();
    return (
        <div className="biix" className={classes.div}>
            <div className="biix">
              <div> <h5> Notifications </h5> </div>
                {notif && 
                   notif.map((notif,index)=>(
                <div>
                  {notif.type == 'like' &&(
                    <div style={{ display: 'flex',flexDirection: "row", width: "100%"}} >
                    { notif.read == true && (
                        
                      
                    <div className="roo" onClick={ async () => {
                                                  if(notif.type == 'follow'){
                                                    history.push(`/profil/${notif.senderId}`);
                                                    window.location.reload(`/profil/${notif.senderId}`);
                                                    }
                                                    if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
                                                      history.push(`/post/${notif.screamId}`);
                                                      window.location.reload(`/post/${notif.screamId}`);
                                                      }
  
                    }} >
                        <div className="div_icon_notif">
                          <Favorite className="icoo" />
                        </div>
                        <div className="badibou">
                          <div className="inff">
                            <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
                            <div className="info_notifs"> 
                              <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
                              <p>@{notif && notif.sender} {notif && notif.message} </p>
                           </div>
                          </div>


                    
                      </div>

                      
                      </div>
                      )}
                     
                      { notif.read == false && (
                        
                      
                        <div className="boo" onClick={async () => {
                                                      await updateDoc(doc(db, "notifications", notif.notifId), {
                                                        read: true,
                                                      });
                                                      if(notif.type == 'follow'){
                                                      history.push(`/profil/${notif.senderId}`);
                                                      window.location.reload(`/profil/${notif.senderId}`);
                                                      }
                                                      if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
                                                        history.push(`/post/${notif.screamId}`);
                                                        window.location.reload(`/post/${notif.screamId}`);
                                                        }
  
                                                     
                        }} >
                         <div className="div_icon_notif"> 
                          <Favorite className="icoo" />
                        </div>  
                        <div className="badibou">
                           <div className="inff">
                             <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 

                              <div className="info_notifs">
                                <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
                                <p>@{notif && notif.sender} {notif && notif.message} </p>
                              </div>
                          
                            </div>
                  
                          </div>

                          </div>
                          
                          )}
  
                  </div>
                  )}
                  {notif.type == 'comment' &&(
                    <div  >
                    { notif.read == true && (
                        
                     <div  style={{ display: 'flex',flexDirection: "row", width: "100%"}}> 
                    <div className="roo" onClick={ async () => {
                                                  if(notif.type == 'follow'){
                                                    history.push(`/profil/${notif.senderId}`);
                                                    window.location.reload(`/profil/${notif.senderId}`);
                                                    }
                                                    if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
                                                      history.push(`/post/${notif.screamId}`);
                                                      window.location.reload(`/post/${notif.screamId}`);
                                                      }
  
                        }} >
                      <div className="div_icon_notif">
                      <Comment className="icoo" />
                      </div>
                      <div className="badibou">
                     <div className="inff">
                      <Avatar alt="Photo de profil" src={notif && notif.userImage}  style={{height:'35px', width:'35px'}}/> 
                      <div className="info_notifs">
                      <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
                      <p>@{notif && notif.sender} {notif && notif.message} </p>
                      </div>
                     </div>
                     </div>
 

                      </div>
                       </div>)}
  
                      { notif.read == false && (
                        
                      
                        <div className="boo" onClick={async () => {
                                                      await updateDoc(doc(db, "notifications", notif.notifId), {
                                                        read: true,
                                                      });
                                                      if(notif.type == 'follow'){
                                                      history.push(`/profil/${notif.senderId}`);
                                                      window.location.reload(`/profil/${notif.senderId}`);
                                                      }
                                                      if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
                                                        history.push(`/post/${notif.screamId}`);
                                                        window.location.reload(`/post/${notif.screamId}`);
                                                        }
  
                                                     
                        }} >
                         <div className="div_icon_notif">
                          <Comment className="icoo" />
                          </div> 
                          <div className="badibou">
                         <div className="inff">
                          <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
                           <div className="info_notifs">
                            <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
                            <p>@{notif && notif.sender} {notif && notif.message} </p>
                           </div> 
                          
                         </div>
                       
                         </div>

                          </div>)}
  
                  </div>
                  )}
                  {notif.type == 'reepost' && (
                    <div  >
                    { notif.read == true && (
                        
                     <div  style={{ display: 'flex',flexDirection: "row", width: "100%"}}> 
                    <div className="roo" onClick={ async () => {
                                                  if(notif.type == 'follow'){
                                                    history.push(`/profil/${notif.senderId}`);
                                                    window.location.reload(`/profil/${notif.senderId}`);
                                                    }
                                                    if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
                                                      history.push(`/post/${notif.screamId}`);
                                                      window.location.reload(`/post/${notif.screamId}`);
                                                      }
  
                    }} >
                      <div className="div_icon_notif">
                      <Share className="icoo" />
                      </div> 
                      <div className="badibou">
                     <div className="inff">
                      <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
                      <div className="info_notifs">
                        <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
                        <p>@{notif && notif.sender} {notif && notif.message} </p>
                      </div>  
                     </div>
                     </div> 
                      </div>
                      </div>)}
  
                      { notif.read == false && (
                        
                      
                        <div className="boo" onClick={async () => {
                                                      await updateDoc(doc(db, "notifications", notif.notifId), {
                                                        read: true,
                                                      });
                                                      if(notif.type == 'follow'){
                                                      history.push(`/profil/${notif.senderId}`);
                                                      window.location.reload(`/profil/${notif.senderId}`);
                                                      }
                                                      if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
                                                        history.push(`/post/${notif.screamId}`);
                                                        window.location.reload(`/post/${notif.screamId}`);
                                                        }
  
                                                     
                        }} >

                         <div className="div_icon_notif">
                          <Share className="icoo" />
                          </div>
                          <div className="badibou">
                         <div className="inff">
                          <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
                          <div className="info_notifs">
                           <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
                           <p>@{notif && notif.sender} {notif && notif.message} </p>
                          </div>
                         </div>

                          </div>
                          </div>
                          )}
  
                  </div>
                  )}
                  {notif.type == 'follow' && (
                    <div  >
                    { notif.read == true && (
                        
                     <div  style={{ display: 'flex',flexDirection: "row", width: "100%"}}> 
                    <div className="roo" onClick={ async () => {
                                                  if(notif.type == 'follow'){
                                                    history.push(`/profil/${notif.senderId}`);
                                                    window.location.reload(`/profil/${notif.senderId}`);
                                                    }
                                                    if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
                                                      history.push(`/post/${notif.screamId}`);
                                                      window.location.reload(`/post/${notif.screamId}`);
                                                      }
  
                     }} >

                      <div className="div_icon_notif">
                      <PersonAdd className="icoo" />
                      </div>
                      <div className="badibou">
                     <div className="inff">
                      <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
                      <div className="info_notifs">
                       <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
                       <p>@{notif && notif.sender} {notif && notif.message} </p>
                      </div> 
                     </div>
                      
                      </div>

                      </div>
                      </div>
                      )}
  
                      { notif.read == false && (
                        
                      
                        <div className="boo" onClick={async () => {
                                                      await updateDoc(doc(db, "notifications", notif.notifId), {
                                                        read: true,
                                                      });
                                                      if(notif.type == 'follow'){
                                                      history.push(`/profil/${notif.senderId}`);
                                                      window.location.reload(`/profil/${notif.senderId}`);
                                                      }
                                                      if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
                                                        history.push(`/post/${notif.screamId}`);
                                                        window.location.reload(`/post/${notif.screamId}`);
                                                        }
  
                                                     
                        }} >
                         <div className="div_icon_notif">
                          <PersonAdd className="icoo" />
                          </div>
                         <div className="badibou"> 
                         <div className="inff">
                          <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 

                          <div className="info_notifs">
                           <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
                            <p>@{notif && notif.sender} {notif && notif.message} </p>
                          </div>                          
                         </div>
                          </div> 
                          </div>
                          
                          )}
  
                  </div>
                  )}
                           <div
                            style={{
                             width: "100%",
                             height: "1px",
                             backgroundColor: 'rgb(239, 243, 244)', 
                             
                            }}
                          ></div>
                </div>
                
                ))}
            </div>
            
        </div>
    );
};


export default Notif;



//  import React, { useEffect } from "react";

//  import { useRef, useState } from "react";
//  import routeApi from "../../api/routes";

//  import { Avatar, Button, 
//           Card, CardActionArea,
//           CardActions, CardContent, 
//           CardMedia, makeStyles, 
//           Typography } from '@material-ui/core';
//  import { Favorite ,Comment ,Share , PersonAdd } from '@material-ui/icons';

//  import { useHistory } from "react-router-dom";
//  import { auth, db } from "../../profil/Firebase/firebase";
//  import { updateDoc, doc } from "firebase/firestore";






//  const useStyles = makeStyles((theme)=> ({
//      card:{
//          marginTop:1,
//          width:'100%'

     
//      },
//     media:{
//         height:"150px",
      
//     },
//     unre:{
//      color: "green"
//     },
//     re:{
//       color: "red",
//     },
//     item:{
//       marginLeft: 380,
//       color:"red",
//       display:"flex",
//       alignItems: "center",
//       marginBottom:theme.spacing(4),
//       [theme.breakpoints.up("sm")]:{
//           marginBottom:theme.spacing(3),
//           cursor:"pointer"
//       }
//  },

   
//  }));

//  const Notif = () => {
//    let history = useHistory();
//      const token = localStorage.getItem("FBIdToken");
//      const [user, setUser] = useState(false);
//      const [notif, setnotif] = useState(false);
//      const [successRate, setSuccessRate] = useState(0);

  

//      const getnotif = async () => {
//          const token = localStorage.getItem("FBIdToken");
    
//          setnotif(false);
    
//           console.log('######')
//          const result = await routeApi.getnotif(token);
//          if (!result.ok) {
//            console.log(result);
//            setSuccessRate(successRate + 1);
//          } else {
//            console.log(result.data)
//            setnotif(result.data);
//          }
//        };
//        const refresh=() => {
//          getnotif();
//        }

//        const getData = async () => {
//          const result = await routeApi.getUser(token);
//          if (!result.ok) return console.log(result);
    
//          setUser(result.data);
//        };
    
//        useEffect(() => {
//          getData();
//          getnotif();
//        }, []);
    

//      const classes = useStyles();
//      return (
//          <div className="biix" className={classes.div}>
//              <div className="biix">
//                  {notif && 
//                     notif.map((notif,index)=>(
//                  <div>
//                    {notif.type == 'like' &&(
//                      <div  >
//                      { notif.read == true && (
                        
                      
//                      <div className="roo" onClick={ async () => {
//                                                    if(notif.type == 'follow'){
//                                                      history.push(`/profil/${notif.senderId}`);
//                                                      window.location.reload(`/profil/${notif.senderId}`);
//                                                      }
//                                                      if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
//                                                        history.push(`/post/${notif.screamId}`);
//                                                        window.location.reload(`/post/${notif.screamId}`);
//                                                        }
  
//                      }} >
//                          <div className="div_icon_notif">
//                            <Favorite className="icoo" />
//                          </div>
//                          <div className="badibou">
//                            <div className="inff">
//                              <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
//                              <div className="info_notifs"> 
//                                <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
//                                <p>@{notif && notif.sender} {notif && notif.message} </p>
//                             </div>
//                            </div>


                    
//                        </div>

                      
//                        </div>
//                        )}
                     
//                        { notif.read == false && (
                        
                      
//                          <div className="boo" onClick={async () => {
//                                                        await updateDoc(doc(db, "notifications", notif.notifId), {
//                                                          read: true,
//                                                        });
//                                                        if(notif.type == 'follow'){
//                                                        history.push(`/profil/${notif.senderId}`);
//                                                        window.location.reload(`/profil/${notif.senderId}`);
//                                                        }
//                                                        if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
//                                                          history.push(`/post/${notif.screamId}`);
//                                                          window.location.reload(`/post/${notif.screamId}`);
//                                                          }
  
                                                     
//                          }} >
//                           <div className="div_icon_notif"> 
//                            <Favorite className="icoo" />
//                          </div>  
//                          <div className="badibou">
//                             <div className="inff">
//                               <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 

//                                <div className="info_notifs">
//                                  <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
//                                  <p>@{notif && notif.sender} {notif && notif.message} </p>
//                                </div>
                          
//                              </div>
                  
//                            </div>

//                            </div>
                          
//                            )}
  
//                    </div>
//                    )}
//                    {notif.type == 'comment' &&(
//                      <div  >
//                      { notif.read == true && (
                        
                      
//                      <div className="roo" onClick={ async () => {
//                                                    if(notif.type == 'follow'){
//                                                      history.push(`/profil/${notif.senderId}`);
//                                                      window.location.reload(`/profil/${notif.senderId}`);
//                                                      }
//                                                      if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
//                                                        history.push(`/post/${notif.screamId}`);
//                                                        window.location.reload(`/post/${notif.screamId}`);
//                                                        }
  
//                      }} >
//                        <div className="div_icon_notif">
//                        <Comment className="icoo" />
//                        </div>
//                        <div className="badibou">
//                       <div className="inff">
//                        <Avatar alt="Photo de profil" src={notif && notif.userImage}  style={{height:'35px', width:'35px'}}/> 
//                        <div className="info_notifs">
//                        <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
//                        <p>@{notif && notif.sender} {notif && notif.message} </p>
//                        </div>
//                       </div>
//                       </div>


//                        </div>)}
  
//                        { notif.read == false && (
                        
                      
//                          <div className="boo" onClick={async () => {
//                                                        await updateDoc(doc(db, "notifications", notif.notifId), {
//                                                          read: true,
//                                                        });
//                                                        if(notif.type == 'follow'){
//                                                        history.push(`/profil/${notif.senderId}`);
//                                                        window.location.reload(`/profil/${notif.senderId}`);
//                                                        }
//                                                        if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
//                                                          history.push(`/post/${notif.screamId}`);
//                                                          window.location.reload(`/post/${notif.screamId}`);
//                                                          }
  
                                                     
//                          }} >
//                           <div className="div_icon_notif">
//                            <Comment className="icoo" />
//                            </div> 
//                            <div className="badibou">
//                           <div className="inff">
//                            <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
//                             <div className="info_notifs">
//                              <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
//                              <p>@{notif && notif.sender} {notif && notif.message} </p>
//                             </div> 
                          
//                           </div>
                       
//                           </div>

//                            </div>)}
  
//                    </div>
//                    )}
//                    {notif.type == 'reepost' && (
//                      <div  >
//                      { notif.read == true && (
                        
                      
//                      <div className="roo" onClick={ async () => {
//                                                    if(notif.type == 'follow'){
//                                                      history.push(`/profil/${notif.senderId}`);
//                                                      window.location.reload(`/profil/${notif.senderId}`);
//                                                      }
//                                                      if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
//                                                        history.push(`/post/${notif.screamId}`);
//                                                        window.location.reload(`/post/${notif.screamId}`);
//                                                        }
  
//                      }} >
//                        <div className="div_icon_notif">
//                        <Share className="icoo" />
//                        </div> 
//                        <div className="badibou">
//                       <div className="inff">
//                        <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
//                        <div className="info_notifs">
//                          <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
//                          <p>@{notif && notif.sender} {notif && notif.message} </p>
//                        </div>  
//                       </div>
//                       </div> 

//                        </div>)}
  
//                        { notif.read == false && (
                        
                      
//                          <div className="boo" onClick={async () => {
//                                                        await updateDoc(doc(db, "notifications", notif.notifId), {
//                                                          read: true,
//                                                        });
//                                                        if(notif.type == 'follow'){
//                                                        history.push(`/profil/${notif.senderId}`);
//                                                        window.location.reload(`/profil/${notif.senderId}`);
//                                                        }
//                                                        if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
//                                                          history.push(`/post/${notif.screamId}`);
//                                                          window.location.reload(`/post/${notif.screamId}`);
//                                                          }
  
                                                     
//                          }} >

//                           <div className="div_icon_notif">
//                            <Share className="icoo" />
//                            </div>
//                            <div className="badibou">
//                           <div className="inff">
//                            <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
//                            <div className="info_notifs">
//                             <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
//                             <p>@{notif && notif.sender} {notif && notif.message} </p>
//                            </div>
//                           </div>

//                            </div>

//                            </div>)}
  
//                    </div>
//                    )}
//                    {notif.type == 'follow' && (
//                      <div  >
//                      { notif.read == true && (
                        
                      
//                      <div className="roo" onClick={ async () => {
//                                                    if(notif.type == 'follow'){
//                                                      history.push(`/profil/${notif.senderId}`);
//                                                      window.location.reload(`/profil/${notif.senderId}`);
//                                                      }
//                                                      if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
//                                                        history.push(`/post/${notif.screamId}`);
//                                                        window.location.reload(`/post/${notif.screamId}`);
//                                                        }
  
//                      }} >

//                        <div className="div_icon_notif">
//                        <PersonAdd className="icoo" />
//                        </div>
//                        <div className="badibou">
//                       <div className="inff">
//                        <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 
//                        <div className="info_notifs">
//                         <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
//                         <p>@{notif && notif.sender} {notif && notif.message} </p>
//                        </div> 
//                       </div>
                      
//                        </div>

//                        </div>)}
  
//                        { notif.read == false && (
                        
                      
//                          <div className="boo" onClick={async () => {
//                                                        await updateDoc(doc(db, "notifications", notif.notifId), {
//                                                          read: true,
//                                                        });
//                                                        if(notif.type == 'follow'){
//                                                        history.push(`/profil/${notif.senderId}`);
//                                                        window.location.reload(`/profil/${notif.senderId}`);
//                                                        }
//                                                        if(notif.type == 'like' || notif.type == 'comment' || notif.type == 'reepost' ){
//                                                          history.push(`/post/${notif.screamId}`);
//                                                          window.location.reload(`/post/${notif.screamId}`);
//                                                          }
  
                                                     
//                          }} >
//                           <div className="div_icon_notif">
//                            <PersonAdd className="icoo" />
//                            </div>
//                           <div className="badibou"> 
//                           <div className="inff">
//                            <Avatar alt="Photo de profil" src={notif && notif.userImage} style={{height:'35px', width:'35px'}}/> 

//                            <div className="info_notifs">
//                             <Typography gutterBottom variant="h6">{notif && notif.Displayname}</Typography>
//                              <p>@{notif && notif.sender} {notif && notif.message} </p>
//                            </div>                          
//                           </div>
//                            </div> 

//                            </div>)}
  
//                    </div>
//                    )}
//                             <div
//                              style={{
//                               width: "100%",
//                               height: "1px",
//                               backgroundColor: 'rgb(239, 243, 244)', 
                             
//                              }}
//                            ></div>
//                  </div>
                
//                  ))}
//              </div>
            
//          </div>
//      );
//  };


//  export default Notif;