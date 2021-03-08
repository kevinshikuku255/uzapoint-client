import React from 'react';
import {useHistory} from "react-router-dom";
import {useStore} from "../../store"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Netlify from "../../Assets/netlify.jpg"

import { SkeletonPost} from "../../components/Skeleton/skeleton";
import { weekDay } from '../../Utils/date';
import DeleteButton from "../Delete/Delete"
import  "./postGrid.css";


/** This is a user post grid component */
const  Postgrid = ({post})  => {
      const history = useHistory();
      const [{auth}] = useStore();
      const { id, image, author, crossedPrice, price, title,  createdAt} = post;
      const weekday = weekDay(createdAt);
      const Image = image || Netlify;


      const toSingleItem = () =>{
          history.push(`/${auth.user.username}/${id}`)
        }

 return (
  <>
    <div className="media_wrapper">
        <div className="media" onClick={toSingleItem}>
            <LazyLoadImage
              alt="alt_tag"
              src={Image}
              effect="blur"
              width="100%"
              height="50%"
              placeholder={<SkeletonPost/>}
            />
          </div>
        <div className="prices">
           <p><b>{`Ksh ${price}`}</b></p>
           {crossedPrice && <p className="crossed_price" >{`Ksh ${crossedPrice}`}</p>}
           {(auth.user.username ===  author.username) && <DeleteButton id={id}/>}

        </div>

        <div className="grid_post_title">
            <p>{weekday}</p>
            <br/>
            { title &&
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
