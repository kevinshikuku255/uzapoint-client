import React from 'react';
import {useMutation} from '@apollo/client';
import {useHistory} from "react-router-dom";

import {GET_POSTS, DELETE_POST} from "../../graphql/post";
import {DELETE_COMMENT} from "../../graphql/comment";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';






function DeleteButton({id,commentId}){

 const history = useHistory()


//..................... dynamic muation ......................
const mutation = commentId ? DELETE_COMMENT :  DELETE_POST;
const _id = id || commentId;
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

 const backHome = () =>{
    if(id){
        history.push('/')
    }
 }

const hundleDelete = () => {
    deletePostOrCommentMutation();
    backHome();
}

 return(
  <>
        <button style={{backgroundColor:"#c25454"}} onClick={hundleDelete}>
         {loading ? "Deleting..." : data ? "Deleted" : "Delete"}
        </button>
  </>
   )
}
export default DeleteButton;