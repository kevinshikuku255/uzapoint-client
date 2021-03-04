import React from 'react';
import {useHistory} from 'react-router-dom';
import {useMutation} from "@apollo/client";
import { useStore } from '../../store';
import { makeStyles } from '@material-ui/core/styles';

import { CREATE_LIKE, DELETE_LIKE } from '../../graphql/like';
import { GET_POST } from '../../graphql/post';
const useStyles = makeStyles((theme) => ({
  btn:{
    border:"none",
    outline:"none",
    borderRadius:"5px",
    padding:".3rem 1rem"
  }
}))

/** Like buton that performs like and unlike */
function LikeButton( { postId, likes} ){
      const  [{auth}]  = useStore();
      const history = useHistory();
        const classes = useStyles();

      const toSigup = () =>{
          history.push(`/signup`)
      }


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
      <>
        <p style={{textAlign:"center"}}>
          <button className={classes.btn} style={{ backgroundColor:"skyblue"}} onClick={createLike} > Liked </button>
        </p>

      </>
      ):(
       <>
        <p style={{textAlign:"center"}}>
           <button onClick={createLike} className={classes.btn} style={{ backgroundColor:"gray"}}>Like</button>
        </p>
       </>
      )
  ):(
   <>
    <p> <button onClick={toSigup} className={classes.btn} style={{ backgroundColor:"gray"}}> Like </button> </p>
   </>
  )

    return(
    <>
      {likeButton}
    </>
    )
}
export default LikeButton;