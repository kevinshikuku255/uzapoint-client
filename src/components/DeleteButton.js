import React,{useState} from 'react';

import {Button, Confirm} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import {GET_POSTS, DELETE_POST} from "../graphql/post"
import {DELETE_COMMENT} from "../graphql/comment"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';






function DeleteButton({id, commentId, callback}){
const  [conFirmOpen, setConfirmOpen] = useState(false);

//..................... dynamic muation ......................
const mutation = commentId ? DELETE_COMMENT :  DELETE_POST;
 const [deletePostOrMutation] = useMutation(mutation,{
        variables:{
        id,
        commentId
        },
      update(proxy,result){
      if(callback) callback();
      if(!commentId){
          const data = proxy.readQuery({
                query: GET_POSTS, variables:{id}
         });

      data.getPosts = data.getPosts.filter(p => p.id !== id );
      proxy.writeQuery({ query:GET_POSTS, result});
      }
      setConfirmOpen(false);
    },
     onError(err){
         console.log(err)
         }
 });
 return(
  <>
    <Button as='div'
        size="big"
        className="Button"
        floated="right"
        onClick={()=> setConfirmOpen(true) }>
          <DeleteForeverIcon />
    </Button>

     <Confirm
       open={conFirmOpen}
       onCancel={()=>setConfirmOpen(false)}
       onConfirm={deletePostOrMutation}
      />
  </>
   )

}
export default DeleteButton;