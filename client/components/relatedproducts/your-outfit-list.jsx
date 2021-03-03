import React, {useState, useEffect} from 'react';
import OutfitCard from './your-outfit-card.jsx';
import axios from 'axios';

const YourOutfitList = () => {
  const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   axios.get('/proxy/api/fec2/hratx/cart')
  //   .then(res => {
  //     setCartItems(res.data);
  //   })
  //   .catch(err => console.log(err));
  // },[cartItems])

  // const addNewOutfitClick = () => {
  //   console.log('testing if this works');
  //   axios.post('/proxy/api/fec2/hratx/cart')
  //     .then(() => console.log('success'))
  //     .catch(err => console.log(err));
  // }

  return(
    <div className = 'outfit-section'>
      <h1>Your outfits</h1>
      <div className = 'outfit-list'>
        <div className = 'add-outfit-card'>
          {/* <p onClick = {addNewOutfitClick}>+</p> */}
        </div>
        {/* mapping function goes here */}
      </div>
    </div>
  )
};

export default YourOutfitList;