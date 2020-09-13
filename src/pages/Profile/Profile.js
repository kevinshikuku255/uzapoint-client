import React from 'react'
import {useRouteMatch} from 'react-router-dom'
import { Grid, Item, GridRow } from 'semantic-ui-react'
import {useQuery}  from '@apollo/client'
import SkeletonPost from "../../components/Skeleton"

import {useStore} from "../../store"
import {GET_USER} from "../../graphql/user"
import UserAbout from "../../components/User/UserAbout"





function  Profile() {
 const [{auth}] = useStore()
 const location = useRouteMatch()
 const id = location.params.id
 const { data,loading} = useQuery(GET_USER,{
   variables:{
     id
   }
 });

if(loading){
  return <SkeletonPost/>
}
    return (
     <>
   {
 <Grid  className={auth.user ? "ProfileGrid" :" ProfileGridd" }>
    <GridRow>
        <Item>
           {<UserAbout user={ data.getUser}/>}
        </Item>
  </GridRow>
  </Grid>

   }
     </>
    )
  }


export default Profile;