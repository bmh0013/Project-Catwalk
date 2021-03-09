import React, { useState, useEffect } from 'react';
import { StaticRating } from '../../starRating.jsx';

const Ratings = ({ metadata, reviewCards }) => {
  let totalReviews = 0, recommend = 0;

  reviewCards.forEach(card => {
    if (card.recommend) {
      recommend++;
    }
    totalReviews++;
  });

  let percentage = Math.round(100 * (recommend / totalReviews));
  let totalRatings = Object.values(metadata.ratings).reduce((a, b) => Number(a) + Number(b));
  let stars5 = starBarFill(5);
  let stars4 = starBarFill(4);
  let stars3 = starBarFill(3);
  let stars2 = starBarFill(2);
  let stars1 = starBarFill(1);

  function starBarFill(n) {
    return metadata.ratings[n] ? Math.round( 100 * ( Number(metadata.ratings[n]) / totalRatings ) ) : 0;
  }

  let statistics = (
    <div>
      <em>5 Stars:</em>
        <div
        className="bar-graph"
        style={{background: `linear-gradient(to right, green ${stars5}%, lightgrey 0%)`}}>
        </div><br/>

        <em>4 Stars:</em>
        <div
        className="bar-graph"
        style={{background: `linear-gradient(to right, green ${stars4}%, lightgrey 0%)`}}>
        </div><br/>

        <em>3 Stars:</em>
        <div
        className="bar-graph"
        style={{background: `linear-gradient(to right, green ${stars3}%, lightgrey 0%)`}}>
        </div><br/>

        <em>2 Stars:</em>
        <div
        className="bar-graph"
        style={{background: `linear-gradient(to right, green ${stars2}%, lightgrey 0%)`}}>
        </div><br/>

        <em>1 Stars:</em>
        <div
        className="bar-graph"
        style={{background: `linear-gradient(to right, green ${stars1}%, lightgrey 0%)`}}>
        </div><br/>
    </div>
  )

  return (
    <div>
      <span id='product-rating'>4</span>
      <StaticRating data={metadata.ratings}/>
      <span>{percentage}% of reviews recommend this product</span>
      {statistics}
    </div>
  )
}

export default Ratings