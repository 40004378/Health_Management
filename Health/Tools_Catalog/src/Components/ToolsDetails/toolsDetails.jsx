import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import Mindmap from "./Mindmap";
import "./toolsDetails.css";
import BasicBreadcrumbs from "./breadCrumbs";

import ToolsCatalog from "../ToolsCatalog/toolsCatalog";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { useParams } from 'react-router-dom';


const ToolDetails = () => {
  const[tool, setTool] = useState([]);
  // const [toolDetails, setToolDetails] = useState([]);
  const [Categorydata, setCategorydata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [cardSlice, setCardSlice] = useState([]);
  const [selectVal, setSelectedVal] = useState("");
  const navigate = useNavigate();
const {id} = useParams();
 

useEffect(() => {
  axios.get(`http://localhost:8000/GetToolList/${id}`).then((response) => {
      setTool(response?.data);
      setFilteredTools(response?.data);
      // setCategorydata(response?.data);
  });
}, [id]);

useEffect(() => {
  axios.get("http://localhost:8000/GetCategories").then((response) => {
      setCategorydata(response?.data);
  });
}, []);

  // useEffect(() => {
  //   setFilteredTools(
  //     tool.filter((tools) =>
  //       tools.Toolname.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   );
  // }, [searchTerm, tool]);

  const handleSearch = (e) => {
    const currentTool = e.target.value;
    setSearchTerm(currentTool);
    setDropdownVisible(true);
    if (!currentTool) {
      setDropdownVisible(false);
    }
  };

  const handleSelectedTool = (name) => {
    const tool1 = tool.filter((tools) =>
      tools.Toolname.toLowerCase().includes(name.toLowerCase())
    );
    setSearchTerm(name);
    setDropdownVisible(false);
    setFilteredTools(tool1);
  };

  const handleClick = (e) => {
    // setSelectedVal(e.target.value);
    // const filteredResult = Categorydata.filter((item) =>
    //   item.options.includes(e.target.value)
    // );
    // setFilteredTools(filteredResult);
  };
  const handleTextClick = () => {
    // Navigate to another page
    navigate('/tools-catalog');
  };

  if (!tool) {
    return null;
  }

  const cardStyle = {
    height: 200,
    width: "90%",
    direction: "row",
    display: "flex",
    borderRadius: "12px",
  };

  const title1Style = {
    fontFamily: "Segoe UI",
    fontWeight: "bold",
    fontSize: "18px",
    color: "red",
  };

  const title2Style = {
    fontFamily: "Segoe UI",
    fontWeight: "bold",
    fontSize: "18px",
  };

  return (
    <div className="main-pagedetails">
      <Toolbar />
      <div className="fontStyle">
               <div><Typography className='title1Style' onClick={handleTextClick}>Tools Catalog </Typography></div>
               <div><ChevronRightIcon className='iconStyle'></ChevronRightIcon></div>
               <div><Typography className='title2Style'>Tools Details</Typography></div>
            </div>
      {/* <BasicBreadcrumbs onClick={<ToolsCatalog />} /> */}
      <div className="search-containerdetails">
        <span className="searchicondetails">
          <div className="dropdowndetails">
            <FormControl>
            <InputLabel id="demo-simple-select-label" style={{top:"-16px",fontSize:"17px"}}>Category</InputLabel>
              <Select onChange={handleClick} className="select" label="Category">
                {Categorydata.map((category) => (
                  <MenuItem key={category.id} value={category.options}>{category.options}</MenuItem>
                ))}
              </Select>
              {/* {searchTerm && dropdownVisible && (
          <div className="dropdown-menu-data">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="dropdown-item"
                onClick={() => handleSelectedTool(tool.Toolname)}
              >
                {tool.Toolname}
              </div>
            ))}
          </div>
        )} */}
            </FormControl>
          </div>
        </span>
        <div className="input-div">
            <Input
              type="text"
              placeholder="Search tool/equipment name"
              value={searchTerm}
              style={{padding:"4px",fontSize: "17px", width:"330px"}}
              InputProps={{
                disableUnderline: true,
                sx:{ borderBottom: "none",fontSize:"17px"},
              }}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: "25px", marginLeft: "16px" }} />
                </InputAdornment>
              }
            />
        </div>
      </div>
      

      <div className="cardPosition">
        <Card sx={cardStyle}>
          <div className="Card-media">
            <img
              style={{
                height: 170,
                width: 300,
                marginLeft: "15px",
                marginRight: "10px",
                marginTop: "15px",
              }}
              src={tool.imageUrl}
              alt=""
            />
          </div>
          <CardContent sx={{ display: "flex" }}>
            <div className="details-typo">
              <p>
                Tool Name | Number:{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {tool.Toolname}
                </span>
              </p>
              <p>
                Category:{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {tool.category}
                </span>
              </p>
              <p>
                What part Produce:{" "}
                <span style={{ fontWeight: "bold", color: "black" }}>
                  {tool.WhatPartProduce}
                </span>
              </p>
              <p>
                Number of parts per 1 stroke(# of cavities):
                <span
                  style={{ fontWeight: "bold", color: "black" }}
                  key={tool.id}
                >
                  {" "}
                  {tool.Partsper2Stroke}
                </span>
              </p>
            </div>

            <div className="details-typo2">
              <p>
                Stroke count(Total # of shorts):
                <span
                  style={{ fontWeight: "bold", color: "black" }}
                  key={tool.id}
                >
                  {" "}
                  {tool.Stroke_Count}
                </span>
              </p>
              <p>
                Number of parts per 1 stroke(# of cavities):
                <span
                  style={{ fontWeight: "bold", color: "black" }}
                  key={tool.id}
                >
                  {" "}
                  {tool.Partsper2Stroke}
                </span>
              </p>
              <p>
                Expected Useful life:
                <span
                  style={{ fontWeight: "bold", color: "black" }}
                  key={tool.id}
                >
                  {" "}
                  {tool.Expected_Useful_life}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div style={{ marginLeft: "170px", marginTop: "50px" }}>
        <Mindmap/>
      </div>
    </div>
  );
};

export default ToolDetails;