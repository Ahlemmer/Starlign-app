
import Link from '@material-ui/core/Link'
import './style.css'
import React, { useEffect } from "react";

import { Avatar, Button } from "@material-ui/core";

import { useRef, useState } from "react";

import routeApi from "../../api/routes";
import { useHistory } from "react-router-dom";
import {  NavLink } from 'react-router-dom';
import { Badge, Container, List, makeStyles, Typography } from '@material-ui/core';


export function Right () {


    const token = localStorage.getItem("FBIdToken");
    const [user, setUser] = useState(false);
    const [sugg, setsugg] = useState(false);
    const [successRate, setSuccessRate] = useState(0);
    let history = useHistory();
    const getsug = async () => {
        const token = localStorage.getItem("FBIdToken");
        
        setsugg(false);
    
        // console.log('######')
        const result = await routeApi.getsugg(token);
        if (!result.ok) {
          console.log(result);
          setSuccessRate(successRate + 1);
        } else {
          //console.log(result.data)
          setsugg(result.data);
        }
      };
      const refresh=() => {
        getsug();
      }
      
    
    const getData = async () => {
        const result = await routeApi.getUser(token);
        if (!result.ok) return console.log(result);
    
        setUser(result.data);
    };
    
      useEffect(() => {
        getData();
        getsug();
      }, []);
    

    const linkStyle = {color:'#19A8D9' , marginTop:"5px" , paddingTop:"20px" ,fontWeight:"bold"}

    return (


        <div className="container-suggestion">

           {/*  <div className="header-suggestion" >

            {user && <Avatar src={user.credentials.imageUrl} />}

                <div className="user-infos-suggestion" >

                    <div className="profil" >
                        <span>{user &&user.credentials.Displayname}</span>
                        <p> {user && user.credentials.pseudo}</p>
                    </div>

                </div>

            </div> */}

            <div className="header-main-suggestion" >

                <h3>Suggestions</h3>

                

            </div>

            <div className="user-suggestion" >
            {sugg &&
                sugg.map((sugg, index) => (
                    <div  className="infos-suggestion" >
                    
                    {sugg && <Avatar src={sugg.userImage} />}

                    <div onClick={() => {history.push(`/profil/${sugg.userId}`)}} className="info-suggestion" >
                        <span>{sugg &&sugg.Displayname}</span>
                        <p>{sugg && "@" +sugg.pseudo}</p>
                    </div>

                    <button onClick={async () => {
                        const result = await routeApi.FollowUser(token, sugg.userId, sugg.pseudo);
                        if (result.ok) {
                            
                          console.log(result);
                          refresh();
                        } else {
                            console.log("error");
                        }
                    }} className='follow' >Suivre</button>
             </div>
        ))}
                

            </div>
            <div className='crdt' >
                <p className='credits'>
                    "STARLING created by UMMTO 
                    Students ISI 2022."
                    <br></br>
                    <NavLink  to="/home"  exact  onClick={()=>{window.open('https://stralingapp.net/Privacy', '_blank')}} className="credits">
                    <Typography >Politiques de confidentialité</Typography>
                    </NavLink>
                </p>
            </div>

            
        </div>
    )
}