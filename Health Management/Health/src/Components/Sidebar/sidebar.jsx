import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { useNavigate } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import './sideBar.css'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import ImportContactsTwoToneIcon from '@mui/icons-material/ImportContactsTwoTone';
import {Link } from 'react-router-dom';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import { Typography } from "@mui/material";




const drawerWidth = "132px";
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
  const navigate = useNavigate();
 const classes = useStyles();

//  const handleButtonClick = (e) => {
// console.log("sheethal", e.target.value)
//  }

 const handleTextClick = (text) => {
  setSelectedText(text);
  
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


<ListItem className="listStyle" button onClick={() => {handleTextClick('Dashboard'), navigate('/dashboard')}} style={{backgroundColor: selectedText === 'Dashboard' ? '#f51b1b' : 'white',
          borderRadius:"12px", width:"108px", height:"62px",marginLeft: "9px",marginBottom: "15px"
         }}>
    <DashboardOutlinedIcon style={{ color: selectedText === 'Dashboard' ? 'white' : 'black',  }}/>
   
    <ListItemText
    style={{ color: selectedText === 'Dashboard' ? 'white' : 'black',fontSize:"15px",textAlign:'center', fontFamily:'sans-serif', fontWeight: 550  }}
        disableTypography
        primary="Dashboard"
      />
</ListItem>

 
<ListItem className='listStyle' button onClick={() => {handleTextClick('Tools Catalog'),navigate('/tools-catalog')}} style={{backgroundColor: selectedText === 'Tools Catalog' ? '#f51b1b' : 'white',
           borderRadius:"12px", width:"108px", height:"75px",marginLeft: "9px", justifyContent:"center",marginBottom: "15px"
        }} >
<ImportContactsTwoToneIcon style={{ color: selectedText === 'Tools Catalog' ? 'white' : 'black' }} />
<ListItemText
primary="Tools Catalog"
style={{ color: selectedText === 'Tools Catalog' ? 'white' : 'black',fontSize:"15px",textAlign:'center', fontFamily:'sans-serif', fontWeight: 550  }}
        disableTypography
        
      />
</ListItem>
<ListItem button onClick={() => {handleTextClick('Map Details'),navigate('/map-component')}}  style={{backgroundColor: selectedText === 'Map Details' ? '#f51b1b' : 'white',
           borderRadius:"12px", width:"108px", height:"75px",marginLeft: "9px", justifyContent:"center"
        }}    >
<PublicOutlinedIcon style={{ color: selectedText === 'Map Details' ? 'white' : 'black' }}/>
<ListItemText
style={{ color: selectedText === 'Map Details' ? 'white' : 'black',fontSize:"15px",textAlign:'center', fontFamily:'sans-serif', fontWeight: 550  }}
        disableTypography
        primary="Map Details"
      />
</ListItem>


</List>
</Drawer>
 );
};
export default Sidebar;