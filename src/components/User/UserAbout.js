import React from 'react'
import { Icon,Button } from 'semantic-ui-react';
import { Link } from "react-router-dom";


import {makeStyles} from "@material-ui/core"
import { currentDate } from '../../Utils/date';
import images from "../shoes.jpeg";

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:550,
  },
  media: {
    height: 190,
  },

}));




/**
 *
 * About user...
 */
  const  UserAbout = ({user}) =>{
    console.log(user)
  const   classes = useStyles();
  const {
        username,
        createdAt, posts,
        phone, isOnline,
        followers } = user;
const joinedDate = currentDate(createdAt).split(" ")
 return (
  <>
  <div className="flexContainer">
    <div>
        <Card >
              <CardMedia
                className={classes.media}
                image={images}
                title="DpInfo"
              />
        </Card>
    </div>
    <div className="UserInfo">
       <div className="DpInfo">
            {isOnline &&
              <Badge badgeContent={"online"} color="secondary">
                <b>{username}</b>
              </Badge>
            }
              { !isOnline &&
                <i>{username}</i>
              }
       </div>
       <div>
         <Button icon circular content={`Follow ${followers.length}`} as={Link}/>
       </div>
       <div>
           <Button icon circular content={`Items ${posts.length}`} />
       </div>
     </div>

    <div className="UserMeta">
        <div> <Icon  name="phone"/> <b>{phone}</b> </div>
        <div>
         <Icon  name="calendar"/>{`Joined ${joinedDate[0]}, ${joinedDate[2]} `}
        </div>
    </div>
    <div className="cliker">
      cLicker
    </div>
    <div className="cliker">
      cLicker
    </div>
    <div className="cliker">
      cLicker
    </div>

</div>
</>
 )
}

export default UserAbout;