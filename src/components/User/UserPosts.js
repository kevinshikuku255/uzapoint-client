import React from 'react'
import {useQuery}  from '@apollo/client';

import { makeStyles } from '@material-ui/core/styles';
import {Grid, Transition,  GridColumn } from "semantic-ui-react";
import Card from '@material-ui/core/Card';
import Detail from "./Detail"

import {GET_USER_POSTS} from "../../graphql/user";
import { useStore } from '../../store';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
/* -------------------------------------------------------------------------- */
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(5,0,0,0),
    overflow:"hidden",
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
     margin: theme.spacing(8,-1.5,0,-1.5),
},
root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop:"4.5rem"
  },
/* -------------------------------------------------------------------------- */
}));



const  UserPosts = () =>{
const classes = useStyles();
 const [{auth}] = useStore();
 const username = auth.user.username;
const { data,loading} = useQuery(GET_USER_POSTS,{
    variables:{
      username,
      skip:0,
      limit:100
    },
  fetchPolicy:"cache-and-network"
});

  const spiner =   <div className={classes.root}>
                    <CircularProgress disableShrink />
                  </div>
  if(loading){ return spiner }

  const posts = data.getUserPosts.posts;


 return (
   <>
<Card className={classes.card}>
        <GridColumn>
            <Grid.Row >
               <Transition.Group >
                {posts.map( post =>
                  <Grid.Column key={post.id} style={{marginBottom:"-12px"}}>
                      <Detail post={post}/>
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