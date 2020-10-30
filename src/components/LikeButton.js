import React from 'react';
import {Link} from 'react-router-dom';
import {useMutation} from "@apollo/client";
import { Icon, Button } from "semantic-ui-react";
import { useStore } from '../store';

import { CREATE_LIKE, DELETE_LIKE } from '../graphql/like';
import { GET_POST } from '../graphql/post';


function LikeButton( { user, postId, likes} ){

      const  [{auth}]  = useStore();

      const hasLiked = likes.find(
        l => l.user === auth.user.id && l.post === postId
      );


//..............Detect which mutation to use...............................//
  const operation = hasLiked ? 'delete' : 'create';
  const options = {
    create: {
      mutation: CREATE_LIKE,
      variables: { postId, userId: auth.user.id },
    },
    delete: {
      mutation: DELETE_LIKE,
      variables: { id: hasLiked ? hasLiked.id : null },
    },
  };

const [createLike, {data, loading}] = useMutation(options[operation].mutation,{
      variables: { ...options[operation].variables},
      refetchQueries:[{query:GET_POST, variables:{
          id:postId
    }}]
})



//..........................button logic ........................................//
let likeButton;

  likeButton = auth.user ? (
      hasLiked || (loading && !data) ? (
        <Button color="teal"  size="tiny" onClick={createLike} circular>
              <Icon name="thumbs up outline"/> {likes.length}
        </Button>
      ):(
        <Button color="teal" basic size="tiny" onClick={createLike} circular>
              <Icon name="thumbs up outline" /> {likes.length}
        </Button>
      )
  ):(
      <Button as={Link} to='/login' color="teal" basic size="tiny" circular>
          <Icon name="thumbs up outline"/> {likes.length}
      </Button>
  )

    return(
    <>
      {likeButton}
    </>
    )
}
export default LikeButton;