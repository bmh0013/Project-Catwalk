import React from 'react';
import {XCircle} from 'react-bootstrap-icons';

const OutfitCard = ({id, image, name, category, price, removeListItem}) => {
  return(
    <div className = 'product-card'>
      <XCircle size = {30} onClick = {() => removeListItem(id)}/>
      <img className = 'product-image' src = {image} alt = {name} />
      <p className = 'product-name'>{name}</p>
      <p className = 'product-category'>{category}</p>
      <p className = 'product-price'>{price}</p>
    </div>
  )
};

export default OutfitCard;