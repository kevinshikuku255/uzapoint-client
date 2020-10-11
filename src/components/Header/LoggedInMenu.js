import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import BorderColorIcon from '@material-ui/icons/BorderColor';

import Drower from "../Drower"
import Home from "../../pages/Home"
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
        <Box p={4}>
          {children}
        </Box>
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
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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
          <Tab icon={<HomeIcon />} {...a11yProps(0)} />
          <Tab icon={<BorderColorIcon />} {...a11yProps(1)} />
          <Tab icon={<SearchIcon />} {...a11yProps(2)} />
          <Drower/>
        </Tabs>

      </AppBar>
        <TabPanel value={value} index={0} dir={theme.direction}>
           <Home/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
           <CreatePost/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
           <SearchBox/>
        </TabPanel>
    </div>
  );
}
