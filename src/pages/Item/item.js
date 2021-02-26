import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {useQuery}  from '@apollo/client';

import {GET_POST } from '../../graphql/post';
import RouteHeader from "../../components/Header/routeHeader";
import shoes from "../../Assets/netlify.jpg";
import LikeButton from "../../components/Like/Like";
import { weekDay} from '../../Utils/date';
import Comments from "../../components/Comment/comments";
import "./item.css"
import Accordian from "../../components/Acordion/Accordian";
import CreateComment from "../../components/CreateCommnet/createComment";
import {useStore} from "../../store";
import DeleteButton from "../../components/Delete/Delete";
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import {LoadingIndicator} from "../../components/Skeleton/skeleton";



/**single Item component */
function Item() {
 const path = useRouteMatch();
 const [{auth}] = useStore();
 const _id = path.params.id.split(':').pop();
 UsedocumentTitle("Item")

 const { data,loading} = useQuery(GET_POST,{
   variables:{
     id: _id
   }
 });



  let loader;
  if(loading){
    return (<LoadingIndicator/>)
  }




const {id , author, image,likes, price,crossedPrice, title, description,location, comments, features, createdAt} = data.getPost;
const weekday = weekDay(createdAt)

const postImage = image ? image : shoes;


const main = (
  <>
    <div className="itemCard">
        <div className="cardMedia" > <img alt={auth.username} height="50%" width="100%" src={postImage}/> </div>

        <div className="itemStats">
          <p>{likes.length} likes</p>
          <p>{comments.length} comments</p>
          <p>{weekday}</p>
        </div>
        <div className="itemBtns">
          <LikeButton likes={likes} postId={id}/>
          <button>Comment</button>
          { (auth.user.username === author.username) && <DeleteButton id={id}/>}
        </div>

        <div className="cardTitle"> <p style={{fontWeight:"bolder"}} >Name:</p> {title}</div>

        <div className="item_price">
            <b>Price:</b>
            <ul>
              <li>{ price && <p>Ksh.{price}</p>}</li>
              <li>{crossedPrice && <p>Ksh.<i>{crossedPrice}</i> </p>}</li>
            </ul>
        </div>

        <div className="itemlocation">
          <p style={{fontWeight:"bolder"}}>Location:</p>
          {location ? `Located: ${location}` : "Location not specified..."}
        </div>

       {description &&
        <div className="itemDescription">
          <p style={{fontWeight:"bolder"}}>Item description:</p>
          <Accordian description={description}/>
        </div>
       }

        {features &&
        <div className="itemFeatures">
          <p style={{fontWeight:"bolder"}}>Item features:</p>
          {features}
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
  <RouteHeader tag={author.username}/>
  {loading ? loader : main}
  </>
 )
}

export default Item;

































