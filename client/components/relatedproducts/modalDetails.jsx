//this will take care of showing all the card details when a user clicks on a click
//this compares the clicked product to the current item in the overview

import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ModalDetails = ({currentProductId, name, category, price}) => {

  const [currentProduct, setCurrentProduct] = useState([]);

  //should run whenever a new current product id has changed
  useEffect(() => {
    const url = `/proxy/api/fec2/hratx/products/${currentProductId}`;
    axios.get(url)
      .then(res => {
        console.log('response data', res.data) //working fine
        setCurrentProduct(res.data)
      })
      .then(() => console.log('currentproduct', currentProduct))
      .catch(err => console.log(err))
  },[currentProductId])

  return(
    <div>
      <h1>COMPARING</h1>
      <h2>{currentProductId}</h2>
      <p>{name}<span className = 'comparison'>Name</span>{currentProduct.name}</p>
      <p>{category}<span className = 'comparison'>Category</span>{currentProduct.category}</p>
      <p>{price}<span className = 'comparison'>Price</span>{currentProduct.default_price}</p>
      <p><span className = 'comparison'>Number of Features</span>{currentProduct.features.length}</p>

    </div>
  )
};

export default ModalDetails;