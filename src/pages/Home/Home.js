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
    minWidth: "100vw",
    maxWidth:518,
    margin:"auto",
  },
  container:{
    margin: theme.spacing(0,-6,0,-7),
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
               <div key={post.id} style={{marginBottom:15}}>
                    <PostCard  post={post}/>
               </div>)}
      </Transition.Group>
   </CardContent>
</Card>
</div>












{/*

    <Grid className={ "HomeGridd"} inverted>
        <GridColumn mobile={16} tablet={10} computer={8} className="HomeGridColumn">
            <Grid.Row >
               <Transition.Group >
               { data && data.getPosts.posts.map( post =>
                  <Grid.Column key={post.id} style={{marginBottom:15}}  >
                     <PostCard  post={post}/>
                  </Grid.Column>
                  )}
               </Transition.Group>
            </Grid.Row>
        </GridColumn>
    </Grid> */}
</>
 )
}
export default Home;