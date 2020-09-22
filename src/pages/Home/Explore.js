import React from 'react'
import {useQuery}  from '@apollo/client'
import {Grid, Transition,  GridColumn } from "semantic-ui-react"


import {GET_POSTS} from "../../graphql/post"
import { useStore } from '../../store';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import SkeletonPost from "../../components/Skeleton"
import PostCard from "../../components/PostCard";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';


const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(5,0,0,0),
  },
  authCard: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(10,0,0,0),
  },
  media: {
    height: 190,
  },
}));


const Expolore = () =>{
   const classes = useStyles();
  const [{auth}] = useStore()
  const variables = {
    skip: 0,
    limit: HOME_PAGE_POSTS_LIMIT,
  };

 const { data,loading} = useQuery(GET_POSTS, {variables});

if(loading){
   return <SkeletonPost/>
}


if( !loading && !data){
   return(
      <>
      <SkeletonPost/>
      </>
   )
}
const { posts} = data.getPosts
 return (
<>
<Card className={ auth.user ? classes.authCard : classes.card}>

        <GridColumn>
            <Grid.Row >
               <Transition.Group >
               { data && posts.map( post =>
                  <Grid.Column key={post.id} style={{marginBottom:10}}  >
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