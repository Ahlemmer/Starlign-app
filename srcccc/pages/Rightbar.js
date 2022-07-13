import { Avatar, Chip, Container,makeStyles } from '@material-ui/core';
import React from 'react'





const useStyles = makeStyles((theme)=> ({
    Container: {
        paddingTop: theme.spacing(10),
    }
}));


export default function Rightbar() {
    const classes = useStyles(
    
    
    );
    return (
        <Container className={classes.container}>
            Rightbar
            
            </Container>
    )
}
