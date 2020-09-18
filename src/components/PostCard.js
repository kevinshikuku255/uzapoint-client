import React,{useState} from "react"
import {  Icon,Button,  List, ListItem} from "semantic-ui-react"
import { timeAgo } from '../Utils/date';
import { Link } from "react-router-dom";
import shoes from "./shoes.jpeg"
import images from "./images.jpeg"
import  LikeButton  from './LikeButton';

import {Accordion} from 'semantic-ui-react'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(0,0,0,0),
  },
  media: {
    height: 190,
  },
  paragraph:{
     margin: theme.spacing(2,1,0,1),
    overflowWrap:"break-word"
  }
}));




/**
 *
 * This is a post...
 */
const Postcard = ({post}) => {
 const classes = useStyles();
 const {id , author, likes, price, title, comments, createdAt} = post

  const [activeIndex, setActiveIndex] =useState()

 const handleClick = (e, titleProps) => {
    const { index } = titleProps

    const newIndex = activeIndex === index ? -1 : index

    setActiveIndex(newIndex)
  }

const extra = (
 <div className="extra">

 <List horizontal  relaxed='very'>

   <ListItem>
      <LikeButton user={author} postId={id} likes={likes}/>
   </ListItem>
   <ListItem>
      <Button  as={Link} to={`/posts/${id}`} size="tiny" circular>
            <Icon name="comment" />{comments.length}
      </Button>
   </ListItem>
   <ListItem>
         <b>{`Ksh. ${price}`}</b>
   </ListItem>

 </List>
 </div>
)

   return(
  <>
<Card className={classes.card}>
         <CardHeader
         avatar={
          <Link to={`profile/${author.id}`}>
              <Avatar  alt="post" src={images} />
          </Link>  }
         action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
        }

        title={
            <Typography variant="h5">
                {author.username}
            </Typography>
            }
        subheader={timeAgo(createdAt)}
      />
      <Link to={`/posts/${id}`}>
       <CardMedia
          className={classes.media}
          image={shoes}
          title="Ted talk"
        />
      </Link>
     <CardContent>
        { extra }
        <hr/>
        <Accordion>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
               Item Description
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>

            <Typography variant="body1" className={classes.paragraph}>
                 <b>{title}</b>
            </Typography>
          </Accordion.Content>
          </Accordion>
      </CardContent>
</Card>
  </>

   )
}


export default Postcard;