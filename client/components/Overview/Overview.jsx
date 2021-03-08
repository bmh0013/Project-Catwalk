import React, { useState, useEffect } from 'react';
import { Rating } from './Rating.jsx';
import { getReviewInfo, getCurrentProductInfo, getProductInfo } from './serverRequests.js';
import { ProductCategory } from './ProductCategory.jsx';
import { ProductTitle } from './ProductTitle.jsx';
import { ProductPrice } from './ProductPrice.jsx';
import { ProductOverview } from './ProductOverview.jsx';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import { Icon } from '@material-ui/core';

export default function Overview() {
    let [productReview, updateReview] = useState(null);
    let [productCategory, updateCategory] = useState(null);
    let [productTitle, updateTitle] = useState(null);
    let [productPrice, updatePrice] = useState(null);
    let [productOverview, updateOverview] = useState(null);

    useEffect(() => {
      getReviewInfo((err, data) => {
        if (err) {
          console.log('ERROR: ',err);
        } else {
          updateReview(productReview = data);
        }
      })

      getCurrentProductInfo('21112',(err, data) => {
        if (err) {
          console.log('ERROR: ', err);
        } else {
          updateCategory(productCategory = data.data.category);
          updateTitle(productTitle = data.data.name);
          updatePrice(productPrice = data.data.default_price);
          updateOverview(productOverview = data.data.description)
        }
      })

      getProductInfo((err, data) => {
        if (err) {
          console.log('ERROR: ', err);
        } else {
          console.log('PRODUCT INFO: ', data);
        }
      })
    }, [])

    return(
      <div>
        <h1>Overview</h1>
        <Rating reviewData={productReview}/>
        <ProductCategory category={productCategory}/>
        <ProductTitle title={productTitle}/>
        <ProductPrice price={productPrice}/>
        <ProductOverview overview={productOverview}/>
        <FacebookIcon />
        <TwitterIcon />
        <PinterestIcon />

      </div>
    )


}
