import React from 'react';
import {useMutation} from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';

import {GET_POSTS, DELETE_POST} from "../../graphql/post";
import {DELETE_COMMENT} from "../../graphql/comment";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import Routes from "../../store/routes";
const useStyles = makeStyles((theme) => ({
  btn:{
    border:"none",
    outline:"none",
    borderRadius:"5px",
    padding:".2rem 1rem"
  }
}))




/** Delete button component */
function DeleteButton({id,commentId}){
 const {backHome}  = Routes();
 const classes = useStyles();



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
        <button style={{backgroundColor:"#c25454"}} className={classes.btn} onClick={hundleDelete}>
            {loading ? "Deleting..." : data ? "Deleted" : "Delete"}
        </button>
  </>
   )
}
export default DeleteButton;