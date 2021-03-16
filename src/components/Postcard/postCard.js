import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
// import { SkeletonBuyersCard} from "../../components/Skeleton/skeleton";
import NetlifyImg from "../../Assets/netlify.jpg"
import useGaEvents from "../../Hooks/useGAEvents";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import  "./postcard.css"




/**This is a post... */
const Postcard = ({post}) => {
      const history = useHistory();
      const GAEventTracker = useGaEvents("Click on item")

       const {id , author, image, price,crossedPrice, title,  createdAt} =  post ;


      const toProfile = () =>{
          history.push(`/${author.username}`)
      }

      const toPost = (e) =>{
          GAEventTracker("Item view", e.target.currentSrc)
          history.push(`/item/${id}`)
      }

   return(
  <>
    <div className="postCard">
            <div className="B" onClick={toProfile} >
                    <h4 style={{color:"skyblue"}} >{author.username}</h4>
                    <p> {timeAgo(createdAt)}</p>
            </div>
        <div className="cardMedia" onClick={toPost}>
            { <LazyLoadImage
              alt="alt_tag"
              src={image}
              effect="blur"
              width="100%"
              height="50%"
              placeholder={NetlifyImg}
              />
               }
        </div>
        {title && image &&
        <div className="itemTitle">
          {title}
        </div>}

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