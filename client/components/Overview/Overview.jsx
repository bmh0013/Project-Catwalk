import React, { useState, useEffect } from 'react';
import { Rating } from './Rating.jsx';
import { ProductCategory } from './ProductCategory.jsx';
import { ProductTitle } from './ProductTitle.jsx';
import { ProductPrice } from './ProductPrice.jsx';
import { ProductOverview } from './ProductOverview.jsx';
import { ProductStyles } from './ProductStyles.jsx';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import api from '../../../api.js';
import axios from 'axios';


export default function Overview({product_id}) {
    let [productReview, updateReview] = useState(null);
    let [productCategory, updateCategory] = useState(null);
    let [productTitle, updateTitle] = useState(null);
    let [productPrice, updatePrice] = useState(null);
    let [productOverview, updateOverview] = useState(null);
    let [productStyles, updateStyles] = useState(null);

    useEffect(() => {
      api.getMetadata({product_id})
        .then(res => {
          updateReview(productReview = res.data.ratings);
        })
        .catch(err => {
          console.log('ERROR: ', err);
        })

      api.getProduct(product_id)
        .then(res => {
          updateCategory(productCategory = res.data.category);
          updateTitle(productTitle = res.data.name);
          updatePrice(productPrice = res.data.default_price);
          updateOverview(productOverview = res.data.description);
        })
        .catch(err => {
          console.log('ERROR: ', err);
        })

      api.getProductStyles(product_id)
        .then(res => {
          updateStyles(productStyles = res.data.results);
        })
        .catch(err => {
          console.log('ERROR: ', err);
        })
    }, [])

    return(
      <div>
        
        <h1>Overview</h1>
        {productReview && <Rating reviewData={productReview}/>}
        {productCategory && <ProductCategory category={productCategory}/>}
        {productTitle && <ProductTitle title={productTitle}/>}
        {productPrice && <ProductPrice price={productPrice}/>}
        {productOverview && <ProductOverview overview={productOverview}/>}
        {productStyles && <ProductStyles styles={productStyles}/>}
        <FacebookIcon />
        <TwitterIcon />
        <PinterestIcon />

      </div>
    )


}
