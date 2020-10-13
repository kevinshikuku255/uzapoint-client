import React from 'react'
import { Button ,Grid} from 'semantic-ui-react';




import {makeStyles} from "@material-ui/core";
import { currentDate } from '../../Utils/date';
import images from "../shoes.jpeg";
import UserPosts from "./AuthUserPosts"

import Avatar from '@material-ui/core/Avatar';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import LocationOnIcon from '@material-ui/icons/LocationOn';


import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';





const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
//.........................................

flexContainer:{
  display:"flex",
  flexDirection:"column",
  marginTop:"2rem",
  paddingLeft:"3rem"
},
flex1:{
 display:"flex",
 width:"100vw",
 marginBottom:"2rem"
},
Dp:{
  width:"20%",
  marginLeft:"3px"
},
Icon:{
  width:"10%",
  marginLeft:"3px"
},
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  footer:{
  position: "fixed",
  width: "100vw",
  bottom: 0,
  textAlign: "center",
  backgroundColor:"white",
  color:"gray"
  }
}));



/**
 * About user...
 */

const  UserAbout = ({user}) =>{
  const   classes = useStyles();

//.......................................................................
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
        username,
        createdAt, posts,
        phone,
        followers, following } = user;
const joinedDate = currentDate(createdAt).split(" ")


 return (
  <>
  <Grid>
    <Grid.Column mobile={16} tablet={10} computer={7}>
      <div className={classes.flexContainer}>
          <div className={classes.flex1}>
              <div className={classes.Dp}>
                    <Avatar alt={username} src={images} className={classes.large}/>
              </div>
              <div> <b>{`${username}`}</b> <br/> {`Joined ${joinedDate[0]}, ${joinedDate[2]}`} </div>
              <hr/>
          </div>
{/**.......................................................................................................... */}
          <div className={classes.flex1}>
              <div className={classes.Icon}>
                 <PhoneRoundedIcon/>
              </div>
              <div> <b>Contact</b> <br/> {phone} </div>
          </div>
{/**.......................................................................................................... */}
          <div className={classes.flex1}>
              <div className={classes.Icon}>
                 <PeopleAltRoundedIcon/>
              </div>
              <div> <b>Followers</b> <br/> {followers.length} </div>
          </div>
{/**.......................................................................................................... */}
          <div className={classes.flex1}>
              <div className={classes.Icon}>
                 <PeopleOutlineIcon/>
              </div>
              <div> <b>Following</b> <br/> {following.length} </div>
          </div>
{/**.......................................................................................................... */}
          <div className={classes.flex1}>
              <div className={classes.Icon}>
                 <MonetizationOnRoundedIcon/>
              </div>
              <div> <b>Items Dispalyed - {posts.length}</b> <br/>
                <Button icon circular content="View all  items" onClick={handleClickOpen}/>
               </div>
          </div>
{/**.......................................................................................................... */}
          <div className={classes.flex1}>
              <div className={classes.Icon}>
                 <LocationOnIcon/>
              </div>
              <div> <b>Located </b> <br/> <div> <b>Coutry</b> : Kenya </div>
               </div>
          </div>
    </div>


{/* ...................................................................................................... */}
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar className={classes.appBar} >
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
               {username}
            </Typography>
            <button  color="white" onClick={handleClose}>
               <CloseIcon />
            </button>
          </Toolbar>
        </AppBar>

         <div>
           <UserPosts username={username} posts={posts}/>
         </div>
      </Dialog>
    </Grid.Column>
  </Grid>

  <div className={classes.footer}>
      <p className="copyWrite"> 2020 <br/> Kevin Shikuku production</p>
  </div>
</>
 )
}

export default UserAbout;