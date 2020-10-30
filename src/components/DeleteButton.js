import React from 'react';
// import {Confirm} from 'semantic-ui-react';
import {useMutation} from '@apollo/client';

import {GET_POSTS, DELETE_POST} from "../graphql/post";
import {DELETE_COMMENT} from "../graphql/comment";
import { HOME_PAGE_POSTS_LIMIT } from '../constants/DataLimit';

import { Button, Header, Icon, Modal } from "semantic-ui-react"





function DeleteButton({id,commentId}){
  const [open, setOpen] = React.useState(false)

//..................... dynamic muation ......................
const mutation = commentId ? DELETE_COMMENT :  DELETE_POST;
const _id = id || commentId
 const [deletePostOrCommentMutation, {loading, data}] = useMutation(mutation,{
    variables:{
        id: _id
        },
    refetchQueries:[
            {query:GET_POSTS,
             variables:{ skip: 0, limit: HOME_PAGE_POSTS_LIMIT} },
            ],
     onError(err){
         console.log(err)
         }
 });
 return(
  <>
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<Button color="pink" size="tiny" circular>Delete</Button>}
    >
      <Header>
        Confirm You want to Delete
      </Header>
      <Modal.Content>
         <p>
         {id ? "Your Item will be pamanently deleted" : "Your comment will be pamanetly deleted"}
        </p>
      </Modal.Content>
      <Modal.Actions>
      { !loading && !data && <Button basic color='green' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>}
        <Button color='red' inverted onClick={deletePostOrCommentMutation}>
          <Icon name='checkmark' />{loading ? "deleting..." : data ? "deleted" : "delete"}
        </Button>
      </Modal.Actions>
    </Modal>
  </>
   )
}
export default DeleteButton;