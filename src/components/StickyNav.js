import React from "react";
import {Link} from "react-router-dom"
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
 StickyNav:{
    display: "grid",
    gridTtemplateColumns: "repeat(2, 1fr)",
    justifyItems:" center",
    height: "1rem",
    paddingLeft:"1rem"
    }
}));


const NavBar = () => {
const classes = useStyles();

return(
<>
    <nav>
    <div>
    <div className={classes.StickyNav}>

      <div className="Logo">
        WindowShop
      </div>
      <div className="SearchIcon">
        <Link to="/serch"> <SearchIcon/> </Link>
      </div>
    </div>
    </div>
    </nav>
</>
)

}

export default NavBar;