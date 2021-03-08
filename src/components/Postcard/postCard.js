import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import { SkeletonPost} from "../../components/Skeleton/skeleton";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import  "./postcard.css"

import { Share} from '@material-ui/icons';
import NetlifyImg from "../../Assets/netlify.jpg"

/**This is a post... */
const Postcard = ({post}) => {
      const history = useHistory();

       const {id , author, image,likes, price,crossedPrice, title, comments, createdAt} =  post;
       const Image = image || NetlifyImg;
       console.log(post)

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
                <div>
                    <h4 style={{color:"skyblue"}} >{author.username}</h4>
                    <p> {timeAgo(createdAt)}</p>
                </div>
            </div>
            <div className="actionBtn">
              {""}
            </div>
        </div>
        <div className="cardMedia" onClick={toPost}>
            <LazyLoadImage
              alt="alt_tag"
              src={Image}
              effect="blur"
              width="100%"
              height="50%"
              placeholder={<SkeletonPost/>}
            />
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

        { price &&
        <div className="itemPrice">
          <p style={{fontWeight:"bolder"}} >Price:</p>
          <div className="priceInfo">
            { price && <h4 style={{color:"blue"}} >Ksh {price}</h4>}
            {crossedPrice && <p style={{color:"brown"}} >was.. Ksh {crossedPrice}</p>}
          </div>
        </div>
        }
    </div>
  </>

   )
}
export default Postcard;