import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Detail from "./Detail"





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
}
}));

const  UserPosts = ({posts}) =>{
const classes = useStyles();

 return (
   <>
      <div className={classes.flex}>
        {posts.map((post) => (
            <div className={classes.flexItem} key={post.id}>
               <Detail post={post}/>
            </div>
        ))}
      </div>
   </>
 )
}

export default UserPosts;