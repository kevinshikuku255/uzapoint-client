import React,{useState} from 'react';
import {Form, Button, Icon, Input} from 'semantic-ui-react'
import {useMutation} from "@apollo/client"



import { useStore } from '../store';
import PostImageUpload from "./post_imageUpload";
import { HOME_PAGE_POSTS_LIMIT } from '../constants/DataLimit';
import { MAX_POST_IMAGE_SIZE } from '../constants/ImageSize';
import { useGlobalMessage } from '../hooks/useGlobalMessage';
import { GET_POSTS} from  "../graphql/post"
import {CREATE_POST} from "../graphql/post"
import Alert from '@material-ui/lab/Alert';


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
  const message = useGlobalMessage();


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
 *
 * handles post image upload !
 */
 const handlePostImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size >= MAX_POST_IMAGE_SIZE) {
      message.error(
        `File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`
      );
      return;
    }
    setImage(file);
    e.target.value = null;
  };




 const values = { title, image, price, authorId: auth.user.id };
 const variables = {
    skip: 0,
    limit: HOME_PAGE_POSTS_LIMIT,
  };
 const [createPost, {error, loading }] = useMutation(CREATE_POST,{
   update(proxy, {data}){
    try{
      const {getPosts} = proxy.readQuery({
        query:GET_POSTS,
        variables
      });
    if(getPosts && getPosts !== null | undefined){
      proxy.writeQuery({
        query:GET_POSTS,
        data:{
           getPosts:{
             posts:[...getPosts.posts, data.createPost ]
           }
        }
      })
 }
    }catch(err){
      throw new Error(err)
    }
   },
    variables: values,
    onError(err){
    setErrors(err)
    }
});


const hadleTitleChangen = e => setTitle(e.target.value);
const handlePriceChange = e => setPrice(e.target.value);

  const handleSubmit = async (e) => {
     e.preventDefault();
     createPost();
     handleReset();
     setWarning("Sent sucessfully...")

  };

  const isShareDisabled = loading || (!loading && !image && !title);
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
        <Button type="submit" disabled={isShareDisabled}  className ="SubmitPostBtn" color="blue"  size="tiny"  circular>
            <Icon name="share"/>
       </Button>
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
    {errors && (
      <div className="ui error message" style={{marginBottom:20}}>
         <ul className="list">
           <li>{errors.message}</li>
         </ul>
      </div>
    )}
    { !errors && !loading && warning && <div className="warning" style={{marginBottom:20}}>
         <ul className="list">
           <Alert severity="success">{warning}</Alert>
         </ul>
      </div>}
  </>
  )
};


export default PostForm;