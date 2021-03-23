import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import {SkeletonPost, SkeletonSmallAvator} from "../../components/Skeleton/skeleton";
import {WhatsApp, Call} from "@material-ui/icons";
import  "./postcard.css"



/**This is a post... */
const BuyCard = ({buy}) => {
      const history = useHistory();

       const {author, pricerange, title,  description, features, createdAt} =  buy;
       const featuresList = features?.split("#")
       const slicedTitle = title.slice(0,50);
       const internationalPhone = author.phonenumber && `+254${author.phonenumber.substring(1)}`;
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
            {<SkeletonPost title={slicedTitle}/>}
        </div>

        <div className="itemDescription">
          { title.length > 50 &&
            <>
            <p style={{fontWeight:"bolder"}}> Name:</p>
            <p>{title}</p>
            </>
          }
        </div>

        <div className="buy_itemBtns">
            <a className="buy_button" href={`https://api.whatsapp.com/send?phone=${internationalPhone}`}>
              <WhatsApp/>
              <p>Whatsapp</p>
            </a>
            <a href={`tel:${author.phonenumber}`} className="buy_button">
                <Call/>
                <p>Call me</p>
            </a>
            <p onClick={toProfile} className="buy_profilebutton">My profile</p>
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
         <div className="itemFeatures" >
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