import React from 'react'
import { Card, Grid, GridColumn,Label} from "semantic-ui-react"
import shoes from "../shoes.jpeg"



const  UserPosts = ({posts}) =>{
 return (
   <>
  {posts.map( (post) =>{
     return(

    <Grid key={post.id}>
      <GridColumn mobile={16} tablet={10} computer={7}>
       <Card
         fluid
         color='teal'
         image={shoes}
      />
    <Label as='a' tag pointing="above" color="teal" >
        {`Ksh.${post.price}`}
    </Label>

     </GridColumn>
    </Grid>
     )
  })}

   </>
 )
}

export default UserPosts;



