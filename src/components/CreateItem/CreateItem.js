import React,{useState} from 'react';
import {useMutation} from "@apollo/client"
import  "./createPost.css";

import { useStore } from '../../store';
import PostImageUpload from "./PostImageUpload";

import { MAX_POST_IMAGE_SIZE } from '../../constants/ImageSize';
import {CREATE_POST,GET_PAGINATED_POSTS} from "../../graphql/post";
import {GET_AUTH_USER} from '../../graphql/user';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CircularProgress from '@material-ui/core/CircularProgress';
import Close from '@material-ui/icons/Close';






/**
 * create post component
 */
function PostForm(){
  const [{ auth }] = useStore();
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [crossedPrice, setCrossedPrice] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState('');
  const [warning, setWarning] = useState('');


   const handleReset = () => {
    setTitle('');
    setImage('');
    setErrors('');
    setPrice('');
    setCrossedPrice('');
    setDescription('')
  };



/** handles post image upload ! */
 const handlePostImageUpload = e => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size >= MAX_POST_IMAGE_SIZE) {
            throw new Error( `File size should be less then ${MAX_POST_IMAGE_SIZE / 3000000}MB`)
        }
      previewFile(file)
  };

const previewFile = (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
      setImage(reader.result);
      }
}

const values = { title, description, price ,crossedPrice, image, authorId: auth.user.id}

 const [createPost, { loading }] = useMutation(CREATE_POST,{
    variables: values,
      onError(err){
      setErrors(err)
    },
    refetchQueries:[
      { query:GET_PAGINATED_POSTS, variables:{
          after: null,
          limit: HOME_PAGE_POSTS_LIMIT,
       }},
      { query:GET_AUTH_USER}
       ]
});

const hadleTitleChangen = e => setTitle(e.target.value);
const handlePriceChange = e => setPrice(e.target.value);
const handleCrossedPriceChange = e => setCrossedPrice(e.target.value);
const handleDescriptionChnage = e => setDescription(e.target.value)


const handleSubmit = async (e) => {
    e.preventDefault();
    createPost();
    handleReset();
    setWarning("Item displayed successfully!");
};

/** Loading spinnner */
  let loader;
  if(loading){
    return loader = (
      <div className="display_item_loader">
        <CircularProgress/>
        <h1>Displaying your item ...</h1>

      </div>
    )
  }

/** Display item form */
const form = (
 <form onSubmit={handleSubmit}>

    <div className="create_post_wrapper">
           {image && (

           <>
            <div  className="image_preview">
               <img  src={image} alt="preview" />
            </div>
            <div className="floating_button">
              <p onClick={ () => setImage("") } className="p" > <Close/> </p>
            </div>
           </>
           )}

  <div className="post_description">

       <div>
          <TextareaAutosize
            placeholder="Name"
            name="title"
            rows="1"
            onChange={hadleTitleChangen}
            value={values.title}
            className="title"
          />
       </div>

        <div >
           <TextareaAutosize
               placeholder="Describe your item"
               rowsMin={2}
               name='description'
               onChange={handleDescriptionChnage}
               value={values.description}
               className="description"
               />
       </div>
   </div>

       <div className="price_input">
           <input
             placeholder='price'
             name="price"
             value={values.price}
             onChange={handlePriceChange}
             className="priceInput"
           /> <br/>
           <input
             placeholder='price before'
             name="crossedPrice"
             value={values.crossedPrice}
             onChange={handleCrossedPriceChange}
             className="priceInput"
           />
           <PostImageUpload  label="Photo"  handleChange={handlePostImageUpload} />
       </div>

         <div className="displayBtn">
             <button onClick={ handleSubmit }>
                 Display
             </button>
         </div>
     </div>
 </form>
)

const error = (
  <div className="display_item_error">
    {errors.message}
  </div>
)


const message = (
  <div className="display_item_alert" >
    {warning}
  </div>
)

  return(
<>

   {loading ? loader : form}
   {errors && error}
   {warning &&  message}

</>
  )
};
export default PostForm;