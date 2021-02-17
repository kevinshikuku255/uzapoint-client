import React,{useState} from 'react';
import {useMutation} from "@apollo/client"
import  "./createPost.css";

import { useStore } from '../../store';
import PostImageUpload from "./PostImageUpload";

import { MAX_POST_IMAGE_SIZE } from '../../constants/ImageSize';
import {CREATE_POST, GET_POSTS} from "../../graphql/post";
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
  const [image, setImage] = useState(null);
  const [imgData, setImgData] = useState(null);

  const [values, setValues] = useState({title:"", description:"", price:"" ,crossedPrice:"", image, authorId: auth.user.id});


  const [errors, setErrors] = useState('');
  const [warning, setWarning] = useState('');



 const [createPost, { loading }] = useMutation(CREATE_POST,{
    variables: values,
      onError(err){
      setErrors(err)
    },
    refetchQueries:[
      { query:GET_POSTS, variables:{
          skip: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
       }},
      { query:GET_AUTH_USER}
       ]
});


/** handles post image upload ! */
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


  const hundleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value});
 };




  const handleSubmit = async (e) => {
     e.preventDefault();
     createPost();
     setWarning("Item displayed!");
     handleReset();
  };

 const handleOnFocus = () =>{
      setWarning('')
      setErrors('');
   };

 const handleReset = () => {
        setImage(null);
        setErrors('');
        setValues({})
        setImgData(null)
  };

 const resetImg = () => {
   setImage(null)
   setImgData(null)
 }

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
           {imgData && (

           <>
            <div  className="image_preview">
               <img  src={imgData} alt="preview" />
            </div>
            <div className="floating_button">
              <p onClick={resetImg} className="p" > <Close/> </p>
            </div>
           </>
           )}

  <div className="post_description">

       <div>
          <TextareaAutosize
            placeholder="Name"
            name="title"
            rows="1"
            onChange={hundleChange}
            onFocus={handleOnFocus}
            value={values.title}
            className="title"
          />
       </div>

        <div >
           <TextareaAutosize
               placeholder="Describe your item"
               rowsMin={2}
               name='description'
               onFocus={handleOnFocus}
               onChange={hundleChange}
               value={values.description}
               className="description"
               />
       </div>
   </div>

       <div className="price_input">
           <input
             placeholder='Current price'
             name="price"
             onFocus={handleOnFocus}
             value={values.price}
             onChange={hundleChange}
             className="priceInput"
           /> <br/>
           <input
             placeholder='price before'
             name="crossedPrice"
             onFocus={handleOnFocus}
             value={values.crossedPrice}
             onChange={hundleChange}
             className="priceInput"
           />
           <PostImageUpload  label="Photo"  handleChange={handlePostImageUpload} />
       </div>

       <div className="">

         <div className="">
             <button className="" onClick={ handleSubmit }>
                 Display
             </button>
         </div>
       </div>
     </div>
 </form>
)

const error = (
  <div className="display_item_error">
    {errors.message}
  </div>
)


const alert = (
  <div className="display_item_alert" >
    {warning}
  </div>
)

  return(
<>

   {loading ? loader : form}
   {errors && error}
   {!error && !loading && alert}

</>
  )
};
export default PostForm;