import React,{useState} from "react"
import {  Icon,Button} from "semantic-ui-react"
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
    maxWidth:550,
    margin: theme.spacing(0,0,0,0),
  },
  media: {
    height: 190,
  },
  paragraph:{
     margin: theme.spacing(2,1,0,1),
     overflowWrap:"break-word"
  },
  extra:{
  display:"flex",
},
  ul:{
    listStyleType: "none",
    margin: 0,
    padding: 0,
    overflow: "hidden",
    textAlign:"centre"

  },
  li:{
  display: "inline",
  margin:"1rem"
  },
 acordion:{
   marginTop: "-1rem",
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
  <>
 <div className={classes.extra}>
 <ul className={classes.ul}>
     <li className={classes.li}>
        <LikeButton user={author} postId={id} likes={likes}/>
     </li>
     <li className={classes.li}>
      <Button  as={Link} to={`/posts/${id}`} size="tiny" circular>
      <Icon name="comment" />{comments.length}
      </Button>
     </li>
   <li className={classes.li}>
      <b>{`Ksh. ${price}`}</b>
   </li>
 </ul>
 </div>
</>
);

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
              title="post"
            />
          </Link>
     <CardContent>
        <Accordion className={classes.acordion}>
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
          { extra }
          <hr/>
      </CardContent>
</Card>
  </>

   )
}


export default Postcard;