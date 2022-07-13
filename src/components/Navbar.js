import { AppBar,Toolbar, makeStyles, Typography, InputBase, alpha, Avatar, Chip } from '@material-ui/core';
import { Cancel, Search } from '@material-ui/icons';
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRef, useState } from "react";
import routeApi from "../api/routes";



import './Right/style.css'



const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: "flex",
        justifyContent:"space-between",
    },


    logoLg: {
        display: "none",
        width:'4%',
        [theme.breakpoints.up("sm")]: {
            display : "block",
        },
    },

    logoSm: {
        width:"12%",
    
      display: "block",
      [theme.breakpoints.up("sm")]:{
      display : "none",
        },

    },

    input: {
        display: "flex",
        alignItems: "center",
        backgroundColor: '#F0F2F5',
        '&:hover':{
            backgroundColor: '#F0F2F5',
        },
        borderRadius: '8px',
        marginLeft: theme.spacing(0),
        width: "30%",
        [theme.breakpoints.down("sm")]: {
            display : (props)=> props.open ? "flex" :"none" ,
            flexDirection:'row',
            width:"30%",
            
        },
    },


    cancel:{
     [theme.breakpoints.up("sm")]: {
         display:"none",
     },
    },
    searchButton:{
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display : "none" ,
            
        },

    },
    icons:{
        
        alignItems:"center",
        // display : (props)=> props.open ? "none" :"flex" ,
    },
    badge:{
        marginRight: theme.spacing(2),
    },
    a:{
        backgroundColor:"white",
        color:"#555",
    }
    

}));


const Navbar = (props) => {

    const token = localStorage.getItem("FBIdToken");
    const [user, setUser] = useState(false);
    const [search, setsearch] = useState([]);
    const [usersugges, setusersugges] = useState([]);
    let history = useHistory();
    const getData = async () => {
        const result = await routeApi.getUser(token);
        if (!result.ok) return console.log(result);
    
        setUser(result.data);
      };
      const getrech = async () => {
        const result = await routeApi.getrech(token);
        if (!result.ok) return console.log(result);
    
        setusersugges(result.data);
      };
    
    
      useEffect(() => {
        getrech();
        getData();
        
      }, []);
    //   console.log(usersugges);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    
    
    const handlefilter = (e) => {
        setOpen(true);
        const searchWord = e.target.value;
        const newfilter = usersugges.filter((value) => {
          return (
            value.pseudo.toLowerCase().includes(searchWord.toLowerCase()) ||
            value.Displayname.toLowerCase().includes(searchWord.toLowerCase())
          );
        });
        if (searchWord === "") {
          setsearch([]);
        } else {
          setsearch(newfilter);
        }
      };

    const classes = useStyles({ open });
    return (
        <AppBar position='fixed' className={classes.a}>
            <Toolbar className={classes.toolbar} >
        
                
                
                  <img onClick={()=>{history.push('/home');}} src='/starling.png' className={classes.logoLg}/>
                
                  <img onClick={()=>{history.push('/home');}} src='/starling.png' className={classes.logoSm}/> 
              

                
                
                <div className='gogeta'>
                <div className="reser">
                <Search/>
                <InputBase
                    type="text"
                    name="recherche"
                    id="recherche"
                    className='seaInput'
                    placeholder="Cherchez des utilisateur..."
                    onChange={handlefilter}
                    />
        {search.length !== 0 && open == true && (
          <div className="popup">
            {search.slice(0, 15).map((usersugges) => (
                
                <div onClick={() => {
                    setOpen(false);
                    history.push(`/profil/${usersugges.userId}`)}} className='infos-suggestion'>
                {usersugges && <Avatar src={usersugges.imageUrl} />}

                <div className="info-suggestion" >
                    <span className='dr'>{usersugges &&usersugges.Displayname}</span>
                    <p className='dr'>{usersugges && "@" +usersugges.pseudo}</p>
                     
                </div>
               

                </div>
                
              
            ))}
            
          </div>
        )}
      </div>
      
                    {/* <Search/>
                    <InputBase placeholder='search...' className={classes.input} />
                    {search.length !== 0 && (
                        <div className="dataResult">
                            {search.slice(0, 15).map((usersugges) => (
                            <p className="dataItem">
                                <Users
                                key={user.uid}
                                user={user}
                                
                                />
                            </p>
                            ))}
                        </div>
                        )} */}
                    {/* <Cancel className={classes.cancel} onClick={()=> {setOpen(false)}} /> */}
                </div>
                <div className={classes.icons}>
                {/* <Search className={classes.searchButton} 
                onClick={handlefilter} /> */}
                <Chip onClick={() => {history.push(`/profil/${user.credentials.userId}`)}}
                   avatar={user && <Avatar src={user.credentials.imageUrl} />}
                   label={user && user.credentials.pseudo}
                   variant="outlined"
               />
               
                
                </div>
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;
