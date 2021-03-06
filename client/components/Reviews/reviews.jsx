import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js';
import ReviewCard from './reviewCard.jsx';
import NewReview from './newReview.jsx';
import API from '../../../api.js';
const axios = require('axios').default;


const Reviews = (props) => {
  var product_id = props.product_id;

  var [product, setProduct] = useState({});
  var [reviewCards, setReviewCards] = useState([]);
  var [metadata, setMetadata] = useState({});
  var [showCards, updateShowCards] = useState([]);
  var [modal, setModal] = useState(false);

  useEffect(() => {
    initializeReviews();
  }, []);

  var initializeReviews = async () => {
    await API.getProduct(product_id)
    .then(res => setProduct(res.data))
    .catch(err => console.error(err))

    await API.getReviewCards({product_id: product_id})
    .then(res => loadReviews(res.data.results))
    .catch(err => console.error(err))

    await API.getMetadata({product_id: product_id})
    .then(res => setMetadata(res.data))
    .catch(err => console.error(err))
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
    setReviewCards(data);
    updateShowCards(oldReview => [...oldReview, ...results]);
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
