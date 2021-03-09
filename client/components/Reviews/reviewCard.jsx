import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js'
import API from '../../../api.js';
import { StaticRating } from '../../starRating.jsx';
import Body from './body.jsx';
const axios = require('axios').default;
var moment = require('moment');

const ReviewCard = ({ reviewCard }) => {
  const date = moment(reviewCard.date, 'YYYY-MM-DD').format('MMMM D, YYYY');

  function handleHelpful(e) {
    const review_id = e.target.getAttribute('data');
    API.updateHelpful(review_id, {review_id})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function handleReport(e) {
    const review_id = e.target.getAttribute('data');
    API.updateReport(review_id, {review_id})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  const thumbnails = (
    <div className="thumbnail-container">
      {reviewCard.photos.map(photo =>
        <a key={photo.id}>
          <img className="thumbnail" src={photo.url}/>
        </a>
      )}
    </div>
  );

  const feedback = (
    <span className='helpful'>
      Helpful? &nbsp;
      <a className='helpful-link' data={reviewCard.review_id} onClick={handleHelpful}>Yes </a>
      ({ reviewCard.helpfulness }) &nbsp; |  &nbsp;
      <a className='report-link' data={reviewCard.review_id} onClick={handleReport}>Report</a>
    </span>
  );

  return (
    <div className='review-card' id={reviewCard.review_id}>
      <span className="rating">
        <StaticRating data={{[reviewCard.rating]: 1}} />
      </span>
      <span className="user_date">
        {reviewCard.reviewer_name} | {date}
      </span>
      <h5>{reviewCard.summary}</h5>
      <Body body={reviewCard.body} id={reviewCard.review_id}/>
      {thumbnails}
      {!!reviewCard.response && <p><u>Response:</u> {reviewCard.response}</p>}
      {feedback}
      {!!reviewCard.recommend && <span className='recommend'><u>I recommend this product!</u></span>}
    </div>
    )
};

export default ReviewCard;
