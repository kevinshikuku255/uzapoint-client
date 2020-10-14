import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import {useQuery} from "@apollo/client"

// import  {useDebounce} from "../Utils/useDebounce"
// import { SEARCH_USERS } from '../graphql/user';



const useStyles = makeStyles((theme) => ({
  root:{
     margin: theme.spacing(6,1,0,1),
    overflowWrap:"break-word"
  }
}));



const AboutUs = () => {
  const classes = useStyles();
  // const [searchQuery, setsearchQuery] = useState("")
  // const [search, setSearch] = useState("")

// Debounce search query value
// const debounceSearchQuery = useDebounce(searchQuery, 500);

  // const {data, loading} = useQuery(SEARCH_USERS, {
  //   variables:{
  //      searchQuery: "v"
  //   }
  // });

  // console.log(data)
  // const handleChange = (e) =>{
  //      e.preventDefault();
  //     searchQuery( e.target.value);
  // };



    return(
    <div className={classes.root}>
      {/* <input
        type="Search"
        className={classes.search}
        placeholder="Search a user"
        value={searchQuery}
        onChange={handleChange}
      /> */}

 <h3 style={{color:"red"}}>This feature is coming soon</h3>

    </div>
    )
}
export default AboutUs;