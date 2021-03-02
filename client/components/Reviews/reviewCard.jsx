import React, { useState,useEffect } from 'react';
var moment = require('moment');

const ReviewCard = (props) => {
  let date = moment(props.review.date, 'YYYY-MM-DD').format('MMMM D, YYYY');

  return (
    <div className='review-card'>
      <span className="rating">Rating: {props.review.rating}</span>
      <span className="user_date">{props.review.reviewer_name} | {date}</span>
      <h5>{props.review.body}</h5>
      <p>
        {props.review.summary}
      </p>
      {!!props.review.response && <p><u>Response:</u> {props.review.response}</p>}
      <span className='helpful'>
        Helpful? Yes ({props.review.helpfulness}) | Report
      </span>
      {!!props.review.recommend && <span className='recommend'><u>I recommend this product!</u></span>}
    </div>
    )
};

export default ReviewCard;