import React from 'react'
import {Link} from 'react-router-dom'
import { Icon, Button } from "semantic-ui-react"
import { useStore } from '../store';

// import { CREATE_LIKE, DELETE_LIKE } from '../graphql/like';

function LikeButton( { user, postId, likes} ){
      // const [liked] = useState(false);
      const  [{auth}]  = useStore();

      const hasLiked = likes.find(
        l => l.user === auth.user.id && l.post === postId
      );


  // Detect which mutation to use
  // const operation = hasLiked ? 'delete' : 'create';
  // const options = {
  //   create: {
  //     mutation: CREATE_LIKE,
  //     variables: { postId, userId: auth.user.id },
  //   },
  //   delete: {
  //     mutation: DELETE_LIKE,
  //     variables: { id: hasLiked ? hasLiked.id : null },
  //   },
  // };







//...........................................button logic ...................
 const likeButton = user ? (
     hasLiked ? (
       <Button color="teal"  size="tiny" onClick={"j"} circular>
            <Icon name="thumbs up outline"/>
       </Button>
     ):(
       <Button color="teal" basic size="tiny" circular>
            <Icon name="thumbs up outline" />
       </Button>
     )
 ):(
    <Button as={Link} to='/login' color="teal" basic size="tiny" circular>
        <Icon name="thumbs up outline"/>
    </Button>
 )

  return(
  <>
    {likeButton}
  </>
  )

}

export default LikeButton;









