import React,{useState} from 'react';
import './dashboard.css'
import { Typography } from '@material-ui/core';
// import { cardData } from '../../ToolsCatalog/images'
const Dashboard = () => {
    // const[isClicked,setIsClicked] = useState(false);

    // const handleClick = () => {
    //     setIsClicked(true);
    // }
    // const firstRowCards = cardData.slice(0, 4);
    // const secondRowCards = cardData.slice(4,8);
    
    return(
        <div>
        <Typography className='main-pagedashboard'>Dashboard</Typography>
        <div className='search-containerdashboard'>

 <input type='text'  className='searchdashboard'  placeholder='What does the tools health look like? and where it is going'  /> 
{/* <SearchTwoToneIcon className='searchicon'/> */}
   </div>
   {/* <div className="card-container">
<div className="row1">
         {firstRowCards.map(card => (
<div className="card" key={card.id}>
            <img src={card.imageUrl} alt="Card Image" onClick={handleClick}/> 
<div className="card-data">
<p>{card.title}</p>
<p >Catagory: <span style={{fontWeight:'bold'}}>{card.catagory}</span></p>
<p>What part produce: {card.catagory}</p>
<p>Expected useful life: {card.catagory}</p>
</div>
</div>
         ))}
</div>
<div className="row">
         {secondRowCards.map(card => (
<div className="card" key={card.id}>
<img src={card.imageUrl} alt="Card Image" />
<div className="card-data">
<h3>{card.title}</h3>
<p>{card.description}</p>
</div>
</div>
         ))}
</div>
</div> */}
</div>
    )
}
export default Dashboard;