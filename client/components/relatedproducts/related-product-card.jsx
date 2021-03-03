import React, {useState} from 'react';
import {Star, StarFill} from 'react-bootstrap-icons';
import $ from 'jquery';

const RelatedProductCard = ({name, category, image, price, handleCardClick, handleActionButton, booleanValue}) => {

  const [starFill, setStarFill] = useState(false);

  // $('.fas fa-star').on('click',function() {
  //   setStarFill(false);
  // })

  const toggleStarFill = () => {
    setStarFill(!starFill);
    console.log('check starfill', starFill)
  }

  let starToggle;
    if (starFill) {
      starToggle =  <span onClick = {toggleStarFill} ><i className ="fas fa-star" onClick = {() => handleActionButton()}></i></span>
    } else {
      starToggle = <span onClick = {toggleStarFill}><i className ="far fa-star" onClick = {() => handleActionButton()}></i></span>
    }

    // console.log('clicked', click)
  return (
    <div className = 'related-card' onClick = {() => handleCardClick()}>
      {starToggle}
      <p>{name}</p>
      <p>{category}</p>
      <img src = {image} alt = {name} />
      <p>{price}</p>
    </div>
  )
};


export default RelatedProductCard;