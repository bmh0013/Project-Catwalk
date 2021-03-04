import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js'
import ReviewCard from './reviewCard.jsx'
const axios = require('axios').default;


const Reviews = (props) => {
  var [resData, setResData] = useState([]);
  var [metadata, setMetadata] = useState({});
  var [reviewCards, setReviewCards] = useState([]);

  useEffect(() => {
    initializeReviews();
  }, []);

  var initializeReviews = async () => {
    await getReviewCards()
    .then(res => res.data.results)
    .then(data => {
      loadReviews(data);
    })
    .catch(err => {
      console.error(err);
    })

    await getMetadata()
    .then(res => {
      setMetadata(res.data);
    })
    .catch(err => {
      console.error(err);
    })
  };

  function loadReviews(data) {
    let results = [];
    let count = 0;
    for (let i = 0; i < 2; i++) {
      if (data[i]) {
        count++;
        results.push(data[i]);
      }
    }
    data.splice(0, count)
    setResData(data);
    setReviewCards(oldReview => [...oldReview, ...results]);
  }

  function getReviewCards() {
    return handleGetRequests('reviews')
  }

  function getMetadata() {
    return handleGetRequests('reviews/meta')
  }

  function handleGetRequests(route) {
    let headers = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
      headers: {
        Authorization: TOKEN
      },
      params: {
        product_id: 21112
      }
    };
    return axios(headers)
  }

  return (
    <div>
      <h3>Ratings & Reviews</h3>
      <div className="flex-container">
        <div className="flex-left">
          This will have Star Rating information.
        </div>
        <div className="flex-right">
          {reviewCards.map(review =>
          <ReviewCard
            key={review.review_id}
            data={resData}
            review={review}
          />)}
          {!!resData.length && <button onClick={() => {loadReviews(resData)}}>Load More</button>}
          <button onClick={() => {console.log(resData, metadata)}}>Add A Review</button>
        </div>
      </div>
    </div>
    )
};

export default Reviews;
