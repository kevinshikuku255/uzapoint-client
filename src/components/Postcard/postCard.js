import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import useGaEvents from "../../Hooks/useGAEvents";
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
        <div  onClick={toPost} >
        <div className="cardMedia">
            { image && <img
              alt="alt_tag"
              src={image}
              width="100%"
              height="50%"
              />
             }
        </div>
        {title &&
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
    </div>
  </>

   )
}
export default Postcard;