import React,{useState, useRef, useEffect} from 'react';
import { useMutation} from '@apollo/client';
import './createComment.css';


import {CREATE_COMMENT} from "../../graphql/comment";
import { GET_POST } from '../../graphql/post';
import { useStore } from '../../store';



import TextareaAutosize from '@material-ui/core/TextareaAutosize';



/**
 * create comment component
 */
function CreateComment({postId, comments}) {
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState('');


/* -------------------------------------------------------------------------- */

  const [{auth}] = useStore()
  const user = auth.user
  const variables = {
      postId,
      comment,
      author: user.id
  };

  const [submitCommnet,{ loading, data}] = useMutation(CREATE_COMMENT,{
     variables,
     refetchQueries:[
       {query:GET_POST, variables:{
          id:postId
    }}]
  });

  const handleSubmit = async (e) => {
     e.preventDefault();
     submitCommnet();
     setComment("")

  };


useEffect(() => {
 data && !loading && setComment("")
},[data, loading])


 return (
  <>
    {user &&
        <div>
            <div className="formDescription">
              <p>Create Comment:</p>
            </div>
            <form onSubmit={handleSubmit} className="form">
                <TextareaAutosize
                          rowsMin={3}
                          placeholder="comment/review the product"
                          name="comment"
                          className="input"
                          value={comment}
                          ref={commentInputRef}
                          onChange={ e => setComment(e.target.value)}
                          />
            <button disabled={!comment ? true : false}>
              {loading ? "Sending..." : data ? "Sent!" : "Send"}
            </button>
            </form>
        </div>
    }
 </>
 )
}

export default CreateComment;
