import React, { useState } from 'react';
import { HoverRating, StaticRating } from '../../starRating.jsx';

function Rating(props) {
    return(
      <div>
        <StaticRating data={props}/>
        <HoverRating />
      </div>
    )
}

export{
  Rating
}