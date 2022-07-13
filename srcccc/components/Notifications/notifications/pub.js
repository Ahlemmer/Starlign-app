import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Leftbar from '../../Leftbar';
import Navbar from '../../Navbar';
import Feed from './Feed_notif';
import {Right} from '../../Right';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import { GridLoader } from 'react-spinners';




// const useStyles = makeStyles((theme)=> ({
//     right:{
//         [theme.breakpoints.down("sm")]:{
//             display:"none"
//         },
//     },
// }));


export default function OneP() {
    
    
    const [Loading, setLoading] = useState(true);
    let history = useHistory();
    useEffect(() => {
        setLoading(true);
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
                    
                    let data = {
                        grant_type:"refresh_token",
                        refresh_token: refresh_token 
                    }
                    axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
                        // localStorage.removeItem("FBIdToken");
                        // localStorage.removeItem("RefToken");
                        localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`);
                        localStorage.setItem("RefToken", `${res.data.refresh_token}`);
                        
                    })
                    authenticated = false;
                    
                } catch (error) {
                    console.log(error);
                }
            } else {
                
                authenticated = true;
            }
            }
        }
      return  setLoading(false)
      }, []);
    // const classes = useStyles();
    

    return (
        <div >
            <Navbar/>
            <Grid container>
                <Grid item sm={2} xs={2}>
            <Router>
                <Leftbar/>
               
            </Router>
            </Grid>
            <Grid item sm={7} xs={9}><Feed/></Grid>
            <Grid item sm={3} ><Right/></Grid>
            {/* classes={classes.right} */}
            
             </Grid> 
  
        </div>
    )
}
 