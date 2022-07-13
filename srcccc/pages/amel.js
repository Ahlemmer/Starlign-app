import { Grid, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Leftbar from '../components/Leftbar';
import Navbar from '../components/Navbar';
import Feed from './Feed';
import {Right} from '../components/Right';
import Disconnected from '../profil/Disconnected';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import "./home.css"
import { GridLoader } from 'react-spinners';




// const useStyles = makeStyles((theme)=> ({
//     right:{
//         [theme.breakpoints.down("sm")]:{
//             display:"none"
//         },
//     },
// }));


export default function Amel() {
    
    
    
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
                        history.push('/home'); 
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


    // const classes = useStyles();
    

    return (
        <div >
            {Loading == true &&  (
                <div className='app'>   
                  <Disconnected  Loading={Loading} />
                </div>
            )
            //  : (
            // <Navbar/>
            // <Grid container>
            //     <Grid item sm={2} xs={2}>
            // <Router>
            //     <Leftbar/>
               
            // </Router>
            // </Grid>
            // <Grid item sm={6} xs={10}><Feed/></Grid>
            // <Grid item sm={3} classes={classes.right}><Right/></Grid>
            
            //  </Grid> 
            // )
        }
        {   Loading == false && (
            <div>
            <Navbar/>
            <Grid container>
                <Grid item sm={2} xs={2}>
            <Router><Leftbar/></Router>
            </Grid>
            <Grid item sm={7} xs={9} spacing={2}><Feed/></Grid>
            <Grid item sm={3} xs={3} ><Right/></Grid> 
            {/* classes={classes.right} */}
            
             </Grid> 
             </div>
        )

        }
  
               
            
            
        </div>
    )
}
 