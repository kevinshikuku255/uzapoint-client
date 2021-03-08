import React,{useState, useRef, useEffect} from 'react';
import { useMutation} from '@apollo/client';
import './createComment.css';
import {CREATE_COMMENT} from "../../graphql/comment";
import { GET_POST } from '../../graphql/post';
import { useStore } from '../../store';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  btn:{
    border:"none",
    outline:"none",
    borderRadius:"5px",
    padding:".2rem 1rem"
  }
}))

/**
 * create comment component
 */
function CreateComment({postId}) {
  const commentInputRef = useRef(null);
   const classes = useStyles();
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
    update(cache,{data}){
      //add new data to existing data
      const newComment = data?.createComment
      const existingComments = cache.readQuery({
        query:GET_POST,
        variables:{
          id:postId
        }
      });
      cache.writeQuery({
        query:GET_POST,
        variables:{
          id:postId
        },
        data:{
          getPost:{
              comments:[
                ...existingComments?.getPost.comments,
                newComment
          ]
          }
        }
      })
    }
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
            <button disabled={!comment ? true : false} className={classes.btn}  >
              {loading ? "Sending..." : data ? "Sent!" : "Send"}
            </button>
            </form>
        </div>
    }
 </>
 )
}

export default CreateComment;
