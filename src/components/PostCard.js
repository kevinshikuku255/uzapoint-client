import React from "react"
import { Card, Icon,Feed,Button, FeedMeta,  List, ListItem} from "semantic-ui-react"
import { timeAgo } from '../Utils/date';
import { Link } from "react-router-dom";
import shoes from "./shoes.jpeg"

import  LikeButton  from './LikeButton';
import DP from "../components/Dp"

const Postcard = ({post}) => {
 const {id , author, likes, price, comments, createdAt} = post

const extra = (
 <div className="extra">

 <List horizontal  relaxed='very'>

   <ListItem>
      <LikeButton user={author} postId={id} likes={likes}/>
   </ListItem>
   <ListItem>
      <Button  as={Link} to={`/posts/${id}`} size="tiny" circular>
            <Icon name="comment" />{comments.length}
      </Button>
   </ListItem>
   <ListItem>
         <b>{`Ksh. ${price}`}</b>
   </ListItem>

 </List>
 </div>
)

   return(
  <>

     <Feed >
         <Feed.Event>
          <Feed.Label as={Link} to={`profile/${author.id}`} image={<DP/>} />
          <Feed.Content>
             <FeedMeta> <h3>{author.username}</h3></FeedMeta>
            <Feed.Date>{timeAgo(createdAt)}</Feed.Date>
          </Feed.Content>
        </Feed.Event>
     </Feed>
      <Card
         fluid
         as={Link}
         to={`/posts/${id}`}
         image={shoes}
      />
      {extra}
      <hr/>
  </>

   )
}


export default Postcard;