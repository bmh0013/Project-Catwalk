import React from 'react';

const RelatedProductCard = ({name, category, image, price}) => (
  <div className = 'related-card'>
    <p>{name}</p>
    <p>{category}</p>
    <img src = {image} alt = {name} />
    <p>{price}</p>
  </div>
);

export default RelatedProductCard;