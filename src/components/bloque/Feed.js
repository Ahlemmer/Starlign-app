import {Container, makeStyles } from '@material-ui/core';
import React from 'react'
import Settings from '../setti/Settings'





const useStyles = makeStyles((theme)=> ({
    Container: {
        paddingTop: theme.spacing(2),
    }
}));

const Feed = () => {

    const classes = useStyles();
    return (
        <Container className={classes.Container}><Settings/> </Container>
          
    )
};
export default Feed;
