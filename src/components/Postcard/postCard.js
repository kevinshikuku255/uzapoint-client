import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import useGaEvents from "../../Hooks/useGAEvents";
import  "./postcard.css"
import {SkeletonPost} from "../Skeleton/skeleton";
import {Avatar } from '@material-ui/core';
import { LazyLoadImage } from 'react-lazy-load-image-component';

/**This is a post... */
const Postcard = ({post}) => {
      const history = useHistory();
      const GAEventTracker = useGaEvents("Click on item");

      const {id , author, image, price,crossedPrice, title, createdAt} =  post ;

      const slicedTitle = title.slice(0,50);
      const toProfile = () =>{
          history.push(`/${author.username}`)
      }

/* -------------------------------------------------------------------------- */
      const toPost = async (e) => {
          GAEventTracker("Item view", e.target.currentSrc);
          history.push(`/item/${id}`);
      }



   return(
  <>

    <div className="postCard">
        <div className="buyer_avator"  onClick={toProfile} >
          <Avatar name={author.username} src={author.image} />
          <p> {author.username}</p>
          <p style={{marginLeft:"2rem"}} > {timeAgo(createdAt)}</p>
        </div>
        <div  onClick={toPost} >
         {image ? <div className="cardMedia">
            { image &&
              <LazyLoadImage
                alt={title}
                effect="blur"
                height="50%"
                width="100%"
                loading="lazy"
                src={image}/>
             }
        </div> : <SkeletonPost title={slicedTitle}/> }

        {image && title &&
        <div className="itemTitle">
          {title}
        </div>}

        { price &&
        <div className="itemPrice">
          <p style={{fontWeight:"bolder"}} >Price:</p>
          <div className="priceInfo">
            {price && <p style={{color:"blue"}} >Ksh {price}</p>}
            {crossedPrice && <p style={{color:"brown"}} >was.. Ksh {crossedPrice}</p>}
          </div>
        </div>
        }
      </div>
    </div>
  </>

   )
}
export default Postcard;