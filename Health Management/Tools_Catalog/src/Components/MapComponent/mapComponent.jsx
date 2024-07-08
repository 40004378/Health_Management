import React, { useState, useEffect } from "react";
import "./style.css";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps"
import axios from 'axios'
import { Tooltip as ReactTooltip } from "react-tooltip";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@material-ui/core/Typography";
import { mapData } from "./MapData";

const MapComponent = () => {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });
    const [selectedFruit, setSelectedFruit] = useState('Category');
    const [products, setProducts] = useState([]);
    const [products1, setProducts1] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [Categorydata, setCategorydata] = useState([]);
    const [content, setContent] = useState("");
    const [toolDetail, setToolDetail] = useState([]);

    const handleMouseEnter = () => {
        alert("heyyyyyyy")
        return (
            <div className="card1">
                <h1>Hello</h1>
            </div>
        )
    };

    function fetchProducts() {
        setProducts(mapData);
    }

    function fetchCategory1() {
        axios.get('http://localhost:7074/api/tool-monitoring/api/v1/Location')
            .then(response => {
                setProducts1(response.data)
                setMarkers(response.data.filter((item) => item.options === "Category"))
                response.data.map(item => console.log(item.coordinates))
                console.log("hey", response.data)
            })
    }

    function fetchCategory2() {
        axios.get('http://localhost:7074/api/tool-monitoring/api/v1/Tools')
            .then(response => {
                setToolDetail(response.data)
                console.log("vidisha",response.data)
            })
    }

    function onChangeDropdown(data) {
        setMarkers(products1.filter((item) => item.options === data))
        setSelectedFruit(data)
        console.log("drop", data)
    }

    useEffect(() => {
        fetchProducts()
        // fetchMarkers()
        fetchCategory1()
        fetchCategory2()
    }, [])

    useEffect(() => {
        axios.get("http://localhost:7074/api/tool-monitoring/api/v1/Category")
            .then((response) => {
                setCategorydata(response?.data)
            })
    }, [])

    useEffect(() => {
        console.log("hiiiii", markers) 
    }, [products1])

    useEffect(() => {
        console.log("markers", markers)
    }, [markers])

    function handleZoomIn() {
        if (position.zoom >= 4) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
    }

    function handleZoomOut() {
        if (position.zoom <= 1) return;
        setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
    }

    function handleMoveEnd(position) {
        setPosition(position);
    }

    // const toolDataDict = toolDetail.reduce((acc, tool) => { acc[tool.toolID] = tool; return acc; }, {});
    // const mergedData = products1.map(category => { category.GetPoints = category.GetPoints.map(point => { const toolInfo = toolDataDict[point.toolId]; if (toolInfo) { return { ...point, partsProduce: toolInfo.partsProduce, toolCategoryName:toolInfo.toolCategoryName, regionName: toolInfo.regionName, Partsper1Stroke: toolInfo.Partsper1Stroke, expectedUsefulLife: toolInfo.expectedUsefulLife, toolName: toolInfo.toolName }; } return point; }); return category; }); 
    // console.log("dataaaaa",JSON.stringify(mergedData, null, 2));

    return (
        <div className="map">
            <div className="map1">
            <div>
                <Typography style={{ fontSize: "20px",fontWeight:"Bold" }}>
                    World Map
                </Typography>
            </div>

            <ReactTooltip
                id="my-tooltip-1"
                place="bottom"
            // content="Hello world! I'm a Tooltip"
            />

            {products.length ?
                <div className="map2">
                            <div className="dropdowndetailsdata">
                                <FormControl>
                                <InputLabel id="demo-simple-select-label" style={{ top: "-16px", fontSize: "17px" }}>Category</InputLabel> 
                                    <Select onChange={e => onChangeDropdown(e.target.value)} className="selectdata" label="Category">
                                        {Categorydata.map((category) => (
                                            <MenuItem key={category.toolCategoryID} value={category.toolCategoryName}>{category.toolCategoryName}</MenuItem>
                                            // <MenuItem key={category.id} value={category.options}>{category.options}</MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                </div>
                    <ComposableMap>
                        <ZoomableGroup
                            zoom={position.zoom}
                            center={position.coordinates}
                            onMoveEnd={handleMoveEnd}
                        >
                            <Geographies geography={products[0]} fill="skyblue" stroke="#FFF">
                                {({ geographies }) =>
                                    geographies.map((geo) => (
                                        <Geography key={geo.rsmKey} geography={geo} />
                                    ))
                                }
                            </Geographies>

                            {markers[0]?.getPoints.map(item => {
                                return (
                                    <>
                                        <Marker data-tooltip-id="my-tooltip-1" data-tooltip-html={`status:${item.status}<br></br>ToolID:${item.toolId}<br></br>RegionName:${item.regionName}
                                        <br></br>WhatPartProduce:${item.partsProduce}<br></br>Expected_useful_life:${item.expectedUsefulLife}`} coordinates={[item.location.longitude,item.location.latitude]}>
                                            <g className="tooltip"
                                                fill="none"
                                                stroke="black"
                                                strokeWidth="1"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                transform="translate(-12, -24)"
                                            >
                                                <circle r={4} cx="12" cy="10" strokeWidth={1} fill={item.status === "Good" ? "green" : item.status === "Poor" ? "red" : "yellow"} />
                                                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                                            </g>

                                            <text textAnchor="middle" x={4} y={7} fill="red" fontSize={"8px"}>
                                                {item.locationName}
                                            </text>
                                        </Marker>
                                    </>)
                            })}
                        </ZoomableGroup>
                    </ComposableMap>




                    <div className="map-label">
                        <button class="button button1"></button>
                        <p class="lab">Good</p>
                        <button class="button button2"></button>
                        <p class="lab">Poor</p>
                        <button class="button button3"></button>
                        <p class="lab">Fair</p>
                    </div>

                </div> : ''}
            {/* <ReactTooltip>{content}</ReactTooltip> */}



        </div>
        <div className="controls">
                        <button onClick={handleZoomIn}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                            >
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>
                        <button onClick={handleZoomOut}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                            >
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                        </button>
                    </div>
        </div>

    )
}
export default MapComponent;