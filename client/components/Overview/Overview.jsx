import React, { useState, useEffect } from 'react';
import { Rating } from './Rating.jsx';
import getProductInfo from './serverRequests.js';

export default function Overview() {
    useEffect(() => {getProductInfo()}, [])

    return(
      <div>
        <h1>Overview</h1>
        <Rating />
     </div>
    )
}