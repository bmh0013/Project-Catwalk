import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js';
import ReviewCard from './reviewCard.jsx';
import NewReview from './newReview.jsx';
import $ from 'jquery';
const axios = require('axios').default;


const Reviews = (props) => {
  var product_id = 21114;

  var [product, setProduct] = useState({});
  var [reviewCards, setReviewCards] = useState([]);
  var [metadata, setMetadata] = useState({});
  var [showCards, updateShowCards] = useState([]);
  var [modal, setModal] = useState(false);

  useEffect(() => {
    initializeReviews();
  }, []);

  var initializeReviews = async () => {
    await getProduct()
    .then(res => res.data)
    .then(product => {
      setProduct(product);
    })

    await getReviewCards()
    .then(res => res.data.results)
    .then(reviews => {
      loadReviews(reviews);
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

  function getProduct() {
    return handleGetRequests(`products/${product_id}`)
  }

  function getReviewCards() {
    return handleGetRequests('reviews')
  }

  function getMetadata() {
    return handleGetRequests('reviews/meta')
  }

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
    setReviewCards(data);
    updateShowCards(oldReview => [...oldReview, ...results]);
  }

  function handleGetRequests(route) {
    let headers = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/${route}`,
      headers: {
        Authorization: TOKEN
      },
      params: {
        product_id: product_id
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
          {showCards.map(review =>
          <ReviewCard
            key={review.review_id}
            reviewCard={review}
          />)}
          {!!reviewCards.length && <button onClick={() => {loadReviews(reviewCards)}}>Load More</button>}
          <button onClick={() => {setModal(true)}}>Add A Review</button>
        </div>
      </div>
      {modal && <NewReview setModal={setModal} product={product}/>}
    </div>
    )
};

export default Reviews;
