import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth:518,
    margin: theme.spacing(-1,0,0,0),
  },
  media: {
    height: 190,
  },
  progress:{
    width:"100vw"
  }
}));


function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          loading && (
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          )
        }
        title={
          loading && (
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          )
        }
        subheader={
             loading && <Skeleton animation="wave" height={10} width="40%" /> }
      />

      {loading && (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      )}

      <CardContent>
        {loading && (
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        )}
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

/**
 * skeleton component.
 */
export default function SkeletonPost() {
  return (
    <div >
      <Media loading />
      <Media loading />
      <Media loading />
      <Media loading />
      <Media loading />
      <Media loading />


    </div>
  );
}
