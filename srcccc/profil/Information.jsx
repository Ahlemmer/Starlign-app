
import React, {useState, useEffect} from 'react'
import { dateParser } from "./Date/Utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsFillCalendarDayFill } from "react-icons/bs";
import { IoGiftOutline } from "react-icons/io5";
import { RiUserFollowLine } from "react-icons/ri";
import {RiUserUnfollowLine} from "react-icons/ri"
import {MdBlockFlipped} from "react-icons/md"

import routeApi from '../api/routes'
import {
    getDocs,   
    verifyFollowing,
    useAuth,
  } from "./Firebase/firebase";
import { useHistory } from 'react-router-dom';


toast.configure();
const Information = ({userData, sabonner, desabonner}) => {
    const [followers, setFollowers] = useState([]);
    const currentUser = useAuth();
    let history =useHistory();

  const blk = async () => {
    const token = localStorage.getItem("FBIdToken");
    //console.log(victime);
    const result = await routeApi.blouquePostUser(token, userData.userId);
    if (!result.ok) {
      console.log(result);
    } else {
      toast.success("cet utilisateur a été bloqué avec succés ,vous pouvez consulter la liste des personne bloquées dans 'Settings'", {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
     
      history.push(`/home`);
      //window.location.reload(`/home`);
    }
  };
   

    useEffect(() => {
       
        const getFollowers = async () => {
         if (currentUser !== null) {
            const data = await getDocs(
                verifyFollowing(userData.userId, currentUser.uid)
              );
              setFollowers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
         }
        };
       
        getFollowers();
      }, [userData.userId, sabonner, desabonner]);

     
          
    return (
        <div className="row pt-4">
        <div className="col col-lg-6">
         {
             
           followers.length === 0 ? ( <button className="btn_follow2" onClick={sabonner}>
                <RiUserFollowLine/> Abonner
         </button>):( <button className="btn_follow2" onClick={desabonner} >
           <RiUserUnfollowLine/>  Désabonner
    </button>)
         }
        </div>
        <div className="col col-lg-6">
         
             
         
       <button className="btn_follow2" onClick={blk} >
           <MdBlockFlipped/>  Bloquer
    </button>
         
        </div>
        <div className="col col-lg-9">
          <div className="row mt-3">
            <div className="col col-lg-12 ">
              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#696969",
                }}
              >
                <IoGiftOutline
                style={{ color: "#19A8D9", fontSize: "20px", marginBottom:"10px" }}
                />
                Anniversaire : { userData.dateNaissance  !== "non renseignée" ? dateParser (userData.dateNaissance) 
                :userData.dateNaissance }
               
              </p>
            </div>
            <div className="col col-lg-12 ">
              <p
                style={{
                  fontStyle: "normal",
                  fontWeight: "bold",
                  fontSize: "16px",
                  color: "#696969",
                }}
              >
                <BsFillCalendarDayFill 
                 style={{ color: "#19A8D9", fontSize: "20px", marginBottom:"10px" }}
                  /> Rejoint le : {dateParser(userData.createdat)}
                
              </p>
            </div>
          </div>
        </div>
      </div>
    );
           

};

export default Information;










