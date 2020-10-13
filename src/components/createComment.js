import React,{useState, useRef} from 'react';
import { useMutation} from '@apollo/client'
import { TransitionGroup} from 'semantic-ui-react';


import {HOME_PAGE_POSTS_LIMIT} from "../constants/DataLimit"
import {CREATE_COMMENT} from "../graphql/comment"
import {GET_POSTS} from "../graphql/post"
import { useStore } from '../store';
import DeleteButton from './DeleteButton';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';






const useStyles = makeStyles((theme) => ({
  form: {
    position:"fixed",
    top:"0",
    zIndex:"12",
    width:"50vw",
    margin: theme.spacing(2,0,0,20),
  },
  input:{
  border:"none",
  resize: "none",
  outline: "none",
  },
 addButton: {
    position: 'fixed',
    top:"0",
    right:"20vw",
    zIndex:"11",
    marginTop:"1rem"
  },
  comment:{
    display:"flex",
    flexDirection:"row",
    marginTop:"0.2rem",
    aligncontent: "flex-end",
    color:"gray",
  },
 flex1:{
   width:"85%",
   overflowWrap:"break-word"
 },
  flex2:{
   width:"15%",
 }
}));



function SinglePost({comments, match}){
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const postId = match.params.postId
  const [{auth}] = useStore()
  const user = auth.user
  const variables = {
      postId,
      comment,
      author: user.id
  };


  const [submitCommnet] = useMutation(CREATE_COMMENT,{
     variables,
     refetchQueries:[{query:GET_POSTS, variables:{
          skip: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
    }}]
  })


  const handleSubmit = async (e) => {
     e.preventDefault();
     submitCommnet();
     setComment("")
     handleClose()
  };


const Input = (
  <>
      <TextareaAutosize
                rowsMin={3}
                placeholder="Reply"
                name="comment"
                className={classes.input}
                autoFocus
                value={comment}
                ref={commentInputRef}
                onChange={ e => setComment(e.target.value)}
                />
  </>
      )

return (
    <>
        {user && ( <button onClick={handleClickOpen} className={classes.addButton}>
                <AddCommentRoundedIcon/>
                   </button>)}

          <Dialog
            open={open}
            onClose={handleClose}
            fullScreen={fullScreen}
          >
            <DialogContent >
                {Input}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                cancel
              </Button>
              <Button onClick={handleSubmit} color="primary" autoFocus disabled={!comment}>
                Send
              </Button>
            </DialogActions>
          </Dialog>

        <TransitionGroup>
          <div>
            {comments && comments.map( comment =>(
               <div key={comment.id} className={classes.comment}>
                  <div className={classes.flex1}>
                     {comment.comment}
                  </div>
                   {user && <div className={classes.flex2}>
                      {user.username === comment.author.username &&
                       <DeleteButton  commentId={comment.id}/> }
                  </div>}
               </div>
            ))}
          </div>
        </TransitionGroup>
    </>
      )
}



export default SinglePost;


















