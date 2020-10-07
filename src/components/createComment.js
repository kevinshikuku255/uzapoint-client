import React,{useState, useRef} from 'react';
import { useMutation} from '@apollo/client'
import { TransitionGroup,  List,  } from 'semantic-ui-react';


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
}));



function SinglePost({comments, match}){
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };




  const postId = match.params.postId
  const [{auth}] = useStore()
  const user = auth.user
  const commentInputRef = useRef(null)
  const [comment, setComment]= useState('');
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
                aria-label="minimum height"
                rowsMin={3} 
                autoFocus
                placeholder="Reply"
                name="comment"
                className={classes.input}
                value={comment}
                ref={commentInputRef}
                onChange={ e => setComment(e.target.value)}
                />
  </>
      )

return (
    <>
  {user && (
    <div>

        <button variant="outlined" color="primary" onClick={handleClickOpen} className={classes.addButton}>
            <AddCommentRoundedIcon/>
        </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
             {Input}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>

        <TransitionGroup>
        <List divided relaxed>
        {comments && comments.map(comment => (
            <List.Item key={comment.id}>
          <List.Content>
            <List.Header className="PostComment">{comment.comment}</List.Header>
            <List.Description >
                  {user && user.username === comment.author.username &&
                  <DeleteButton  commentId={comment.id}/> }
            </List.Description>
          </List.Content>
        </List.Item>
        ))}
        </List>
    </TransitionGroup>
    </div>
  )}






























       {/* {user && (  <>
               <div className={classes.form}>
                      <div>
                          <button type="submit"  className="CommentBtn"  onClick={()=> setConfirmOpen(true)}>
                            <SendRoundedIcon/>
                          </button>
                      </div>
                </div>

                <Confirm
                  open={conFirmOpen}
                  header='Reply on the post'
                  content={Input}
                  cancelButton='cancel'
                  confirmButton={<SendRoundedIcon/>}
                  centered
                  onCancel={()=>setConfirmOpen(false)}
                  onConfirm={handleSubmit}
                  />

                  <TransitionGroup>
                      <List divided relaxed>
                      {comments && comments.map(comment => (
                          <List.Item key={comment.id}>
                        <List.Content>
                          <List.Header className="PostComment">{comment.comment}</List.Header>
                          <List.Description >
                                {user && user.username === comment.author.username &&
                                <DeleteButton  commentId={comment.id}/> }
                         </List.Description>
                        </List.Content>
                      </List.Item>
                      ))}
                      </List>
                  </TransitionGroup>


                  </>
                  )} */}
    </>
      )
}



export default SinglePost;


















