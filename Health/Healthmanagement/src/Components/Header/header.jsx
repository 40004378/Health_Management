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

<h4>
       Honeywell
</h4>
<p style={{padding:"8px",marginTop:"0px"}}> | </p>
<p className='h6'>
        <b>Tooling Health Dashboard</b>
</p>



</Toolbar>
</AppBar>
 );
};
export default Header;