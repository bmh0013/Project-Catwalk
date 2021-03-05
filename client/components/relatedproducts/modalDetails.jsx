//this will take care of showing all the card details when a user clicks on a click
//this compares the clicked product to the current item in the overview

import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ModalDetails = ({currentProductId, name, category, price, features}) => {

  const [currentProduct, setCurrentProduct] = useState([]);

  //should run whenever a new current product id has changed
  useEffect(() => {
    const url = `/proxy/api/fec2/hratx/products/${currentProductId}`;
    axios.get(url)
      .then(res => {
        console.log('response data', res.data) //working fine
        setCurrentProduct(res.data)
      })
      .catch(err => console.log('error updating the modal', err))
  },[currentProductId])

  return(
    <div>
      <h1>COMPARING</h1>
      <table>
        <tbody>
          <tr>
            <th>{name}</th>
            <th></th>
            <th>{currentProduct.name}</th>
          </tr>
          <tr>
            <th>{category}</th>
            <th>Category</th>
            <th>{currentProduct.category}</th>
          </tr>
          <tr>
            <th>{price}</th>
            <th>Price</th>
            <th>{currentProduct.default_price}</th>
          </tr>
          <tr>
            <th>{features.length}</th>
            <th>Features</th>
            <th>Figure out why I can't retrieve length</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default ModalDetails;