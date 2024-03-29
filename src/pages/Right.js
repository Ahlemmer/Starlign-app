import React, { useState } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './login'
import Signup from './signup' 



const SignInOutContainer=()=>{
const [value,setValue]=useState(0)
const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const paperStyle={width:340,margin:"20px auto"}
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
  
  const tabsStyle={marginTop:"3rem",}
  const tabStyle={color:"#19A8d9",fontWeight:"bold"}

    return (
    <div>
      <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          style={tabsStyle}
          
          
        >
          <Tab label=" Se connecter" />
         
          <Tab  label="S'inscrire" />
        </Tabs>
        <TabPanel  value={value} index={0}>
        <Login handleChange={handleChange}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
         <Signup/>
      </TabPanel>
    </div>
        
      
      
    )
}

export default SignInOutContainer;