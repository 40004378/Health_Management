import React, { useState } from 'react';
import { Handle } from 'react-flow-renderer';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import './toolsDetails.css';
import './customnode.css'
 
const CustomNode = ({id, data }) => {
  const { label, condition, expandNode, collapseNode, collapsed } = data;
  const handleExpandCollapse = () => {
    if (collapsed) {
      expandNode(id);
    } else {
      collapseNode(id);
    }
  };
  const getNodeColor = (condition) => {
    switch (condition) {
      case "place":
        return { backgroundColor: "#3599d5", width:"80px", color:"white"};
      case "good":
        return { backgroundColor: "#68c13b" ,  width:"250px", color:"white" };
      case "fair":
        return { backgroundColor: "rgb(160 167 59)",  width:"250px", color:"white"};
      case "poor":
        return { backgroundColor: "#c1473b",  width:"250px", color:"white" };
      default:
        return { backgroundColor: "white", width:"170px", border:"1px solid black"};
    }
  };
  return (
    
    <div className='maincontainer'>
    <div className="custom-node" style={getNodeColor(condition)}>
      <Handle type="target" position="left" />
      <div className="custom-node-content" onClick={handleExpandCollapse}>
        <div className="custom-node-label">{label}</div>
      </div>
      <Handle type="source" position="right" />
    </div>
    <div className="custom-node-toggle">
          {collapsed ? (
            <div onClick={() => data.expandNode(id)} className="addicon-div">
              <AddCircleOutlineIcon style={{fontSize:"1.3em"}}/>
            </div>
          ) : (
            <div onClick={() => data.collapseNode(id)} className="addicon-div">
              <RemoveCircleOutlineIcon style={{fontSize:"1.3em"}}/>
            </div>
          )}
        </div>
    </div>
    // <div style={getNodeColor(condition)}>
    //   <Handle type="source" position="right" id="a" />
    //   <div style={{paddingTop:"3px"}}><center>{label}</center></div>
    //   <Handle type="target" position="left" id="b" />
    // </div>
  );
};
 
export default CustomNode;