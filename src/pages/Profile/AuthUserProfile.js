import React,{useState} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useQuery} from "@apollo/client";
import { GET_USER} from "../../graphql/user";

import Avatar from '@material-ui/core/Avatar';
import { InfoOutlined, ShoppingBasketOutlined,  AddShoppingCartSharp, EmailOutlined, Phone, SettingsSharp, PeopleAltOutlined }   from "@material-ui/icons";

import Footer from "../../components/Footer/index";
import ProfileHeader from "../../components/Header/profileHeader";
import Info from "../windoshoppe/info";
import Items from "./items";
import LikedItems from "./likedItems";
import UserBuys from "./buys"
import Clients from "./clients"
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {  Skeleton } from "../../components/Skeleton/skeleton";
import ImageUpload from "./imageUpload";
import './profile.css';
import { makeStyles } from '@material-ui/core/styles';
import {Image, Transformation} from 'cloudinary-react';

const  useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft:0,
    backgroundColor:"#2ceaff"
  },
  avator:{
     display:"flex",
     alignItems:"center",
     flexDirection:"row",
     marginBottom:"4rem",
  },
  avator_p: {
     marginLeft:"1rem",
     marginTop:"auto",
  },
  edit_profile_btn: {
      color:"blue",
      cursor:"pinter",
      textAlign:"baseline",
      margin:theme.spacing(2,0),
      fontSize:"2rem"
  },
  paragraph:{
   display:"flex",

   alignItems:"center"
  },
  p:{
    padding: theme.spacing(.5, 1),
    backgroundColor:"#0000ff67",
    border:"1px solid blue",
    borderRadius:"5px",
    boxShadow: "1px 1px 4px #3e3e8c",
    color:"black",
    cursor: "pointer",
    fontWeight: "bolder",
    fontFamily: "sansSerif",
    width:"30%",
    margin:"auto",
    marginTop:"2rem"
  },
  business_contact: {
    marginLeft:"2rem",
    marginTop:".4rem"
  }
}));


/* ------------------------------------------------------------------------------ */
/** ..AuthProfile component........................... */
function AuthProfileComponent() {
   const path = useRouteMatch();
   const classes = useStyles();
   const history = useHistory();
   const name = path.params.username.split(':').pop();
   const [tab, setTab] = useState(0);
   UsedocumentTitle("Profile")

 const { data,loading} = useQuery(GET_USER,{
   fetchPolicy:"network",
     variables:{
       username:name
   }
 });

/** Loading section */
      let loader;
      if(loading){
         return (
            <>
            <ProfileHeader tag={"username"}/>
            <Skeleton/>
           </>
         )
      }
 const {  username, email, phonenumber, fullname, posts, businessdescription, image,coverImagePublicId, likes, buys} = data.getUser;

 const postsLikes = posts.map( p => p.likes.length).reduce((cur, prev) => ( cur + prev ),0);

console.log(coverImagePublicId);

 const toEditProfile = () =>{
   history.push(`/profile/${username}/editprofile`)
   }

const likedPosts = likes.map( like => like.post)


/** Main section */
const main =
     <>
            <div className="topBar">

                  <div onClick={() => setTab(0)}>
                     <SettingsSharp/>
                     <h4 style={{color: tab === 0 ? "blue" : ""}} >Settings</h4>
                  </div>

                  <div onClick={() => setTab(1)}>
                     <ShoppingBasketOutlined/>
                     <h4 style={{color: tab === 1 ? "blue" : ""}} >Sales</h4>
                  </div>
                  { buys && <div onClick={() => setTab(2)}>
                     <AddShoppingCartSharp/>
                     <h4 style={{color: tab === 2 ? "blue" : ""}} >Buying</h4>
                  </div>}
            </div>

       { tab === 0 &&
        <>
         <div className="coverPhoto" >

            {<>
               <Image
               public-id={coverImagePublicId}
               loading="lazy">
               <Transformation height="20%" width="100%" crop="fill"/>
               </Image>
               <ImageUpload isCover={true} />
            </>
            }

         </div>
        <div className="profile_Infor">
            <div className="bioData">
               <div className={classes.avator}>
                  <div> <Avatar className={classes.small} src={image} />  <ImageUpload isCover={false}/> </div>
                  <div className={classes.avator_p}>
                     <h4>{username}</h4>
                     {fullname && fullname}
                     <div>{businessdescription ? <h6>{businessdescription}</h6> : "Doing business on windoshoppe" }</div>
                  </div>
               </div>



               { email && phonenumber &&
               <>
                  <h3>My business contacts</h3>
                  <div className={classes.business_contact}>
                    <p className={classes.paragraph}> <EmailOutlined/> __ {email} </p>
                    <p className={classes.paragraph}> <Phone/> __ {phonenumber}</p> <br/>
                  </div>
               </>
               }

               {
               <>
                  <h2> Business information</h2>
                  <div className={classes.business_contact}>
                    <p> Selling {posts?.length} </p>
                    <p> Buying {buys?.length}</p>
                    <p>Total likes received from items I sell {postsLikes}</p>
                    <p>Total items I Liked {likes.length}</p> <br/> <br/>
                  </div>
               </>
               }

         <h2 className={classes.paragraph} onClick={() => setTab(4)}> <ShoppingBasketOutlined/> __ Items I Liked</h2><br/>
         <h2 className={classes.paragraph} onClick={() => setTab(5)}> <PeopleAltOutlined/> __ People who liked my items</h2><br/>
         <h2 className={classes.paragraph} onClick={() => setTab(3)}> <InfoOutlined/> __ infor</h2>
            </div>


            <div className={classes.edit_profile_btn}>
               <p onClick={toEditProfile} className={classes.p}>Edit Profile</p>
            </div>


       </div>
       </>
       }
       {tab === 1 && <Items posts={posts}/>}
       {tab === 2 && <UserBuys buys={buys}/>}
       {tab === 3 && <Info/> }
       {tab === 4 && <LikedItems posts={likedPosts}/> }
       {tab === 5 && <Clients posts={posts}/> }
     </>

 return (
  <>
     <ProfileHeader tag={"Settings"}/>
     <main>
       {loading ? loader : main}
     </main>
     <Footer/>
  </>
 )
}

export default AuthProfileComponent;
