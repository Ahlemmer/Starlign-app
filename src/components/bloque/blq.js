import { Grid, makeStyles } from '@material-ui/core';
import React from 'react'
import Leftbar from '../Leftbar';
import Navbar from '../Navbar';
import Feed from './Feed';
import {Right} from '../Right';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'




const useStyles = makeStyles((theme)=> ({
    right:{
        [theme.breakpoints.down("sm")]:{
            display:"none"
        },
    },
}));


export default function Blq() {
    const classes = useStyles();
    return (
        <div>
            <Navbar/>
            <Grid container>
                <Grid item sm={2} xs={2}>
            <Router>
                <Leftbar/>
               
            </Router>
            </Grid>
            <Grid item sm={7} xs={10}><Feed/></Grid>
            <Grid item sm={3} classes={classes.right}><Right/></Grid>
            
             </Grid>  
               
            
            
        </div>
    )
}
 