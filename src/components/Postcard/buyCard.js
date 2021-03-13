import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import { SkeletonBuyersCard, SkeletonSmallAvator} from "../../components/Skeleton/skeleton";
import  "./postcard.css"



/**This is a post... */
const BuyCard = ({buy}) => {
      const history = useHistory();

       const {author, pricerange, title,  description, features, createdAt} =  buy;
       const featuresList = features?.split("#")

      const toProfile = () =>{
          history.push(`/${author.username}`)
      }

   return(
  <>
    <div className="postCard">
        <div className="buyer_avator"  onClick={toProfile} >
          <SkeletonSmallAvator name={author.username} />
          <p> {timeAgo(createdAt)}</p>
        </div>
        <div className="cardMedia" >
            {<SkeletonBuyersCard title={title}/>}
        </div>
        { pricerange &&
        <div className="itemPrice">
          <p style={{fontWeight:"bolder"}} >price-range:</p>
          <div className="priceInfo">
            { pricerange && <h4 style={{color:"blue"}} >Ksh {pricerange}</h4>}
          </div>
        </div>
        }
        <div className="itemDescription">
          { description &&
            <>
            <p style={{fontWeight:"bolder"}}> Description:</p>
            <p>{description}</p>
            </>
          }
        </div>

        {features &&
         <div className="grid_post_price" >
          <b>Desired feature:</b>
          <ul>
            {featuresList.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>}

    </div>
  </>

   )
}
export default BuyCard;