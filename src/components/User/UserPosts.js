import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Detail from "./Detail"





const useStyles = makeStyles(() => ({

flex:{
  marginTop:"4.5rem",
  maxWidth: 558,
  display: "flex",
  flexWrap: "wrap",
  overflow:"hidden",
  justifyContent:"center",
},

}));

const  UserPosts = ({posts}) =>{
const classes = useStyles();

 return (
   <>
      <div className={classes.flex}>
        {posts.map((post) => (
            <div key={post.id}>
               <Detail post={post}/>
            </div>
        ))}
      </div>
   </>
 )
}

export default UserPosts;