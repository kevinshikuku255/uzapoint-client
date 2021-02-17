import React from 'react';
import {useMutation} from '@apollo/client';

import {GET_POSTS, DELETE_POST} from "../../graphql/post";
import {DELETE_COMMENT} from "../../graphql/comment";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import Routes from "../../store/routes";




/** Delete button component */
function DeleteButton({id,commentId}){
 const {backHome}  = Routes()



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


const hundleDelete = () => {
    deletePostOrCommentMutation();
    if(id){
        backHome();
    }
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