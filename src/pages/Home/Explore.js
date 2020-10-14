import React from 'react'
import {useQuery}  from '@apollo/client'
import {Grid, Transition,  GridColumn } from "semantic-ui-react"


import {GET_POSTS} from "../../graphql/post"
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import SkeletonPost from "../../components/Skeleton"
import PostCard from "../../components/PostCard";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(5,-1.7,0,-1.7),
  },
  authCard: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(5,-1.7,0,-1.7),
  },
  media: {
    height: 190,
  },
skeleton:{
     margin: theme.spacing(7,-1.5,0,-1.5),
}
}));


const Expolore = () =>{
   const classes = useStyles();
  const variables = {
    skip: 0,
    limit: HOME_PAGE_POSTS_LIMIT,
  };

 const { data,loading} = useQuery(GET_POSTS, {variables});

if(loading){
   return <div className={classes.skeleton}><SkeletonPost/></div>
}


if( !loading && !data){
   return<div className={classes.skeleton}><SkeletonPost/></div>
}


const { posts} = data.getPosts
 return (
<>
<Card className={classes.card}>

        <GridColumn>
            <Grid.Row >
               <Transition.Group >
               { data && posts.map( post =>
                  <Grid.Column key={post.id} style={{marginBottom:"-12px"}} u >
                     <PostCard  post={post}/>
                  </Grid.Column>
                  )}
               </Transition.Group>
            </Grid.Row>
        </GridColumn>

</Card>

</>
 )
}
export default Expolore;