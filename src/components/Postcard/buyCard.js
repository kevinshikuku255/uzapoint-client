import React from "react"
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';
import { SkeletonBuyersCard} from "../../components/Skeleton/skeleton";
import  "./postcard.css"



/**This is a post... */
const BuyCard = ({buy}) => {
      const history = useHistory();

       const {id , author, pricerange, title,  description, createdAt} =  buy;


      const toProfile = () =>{
          history.push(`/${author.username}`)
      }

      const toPost = () =>{
          history.push(`/buyitem/${id}`)
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
            {<SkeletonBuyersCard title={title}/>}
        </div>

        { pricerange &&
        <div className="itemPrice">
          <p style={{fontWeight:"bolder"}} >Price:</p>
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
        <br/>

    </div>
  </>

   )
}
export default BuyCard;