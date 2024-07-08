import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './header.css'
const useStyles = makeStyles((theme) => ({
 appBar: {
   zIndex: theme.zIndex.drawer + 1,
 },
}));
const Header = () => {
 const classes = useStyles();
 return (
<AppBar position="fixed" className={classes.appBar}>
<Toolbar>
<Typography variant="h4" noWrap>
      <span style={{color:'red'}}> Honeywell</span> 
</Typography>
<Typography variant="h4" > | </Typography>
<Typography variant="h6" noWrap>
        Tooling health dashboard
</Typography>
</Toolbar>
</AppBar>
 );
};
export default Header;