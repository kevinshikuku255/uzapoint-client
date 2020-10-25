import React from 'react'
import {useQuery} from "@apollo/client"
import { Grid, Item} from 'semantic-ui-react'
import SkeletonPost from '../../components/SinglePostSkeleton';
import { makeStyles } from '@material-ui/core/styles';
import UserPosts from "./UserPosts"
import logo from "../images.jpeg"


import {GET_AUTH_USER} from "../../graphql/user";
import Avatar from '@material-ui/core/Avatar';


import Button from '@material-ui/core/Button';
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

//...............................................................
skeleton: {
  margin: theme.spacing(6.5,0,0,0),
  },
flexContainer:{
  display:"flex",
  flexDirection:"column",
  marginTop:"2rem",
},
bio:{
 marginLeft:"3rem",
},
large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
tabs:{
   margin: theme.spacing(0,-1.5,0,-1.5),
   display:"flex",
   flexDirection:"row",
   marginTop:"4rem",
},
tab1:{
  flexGrow:'0.5',
  alignItems:"center",
  marginLeft:"3rem",
  marginBottom:".05rem",
},
tab:{
  flexGrow:'1',
  textAlign:"center",
  cursor:"pointer",
  marginBottom:"0.5rem",
},
editProfile:{
  flexGrow:"1",
  backgroundColor:"gray",
  textAlign:"center",
  marginTop:"0.5rem",
  borderRadius:"5px",
  padding:"0.1rem 0",
  border:"1px solid black"
},
div:{
 overFlow:"none",
},
  footer:{
  position: "fixed",
  width: "100vw",
  bottom: 0,
  textAlign: "center",
  backgroundColor:"white",
  color:"gray",
  },
}));
//..................................................................................


/**
 * About auth user...
 */
  const  UserAbout = () =>{
  const classes = useStyles();

//.......................................................................
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };





  const {data, loading} = useQuery(GET_AUTH_USER,{
    fetchPolicy:"cache-and-network"
  });


 if(loading ){
   return(
    <div className={classes.skeleton}>
      <SkeletonPost/>
    </div>
   )
 }

 const {  username, image, posts, phone,likes, followers} = data.getAuthUser;
 const avator = image ? image : logo;
 console.log(likes.length)
// const joinedDate = currentDate(createdAt).split(" ")
 return (
  <div>
  <Grid>
    <Grid.Column mobile={16} tablet={10} computer={7}>
      <div className={classes.flexContainer}>
{/**.......................................................................................................... */}

          <div className={classes.tabs}>
                <div className={classes.tab1}>
                  <Avatar alt={username} src={avator} className={classes.large}/>
                </div>
                <div className={classes.tab}>
                  <p>folowers</p>
                  {followers.length}
                </div>
                <div className={classes.tab}>
                  <Item  onClick={handleClickOpen}>
                      {posts.length}
                      <p>posts</p>
                  </Item>
                </div>
          </div>



          <div className={classes.bio}>
                   <p style={{padding:"0", margin:"0",textTransform: "capitalize",}}>{username}</p>
                   <p style={{padding:"0", margin:"0"}}>{phone}</p>
          </div>

          <div className={classes.editProfile}>
                <div>
                  <b><button>Edit profile</button></b>
                </div>
          </div>


{/* ...................................................................................................... */}

        <Dialog fullScreen open={open} onClose={handleClose}>
          <AppBar className={classes.appBar} >
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                 <p style={{textTransform: "capitalize"}}> {username} </p>
              </Typography>
              <Button color="inherit" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Toolbar>
          </AppBar>

          <div className={classes.div}>
            <UserPosts posts={posts}/>
          </div>
        </Dialog>

    </div>
    </Grid.Column>
  </Grid>



















































 {/* <Grid className="Me">
    <GridColumn mobile={16} tablet={10} computer={7}>
     <Avatar  alt="logo" src={shoes} />
    </GridColumn>
 </Grid> */}

  {/* <div className="gridd">
    <div className="UserInfo">
       <div className="DpInfo">
         <b>{username}</b>
       </div>
       <div>
         <button>{`Followers ${followers.length}`}</button>
       </div>
       <div>
         <Icon name="bell"/>
       </div>
     </div>

    <div className="userBio" >
          <div>User Bio information: </div>
    </div>
    <div>{<Rating icon='heart' defaultRating={1} maxRating={3} />} </div>
    <div> <p>{`Phone: ${phone} `}</p> </div>
    <div className="UserMeta">
        <div>
          <Icon name="cloud"/>{"Nairobi,Ke"}
        </div>
        <div>
         <Icon  name="calendar"/>{`Joined ${joinedDate[0]}, ${joinedDate[2]}`}
        </div>
    </div>
    <div>
        <Menu pointing secondary>
          <Menu.Item
            name='items'
            active={activeItem === 'items'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='sales'
            active={activeItem === 'sales'}
            onClick={handleItemClick}
          />
        </Menu>
    </div>
    <div>
      { activeItem === "items" ? <b>This feature will be added soon</b>
         : activeItem === "sales" ?  <UserSales/> : " " }
    </div>
</div> */}
</div>
 )
}

export default UserAbout;