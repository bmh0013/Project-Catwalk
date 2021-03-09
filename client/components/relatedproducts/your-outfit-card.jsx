import React from 'react';
import {XCircle} from 'react-bootstrap-icons';
import {StaticRating} from '../../starRating.jsx';

const OutfitCard = ({id, image, name, category, price, rating, removeListItem}) => {

  return(
    <div className = 'product-card'>
      <XCircle size = {23} onClick = {() => removeListItem(id)}
        style = {{
          position: 'absolute',
          left: '20rem',
          top: '1.5rem'
        }}
      />
      <img className = 'product-image' src = {image} alt = {name} />
      <p className = 'product-name'>{name}</p>
      <p className = 'product-category'>{category}</p>
      <p className = 'product-price'>${price}</p>
      <StaticRating data = {rating} />
    </div>
  )
};

export default OutfitCard;