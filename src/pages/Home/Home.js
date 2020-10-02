import React from 'react'
import {useQuery}  from '@apollo/client'
import {Grid, Transition,  GridColumn } from "semantic-ui-react";
import { makeStyles } from '@material-ui/core/styles';



import {GET_POSTS} from "../../graphql/post";
import { useStore } from '../../store';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';
import SkeletonPost from "../../components/Skeleton";
import PostCard from "../../components/PostCard";



const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(10,0,0,0),
  }
}));

const Home = () =>{
  const classes = useStyles();
  const [{auth}] = useStore();
  const variables = {
    skip: 0,
    limit: HOME_PAGE_POSTS_LIMIT,
  };

 const { data,loading} = useQuery(GET_POSTS,{
    variables,
    });

if(loading){
   return (
      <div className={classes.skeleton}>
         <SkeletonPost />
      </div>
   )
}


if(!data && !loading ){
   return(
      <div className={classes.skeleton}>
         <SkeletonPost />
      </div>
   )
}
console.log(data)
 return (
    <Grid className={ auth.user ? "HomeGrid" : "HomeGridd"} inverted>
    <div style={
       {color:"black",
        position:"absolute",
        top:"0",
        left:"5vw",
        marginTop:"0.2rem",
        zIndex:"12", }
       }>
         <h3>{auth.user  ? "INDOSHOP" :""}</h3>
       </div>
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
    </Grid>
 )
}
export default Home;