import React, { useState,useEffect } from 'react';
import TOKEN from '../../../token.js'
import API from '../../../api.js';
const axios = require('axios').default;
var moment = require('moment');

const ReviewCard = (props) => {
  let card = props.reviewCard;
  let date = moment(card.date, 'YYYY-MM-DD').format('MMMM D, YYYY');

  function handleHelpful(e) {
    let review_id = e.target.getAttribute('data');
    API.updateHelpful(review_id, {review_id})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function handleReport(e) {
    let review_id = e.target.getAttribute('data');
    API.updateReport(review_id, {review_id})
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }

  function handlePutRequests(review_id, route) {
    let headers = {
      method: 'put',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/${review_id}/${route}`,
      headers: {
        Authorization: TOKEN
      },
      parameters: {
        review_id: review_id
      }
    };
    axios(headers)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  }

  return (
    <div className='review-card'>
      <span className="rating">Rating: {card.rating}</span>
      <span className="user_date">{card.reviewer_name} | {date}</span>
      <h5>{card.body}</h5>
      <p>
        {card.summary}
      </p>
      <span className="thumbnail-container">
        {card.photos.map(photo =>
          <a href={photo.url} key={photo.id}>
            <img className="thumbnail" src={photo.url}>
            </img>
          </a>
        )}
      </span>
      {!!card.response && <p><u>Response:</u> {card.response}</p>}
      <span className='helpful'>
        Helpful? &nbsp;
        <a className='helpful-link' data={card.review_id} onClick={handleHelpful}>Yes</a> ({card.helpfulness}) &nbsp; |  &nbsp;
        <a className='report-link' data={card.review_id} onClick={handleReport}>Report</a>
      </span>
      {!!card.recommend && <span className='recommend'><u>I recommend this product!</u></span>}
    </div>
    )
};

export default ReviewCard;
