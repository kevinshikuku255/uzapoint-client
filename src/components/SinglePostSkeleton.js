import React from 'react';
import Box from '@material-ui/core/Box';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(0,0,0,0),
  },
  media: {
    height: 190,
  },
}));



function Media() {
 const classes = useStyles();
  return (
        <Box className={classes.card}>
          {  <Skeleton animation="pulse" variant="rect"  className={classes.media}/> }
          {
            <Box pt={0.5}>
              <Skeleton />
              <Skeleton width="60%" />
              <Skeleton width="30%" />
            </Box>
          }
        </Box>
  );
}

/**
 * single post skeleton
 */
export default function PostSkeleton() {
  return (
    <div>
    <Box overflow="hidden">
      <Media />
    </Box>
    </div>
  );
}
