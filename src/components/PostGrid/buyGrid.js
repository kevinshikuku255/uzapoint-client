import React from 'react';
import {useStore} from "../../store";

import {  SkeletonBuyersCard} from "../../components/Skeleton/skeleton";
import { weekDay } from '../../Utils/date';
import DeleteButton from "../Delete/Delete";
import  "./postGrid.css";


/** This is a user post grid component */
const  Buygrid = ({buy})  => {
      const [{auth}] = useStore();
      const { id, author, pricerange,  title,features, createdAt} = buy;
      const weekday = weekDay(createdAt);
      const featuresList = features?.split("#")

 return (
  <>
    <div className="media_wrapper">
        <div className="media">
            {<SkeletonBuyersCard title={title}/>}
          </div>
        <div className="prices">

           <p>{weekday}</p>
           {(auth.user.username ===  author.username) && <DeleteButton id={id}/>}

        </div>

        { pricerange &&
         <div className="grid_post_price">
            {pricerange && <p><b>{`Ksh ${pricerange}`}</b></p>}
         </div>}

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

export default Buygrid;
