import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import useGaEvents from "../../Hooks/useGAEvents";
import  "./postcard.css"
import {SkeletonPost} from "../Skeleton/skeleton";
import {Image, Transformation} from 'cloudinary-react';

/**This is a post... */
const Postcard = ({post}) => {
      const history = useHistory();
      const GAEventTracker = useGaEvents("Click on item");

      const {id , author, imagePublicId, price,crossedPrice, title, createdAt} =  post ;

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
        <div className="B" onClick={toProfile} >
                <h4 style={{color:"skyblue"}} >{author.username}</h4>
                <p> {timeAgo(createdAt)}</p>
        </div>
        <div  onClick={toPost} >
         {imagePublicId ? <div className="cardMedia">
            { imagePublicId &&
               <Image
                  publicId={imagePublicId}
                  loading="lazy">
                  <Transformation height="50%" width="100%" crop="fill"/>
               </Image>
             }
        </div> : <SkeletonPost title={slicedTitle}/> }

        {imagePublicId && title &&
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