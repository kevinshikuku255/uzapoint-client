import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import image from "../shoes.jpeg"




const useStyles = makeStyles(() => ({
flex:{
  marginTop:"4.5rem",
  maxWidth: 558,
  display: "flex",
  flexWrap: "wrap",
  justifyContent:"center",
},
flexItem:{
  backgroundColor: "#f1f1f1",
  maxWidth: "100px",
  maxHeight: "100px",
  margin:"1px",
  textalign:" center",
},
img:{
  width:"100%",
  height:"100%",
}
}));

const  UserPosts = ({posts}) =>{
const classes = useStyles();

 return (
   <>
      <div className={classes.flex}>
        {posts.map((post,index) => (
            <div className={classes.flexItem} key={index}>
                  <img src={image} alt={post.id} className={classes.img} />
            </div>
        ))}
      </div>
   </>
 )
}

export default UserPosts;



