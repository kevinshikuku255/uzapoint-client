import React from 'react';
import {useHistory} from "react-router-dom";
import {useStore} from "../../store"
import { SkeletonPost} from "../../components/Skeleton/skeleton";
import { weekDay } from '../../Utils/date';
import DeleteButton from "../Delete/Delete";
import ReactGA from 'react-ga';
import  "./postGrid.css";


/** This is a user post grid component */
const  Postgrid = ({post, likedItem})  => {
      const history = useHistory();
      const [{auth}] = useStore();
      const { id, image, author, crossedPrice, price, title,  createdAt} = post;
      const weekday = weekDay(createdAt);
      const toSingleItem = () =>{
          ReactGA.event({
            category:"Item",
            action:"view",
            transport:"beacon",
            label:"Repeat user",
          })
          if(likedItem){
            return
          }else{
             history.push(`/${auth.user.username}/${id}`)
          }
        }

 return (
  <>
    <div className="media_wrapper">
        <div className="media" onClick={toSingleItem}>
            { image ? <img
              alt="alt_tag"
              src={image}
              width="100%"
              height="50%"
              /> : <SkeletonPost title={title}  />
             }
          </div>
        <div className="prices">
           <p><b>{`Ksh ${price}`}</b></p>
           {crossedPrice && <p className="crossed_price" >{`Ksh ${crossedPrice}`}</p>}
           {(auth.user.username ===  author?.username) && <DeleteButton id={id}/>}

        </div>

        <div className="grid_post_title">
            <p>{weekday}</p>
            <br/>
            { image && title &&
              <>
                <b>Name:</b>
                <p>{title}</p>
              </>
            }
        </div>
    </div>
  </>
 )
}

export default Postgrid;
