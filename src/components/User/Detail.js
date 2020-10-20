import React,{useState} from 'react'

import image from "../shoes.jpeg"
import { makeStyles } from '@material-ui/core/styles';

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
flex:{
  marginTop:"4.5rem",
  maxWidth: 558,
  display: "flex",
  flexWrap: "wrap",
  justifyContent:"center",
},
flexItem:{
  backgroundColor: "#f1f1f1",
  maxWidth: "100px",
  maxHeight: "100px",
  margin:"1px",
  textalign:" center",
},
img:{
  width:"100%",
  height:"100%",
},
div:{
  marginTop:"2.8rem"
}
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
            <img src={post.image ? post.image : image } alt={post.id} className={classes.img}
                onClick={handleClickOpen}/>
    </div>
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

          <div className={classes.div}>
            <img src={post.image ? post.image : image } alt={post.id} className={classes.img}/>

          </div>
        </Dialog>

  </>
 )
}

export default Detail;

