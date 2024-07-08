import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ToolsCatalog from "./Components/ToolsCatalog/toolsCatalog";
import ToolDetails from "./Components/ToolsDetails/toolsDetails";
import Dashboard from "./Components/Dashboard/dashboard";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import MapComponent from "./Components/MapComponent/mapComponent"


const App = () => (
  <div className="container">
    <BrowserRouter>
    <Routes>
    <Route path="/tools-catalog"  element={<ToolsCatalog />} /> 
    <Route path="/tool-details/"  element={<ToolDetails />} /> 
    </Routes>
    </BrowserRouter>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
