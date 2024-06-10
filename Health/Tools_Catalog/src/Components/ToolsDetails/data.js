import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';
import Mindmap from './Mindmap';
import './toolsDetails.css';
import BasicBreadcrumbs from './breadCrumbs'
import ToolsCatalog from '../ToolsCatalog/toolsCatalog';

const ToolDetails = ({ tool }) => {
    const [toolDetails, setToolDetails] = useState({});
    const [Categorydata, setCategorydata] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredTools, setFilteredTools] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [cardSlice, setCardSlice] = useState([]);
    const [selectVal, setSelectedVal] = useState("");
    
    // useEffect(() => {
    //     axios.get("http://localhost:8000/GetToolsDetails").then((response) => {
    //         setToolDetails(response?.data);
    //     });
    // }, []);

    useEffect(()=> {
        setToolDetails(tool);
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/GetToolList").then((response) => {
            setCardSlice(response?.data);
            setFilteredTools(response?.data);
            // setCategorydata(response?.data);
        });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/GetCategory2").then((response) => {
            setCategorydata(response?.data);
        });
    }, []);

    useEffect(() => {
        setFilteredTools(
            cardSlice.filter((tool) =>
                tool.Toolname.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, cardSlice]);

    const handleSearch = (e) => {
        const currentTool = e.target.value;
        setSearchTerm(currentTool);
        setDropdownVisible(true);
        if (!currentTool) {
            setDropdownVisible(false);
        }
     
    };

    const handleSelectedTool = (name) => {
        const tool1 = cardSlice.filter((tool) =>
            tool.Toolname.toLowerCase().includes(name.toLowerCase())
        );
        setSearchTerm(name);
        setDropdownVisible(false);
        setFilteredTools(tool1);
        let filtertool=cardSlice.filter(item=>
            (item.Toolname===name && item.category===selectVal)
        )
        console.log("heyyyyyyyyyyyyy",name,filtertool)
        setToolDetails(filtertool[0]);
    };

    const handleClick = (e) => {
        setSelectedVal(e.target.value);
        const filteredResult = cardSlice.filter(item =>
            item.category===e.target.value
        );
        setFilteredTools(filteredResult);
    };

    if (!tool) {
        return null;
    }

    const cardStyle = {
        height: 200,
        width: "90%",
        direction: "row",
        display: "flex"
    };

    const title1Style = {
        fontFamily: 'Segoe UI',
        fontWeight: "bold",
        fontSize: "18px",
        color: "red"
    };

    const title2Style = {
        fontFamily: 'Segoe UI',
        fontWeight: "bold",
        fontSize: "18px",
    };

    return (
        <div className='main-pagedetails'>
            <Toolbar />
            <BasicBreadcrumbs onClick={<ToolsCatalog />} />

            <div className='search-containerdetails'>
                <span className='searchicondetails'>
                    <div className="dropdowndetails">
                        <div className='dropregiondetails'>
                            <select onChange={handleClick}>
                                {Categorydata.map((category) => (
                                    <option value={category.options} key={category.id}>{category.options}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </span>
                <input
                    type='text'
                    className='searchdetails'
                    placeholder='Search tool/equipment name'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                {searchTerm && dropdownVisible && (
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
                )}
            </div>
            <div className='details-card'>
                <div className="cardPosition">
                    <Card sx={cardStyle}>
                        <CardMedia
                            sx={{ height: 170, width: 300, marginLeft: "15px", marginRight: "10px", marginTop: "15px" }}
                            image={toolDetails.imageUrl}
                        />
                        <CardContent sx={{ display: "flex" }}>
                            <div className="titleOne">
                                <Typography>
                                    Tool Name | Number: <span style={{ fontWeight:'bold' }}>{toolDetails.Toolname}</span>
                                    <p>Category: <span style={{ fontWeight: 'bold' }}>{toolDetails.category}</span></p>
                                    <p>What part Produce: <span style={{ fontWeight: 'bold' }}>{toolDetails.WhatPartProduce}</span></p>
                                    <p>Expected Useful life: <span style={{ fontWeight: 'bold' }}>{toolDetails.Expected_usefullife}</span></p>
                                </Typography>
                            </div>
                            <div>
                                <Typography >
                                    <p>Stroke count(Total # of shorts)<span style={{ fontWeight: 'bold' }} key={toolDetails.id}> {toolDetails.Stroke_Count}</span></p>
                                    <p>Number of parts per 1 stroke(# of cavities):<span style={{ fontWeight: 'bold' }} key={toolDetails.id}> {toolDetails.Partsper2Stroke}</span></p>
                                    <p>Expected Useful life:<span style={{ fontWeight: 'bold' }} key={toolDetails.id}> {toolDetails.Expected_Useful_life}</span></p>
                                </Typography>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div style={{ marginLeft: '170px', marginTop: '50px' }}>
                <Mindmap />
            </div>
        </div>
    );
};

export default ToolDetails;