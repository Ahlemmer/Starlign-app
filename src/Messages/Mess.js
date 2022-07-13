
import React, { Component, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";

import jwtDecode from "jwt-decode";

import { Grid, makeStyles } from '@material-ui/core';

import Messagerie from "./Messagerie/Messagerie";
import "./Messagerie/Messagerie.css";
import axios from "axios";




function Messages() {

const [Loading, setLoading] = useState(false);
let history = useHistory();
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
                  }
                  else if(err.response.data.error.message == "INVALID_REFRESH_TOKEN"){
                    localStorage.removeItem("FBIdToken");
                    localStorage.removeItem("RefToken");
                    history.push('/');
                   }else if(err.response.data.error.message == "TOKEN_EXPIRED"){
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
    <div className="Appp">

            <Grid container>

            <Grid item sm={12} xs={12}><Messagerie/></Grid>

            </Grid> 
      {/* <Router>
        <Switch>
          <Route exact path="/Messagerie/:idMessage" component={Messagerie} />
        </Switch>
      </Router> */}
    </div>
  );
}

export default Messages;

{
  /* <div className="Main">

<div className="Left_Sidebar_Area">
  <Left/>
</div>

<div className="Right_Sidebar_Area">
  <SignInOutContainer/> 
</div>
</div> */
}
