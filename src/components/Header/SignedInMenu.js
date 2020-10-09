import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
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
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


/**
 * signedInMenu
 */
export default function SignedInMenu() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="primary">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          indicatorColor="primary"
          aria-label="scrollable force tabs example"
        >
          <Tab icon={<HomeIcon />} {...a11yProps(0)} />
          <Tab  icon={<SearchIcon />} {...a11yProps(1)} />
          <Tab  icon={<BorderColorIcon />} {...a11yProps(2)} />
          <Tab disabled={true} />
          <Drower/>
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
          <Home/>
      </TabPanel>
      <TabPanel value={value} index={1}>
         <SearchBox/>
      </TabPanel>
      <TabPanel value={value} index={2}>
         <CreatePost/>
      </TabPanel>
    </div>
  );
}
