import React, { useState, useEffect } from 'react';
import { Rating } from './Rating.jsx';
import { getReviewInfo, getProductInfo } from './serverRequests.js';
import { ProductCategory } from './ProductCategory.jsx';

export default function Overview() {
    let [productReview, updateReview] = useState(0);
    let [productData, updateData] = useState(0);

    useEffect(() => {
      getReviewInfo((err, data) => {
        if (err) {
          console.log('ERROR: ',err);
        } else {
          updateReview(productReview = data);
        }
      })

      getProductInfo('21112',(err, data) => {
        if (err) {
          console.log('ERROR: ', err);
        } else {
          console.log('DATA: ', data)
          updateData(productData = data);
          console.log('PRODUCT DATA: ', productData);
        }
      })
    }, [])

    return(
      <div>
        <h1>Overview</h1>
        <Rating reviewData={productReview}/>
        <ProductCategory product={productData}/>
     </div>
    )
}
