import React from 'react';
import {useQuery } from '@apollo/client'
import { Grid, Card, List, ListItem } from 'semantic-ui-react';


import CreateCommnet from "./createComment"
import {GET_POST} from "../graphql/post"
import { timeAgo } from '../Utils/date';
import { useStore } from '../store';
import DeleteButton from './DeleteButton';
import shoes from "./shoes.jpeg"
import SkeletonPost from "../components/Skeleton"


function SinglePost({history, match}){
  const postId = match.params.postId
  const [{auth}] = useStore()
  const user = auth.user

  const {data, loading, error} = useQuery(GET_POST,
          { variables:{id: postId} })



function deletePostCallback(){
    history.push("/")
  }

   if (loading) {
     return <SkeletonPost/>
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
                  {`Commnets: ${comments.length}`}
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
  <Grid>
    <Grid.Column id={user ? "Card" : "Cardd" } mobile={16} tablet={10} computer={7} >
       <Card
         fluid
         image={shoes}
      />
    <List verticalAlign="top">
      <ListItem>
           {postMarkup}
      </ListItem>
      <ListItem>
         <b>{title}</b>
          <p>{`${timeAgo(createdAt)}`}</p>
      </ListItem>
      <ListItem>
         <b> {`Ksh. ${price}`} </b>
      </ListItem>
      <ListItem>
          {`Phone: ${author.phone}`}
      </ListItem>
      <ListItem>
          <b>Located at: Nairobi Ke</b>
      </ListItem>

    </List>

    </Grid.Column>

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


















