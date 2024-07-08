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
// import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ToolDetails = () => {
  const location = useLocation();
  const[tool, setTool] = useState(location.state?.tool || null);
  const [toolDetails, setToolDetails] = useState([]);
  const [Categorydata, setCategorydata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTools, setFilteredTools] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [cardSlice, setCardSlice] = useState([]);
  const [selectVal, setSelectedVal] = useState("");
  const [filterResult, setFilterResult] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Category');
  const navigate = useNavigate();
// const { id } = useParams();

 
 
useEffect(() => {
  if(!tool){
    return null;
  }
  // axios.get(`http://localhost:5168/api/tool-monitoring/api/v1/Tools/${id}`).then((response) => {
  //     setTool(response?.data);
  // });
  axios.get("http://localhost:7074/api/tool-monitoring/api/v1/Category").then((response) => {
      setCategorydata(response?.data);
  });
  axios.get(`http://localhost:7074/api/tool-monitoring/api/v1/Tools`).then((response) => {
      setCardSlice(response?.data);
     
  });
}, [tool] );
const dataTools=()=>{
   // Filter tools based on the selected category and search term
   let filtered = cardSlice;
 
   if (selectedCategory) {
     filtered = filtered.filter(tool => tool.toolCategoryName === selectedCategory);
   }

   if (searchTerm) {
     filtered = filtered.filter(tool => tool.toolName.toLowerCase().includes(searchTerm.toLowerCase()));
   }
   setFilteredTools(filtered);
console.log("dash", filtered)

}
 
useEffect(() => {
   dataTools();  
  }, [selectedCategory, searchTerm, cardSlice]);
 
// useEffect(() => {
//   if (searchTerm !=="") {
//       setFilteredTools(
//           filterResult.filter((tool) =>
//               tool.Toolname.toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//   }      
// }, [searchTerm]);
 
const handleSearch = (event) => {
  const currentTool = event.target.value;
  setSearchTerm(currentTool);
  setDropdownVisible(true);
  if (!currentTool) {
      setDropdownVisible(false);
  }
};
 
const handleSelectedTool = (id) =>{
    const selectedTool = cardSlice.find(tool =>tool.id === id );
    setTool(selectedTool);
    setDropdownVisible(false);
 
};
 
// const handleSelectedTool = (name) => {
//   const tool1 = filterResult.filter((tool) =>
//       tool.Toolname.toLowerCase().includes(name.toLowerCase())
//   );
//   setSearchTerm(name);
//   setDropdownVisible(false);
//   setFilteredTools(tool1);
//   let filtertool=cardSlice.filter(item=>
//       (item.Toolname===name && item.category===selectedCategory)
//   )
//   console.log("heyyyyyyyyyyyyy",name,filtertool)
//   setTool(filtertool[0]);
// };
 
const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSearchTerm('');
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
 
 
 
  return (
    <div className="main-pagedetails">
      <Toolbar />
      <div className="fontStyle">
                <Typography className='textStyle'>
                    <Typography style={{color:"red", fontFamily:"sans-serif", fontWeight:600, cursor:"pointer" }}  onClick={handleTextClick}>Tools Catalog </Typography>
                    <ChevronRightIcon className='iconStyle'></ChevronRightIcon>
                    <Typography style={{color:"black", fontFamily:"sans-serif", fontWeight:600}}  >Tools Details</Typography>
                </Typography>
            </div>
 
     
      <div className="search-containerdetails">
        <span className="searchicondetails">
          <div className="dropdowndetails">
            <FormControl>
            <InputLabel id="demo-simple-select-label" style={{ top: "-16px", fontSize: "17px", fontWeight:"bold", color:"black"}}>Category</InputLabel>
              <Select onChange={handleCategoryChange} className="select" label="Category" sx={{ '& .MuiOutlinedInput-notchedOutline': {
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
                      },}}>
                {Categorydata.map((category) => (
                  <MenuItem key={category.toolCategoryID} value={category.toolCategoryName}>
                    {category.toolCategoryName}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </span>
        <div className="input-div">
            <Input
              type="text"
              placeholder="Search tool/equipment name"
              value={searchTerm}
              style={{padding:"4px",fontSize: "17px",width:"369px"}}
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
                {selectedCategory && dropdownVisible && (
                    <div className="dropdown-menu-data">
                        {filteredTools.map((tool) => (
                            <div
                            key={tool.id}
                              className="dropdown-item"
                                value={tool.id}
                                onClick={() => handleSelectedTool(tool.id)}
                               
                            >
                                {tool.toolName}
                            </div>
                        ))}
                    </div>
                )}
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
               src={`data:image/jpeg;base64, ${tool.base64ToolImage}`}
                      alt="Card Image"
            />
          </div>
          <CardContent sx={{ display: "flex" }}>
            <div className="details-typo">
              <p>
                Tool Name | Number:{" "}
                <span style={{ fontWeight: 550, color: "black", fontFamily:"sans-serif" }}>
                  {tool.toolName}
                </span>
              </p>
              <p>
                Category:{" "}
                <span style={{ fontWeight: 550, color: "black", fontFamily:"sans-serif" }}>
                  {tool.toolCategoryName}
                </span>
              </p>
              <p>
                What part Produce:{" "}
                <span style={{ fontWeight: 550, color: "black", fontFamily:"sans-serif" }}>
                  {tool.partsProduce}
                </span>
              </p>
              <p>
                Number of parts per 1 stroke(# of cavities):
                <span
                 style={{ fontWeight: 550, color: "black", fontFamily:"sans-serif" }}
                  key={tool.id}
                >
                  {" "}
                  {tool.numberofPartsPerStroke}
                </span>
              </p>
            </div>
 
            <div className="details-typo2">
              <p>
                Stroke count(Total # of shorts):
                <span
                  style={{ fontWeight: 550, color: "black", fontFamily:"sans-serif" }}
                  key={tool.id}
                >
                  {" "}
                  {tool.strokeCount}
                </span>
              </p>
              <p>
                Number of parts per 1 stroke(# of cavities):
                <span
                  style={{ fontWeight: 550, color: "black", fontFamily:"sans-serif" }}
                  key={tool.id}
                >
                  {" "}
                  {tool.numberofPartsPerStroke}
                </span>
              </p>
              <p>
                Expected Useful life:
                <span
                 style={{ fontWeight: 550, color: "black", fontFamily:"sans-serif" }}
                  key={tool.id}
                >
                  {" "}
                  {tool.expectedUsefulLife}
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