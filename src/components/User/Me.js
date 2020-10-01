import React,{useState} from 'react'
import {useQuery} from "@apollo/client"
import { Rating,Grid, GridColumn,Icon,Menu } from 'semantic-ui-react'
import SkeletonPost from '../../components/SinglePostSkeleton';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import shoes from "../shoes.jpeg"
import UserSales from "./UserSales"

import { currentDate } from '../../Utils/date';
import {GET_AUTH_USER} from "../../graphql/user";



const useStyles = makeStyles((theme) => ({
  skeleton: {
    margin: theme.spacing(6.5,0,0,0),
  }

}));




/**
 *
 * About auth user...
 */
  const  UserAbout = () =>{
  const classes = useStyles();
  const {data, loading} = useQuery(GET_AUTH_USER,{
    fetchPolicy:"cache-first"
  });

  const [active, setActive] = useState({ activeItem: 'items'})
  const  handleItemClick = (e, { name }) => setActive({ activeItem: name })
  const { activeItem } =active


 if(loading ){
   return(
    <div className={classes.skeleton}>
      <SkeletonPost/>
    </div>
   )
 }

 const { phone,  username, followers, createdAt} = data.getAuthUser;

const joinedDate = currentDate(createdAt).split(" ")
 return (
  <div>
 <Grid className="Me">
    <GridColumn mobile={16} tablet={10} computer={7}>
     <Avatar  alt="logo" src={shoes} />
    </GridColumn>
 </Grid>


  <div className="gridd">
    <div className="UserInfo">
       <div className="DpInfo">
         <b>{username}</b>
       </div>
       <div>
         <button>{`Followers ${followers.length}`}</button>
       </div>
       <div>
         <Icon name="bell"/>
       </div>
     </div>

    <div className="userBio" >
          <div>User Bio information: </div>
    </div>
    <div>{<Rating icon='heart' defaultRating={1} maxRating={3} />} </div>
    <div> <p>{`Phone: ${phone} `}</p> </div>
    <div className="UserMeta">
        <div>
          <Icon name="cloud"/>{"Nairobi,Ke"}
        </div>
        <div>
         <Icon  name="calendar"/>{`Joined ${joinedDate[0]}, ${joinedDate[2]}`}
        </div>
    </div>
    <div>
        <Menu pointing secondary>
          <Menu.Item
            name='items'
            active={activeItem === 'items'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='messages'
            active={activeItem === 'messages'}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='sales'
            active={activeItem === 'sales'}
            onClick={handleItemClick}
          />
        </Menu>
    </div>
    <div>
      { activeItem === "items" ? <b>This feature will be added soon</b>
         : activeItem === "sales" ?  <UserSales/> : " " }
    </div>
</div>
</div>
 )
}

export default UserAbout;