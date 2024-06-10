import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './sideBar.css'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
import {Link } from 'react-router-dom';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { Typography } from "@mui/material";




const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
 drawer: {
   width: drawerWidth,
   flexShrink: 0,
 },
 drawerPaper: {
   width: drawerWidth,
 },
}));
const Sidebar = () => {
  const [selectedText, setSelectedText] = useState(null);
  
 const classes = useStyles();

//  const handleButtonClick = (e) => {
// console.log("sheethal", e.target.value)
//  }

 const handleTextClick = (text) => {
  setSelectedText(text === selectedText ? null : text);
  
};

 return (
<Drawer
     className={classes.drawer}
     variant="permanent"
     classes={{
       paper: classes.drawerPaper,
     }}
     anchor="left"
>
<List className='sidebar-List'>
<a href="/dashboard"  className='button-link'>

<ListItem button onButtonClick={() => handleTextClick('Dashboard')}  className={selectedText === 'Dashboard' ? 'selected' : '' }>
    <DashboardOutlinedIcon />
   
    <ListItemText
        disableTypography
        primary={<Typography  style={{ color: 'black',fontSize:"16px",textAlign:'center' }}>Dashboard </Typography>}
      />
</ListItem>
</a >
<a href="/tools-catalog" className='button-link'>
 
<ListItem button onClick={() => handleTextClick('Tools Catalog')}  className={selectedText === 'Tools Catalog' ? 'selected' : '' }>
<ImportContactsTwoToneIcon />
{/* <Link to="/tools-catalog">Tools Catalog</Link> */}
<ListItemText
        disableTypography
        primary={<Typography  style={{ color: 'black',fontSize:"16px",textAlign:'center' }}>Tools Catalog </Typography>}
      />
</ListItem>
</a>

<a href="/map-component" className='button-link'>
 
<ListItem button onClick={() => handleTextClick('Map Component')} className={selectedText === 'Map Component' ? 'selected' : '' }   >
<PublicOutlinedIcon />
{/* <Link to="/tools-catalog">Tools Catalog</Link> */}

<ListItemText
        disableTypography
        primary={<Typography  style={{ color: 'black',fontSize:"16px",textAlign:'center' }}>Map Details</Typography>}
      />
</ListItem>
</a>

</List>
</Drawer>
 );
};
export default Sidebar;