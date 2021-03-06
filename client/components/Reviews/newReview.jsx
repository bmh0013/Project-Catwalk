import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js';
const axios = require('axios').default;

const NewReview = (props) => {
  let [reviewImages, setReviewImages] = useState([]);

  useEffect(() => {
    let headers = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews/meta`,
      headers: {
        Authorization: TOKEN
      },
      params: {
        product_id: 21114
      }
    };

    axios(headers)
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    })
  })

  function closeModal() {
    props.setModal(false);
  }

  function postNewReview(parameters) {
    let headers = {
      method: 'post',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hratx/reviews',
      headers: {
        Authorization: TOKEN
      },
      params: parameters
    };

    console.log(parameters);
    axios(headers)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  }

  function handleUploadImages(e) {
    document.getElementById('thumbnails').innerHTML = '';
    let image;
    for (let i = 0; i < e.target.files.length; i++) {
      image = URL.createObjectURL(e.target.files[i]);
      setReviewImages(prevImages => [...prevImages, image]);
    }
  }

  function handleSubmitReview(e) {
    e.preventDefault();
    props.setModal(false);
    let form = document.getElementById('newReview').elements;

    let parameters = {
      product_id: props.product.id,
      rating: Number(form.rating.value),
      summary: form.summary.value || '',
      body: form.body.value,
      recommend: Boolean(form.recommend.value),
      name: form.nickname.value,
      email: form.email.value,
      photos: [],
      characteristics: {
        Comfort: form.comfort.value,
        Quality: form.quality.value,
        Length: form.long.value,
        Fit: form.fit.value
      }
    }

    console.log('Submitted!');
    postNewReview(parameters)
  }

  return (
    <div className='modal-outer'>
      <div className='modal-inner'>
        <button className="close" onClick={closeModal}>X</button>
        <h3>Write Your Review About: {props.product.name}</h3>
        <form id="newReview" onSubmit={handleSubmitReview}>

        <div className="field">
          <label className="label required">Overall Rating</label><br/>
          <input name="rating" type="radio" value="1" required/>1
          <input name="rating" type="radio" value="2" required/>2
          <input name="rating" type="radio" value="3" required/>3
          <input name="rating" type="radio" value="4" required/>4
          <input name="rating" type="radio" value="5" required/>5
        </div>

        <div className="field">
          <label className="label required">Do you recommend this product?</label><br/>
          <input name="recommend" type="radio" value="true" required/>Yes
          <input name="recommend" type="radio" value="false" required/>No
        </div>

        <div className="field">
          <h5 className="required">Characteristics</h5>
          <label className="label" required>Size</label><br/>
          <input name="size" type="radio" value="1" required/>1
          <input name="size" type="radio" value="2" required/>2
          <input name="size" type="radio" value="3" required/>3
          <input name="size" type="radio" value="4" required/>4
          <input name="size" type="radio" value="5" required/>5
          <br/>
          <label className="label" required>Width</label><br/>
          <input name="width" type="radio" value="1" required/>1
          <input name="width" type="radio" value="2" required/>2
          <input name="width" type="radio" value="3" required/>3
          <input name="width" type="radio" value="4" required/>4
          <input name="width" type="radio" value="5" required/>5
          <br/>
          <label className="label" required>Comfort</label><br/>
          <input name="comfort" type="radio" value="1" required/>1
          <input name="comfort" type="radio" value="2" required/>2
          <input name="comfort" type="radio" value="3" required/>3
          <input name="comfort" type="radio" value="4" required/>4
          <input name="comfort" type="radio" value="5" required/>5
          <br/>
          <label className="label" required>Quality</label><br/>
          <input name="quality" type="radio" value="1" required/>1
          <input name="quality" type="radio" value="2" required/>2
          <input name="quality" type="radio" value="3" required/>3
          <input name="quality" type="radio" value="4" required/>4
          <input name="quality" type="radio" value="5" required/>5
          <br/>
          <label className="label" required>Length</label><br/>
          <input name="long" type="radio" value="1" required/>1
          <input name="long" type="radio" value="2" required/>2
          <input name="long" type="radio" value="3" required/>3
          <input name="long" type="radio" value="4" required/>4
          <input name="long" type="radio" value="5" required/>5
          <br/>
          <label className="label" required>Fit</label><br/>
          <input name="fit" type="radio" value="1" required/>1
          <input name="fit" type="radio" value="2" required/>2
          <input name="fit" type="radio" value="3" required/>3
          <input name="fit" type="radio" value="4" required/>4
          <input name="fit" type="radio" value="5" required/>5
        </div>

        <div className="field">
          <label className="label">Review Summary</label><br/>
          <input type="text" name="summary" maxLength="60" placeholder="Enter text here..." />
        </div>

        <div className="field">
          <label className="label required">Review Body</label><br/>
          <textarea maxLength="1000" name="body" placeholder="Why did you like the product or not?" required></textarea>
        </div>

        <div className="field">
          <label className="label">Upload Images:</label>
          <input type="file" name="photos" onChange={handleUploadImages} accept="image/*" multiple />
          <span id="thumbnails">
            {reviewImages.map(image => <img src={image} key={image} className="thumbnail"></img>)}
          </span>
        </div>

        <div className="field">
          <label className="label required">Nickname:</label><br/>
          <input type="text" name="nickname" maxLength="60" placeholder="Example: jackson11!" required />
        </div>

        <div className="field">
          <label className="label required">Email:</label><br/>
          <input type="text" name="email" maxLength="60" placeholder="Example: jackson11@email.com" required />
        </div>

        <input type="submit" />

        </form>
      </div>
    </div>
    )
};

export default NewReview;