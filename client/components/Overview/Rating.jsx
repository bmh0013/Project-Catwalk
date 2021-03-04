import React, { useState } from 'react';
import { HoverRating, StaticRating } from '../../starRating.jsx';

function Rating(props) {
    // let reviewData = props.data.reviewData;
    let reviewData = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 1
    }
    let numOfReviews = Object.values(reviewData).reduce((a, b) => a + b, 0);
    if (numOfReviews > 0) {
      return(
        <div>
          <StaticRating data={props}/>
          <a>Read all {numOfReviews} reviews</a>
        </div>
      )
    } else {
      return(
        <div>
          <StaticRating data={props}/>
        </div>
      )
    }

}

export{
  Rating
}