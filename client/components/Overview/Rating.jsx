import React, { useState } from 'react';
import { HoverRating, StaticRating } from '../../starRating.jsx';

function Rating() {
    return(
      <div>
        <HoverRating />
        <StaticRating />
      </div>
    )
}

export{
  Rating
}