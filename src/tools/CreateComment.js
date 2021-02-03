import React,{useState, useRef, useEffect} from 'react';
import { useMutation} from '@apollo/client';
import {Icon,Button, Modal } from 'semantic-ui-react';


import {CREATE_COMMENT} from "../graphql/comment";
import { GET_POST } from '../graphql/post';
import { useStore } from '../store';


import { makeStyles } from '@material-ui/core/styles';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';


const useStyles = makeStyles(() => ({
input:{
  border:"none",
  resize: "none",
  outline: "none",
  width:"100%",
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
    marginTop:"1rem",
    aligncontent: "flex-end",
    color:"black",
    backgroundColor:"#ededed",
    padding:"3px",
    borderRadius:"3px"
  },
 flex1:{
   width:"85%",
   overflowWrap:"break-word"
 },
flex2:{
   width:"15%",
 },
i:{
   color:"red",
   fontSize:"0.9rem"
 }
}));


/**
 * create comment tool
 */
function CreateComment({postId, comments}) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const commentInputRef = useRef(null)
  const [comment, setComment] = useState('');


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
     handleClose();

  };


useEffect(() => {
 data && !loading && setComment("")
},[data, loading])

const Input = (
  <>
      <TextareaAutosize
                rowsMin={3}
                placeholder="Reply ..."
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
  <div>
      <Modal
        size={"small"}
        open={open}
        onClose={handleClose}
        style={{marigin:0, padding:0}}
        trigger={<Button size="tiny" circular onClick={handleClickOpen}>
                    <Icon name="comment"/> { !data &&  loading  ? "sending"  :  comments}
                 </Button>}
      >
          <Modal.Content>
          <Modal.Actions>
          </Modal.Actions>
            <Modal.Description>
              {Input}
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <Button basic color='red' size="tiny"  onClick={handleClose}>
          <Icon name='remove' /> cancel
        </Button>
        {comment && <Button color='blue' size="tiny"  inverted onClick={handleSubmit}>
            <Icon name='checkmark'/> Send
          </Button>}
        </Modal.Actions>
      </Modal>
  </div>
 </>
 )
}

export default CreateComment
