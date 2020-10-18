import React,{useState} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import Drower from "../Drower"
import Home from "../../pages/Home/Explore"
import SearchBox from "../SerchBox"
import CreatePost from "../CreatePost"







function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}



/**
 * New tabed menu
 */
export default function LoggedInMenu() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          variant="standard"
        >
          <Tab icon={<HomeIcon/>} {...a11yProps(0)} />
          <Tab icon={<AddAPhotoIcon/>} {...a11yProps(1)} />
          <Tab  icon={<SearchIcon/>} {...a11yProps(2)} />
          <Drower/>
        </Tabs>
      </AppBar>

        <TabPanel value={value} index={0} >
           <Home/>
        </TabPanel>
        <TabPanel value={value} index={1} >
           <CreatePost/>
        </TabPanel>
        <TabPanel value={value} index={2} >
           <SearchBox/>
        </TabPanel>
    </div>
  );
}
