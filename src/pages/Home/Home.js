import React from 'react'
import {useQuery}  from '@apollo/client'
import {Transition} from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import {GET_POSTS} from "../../graphql/post";
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import SkeletonPost from "../../components/Skeleton";
import PostCard from "../../components/PostCard";



const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(10,0,0,0),
  },
    card: {
    maxWidth:550,
    margin: theme.spacing(2,-1.6,0,-0.6),
  },
  container:{
    margin: theme.spacing(-2,-6,0,-7),
  },
}));

const Home = () =>{
  const classes = useStyles();
  const variables = {
    skip: 0,
    limit: HOME_PAGE_POSTS_LIMIT,
  };

 const { data,loading} = useQuery(GET_POSTS,{
    variables,
    });


if(loading){
   return (

         <SkeletonPost />

   )
}
if(!data && !loading ){
   return(
       <SkeletonPost />
   )
}
 return (
<>

<div className={classes.card}>
  <Card className={classes.container}>
   <CardContent >
      <Transition.Group >
           { data && data.getPosts.posts.map( post =>
               <div key={post.id} style={{marginBottom:-30}}>
                    <PostCard  post={post}/>
               </div>)}
      </Transition.Group>
   </CardContent>
</Card>
</div>


</>
 )
}
export default Home;