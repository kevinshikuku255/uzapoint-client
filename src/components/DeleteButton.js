import React,{useState} from 'react';

import {makeStyles} from "@material-ui/core"
import {Confirm} from 'semantic-ui-react'
import {useMutation} from '@apollo/client'
import {GET_POSTS, DELETE_POST} from "../graphql/post"
import {DELETE_COMMENT} from "../graphql/comment"
import CloseSharpIcon from '@material-ui/icons/CloseSharp';


const useStyles = makeStyles( () => ({
   button:{
      floated:"right",
   }
}))



function DeleteButton({id, commentId, callback}){
const classes = useStyles();
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

    <button onClick={()=> setConfirmOpen(true)}  className={classes.button}>
      <CloseSharpIcon className={classes.icon}/>
    </button>
     <Confirm
       open={conFirmOpen}
       content="confirm you want to delete"
       onCancel={()=>setConfirmOpen(false)}
       onConfirm={deletePostOrMutation}
      />
  </>
   )

}
export default DeleteButton;