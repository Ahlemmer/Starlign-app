import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';






const useStyles = makeStyles((theme)=> ({
    card:{
        marginBottom:theme.spacing(5),
    },
   media:{
       height:"250px"
   }
   
}));

const ReP = (notif) => {

    const classes = useStyles();
    return (
        <div className="" >

                        <div className="" >
                            <span>{notif &&notif.Displayname}</span>
                            <p> {notif && notif.pseudo}</p>
                        </div>
                           
                        <Typography variant="body1">@{notif && notif.sender} {notif && notif.message} </Typography>
                    
                    </div>
    );
};
export default ReP;