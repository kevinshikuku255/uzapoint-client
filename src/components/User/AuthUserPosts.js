import React from 'react';
import {useQuery}  from '@apollo/client';
import {Grid, Transition,  GridColumn } from "semantic-ui-react";

import {GET_USER_POSTS} from "../../graphql/user";
import Detail from "./Detail";

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';



/* ---------------useStyles---------------------------------------------------- */
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop:"4.5rem"
  },
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(5,0,0,0),
    overflow:"hidden",
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

    const {posts, count} = data.getUserPosts;

 return (
   <>
<Card className={classes.card}>
        <GridColumn>
            <Grid.Row >
               <Transition.Group >
                {posts.map( post =>
                  <Grid.Column key={post.id} style={{marginBottom:"-12px"}}>
                      <Detail count={count} post={post}/>
                  </Grid.Column>
                  )}
               </Transition.Group>
            </Grid.Row>
        </GridColumn>
</Card>
   </>
 )
}
export default UserPosts;