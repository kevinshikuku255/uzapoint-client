import React,{useState} from 'react';
import {Input} from 'semantic-ui-react'
import {useMutation} from "@apollo/client"

import { HOME_PAGE_POSTS_LIMIT } from '../constants/DataLimit';
import { useStore } from '../store';
import PostImageUpload from "./post_imageUpload";
import { MAX_POST_IMAGE_SIZE } from '../constants/ImageSize';
import {CREATE_POST, GET_POSTS} from "../graphql/post"
import Alert from '@material-ui/lab/Alert';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import {makeStyles} from "@material-ui/core";
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
textArea:{
  border:"none",
  outline:"none",
  resize:"none",
  minWidth:"100%",

},
input:{
  border:"none",
  outline:"none",
  backgraund:"none",
  minWidth:"100%",
},
card: {
    minWidth: 300,
    maxWidth:518,
    margin:"auto",
    marginTop:"-2rem",
  },
flex:{
 display:"flex",
 flexDirection:"column",
},
description:{
  flexGrow:"1",
},
price:{
},
actions:{
 flexGrow:"1",
 display:"flex",
 flexDirection:"row",
},
action:{
  flexGrow:'1',
  textAlign:"center",
},
button:{
  marginTop:"0.8rem"
},
status:{
  textAlign:"center",
}
}))



/**
 * create post component
 */
function PostForm(){
  const [{ auth }] = useStore();
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState('');
  const [warning, setWarning] = useState('');



 const handleReset = () => {
    setTitle('');
    setImage('');
    setErrors('');
    setPrice('')
  };

const handleOnFocus = () =>{
   setIsFocused(true);
   setWarning("")}


/**
 * handles post image upload !
 */
 const handlePostImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size >= MAX_POST_IMAGE_SIZE) {
         throw new Error( `File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`)
    }

    setImage(file);
    e.target.value = null;
  };




 const values = { title, image, price, authorId: auth.user.id };
 const [createPost, {loading }] = useMutation(CREATE_POST,{
    variables: values,
    onError(err){
      setErrors(err)
    },
    refetchQueries:[{query:GET_POSTS, variables:{
          skip: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
    }}]
});


  const hadleTitleChangen = e => setTitle(e.target.value);
  const handlePriceChange = e => setPrice(e.target.value);

  const handleSubmit = async (e) => {
     e.preventDefault();
     createPost();
     handleReset();
     setWarning("sent")
  };


  return(
  < div className={classes.container}>
<Card className={classes.card}>
    <form onSubmit={ handleSubmit } id="postForm"  >

      <div className={classes.flex}>
        <div className={classes.description}>
            <TextareaAutosize
                placeholder="describe your item"
                rowsMin={3}
                name='describe your item to help people understand what you are selling'
                onFocus={handleOnFocus}
                onChange={hadleTitleChangen}
                value={values.title}
                className={classes.textArea}
                />
        </div>
        <div className={classes.price}>
            <Input
              placeholder='price...'
              focus={isFocused}
              onFocus={handleOnFocus}
              value={values.price}
              onChange={handlePriceChange}
              className={classes.input}
            />
        </div>
        <div className={classes.actions}>
           <div className={classes.action}>
              <PostImageUpload  label="Photo"  handleChange={handlePostImageUpload} />
           </div>
           <div className={classes.action}>
              <button className={classes.button}>
                  {<SendRoundedIcon  className ="SubmitPostBtn"/> }
              </button>
           </div>
        </div>
      </div>
    </form>
</Card>
    <div className={classes.status}>
        {loading && <CircularProgress />}
    {errors  && (
      <div className="ui error message" style={{marginBottom:20, }}>
          {errors.message}
      </div>
    )}
     {!errors && !loading && warning &&
      <div className="warning" style={{marginBottom:20}}>
           <Alert severity="success">{warning}</Alert>
      </div>}

    </div>
  </div>
  )
};


export default PostForm;