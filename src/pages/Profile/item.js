import React from 'react';
import {useHistory} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {LocationOn} from '@material-ui/icons';
import RouteHeader from "../../components/Header/routeHeader";

import {GET_POST} from "../../graphql/post";
import shoes from "../../Assets/shoes.jpeg";
import Comments from "../../components/Comment/comments";
import CreateComment from "../../components/CreateCommnet/createComment";

import { weekDay } from '../../Utils/date';


/** Auth user single item */
function AuthUserSingleItem() {
 const history = useHistory();
 const ID = history.location.pathname.split("/").pop();


const {data, loading} = useQuery(GET_POST, {variables:{id:ID}});

if(loading){
  return(  <h1>Loading....</h1> )
}

const {id, title, description, likes,comments, image,price, crossedPrice, features, location, createdAt} = data.getPost;
const weekday = weekDay(createdAt)

 return (
  <div>
    <RouteHeader tag={"Product details"}/>
    <div className="auth_user_item_media">
      <img width="100%" alt={title} src={image || shoes}/>
      <div><b>{weekday}</b></div>
    </div>

    <div>
      <div className="auth_user_item_description">
        <h3>Description:</h3>
        <p>{description}</p>
      </div>

      <div className="auth_user_item_price">
        <h3>Price:</h3>
        <h4>{`Ksh ${price}`}</h4>
        <i>{`Ksh ${crossedPrice}`}</i>
      </div>

      <div className="auth_user_item_likes">
        <h3>Likes:</h3>
         <p>{`Likes: ${likes.length}`}</p>
      </div>

      <div className="auth_user_item_features">
        <h3>Features:</h3>
        <p>{features}</p>
      </div>

     <div className="auth_user_item_location" >
       <h3>Loaction</h3>
        <p> <LocationOn/> {location}</p>
     </div>

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
  </div>
 )
}

export default AuthUserSingleItem;
