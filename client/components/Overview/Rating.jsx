import React, { useState } from 'react';
import { HoverRating, StaticRating } from '../../starRating.jsx';

function Rating(props) {
    let reviewData = props.reviewData;
    if (reviewData) {
      let numOfReviews = Object.values(reviewData).reduce((a, b) => Number(a) + Number(b), 0);
      if (numOfReviews > 0) {
        return(
          <div>
            <StaticRating data={reviewData}/>
            <a>Read all {numOfReviews} reviews</a>
          </div>
        )
      } else {
        return(
          <div>
            <StaticRating data={reviewData}/>
          </div>
        )
      }
    } else {
      return (<div></div>)
    }


}

export{
  Rating
}