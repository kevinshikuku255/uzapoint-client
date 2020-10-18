import React from 'react';
import {useQuery } from '@apollo/client'
import { Grid} from 'semantic-ui-react';


import CreateCommnet from "./createComment"
import {GET_POST} from "../graphql/post"
import { timeAgo } from '../Utils/date';
import { useStore } from '../store';
import shoes from "./shoes.jpeg"
import SkeletonPost from "../components/SinglePostSkeleton"


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';







const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
    margin: theme.spacing(6.2,-1.5,0,-1.5),
  },
  media: {
    height: 190,
  },
  paragraph:{
     margin: theme.spacing(2,1,0,1),
     overflowWrap:"break-word"
  },
postMarkup:{
 display:"flex",
 flexDirection:"row",
 justifyContent:"spaceAround",
 alignItems:"center",
 marginBottom:"1rem",
 paddingLeft:"1rem"
},
commentLength:{
  color:"#3f51b5",
  fontSize:"1.2rem",
  padding:"0",
  marginTop:"-1rem"
},
actioButton:{
  marginBottom:"-120rem",
}
}));



function SinglePost({match}){
  const classes = useStyles();
  const postId = match.params.postId
  const [{auth}] = useStore()
  const user = auth.user

  const {data, loading, error} = useQuery(GET_POST, { variables:{id: postId} })




   if (loading) {
     return(
       <div className={classes.skeleton}>
         <SkeletonPost/>
       </div>

     )
   }

   if (!data && !loading) {
     return (
        <div className={classes.skeleton}>
           <SkeletonPost/>
        </div>
     )
   }
   if (error) {
     return <div>Error!</div>;
   }

  const { comments, createdAt, title, price, likes} =  data.getPost



 let postMarkup;
        postMarkup = (
       <div className={classes.postMarkup}>

            <div style={{flexGrow:"1"}}>
                {timeAgo(createdAt)}
            </div>
            <div  style={{flexGrow:"1"}}>
                {`Ksh. ${price}`}
            </div>
            <div style={{flexGrow:"1"}}>
                {`Likes ${likes.length}`}
            </div>
     </div>
        )



return (
    <>
  <Card className={classes.card}>
        <CardMedia
            className={classes.media}
            image={shoes}
            title={user.username}
          />
      <div variant="body1" className={classes.paragraph}>
          {postMarkup}
  {/**............................................................................................ */}
        <div className={classes.postMarkup}>
            <div style={{flexGrow:"1"}}>
               {title}
            </div>
      </div>
  {/**................................................................................................ */}
          <hr/>
      </div>
  </Card>


  <Grid>
    <Grid.Column mobile={16} tablet={10} computer={7}>
              <br/> <p className={classes.commentLength}> comments {comments.length}</p>
               <CreateCommnet match={match} comments={comments} />
    </Grid.Column>
  </Grid>
    </>
      )
}



export default SinglePost;


















