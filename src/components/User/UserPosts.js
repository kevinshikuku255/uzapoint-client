import React from 'react'
import {useQuery}  from '@apollo/client'

import {GET_USER_POSTS} from "../../graphql/user"
import image from "../shoes.jpeg"

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListSubheader from '@material-ui/core/ListSubheader';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    marginTop:"4rem"
  },
  gridList: {
    width: 600,
  },
    i: {
      color:"black",
      fontSize: "small",
      zIndex:"10"
  }
}));


const  UserPosts = () =>{
const classes = useStyles();
const pathname = window.location.pathname;
const username = pathname.split("/")[2]

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
    if(loading){
      return spiner
       }
    const posts = data.getUserPosts.posts;

 return (
   <>
<div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
           <ListSubheader component="div">{username}</ListSubheader>
        </GridListTile >
        {posts.map((post) => (
          <GridListTile key={post.id}>
            <img src={image} alt={post.id} />
            <GridListTileBar
              title={`Ksh. ${post.price}`}
            />
          </GridListTile>
        ))}
      </GridList>
    </div>

   </>
 )
}

export default UserPosts;



