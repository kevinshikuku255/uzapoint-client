import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import image from "../shoes.jpeg"




const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    marginTop:"5rem"
  },
  gridList: {
    width: 600,
  },
}));


const  UserPosts = ({posts}) =>{
const classes = useStyles();



 return (
   <>
      <div className={classes.root}>
            <GridList cellHeight={180} className={classes.gridList}>
              {posts.map((post) => (
                <GridListTile key={post.id}>
                  <img src={image} alt={post.id} />
                  <GridListTileBar title={`Ksh. ${post.price}`}/>
                </GridListTile>
              ))}
            </GridList>
      </div>
   </>
 )
}

export default UserPosts;



