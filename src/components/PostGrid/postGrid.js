import React from 'react';
import {useHistory} from "react-router-dom";
import {useStore} from "../../store"


import { weekDay } from '../../Utils/date';
import shoes from "../../Assets/netlify.jpg";
import  "./postGrid.css";


/** This is a user post grid component */
const  Postgrid = ({post})  => {
      const history = useHistory();
      const [{auth}] = useStore();
      const { id, image, crossedPrice, price, title,  createdAt} = post;
      const weekday = weekDay(createdAt)


      const postImage = image ? image : shoes;

      const toSingleItem = () =>{
          history.push(`/${auth.user.username}/${id}`)
        }



 return (
  <>
    <div className="media_wrapper">
        <div className="media"> <img width="100%" alt={id} onClick={toSingleItem} height="100%" src={postImage}/> </div>
        <div className="prices">
           <p><b>{`Ksh ${price}`}</b></p>
           <p className="crossed_price" >{`Ksh ${crossedPrice}`}</p>
           <button>Edit</button>
        </div>

        <div className="grid_post_title">
            <p>{weekday}</p>
            <p>{title}</p>
        </div>
    </div>
  </>
 )
}

export default Postgrid;
