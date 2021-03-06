import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js'
const axios = require('axios').default;

const NewReview = (props) => {
  useEffect(() => {
  }, [])

  function closeModal() {
    props.setModal(false);
  }

  function postNewReview() {
    let headers = {
      method: 'post',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews',
      headers: {
        Authorization: TOKEN
      },
      parameters: {
        product_id: metadata.product_id,
        rating: INT,
        summary: '',
        body: '',
        recommend: BOOL,
        name: '',
        email: '',
        photos: ARR_OF_TEXT_URLS,
        characteristics: OBJECT
      }
    }
    axios(headers)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <div className='modal-outer'>
      <div className='modal-inner'>
        <button className="close" onClick={closeModal}>X</button>
        <h1>Hello</h1>
        <p>Some text here just for reference</p>
      </div>
    </div>
    )
};

export default NewReview;