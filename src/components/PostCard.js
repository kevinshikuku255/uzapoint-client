import React,{useState} from "react"
import {  Icon,Button} from "semantic-ui-react"
import { timeAgo, weekDay } from '../Utils/date';
import { Link } from "react-router-dom";
import shoes from "./shoes.jpeg"
import images from "./images.jpeg"
import  LikeButton  from './LikeButton';
import DeleteButton from './DeleteButton';
import { useStore } from '../store';




import {Accordion} from 'semantic-ui-react'
import { Profile } from '../store/routes'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';


import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PhoneIcon from '@material-ui/icons/Phone';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';






const useStyles = makeStyles((theme) => ({
  media: {
    height: 200,
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
   marginTop: "-1.2rem",
 }
}));




/**
 * This is a post...
 */
const Postcard = ({post}) => {
const classes = useStyles();
const [activeIndex, setActiveIndex] =useState();

const [{auth}] = useStore()
const user = auth.user

 const [anchorEl, setAnchorEl] = useState(null);
 const open = Boolean(anchorEl);



 const {id , author, image, likes, price, title, comments, createdAt} = post

 const weekday = weekDay(createdAt)



 const postImage = image ? image : shoes;
 const avator = author.image ?  author.image : images;
/* -------------------------------------------------------------------------- */
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
/* -------------------------------------------------------------------------- */


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
          <Link to={`profile/${author.id}`} onMouseOver={Profile.load}>
              <Avatar  alt="post" src={avator} />
          </Link>  }
         action={
          <>
            <IconButton aria-label="more"
                         aria-haspopup="true"
                         onClick={handleMenu}
                         >
              <MoreVertIcon />
            </IconButton>
{/* -------------------------------------------------------------------------- */}
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}><PhoneIcon/> {author.phone}</MenuItem>
                  <MenuItem onClick={handleClose}> <CalendarTodayIcon/>{weekday} </MenuItem>
               {user.username === author.username  &&
                  <MenuItem onClick={handleClose}>
                      <DeleteButton id={id} />
                  </MenuItem>}
                </Menu>
          </>
        }


        title={
            <Typography variant="h6" style={{textTransform: "capitalize"}}>
                {author.username}
            </Typography>
            }
        subheader={timeAgo(createdAt)}
      />

          <Link to={`/posts/${id}`}>
          <CardMedia
              className={classes.media}
              image={postImage}
              title={`${price} shillings`}
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
               Item description
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>

            <Typography variant="body1" className={classes.paragraph}>
                 {title}
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