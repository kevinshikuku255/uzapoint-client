import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import {useHistory} from "react-router-dom";
import "./people.css";

import { makeStyles } from '@material-ui/core/styles';
const  useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

function Person({person}) {
 const {username, image, phonenumber} = person;
 const history = useHistory();
 const classes = useStyles();

 const toProfile = () =>{
     history.push(`/${username}`)
 }


 return (
  <div className="person_wrapper" onClick={toProfile} >
      <div className="person_header">
         <Avatar alt="avator" src={image} className={classes.large}/>
         <div className="person_contact">
            <h4>{username}</h4>
            <p>{phonenumber}</p>
         </div>
      </div>
  </div>
 )
}

export default Person
