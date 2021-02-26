import React from 'react';
import {useHistory} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {LocationOn} from '@material-ui/icons';
import RouteHeader from "../../components/Header/routeHeader";

import {GET_POST} from "../../graphql/post";
import shoes from "../../Assets/netlify.jpg";
import Comments from "../../components/Comment/comments";
import CreateComment from "../../components/CreateCommnet/createComment";
import UsedocumentTitle from "../../Hooks/UseDocumentTitle";
import {LinearProg} from "../../components/Skeleton/skeleton";

import { weekDay } from '../../Utils/date';


/** Auth user single item */
function AuthUserSingleItem() {
 const history = useHistory();
 UsedocumentTitle("Item")
 const ID = history.location.pathname.split("/").pop();


const {data, loading} = useQuery(GET_POST, {variables:{id:ID}});

  let loader;
  if(loading){
    return(
        loader =
          <div>
            <RouteHeader tag={"Product details"}/>
            <LinearProg/>
            <br/> <br/>
            <h1>Loading...</h1>
          </div>
    )
  }

const {id, title, description, likes,comments, image,price, crossedPrice, features, location, createdAt} = data.getPost;
const weekday = weekDay(createdAt)

const main = (

  <div>
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

 return (
<>
<RouteHeader tag={"Product details"}/>
{loading ? loader : main}
</>
 )
}

export default AuthUserSingleItem;
