import React from 'react';
import {useStore} from "../../store";

import {  SkeletonBuyersCard} from "../../components/Skeleton/skeleton";
import { weekDay } from '../../Utils/date';
import DeleteButton from "../Delete/Delete";
import  "./postGrid.css";


/** This is a user post grid component */
const  Buygrid = ({buy})  => {
      const [{auth}] = useStore();
      const { id, author, pricerange,  title,  createdAt} = buy;
      const weekday = weekDay(createdAt)


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

        <div className="grid_post_title">
            {pricerange && <p><b>{`Ksh ${pricerange}`}</b></p>}
        </div>
    </div>
  </>
 )
}

export default Buygrid;
