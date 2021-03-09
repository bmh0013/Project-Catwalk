import React from 'react';
import {XCircle} from 'react-bootstrap-icons';

const OutfitCard = ({id, image, name, category, price, removeListItem}) => {

  return(
    <div className = 'product-card'>
      <XCircle size = {23} onClick = {() => removeListItem(id)}
        style = {{
          position: 'absolute',
          left: '20rem',
          top: '1.5rem'
          // color: 'white'
        }}
      />
      <img className = 'product-image' src = {image} alt = {name} />
      <p className = 'product-name'>{name}</p>
      <p className = 'product-category'>{category}</p>
      <p className = 'product-price'>${price}</p>
    </div>
  )
};

export default OutfitCard;