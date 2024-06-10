import React, { useEffect, useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ToolDetails from "../ToolsDetails/toolsDetails";
import "./toolsCatalog.css";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";

const ToolsCatalog = () => {

  const [isClicked, setIsClicked] = useState(false);
  const [cardSlice, setCardSlice] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionData, setRegionData] = useState([]);
  const [toolCategoryCount, setToolCategoryCount] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:8000/GetToolList").then((response) => {
      setCardSlice(response?.data);
      setFilteredTools(response?.data);
      updateCategoryCount(response?.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8000/GetRegions").then((response) => {
      setRegionData(response?.data);
    });
  }, []);

  //added 2 new
  const updateCategoryCount = (cards) => {
    const categoryCount = { All: cards.length };

    cards.forEach((card) => {
      if (categoryCount[card.category]) {
        categoryCount[card.category] += 1;
      } else {
        categoryCount[card.category] = 1;
      }
    });
    setToolCategoryCount(
      Object.entries(categoryCount).map(([name, count]) => ({
        name,
        count,
      }))
    );
  };

  //added new
  useEffect(() => {
    filterTools();
  }, [searchTerm, selectedCategory, cardSlice]);
  //added new
  const filterTools = () => {
    let filtered = cardSlice;

    if (searchTerm) {
      filtered = filtered.filter((tool) =>
        tool.Toolname.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }
    setFilteredTools(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const showToolDetails = (tool) => {
    setIsClicked(true);
    setSelectedTool(tool);
    navigate(`/tool-details/${tool.id}`)
   
  };

  return (
    <div>
      {isClicked ? (
       <></>
      ) : (
        <div className={isClicked ? "hidden" : "main-page"}>
          <Toolbar />
          <Typography style={{ marginLeft: "110px", fontSize: "20px",fontWeight:"Bold" }}>
            Tools Catalog
          </Typography>

          <div className="search-container">
           
            <Input
              type="text"
              className="search"
              placeholder="Search tool/equipment Name"
              value={searchTerm}
              InputProps={{
                disableUnderline: true,
                sx: { borderBottom: "none" },
              }}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: "25px", marginLeft: "16px" }} />
                </InputAdornment>
              }
            />
          </div>

          <div className="tabs-and-dropdown">
            <div className="tabs">
              {toolCategoryCount.map((CategoryCount) => (
                <button
                key={CategoryCount.name}
                onClick={() => handleCategoryClick(CategoryCount.name)}
                style={{ borderRadius: "27px",
                backgroundColor: selectedCategory === CategoryCount.name? 'lightgrey' : 'white',
                }}
                  className={selectedCategory === CategoryCount.name ? "active" : " "} >
                  {CategoryCount.name} ({CategoryCount.count})
                </button>




              ))}
            </div>
            <div className="dropdown">
              <div className="dropregion">
                <div className="region-text">Region</div>
                <FormControl>
                <InputLabel id="demo-simple-select-label" style={{top:"-16px",fontSize:"17px"}}>All</InputLabel>
                  <Select
                    sx={{
                      width: "118px",
                      borderRadius: "10px",
                      height: "28px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                      fontSize: "16px",
                      backgroundColor: "white",
                      border: "0.5px solid black",
                    }}
                    // inputProps={{ "aria-label": "Without label" }}
                    label="All"
                  >
                    {regionData.map((reg) => (                       
                      <MenuItem
                   
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          fontSize: "16px",
                          paddingTop:"0px"
                        }}
                        value={reg.region}
                      >                    
                        {reg.region}
                      </MenuItem>
                    
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          <div className="card-container">
            <div className="row1">
              {filteredTools.map((card) => (
                <div className="main-card-div" key={card.id}>
                  <div className="card" onClick={() => showToolDetails(card)}>
                    <img
                      src={card.imageUrl}
                      alt="Card Image"
                      
                    />
                    <div className="card-data">
                      <p>
                        Tool name | number:<span style={{ fontWeight: "bold",color:"black"}}> {card.Toolname}
                        </span></p>

                      <p>
                        Category:{" "}
                        <span style={{ fontWeight: "bold",color:"black" }}>
                          {card.category}
                        </span>
                      </p>
                      <p>What part produce:<span style={{ fontWeight: "bold",color:"black" }}>{card.WhatPartProduce}</span> </p>
                      <p>Expected useful life:<span style={{ fontWeight: "bold",color:"black" }}>{card.Expected_useful_life}</span> </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
       )} 
      
    </div>
  );
};

export default ToolsCatalog;