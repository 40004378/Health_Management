import React, { useEffect, useState } from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import ToolDetails from "../ToolsDetails/toolsDetails";
import "./toolsCatalog.css";
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { Card, CardContent, CardMedia, Grid } from "@material-ui/core";
import SearchIcon from '@mui/icons-material/Search'; 
import { useNavigate } from 'react-router-dom';
import '../../index.css';
const ToolsCatalog = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [cardSlice, setCardSlice] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchTerm, setSearchTerm] = useState("");
  const [regionData, setRegionData] = useState([]);
  const [toolCategoryCount, setToolCategoryCount] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("http://localhost:8000/GetToolList").then((response) => {
  //     setCardSlice(response?.data);
  //     setFilteredTools(response?.data);
  //     updateCategoryCount(response?.data);
  //   });
  // }, []);
  useEffect(() => {
    axios.get("http://localhost:7074/api/tool-monitoring/api/v1/Tools").then((response) => {
      setCardSlice(response?.data);
      setFilteredTools(response?.data);
      updateCategoryCount(response?.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:7074/api/tool-monitoring/api/v1/Regions").then((response) => {
      setRegionData(response?.data);
    });
  }, []);
  

  //added 2 new 
  const updateCategoryCount = (cards) => {
    const categoryCount = { All: cards.length };
   
    cards.forEach((card) => {
      if (categoryCount[card.toolCategoryName]) {
        categoryCount[card.toolCategoryName] ++;
      }
      else {
        categoryCount[card.toolCategoryName] = 1;
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
  
  //added new
  const filterTools = () => {
    let filtered = cardSlice;

    if (searchTerm) {
      filtered = filtered.filter((tool) =>
        tool.toolName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((tool) => tool.toolCategoryName === selectedCategory);
    }
    if(selectedRegion && selectedRegion !== "All"){
      filtered = filtered.filter((tool) => tool.regionName === selectedRegion)
      //vidi code
      console.log("vidi",filtered.filter((tool) => tool.regionName === selectedRegion));
      updateCategoryCount(cardSlice.filter((tool) => tool.regionName === selectedRegion));
    }
    if(selectedRegion === "All"){
      updateCategoryCount(cardSlice);
    }
    setFilteredTools(filtered);
    // updateCategoryCount(filtered);
    console.log("tools", filtered);
  };
  useEffect(() => {
    filterTools();
  }, [searchTerm, selectedCategory, selectedRegion, cardSlice]);

  const handleSearch = (e) => {
    const currentTool = e.target.value;
    setSearchTerm(currentTool);
    setDropdownVisible(true);
    if (!currentTool) {
      setDropdownVisible(false);
  } 
    if (searchTerm) {
      const suggestions = cardSlice.filter(tools =>
        tools.toolName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.toolName);
        setFilteredSuggestions([]);
      };
  const showToolDetails = (tool) => {
    setIsClicked(true);
    setSelectedTool(tool);
    navigate('/tool-details/',{state: { tool }})
   
  };
  const handleCategoryClick = (toolCategoryName) => {
    
    setSelectedCategory(toolCategoryName);
    
    // setColor('lightgrey'); 
  };
  const handleChange = (event) => {
    setSelectedRegion(event.target.value);
  }
console.log("man", cardSlice)
console.log("vika", filteredTools)
console.log("vik", selectedTool);


  return (
    <div>
      {isClicked ? (
        <></>
      ) : (
        <div className={isClicked ? "hidden" : "main-page"}>
          <Toolbar />
          <div className="titleStyle">
          <Typography style={{fontWeight: 600}}>Tools Catalog</Typography></div>
          <div>
          <div className="search-container">
           <Input
              type="text"
              className="search"
              placeholder="Search tool/equipment name"
              value={searchTerm}
              InputProps={{disableUnderline:true,
                sx:{borderBottom: 'none'}
              }}
              onChange={handleSearch}
              startAdornment={
                <InputAdornment position="start" disablePointerEvents>
                  <SearchIcon sx={{ fontSize: "25px", marginLeft: "16px" }}/>
                </InputAdornment>
              }
            />
            {filteredSuggestions.length > 0 && dropdownVisible &&(
                    <div className="dropdown-menu-data">
                        {filteredSuggestions.map((tool, index) => (
                            <div
                                key={index}
                                className="dropdown-item"
                                onClick={() => handleSuggestionClick(tool)}
                            >
                                {tool.toolName}
                            </div>
                        ))}
                    </div>
                )}


          </div>
          </div>
          <div>
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
                <div className="region-text">
                  <InputLabel sx={{fontWeight:"bold"}}>Region</InputLabel>
                  </div>
                <FormControl>
                  <Select
                    labelId="region-select-label"
                    id="region-select"
                    value={selectedRegion}
                    onChange={handleChange}
                    sx={{
                      width: "118px",
                      borderRadius: "10px",
                      height: "28px",
                      fontWeight: "bold",
                      fontFamily: "sans-serif",
                      fontSize: "16px",
                      backgroundColor: "white",
                      border: "0.5px solid black",
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'transparent',
                      },
                      '& .MuiSelect-select': {
                        '&:focus': {
                          backgroundColor: 'transparent',
                        },
                      },
                    }}
                  >
                    {regionData.map((reg, index) => (
                      <MenuItem key={index}
                        sx={{
                          fontWeight: "bold",
                          fontFamily: "sans-serif",
                          fontSize: "16px",
                          paddingTop: "0px",
                        }}
                        value={reg.regionName}
                      >
                        {reg.regionName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          </div>

          <div>
          <div className="card-container">

<Grid container >
  {filteredTools.map((card) => (
    // <Grid item xs={12} sm={6} md={4} lg={3} >
    <div>
      <Card
      key={card.id}
        className="card"
        sx={{
          transition: 'border-color 0.2s, box-shadow 0.2s',
          borderColor: 'transparent',
          '&:hover': {
            borderColor: 'blue',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          },
          boxShadow: 'none'
        }}
        onClick={() => showToolDetails(card)}
//                   style={{ transition: 'transform 0.2s', borderBlock: 'none' }}
// onMouseEnter={(e) => e.currentTarget.style.borderBlock= '3px solid rgb(137, 162, 247)'}
// onMouseLeave={(e) => e.currentTarget.style.borderBlock = 'none'}
      >
        <CardMedia                    
          alt="Card Image"
         className="card-img"
          image={`data:image/jpeg;base64, ${card.base64ToolImage}`}
          
        />
        <CardContent className="card-data">
          <Typography className="p">Tool name | number: <span style={{ fontWeight: "bold", color: "black" }}>{card.toolName}</span></Typography>
          <Typography className="p">Category: <span style={{ fontWeight: "bold", color: "black" }}>{card.toolCategoryName}</span></Typography>
          <Typography className="p">Part produce: <span style={{ fontWeight: "bold", color: "black" }}>{card.partsProduce}</span></Typography>
          <Typography className="p">Expected useful life: <span style={{ fontWeight: "bold", color: "black" }}>{card.expectedUsefulLife}</span></Typography>
        </CardContent>
      </Card>
      </div>
    // </Grid>
  ))}
</Grid>
</div>
</div>


      
          {/* <div className="card-container">
          
            <div className="row1">
             
              {filteredTools.map((card) => (
               
                <div className="main-card-div" key={card.id} >
                  <div className="card"  onClick={() => showToolDetails(card)}>
                    <img
                      src={card.base64ToolImage}
                      alt="Card Image"  
                    />
                    <img
                      src={`data:image/jpeg;base64, ${card.base64ToolImage}`}
                      alt="Card Image"
                    />
                    <div className="card-data">
                      <p>Tool name | number:<span style={{ fontWeight: "bold",color:"black"}}>
                        {card.toolName}</span></p>
                      <p>
                        Category:{" "}
                        <span style={{ fontWeight: "bold",color:"black"}}>{card.toolCategoryName}</span>
                      </p>
                      <p>What part produce: <span style={{ fontWeight: "bold",color:"black"}}>
                        {card.partsProduce}</span></p>
                      <p>Expected useful life:<span style={{ fontWeight: "bold",color:"black"}}> 
                      {card.expectedUsefulLife}</span></p>
                    </div>
                  </div>
                </div>
              ))}
               
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}; hello
export default ToolsCatalog;
