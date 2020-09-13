import React,{useState} from 'react';
import {Form, Button, Icon, Input, TextArea} from 'semantic-ui-react'
import {useMutation} from "@apollo/client"


import { useStore } from '../store';
import PostImageUpload from "./post_imageUpload";
import { HOME_PAGE_POSTS_LIMIT } from '../constants/DataLimit';
import { MAX_POST_IMAGE_SIZE } from '../constants/ImageSize';
import { useGlobalMessage } from '../hooks/useGlobalMessage';
import { GET_FOLLOWED_POSTS} from  "../graphql/post"
import {CREATE_POST} from "../graphql/post"




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
    userId: auth.user.id,
    skip: 0,
    limit: HOME_PAGE_POSTS_LIMIT,
  };
 const [createPost, {error, loading }] = useMutation(CREATE_POST,{
   update(proxy, result){
      const data = proxy.readQuery({
        query:GET_FOLLOWED_POSTS,
        variables
      })
      console.log(data)
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
       <Form.Field className="FormFiled">
          <TextArea
             name='title'
             onFocus={handleOnFocus}
             onChange={hadleTitleChangen}
             value={values.title}
             error= {error}
          />
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
          <PostImageUpload
            label="Photo"
            handleChange={handlePostImageUpload}
          />

            <Button  type="button" onClick={handleReset}>
              Cancel
            </Button>
            <Button disabled={isShareDisabled} type="submit">
              Share
            </Button>
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
           {warning}
         </ul>
      </div>}
  </>
  )
};


export default PostForm;