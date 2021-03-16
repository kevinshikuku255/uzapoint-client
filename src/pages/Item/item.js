import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {useQuery}  from '@apollo/client';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {GET_POST } from '../../graphql/post';
import RouteHeader from "../../components/Header/routeHeader";
import LikeButton from "../../components/Like/Like";
import { weekDay} from '../../Utils/date';
import Comments from "../../components/Comment/comments";
import "./item.css"
import {CreateComment} from "../../components/CreateCommnet/createComment";
import {UsedocumentTitle} from "../../Hooks/UseDocumentTitle";
import {SkeletonPost, SkeletonBar2, SkeletonBuyersCard} from "../../components/Skeleton/skeleton";
import NetlifyImg from "../../Assets/netlify.jpg";



/**single Item component */
function Item() {
 const path = useRouteMatch();
 const _id = path.params.id.split(':').pop();
 UsedocumentTitle("Item")

 const { data,loading} = useQuery(GET_POST,{
   variables:{
     id: _id
   },
   fetchPolicy:"cache-and-network"
 });



  let loader;
  if(loading){
    return (
    <>
    <RouteHeader tag="product details"/>
    <br/> <br/>
    <SkeletonPost/>
    <SkeletonBar2/>
    </>
    )
  }




const {id , image,likes, price,crossedPrice, title, description, features,location, comments, createdAt} = data.getPost;
const weekday = weekDay(createdAt)


 const itemFeatures = features && features.split("#")
 const main = (
  <>
    <div className="itemCard">
        <div className="cardMedia" >
            {title && image && <div className="cardTitle">  {title}</div>}
            { image ? <LazyLoadImage
              alt="alt_tag"
              src={image}
              effect="blur"
              width="100%"
              height="50%"
              placeholder={NetlifyImg}
            /> : <SkeletonBuyersCard title={title}/> }
       </div>

        <div className="itemStats">
          <p>{likes.length} likes</p>
          <p>{comments.length} comments</p>
          <p>{weekday}</p>
        </div>
        <div className="itemBtns">
          <LikeButton likes={likes} postId={id}/>
        </div>


        <div className="item_price">
            <>
              { price && <p>Ksh.{price}</p>}
              {crossedPrice && <p style={{color:"red"}} > was Ksh. <i>{crossedPrice}</i> </p>}
            </>
        </div>

        <div className="itemlocation">
          <p style={{fontWeight:"bolder"}}>Location:</p>
          {location ? `Located: ${location}` : "Location not specified..."}
        </div>

       {description &&
        <div className="itemDescription">
          <p style={{fontWeight:"bolder"}}>Item description:</p>
           {description}
        </div>
       }

        {features &&
        <div className="itemFeatures">
          <p style={{fontWeight:"bolder"}}>Item features:</p>
            <ul>
              {itemFeatures.map((item, i) => (
                 <li key={i} >{item}</li>
              ))}
            </ul>

        </div>
        }

          <div className="createComment">
           <CreateComment postId={id} comments={comments}/>
          </div>

        <div className="itemComments">
          <p style={{fontWeight:"bolder"}}>Comments and Reviews:</p>
          <div>
            {comments.length && comments.map( comment => (
                <div className="comment" key={comment.id}>
                  <Comments comment={comment}/>
                </div>
            ))}
          </div>
        </div>
    </div>
  </>

)


 return (
  <>
  <RouteHeader tag={"product details"}/>
  {loading ? loader : main}
  </>
 )
}

export default Item;
