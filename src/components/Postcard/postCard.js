import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import {SkeletonSmallAvator, SkeletonPost} from "../../components/Skeleton/skeleton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import  "./postcard.css"

import { makeStyles , Avatar} from '@material-ui/core';
import { Share} from '@material-ui/icons';
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

       const {id , author, image,likes, price,crossedPrice, title, description, comments, createdAt} =  post;


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
                {author.image ? <Avatar alt="logo" src={author.image} className={classes.large}/> :
                 <SkeletonSmallAvator name={author.username}/>}
                <div>
                    <h4>{author.username}</h4>
                    <p> {timeAgo(createdAt)}</p>
                </div>
            </div>
            <div className="actionBtn">
              {""}
            </div>
        </div>
        <div className="cardMedia" onClick={toPost}>
            {image ? <LazyLoadImage
              alt="alt_tag"
              src={image}
              effect="blur"
              width="100%"
              height="50%"
            /> : <SkeletonPost/>}
            {/* {image ? <img height="50%" width="100%" aria-label={title} src={image}/> : <SkeletonPost/>} */}
        </div>

        <div className="itemStats">
          <p>{likes.length} likes</p>
          <p>{comments.length} comments</p>
           <p onClick={toProfile}><Share/> </p>
        </div>

        <div className="itemTitle">
          <p style={{fontWeight:"bolder"}} >Name:</p>
          {title}
        </div>

        <br/>

        { price &&
        <div className="itemPrice">
          <p style={{fontWeight:"bolder"}} >Price:</p>
          <div className="priceInfo">
            { price && <h4 style={{color:"blue"}} >Ksh {price}</h4>}
            {crossedPrice && <p style={{color:"brown"}} >Ksh {crossedPrice}</p>}
          </div>
        </div>
        }
        <br/>
        <div className="itemDescription">
          { description &&
            <>
            <p style={{fontWeight:"bolder"}}> Description:</p>
            <p>{description}</p>
            </>
          }
        </div>
    </div>
  </>

   )
}
export default Postcard;