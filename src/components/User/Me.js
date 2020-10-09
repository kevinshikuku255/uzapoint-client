import React from 'react'
import {useQuery} from "@apollo/client"
import { Grid, Item} from 'semantic-ui-react'
import SkeletonPost from '../../components/SinglePostSkeleton';
import { makeStyles } from '@material-ui/core/styles';
import shoes from "../shoes.jpeg"
import { Link } from "react-router-dom";



import {GET_AUTH_USER} from "../../graphql/user";

import Avatar from '@material-ui/core/Avatar';




const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(6.5,0,0,0),
  },
flexContainer:{
  display:"flex",
  flexDirection:"column",
  marginTop:"2rem",
},
flex:{
 marginBottom:"1rem",
 marginTop:"3rem",
 alignSelf:"center"
},
flex1:{
 display:"flex",
 marginBottom:"2rem",
 paddingLeft:"3rem"
},
Dp:{
  width:"20%",
  marginLeft:"3px"
},
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  footer:{
  position: "fixed",
  width: "100vw",
  bottom: 0,
  textAlign: "center",
  backgroundColor:"white",
  color:"gray"
  },
tabs:{
   margin: theme.spacing(0,-1.5,0,-1.5),
   display:"flex",
   flexDirection:"row"
},
tab:{
  flexGrow:'1',
  textAlign:"center"
},
link:{
  color:"inherit"
}
}));




/**
 * About auth user...
 */
  const  UserAbout = () =>{
  const classes = useStyles();
  const {data, loading} = useQuery(GET_AUTH_USER,{
    fetchPolicy:"cache-first"
  });


 if(loading ){
   return(
    <div className={classes.skeleton}>
      <SkeletonPost/>
    </div>
   )
 }

 const {  username, posts, followers} = data.getAuthUser;
// const joinedDate = currentDate(createdAt).split(" ")
 return (
  <div>
  <Grid>
    <Grid.Column mobile={16} tablet={10} computer={7}>
      <div className={classes.flexContainer}>
{/**.......................................................................................................... */}
          <div className={classes.flex}>
              <div className={classes.Dp}>
                    <Avatar alt={username} src={shoes} className={classes.large}/>
              </div>
          </div>
{/**.......................................................................................................... */}
          <div className={classes.tabs}>
              <div className={classes.tab}>
                <Item as={Link} to={`/userPosts/${username}`}  className={classes.link}>
                    {posts.length}
                     <p>posts</p>
                </Item>
              </div>
              <div className={classes.tab}>
                 <p>new conversations</p>
              </div>
              <div className={classes.tab}>
                 <p>folowers</p>
                 {followers.length}
              </div>
          </div>
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