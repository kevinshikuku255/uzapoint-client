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
import CircularProgress from '@material-ui/core/CircularProgress';




const useStyles = makeStyles((theme) => ({
flex:{
 display:"flex",
 flexDirection:"column",
 marginTop:"4.5rem",
maxWidth:518,
},
description:{
  flexGrow:"1",
  width:"100%",
  display:"flex",
  flexDirection:"row",
},
price:{
  flexGrow:"1",
},
actions:{
 flexGrow:"1",
 display:"flex",
 flexDirection:"row",
},
action:{
  flexGrow:'1',
  textAlign:"start",
},
textArea:{
  border:"none",
  outline:"none",
  resize:"none",
  flexGrow:'2',
},
previewBox:{
    margin:"auto",
    flexGrow:'1',
    textAlign:"center",
},
button:{
  marginTop:"0.8rem"
},
status:{
  textAlign:"center",
},
imgPreview:{
    width:"5rem",
    height:"5rem",
},
}))



/**
 * create post component
 */
function PostForm(){
  const [{ auth }] = useStore();
  const classes = useStyles();

  const [image, setImage] = useState(null);
  const [imgData, setImgData] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState('');
  const [warning, setWarning] = useState('');



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


/**
 * handles post image upload !
 */
 const handlePostImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size >= MAX_POST_IMAGE_SIZE) {
         throw new Error( `File size should be less then ${MAX_POST_IMAGE_SIZE / 3000000}MB`)
    }


   const preview = URL.createObjectURL(e.target.files[0])
   setImgData(preview);
   setImage(e.target.files[0]);
  };


/**
 * Handles change
 */
  const hadleTitleChangen = e => setTitle(e.target.value);
  const handlePriceChange = e => setPrice(e.target.value);

  const handleSubmit = async (e) => {
     e.preventDefault();
     createPost();
     setWarning("sent");
     handleReset();
  };

 const handleOnFocus = () =>{
      setIsFocused(true);
      setWarning('')
      setErrors('');
   };

 const handleReset = () => {
        setImage(null);
        setErrors('');
        setPrice('')
        setTitle('')
        setImgData(null)
  };

  return(
<>
               <div className={classes.flex}>
                  <div className={classes.description}>
                      {imgData &&   <div className={classes.previewBox}>
                          <img className={classes.imgPreview} src={imgData} alt="preview" />
                      </div>}
                      <TextareaAutosize
                          placeholder="Describe your item"
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
                        placeholder='Price in figures'
                        focus={isFocused}
                        onFocus={handleOnFocus}
                        value={values.price}
                        onChange={handlePriceChange}
                        className="priceInput"
                      />
                  </div>

                  <div className={classes.actions}>
                    <div className={classes.action}>
                        <PostImageUpload  label="Photo"  handleChange={handlePostImageUpload} />
                    </div>

                    <div className={classes.action}>
                        <button className={classes.button} onClick={ handleSubmit }>
                            {<SendRoundedIcon  className ="SubmitPostBtn"/> }
                        </button>
                    </div>
                  </div>
                </div>

                <div className={classes.status}>
                    {loading && <CircularProgress/>}
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
</>
  )
};


export default PostForm;