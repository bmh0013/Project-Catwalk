import React, { useState, useEffect } from 'react';
import TOKEN from '../../../token.js';
import API from '../../../api.js';
import { HoverRating } from '../../starRating.jsx';
const axios = require('axios').default;

import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: '70%',
    height: '70%',
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  helperText: {
    color: "blue",
  },
}));


const NewReview = ({ product, metadata, setModal }) => {
  const classes = useStyles();
  const [modalStyle] = useState({
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  });
  let [formValidation, setFormValidation] = useState(true)
  let [reviewImages, setReviewImages] = useState([]);
  let characteristicList = Object.keys(metadata.characteristics);

  function closeModal() {
    setModal(false);
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
    const rating = document.getElementById('hover-rating').getAttribute('value');
    const form = document.getElementById('newReview').elements;

    // Checks email validation
    if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email.value)) {
      setFormValidation(false)
      return
    }

    if (rating === null) {
      alert('Please select a rating');
      return
    } else {
      setModal(false);
      let characteristics = {};
      const charList = Object.keys(metadata.characteristics);

      charList.forEach(char => {
        const char_id = metadata.characteristics[char].id
        const value = form[char].value;
        characteristics[char_id] = Number(value);
      })

      const json = {
        product_id: product.id,
        rating: Number(rating),
        summary: form.summary.value || '',
        body: form.body.value,
        recommend: form.recommend.value === 'true' ? true : false,
        name: form.nickname.value,
        email: form.email.value,
        photos: [],
        characteristics: characteristics
      };

      API.postReview(json)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }
  }

  return (
    <div style={modalStyle} className={classes.paper}>
      <form id="newReview" onSubmit={handleSubmitReview}>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            <Typography variant="h4">Overall Rating</Typography>
          </Grid>
          <Grid item>
            <HoverRating size="large"/>
          </Grid>
          <Grid item>
            <Typography variant="h4">Do you recommend this product?</Typography>
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              <RadioGroup name="recommend" row={true}>
                <FormControlLabel
                  value="true"
                  control={<Radio required />}
                  label={<Typography variant="h5">True</Typography>}
                />
                <FormControlLabel
                  value="false"
                  control={<Radio required/>}
                  label={<Typography variant="h5">False</Typography>}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography variant="h4" style={{marginBottom: '10px'}}>Characteristics</Typography>
            {characteristicList.map((char, index) => (
                <div key={index}>
                  <Typography variant="h5">{char}:</Typography>
                  <FormControl component="fieldset">
                    <RadioGroup name={char} row={true} >
                      <FormControlLabel value="1" control={<Radio required/>} label={<Typography variant="h5">1</Typography>}/>
                      <FormControlLabel value="2" control={<Radio required/>} label={<Typography variant="h5">2</Typography>}/>
                      <FormControlLabel value="3" control={<Radio required/>} label={<Typography variant="h5">3</Typography>}/>
                      <FormControlLabel value="4" control={<Radio required/>} label={<Typography variant="h5">4</Typography>}/>
                      <FormControlLabel value="5" control={<Radio required/>} label={<Typography variant="h5">5</Typography>}/>
                    </RadioGroup>
                  </FormControl>
                </div>
              )
            )}
          </Grid>
          <Grid item>
            <Typography variant="h5">Review Summary:</Typography>
            <TextField
              name="summary"
              inputProps={{style: {fontSize: 18, fontWeight: 'bold'}, maxLength: '60'}}
              style={{width: '80%'}}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">Review Body:</Typography>
            <TextField
              name="body"
              multiline
              margin='normal'
              variant='outlined'
              inputProps={{style: {fontSize: 14}, maxLength: '1000'}}
              style={{width: '80%'}}
              required
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">Upload Images:</Typography>
            <input type="file" name="photos" onChange={handleUploadImages} accept="image/*" multiple />
            <span id="thumbnails">
              {reviewImages.map(image =>
                <img
                  src={image}
                  key={image}
                  width="60px"
                  height="60px"
                  style={{margin: "5px", border: "2px solid grey"}}>
                </img>)}
            </span>
          </Grid>
          <Grid item>
            <Typography variant="h5">Nickname:</Typography>
            <TextField
              name="nickname"
              id="nickname"
              variant='outlined'
              inputProps={{style: {fontSize: 18, maxLength: '60'}}}
              style={{width: '80%'}}
              required
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">Email:</Typography>
            <TextField
              name="email"
              id="email"
              variant='outlined'
              inputProps={{style: {fontSize: 18, maxLength: '60'}}}
              style={{width: '80%'}}
              error={!formValidation}
              helperText={!formValidation && 'Please enter a valid email'}
              required
            />
          </Grid>
          <Grid item>
            <Button type="submit" color="primary" variant="outlined">
              Submit Review
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
};

export default NewReview;
