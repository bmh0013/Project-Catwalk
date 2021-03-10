import React from 'react';
import CharBreakdown from './charBreakdown.jsx';
import { StaticRating } from '../../starRating.jsx';

const Ratings = ({ metadata, reviewCards }) => {
  let totalReviews = 0, recommend = 0;

  reviewCards.forEach(card => {
    if (card.recommend) {
      recommend++;
    }
    totalReviews++;
  });

  const percentage = Math.round(100 * (recommend / totalReviews));
  const totalRatings = Object.values(metadata.ratings).reduce((a, b) => Number(a) + Number(b));
  const stars5 = starBarFill(5);
  const stars4 = starBarFill(4);
  const stars3 = starBarFill(3);
  const stars2 = starBarFill(2);
  const stars1 = starBarFill(1);
  const allStars = [stars5, stars4, stars3, stars2, stars1]

  const overallRating = Object.entries(metadata.ratings)
    .map(e => Number(e[0]) * Number(e[1]))
    .reduce((a, b) => Number(a) + Number(b), 0) / totalRatings;

  function starBarFill(n) {
    return metadata.ratings[n] ? Math.round( 100 * ( Number(metadata.ratings[n]) / totalRatings ) ) : 0;
  }

  return (
    <div>
      <div id='product-rating'>
        <span>{overallRating.toFixed(1)}</span>
        <StaticRating data={metadata.ratings} id="overall-rating"/>
      </div>
      <span>{percentage}% of reviews recommend this product</span>
      <div className="bar-graph-container">
        {allStars.map((star, index) => {
          return (
            <div key={index}>
              <em>{index + 1} Stars:</em>
              <div
              className="bar-graph"
              style={{background: `linear-gradient(to right, green ${star}%, lightgrey 0%)`}}>
              </div><br/>
            </div>
          )
        })}
      </div>
      <CharBreakdown metadata={metadata} />
    </div>
  )
}

export default Ratings;
