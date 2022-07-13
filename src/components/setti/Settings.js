import React, { useEffect, useState } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Mdp from './Mdp'
import Bloque from '../bloque/bloque'
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
 Feed:{
  
 }
  }));

const Feed =()=>{
  
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
                // localStorage.removeItem("FBIdToken");
                // localStorage.removeItem("RefToken");
                let data = {
                    grant_type:"refresh_token",
                    refresh_token: refresh_token 
                }
                axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyCstdil4PN6f-vkPZdVbzTAahqegqleNcU' , data).then((res) => {
                    localStorage.setItem("FBIdToken", `Bearer ${res.data.access_token}`)
                    localStorage.setItem("RefToken", `${res.data.refresh_token}`)
                    history.push('/settings');
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
    
  }, []);
  const classes = useStyles();
const [value,setValue]=useState(0)
const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  const tabStyle={fontWeight:"bold"}

    return (

    <div className={classes.Feed}>
      <div className='tabs'>
            <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
                
                >
                <Tab  style={tabStyle} label="Mot de passe" />
                
                <Tab  style={tabStyle} label="Blocages" />
            </Tabs>
      </div>
        <TabPanel  value={value} index={0}>
        <Mdp handleChange={handleChange}/> 
       
      </TabPanel>
      <TabPanel value={value} index={1}>
         <Bloque/>
      </TabPanel>
    </div>
        
      
      
    )
}

export default Feed;