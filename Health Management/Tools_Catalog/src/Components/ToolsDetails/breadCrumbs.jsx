import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ToolsCatalog from "../ToolsCatalog/toolsCatalog";
 
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
 
export default function BasicBreadcrumbs() {
  const [selectedText, setSelectedText] = useState(null);
 
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

 const iconStyle={
    marginLeft: "-20px",
    fontStyle:"bold",
    fontWeight:900

 }
  return (
    <div role="presentation" onClick={handleClick} style={{"marginLeft":"120px"}}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="medium"  sx={iconStyle} />}
      >
        <a href="/tools-catalog"  style={{textDecoration:"none"}}>
          <ListItem
            onClick={<ToolsCatalog />}
            className={selectedText === "Tools Catalog" ? "selected" : ""}
          >
            <Typography style={{ color: "red" }}>Tools Catalog</Typography>
            {/* <Link to="/tools-catalog">Tools Catalog</Link> */}
          </ListItem>
        </a>
        <Typography color="text.primary" sx={{marginLeft:"-9px"}}>Tools details</Typography>
      </Breadcrumbs>
    </div>
  );
}