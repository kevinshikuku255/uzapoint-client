import React from "react"
import {useHistory} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

import { timeAgo, weekDay } from '../../Utils/date';
import shoes from "../../Assets/netlify.jpg"
import Accordian from "../../components/Acordion/Accordian";
import LikeButton from "../../components/Like/Like";
import  "./postcard.css"

import { makeStyles } from '@material-ui/core/styles';
const  useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));






/**This is a post... */
const Postcard = ({post}) => {
      const classes = useStyles();
      const history = useHistory();

       const {id , author, image,likes, price,crossedPrice, title, description, comments, createdAt} = post;
       const weekday = weekDay(createdAt);


       const postImage = image ? image : shoes;
       const avator = author.image  ?  author.image : null;


      const toProfile = () =>{
          history.push(`/${author.username}`)
      }

      const toPost = () =>{
          history.push(`/item/${id}`)
      }

   return(
  <>
    <div className="postCard">
        <div className="A">
            <div className="B" onClick={toProfile} >
                <Avatar alt="logo" src={avator} className={classes.large}/>
                <div>
                    <h4>{author.username}</h4>
                    <p> {timeAgo(createdAt)}</p>
                </div>
            </div>
            <div className="actionBtn">
              {""}
            </div>
        </div>
        <div className="cardMedia" onClick={toPost}> <img height="50%" width="100%" aria-label={title} src={postImage}/> </div>

        <div className="itemStats">
          <p>{likes.length} likes</p>
          <p>{comments.length} comments</p>
          <p>{weekday}</p>
        </div>

        <div className="cardAcations">
              <LikeButton likes={likes} postId={id}/>
              <button>comment</button>
              <button onClick={toProfile} >Buy</button>
        </div>

        <div className="itemTitle">
          <p style={{fontWeight:"bolder"}} >Name:</p>
          {title}
        </div>

        { price &&
        <div className="itemPrice">
          <p style={{fontWeight:"bolder"}} >Price:</p>
          <div className="priceInfo">
            { price && <h4>Ksh {price}</h4>}
            {crossedPrice && <p>Ksh {crossedPrice}</p>}
          </div>
        </div>
        }
        <Accordian description={description}/>
    </div>
  </>

   )
}
export default Postcard;