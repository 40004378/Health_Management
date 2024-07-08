import React,{useState} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./Components/Header/header"
import Sidebar  from "./Components/Sidebar/sidebar";
import ToolsCatalog from "tools/ToolsCatalog";
import ToolDetails from "tools/ToolsDetails";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "tools/Dashboard";
import MapComponent from "tools/MapComponent";
import Footer from "./Components/Footer/footer";

const App = () => {
  const[selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (Component) => {
    setSelectedComponent(selectedComponent)
    console.log("she",selectedComponent)
  
  }
  return(
    <div>
    <div className="app-container">
    <Header />
    <div className="content-container">
     <BrowserRouter>
     <Sidebar /> 
    <Routes>
       <Route path="/dashboard"  element={<Dashboard />} /> 
    <Route path="/tools-catalog"  element={<ToolsCatalog />} /> 
    <Route path="/tool-details/"  element={<ToolDetails />} />
    <Route path="/map-component" element={<MapComponent/>} />
    </Routes>
   
    </BrowserRouter> 
    
    </div>
    <Footer />
    </div>
    
    </div>
);
}
ReactDOM.render(<App />, document.getElementById("app"));