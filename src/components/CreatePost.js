import React,{useState} from 'react';
import {Form, Input} from 'semantic-ui-react'
import {useMutation} from "@apollo/client"



import { useStore } from '../store';
import PostImageUpload from "./post_imageUpload";
import { MAX_POST_IMAGE_SIZE } from '../constants/ImageSize';
import {CREATE_POST, GET_POSTS} from "../graphql/post"
import Alert from '@material-ui/lab/Alert';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';







/**
 * create post component
 */
function PostForm(){
  const [{ auth }] = useStore();
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
 const [createPost, {error, loading }] = useMutation(CREATE_POST,{
    variables: values,
    onError(err){
      setErrors(err)
    },
    refetchQueries:[{query:GET_POSTS}]
});


const hadleTitleChangen = e => setTitle(e.target.value);
const handlePriceChange = e => setPrice(e.target.value);

  const handleSubmit = async (e) => {
     e.preventDefault();
     createPost();
     handleReset();
     setWarning("Sent sucessfully refresh home page to see the post.")

  };

 
  return(
  <>
    <Form onSubmit={ handleSubmit } id="postForm" className={loading ? "loading": ""} >
       <Form.Field >
         <TextareaAutosize
            aria-label="minimum height"
            placeholder="Describe your item"
            name='title'
            onFocus={handleOnFocus}
            onChange={hadleTitleChangen}
            value={values.title}
            error= {error} />
        {/* <Button type="submit"    color="black"  size="tiny"  circular> */}
           <button>
            {/* <Icon name="share" /> */}
            <SendRoundedIcon  className ="SubmitPostBtn"  />
            </button>
       {/* </Button> */}
       </Form.Field>
         <Input
          label="Ksh."
          labelPosition='left corner'
          placeholder='Price...'
          focus={isFocused}
          onFocus={handleOnFocus}
          value={values.price}
          onChange={handlePriceChange}
        />

      {
          (
            <>
          <PostImageUpload  label="Photo"  handleChange={handlePostImageUpload} />
           </>
            )
      }
    </Form>
    {errors  &&(
      <div className="ui error message" style={{marginBottom:20, }}>
          {errors.message}
      </div>
    )}
    { !errors && !loading && warning &&
      <div className="warning" style={{marginBottom:20}}>
           <Alert severity="success">{warning}</Alert>
      </div>}
  </>
  )
};


export default PostForm;