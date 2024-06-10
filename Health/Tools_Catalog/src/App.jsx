import React from "react";
import ReactDOM from "react-dom";
import ToolsCatalog from './Components/ToolsCatalog/toolsCatalog';
import ToolDetails from "./Components/ToolsDetails/toolsDetails";
import MapComponent from '../src/Components/MapComponent/mapComponent'
import {Routes, Route, BrowserRouter } from "react-router-dom";
import "./index.css";


const center = { lat: -34.397, lng: 150.644 };
 const zoom = 8;
 const markers = [
   { lat: -34.397, lng: 150.644, title: 'Marker 1' },
   { lat: -35.0, lng: 151.0, title: 'Marker 2' },
   // Add more markers as needed
 ];
const App = () => (
  <div className="container">
    <BrowserRouter>
    <Routes>
    <Route path="/tools-catalog"  element={<ToolsCatalog />} /> 
    <Route path="/tool-details/:id"  element={<ToolDetails />} /> 
    </Routes>
    </BrowserRouter>
    {/* <ToolsCatalog /> 
    <MapComponent center={center} zoom={zoom} markers={markers} />
    <div>Name: Tools_Catalog</div>
    <div>Framework: react</div>
    <div>Language: JavaScript</div>
    <div>CSS: Empty CSS</div>
     */}
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
