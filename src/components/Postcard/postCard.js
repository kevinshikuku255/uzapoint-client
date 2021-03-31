import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import LazyLoad from 'react-lazyload';
import useGaEvents from "../../Hooks/useGAEvents";
import  "./postcard.css"
import {SkeletonPost} from "../Skeleton/skeleton";



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
        <div className="B" onClick={toProfile} >
                <h4 style={{color:"skyblue"}} >{author.username}</h4>
                <p> {timeAgo(createdAt)}</p>
        </div>
        <div  onClick={toPost} >
         {image ? <div className="cardMedia">
            { image &&
            <LazyLoad height="50%" >
            <img
              alt={title}
              src={image}
              width="100%"
              />
            </LazyLoad>
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