import React from 'react';
import shoes from "../../Assets/shoes.jpeg";
import {useHistory} from "react-router-dom";
import { timeAgo } from '../../Utils/date';


/** Search result */
function SerchResult({post}) {
 const history = useHistory();
 const { id, title, price, image, createdAt} = post;

 const toPost = () =>{
    history.push(`/item/${id}`)
 }

 return (
  <div className="post_result" onClick={toPost}>
       <img width="30%" src={image || shoes} alt={post.title} />
       <div className="post_result_detais">
         <p>{title}</p>
         <p>{`Ksh. ${price}`}</p>
       </div>
       <p className="post_result_time">{timeAgo(createdAt)}</p>
  </div>
 )
}

export default SerchResult;
