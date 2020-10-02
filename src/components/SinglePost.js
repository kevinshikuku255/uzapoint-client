import React from 'react';
import {useQuery } from '@apollo/client'
import { Grid, List } from 'semantic-ui-react';


import CreateCommnet from "./createComment"
import {GET_POST} from "../graphql/post"
import { timeAgo } from '../Utils/date';
import { useStore } from '../store';
import DeleteButton from './DeleteButton';
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
    skeleton: {
    margin: theme.spacing(6.5,0,0,0),
  }
}));



function SinglePost({history, match}){
  const classes = useStyles();
  const postId = match.params.postId
  const [{auth}] = useStore()
  const user = auth.user

  const {data, loading, error} = useQuery(GET_POST,
          { variables:{id: postId} })



 function deletePostCallback(){
    history.push("/")
  }

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

  const{ id ,author, comments, createdAt, title, price, likes} =  data.getPost



 let postMarkup;
        postMarkup = (
       <div className="extra">
          <List horizontal relaxed>
              <List.Item>
                   {`Likes: ${likes.length}`}
              </List.Item>
              <List.Item>
                  {`Replies: ${comments.length}`}
              </List.Item>
              {user &&
              <List.Item>
                 {user.username === author.username  &&
                              <DeleteButton id={id} callback={deletePostCallback}/>}
              </List.Item>
              }
          </List>
     </div>
        )



return (
    <>
<Card className={classes.card}>
       <CardMedia
          className={classes.media}
          image={shoes}
          title="post"
        />
     <div variant="body1" className={classes.paragraph}>
           Item description: <b>{title}</b> <hr/>
          <List horizontal relaxed>
              <List.Item>
                   {`Price: Ksh. ${price}`}
              </List.Item>
              <List.Item>
                  {`Posted:  ${timeAgo(createdAt)}`}
              </List.Item>
          </List>
         <hr/>
          <List horizontal relaxed>
              <List.Item>
                  Name: <b>{`${author.username}`}</b>
              </List.Item>
              <List.Item>
                 Phone: <b>{`${author.phone}`}</b>
              </List.Item>
          </List> <hr/>
         {postMarkup}
     </div>
</Card>

  <Grid>
    <Grid.Column mobile={16} tablet={10} computer={7} className=  "Card" >

       {user && (  <>

               <CreateCommnet match={match} comments={comments} />

                  </>
                  )}
    </Grid.Column>
  </Grid>
    </>
      )
}



export default SinglePost;


















