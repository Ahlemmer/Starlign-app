import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react'
import Leftbar from '../Leftbar';
import Navbar from '../Navbar';
import Post from './Post_notif';
import {Right} from '../Right';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
    useHistory
} from 'react-router-dom'
import Notif from './notif';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
 
const useStyles = makeStyles((theme)=> ({
    right:{
        [theme.breakpoints.down("sm")]:{
            display:"none"
        },
    },
}));
const Notifications = () => {

  
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
  
              try {
                //   localStorage.removeItem("FBIdToken");
                //   localStorage.removeItem("RefToken");
                  let data = {
                      grant_type:"refresh_token",
                      refresh_token: refresh_token 
                  }
                  axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
                      localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`)
                      localStorage.setItem("RefToken", `${res.data.refresh_token}`)
                      history.push('/Notifications');
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
      
    }, []);
  
    const classes = useStyles();
    return(
        <div>
            <Navbar/>
            <Grid container>
                <Grid item sm={2} xs={2}>
            <Router>
                <Leftbar/>
               
            </Router>
            </Grid>
            <Grid item sm={7} xs={10}><Notif/></Grid>
            <Grid item sm={3} classes={classes.right}><Right/></Grid>
            
             </Grid>  
               
             
               
            
            
        </div>
    )
}
export default Notifications;