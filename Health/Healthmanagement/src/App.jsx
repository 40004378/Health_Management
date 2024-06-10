import React,{useState} from "react";
import ReactDOM from "react-dom";

import "./index.css";
// const Catalog =React.lazy(()=>"ToolsCatalog/Catalog")
import Header from "./Components/Header/header"
import Sidebar  from "./Components/Sidebar/sidebar";
import ToolsCatalog from "tools/ToolsCatalog";
import ToolDetails from "tools/ToolsDetails";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "tools/Dashboard";
import MapComponent from "tools/MapComponent";
import Footer from "./Components/Footer/footer";


// import MapComponent from "../../Tools_Catalog/src/Components/MapComponent/mapComponent";

const App = () => {
  const[selectedComponent, setSelectedComponent] = useState(null);

  const handleButtonClick = (Component) => {
    setSelectedComponent(selectedComponent)
    console.log("she",selectedComponent)
  
  }
  return(
    <div className="app-container">
    <Header />
    <div className="content-container">
    <Sidebar onClick={handleButtonClick} /> 
    {selectedComponent === 'dashboard'  && <Dashboard />} 
     {selectedComponent === "Tools Catalog"   && <ToolsCatalog />}
     {selectedComponent === "Map Component"   && <MapComponent className='mapcontainer'/>}
     {/* <ToolsCatalog /> 
     <ToolsDetails/> */}
     <BrowserRouter>
    <Routes>
    
       {/* <Dashboard />  */}
       <Route path="/dashboard"  element={<Dashboard />} /> 
      
       <Route path="/tools-catalog"  element={<ToolsCatalog />} /> 
    <Route path="/tool-details/:id"  element={<ToolDetails />} />
    <Route path="/map-component" element={<MapComponent/>} />
    </Routes>
    </BrowserRouter> 
    </div>
    <div>
      <Footer />
    </div>
    </div>
);
}
ReactDOM.render(<App />, document.getElementById("app"));
