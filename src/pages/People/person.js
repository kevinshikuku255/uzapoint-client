import React from 'react';
import {useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import "./people.css";
import {Image, Transformation, Placeholder} from 'cloudinary-react';


function Person({person}) {
 const {username, imagePublicId, phonenumber} = person;
 const history = useHistory();

 const toProfile = () =>{
     history.push(`/${username}`)
 }


 return (
  <div className="person_wrapper" onClick={toProfile} >
      <div className="person_header">
         {imagePublicId ? <Image
            publicId={imagePublicId}
            loading="lazy"
            >
            <Transformation height="20rem" width="20rem" crop="fill" radius="50%"/>
            <Placeholder type="blur"/>
          </Image>: <Avatar alt="avator"/>}
         <div className="person_contact">
            <h4>{username}</h4>
            <p>{phonenumber}</p>
         </div>
      </div>
  </div>
 )
}

export default Person
