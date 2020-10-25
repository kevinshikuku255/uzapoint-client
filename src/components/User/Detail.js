import React,{useState} from 'react'

import { Image } from 'semantic-ui-react'
import image from "../shoes.jpeg"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';



const useStyles = makeStyles((theme) => ({
 appBar: {
    position: 'fixed',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
flexItem:{
  width: "100px",
  margin:"1px",
},
img:{
  width:"100px",
  height:"100px",
},
div:{
  marginTop:"2.8rem"
},
/* -------------------------------------------------------------------------- */
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(8,-1.5,0,-1.5),
  },
  media: {
    height: 190,
  },
}));



/**
 * post detail
 */
const Detail = ({post}) => {
const classes = useStyles();
//.......................................................................
  const [open, setOpen] = useState(false);
   const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

 return (
  <>

    <div className={classes.flexItem}>
        <Image src={post.image ? post.image : image } alt={post.price} onClick={handleClickOpen} fluid />
 {/* ...................................................................................................... */}
      <Dialog fullScreen open={open} onClose={handleClose}>
          <AppBar className={classes.appBar} >
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                 <p style={{textTransform: "capitalize"}}> {`Ksh. ${post.price}`} </p>
              </Typography>
              <Button color="inherit" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </Toolbar>
          </AppBar>


          <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={post.image ? post.image : image }
                    title={"user.username"}
                  />
          </Card>




          {/* <div className={classes.div}>
            <img src={post.image ? post.image : image }
                 alt={post.id}
                 className={classes.gridList}  />
          </div> */}
        </Dialog>
    </div>
  </>
 )
}

export default Detail;

