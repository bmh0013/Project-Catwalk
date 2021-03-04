import React, { useState, useEffect } from 'react';
import { Rating } from './Rating.jsx';
import { getReviewInfo } from './serverRequests.js';

export default function Overview() {
    let [productReview, updateReview] = useState(0);

    useEffect(() => {
      getReviewInfo((err, data) => {
        if (err) {
          console.log('ERROR: ',err);
        } else {
          console.log(data);
          updateReview(productReview = data);
        }
      })
    }, [])

    return(
      <div>
        <h1>Overview</h1>
        <Rating reviewData={productReview}/>
     </div>
    )
}
