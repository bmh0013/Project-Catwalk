import React, { useState, useEffect } from 'react';
import { StaticRating } from '../../starRating.jsx';

const Ratings = ({ product, metadata }) => {

  return (
    <div>
      <span id='product-rating'>4</span>
      <StaticRating data={metadata.ratings}/>
      <span>100% of reviews recommend this product</span>
    </div>
  )
}

export default Ratings