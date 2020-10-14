import React from 'react'
import {useQuery}  from '@apollo/client'

import {GET_USER_POSTS} from "../../graphql/user"
import image from "../shoes.jpeg"

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';





const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop:"4.5rem"
  },
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


const  UserPosts = ({username}) => {
 const classes = useStyles();


  const { data,loading} = useQuery(GET_USER_POSTS,{
      variables:{
        username,
        skip:0,
        limit:100
      },
  });

   const spiner =   <div className={classes.root}>
                      <CircularProgress disableShrink />
                    </div>
    if(loading){ return spiner }

    const posts = data.getUserPosts.posts;

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



