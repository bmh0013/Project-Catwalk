import React, {useState, useEffect} from 'react';
import OutfitCard from './your-outfit-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import {PlusCircle} from 'react-bootstrap-icons'
import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';

const YourOutfitList = () => {
  const [cartItems, setCartItems] = useState([{id: 21254, image: null, name: 'Black jordans', category: 'shoes', price: '69.95'}]);

  // useEffect(() => {
  //   axios.get('/proxy/api/fec2/hratx/cart')
  //   .then(res => {
  //     setCartItems(res.data);
  //   })
  //   .catch(err => console.log(err));
  // },[cartItems])

  const addNewOutfitClick = (productId) => {
    console.log('testing if this works');
    // let params = {productId}
    // axios.post('/proxy/api/fec2/hratx/cart', params)
    //   .then(() => console.log('success'))
    //   .catch(err => console.log(err));
  };

  const removeListItem = (id) => {
    console.log(id);
  };

  console.log(cartItems)

  return(
    <div className = 'outfit-section'>
      <h1>Your outfits</h1>
      <CarouselProvider
        className = 'c-cart-items-carousel'
        naturalSlideHeight = {150}
        naturalSlideWidth = {125}
        totalSlides = {cartItems.length}
        visibleSlides = {3}
        dragEnabled = {false}
        style = {{
          position:'relative'
        }}
      >
      <div className = 'buttons'>
        <ButtonBack className = 'button-back'><i className="fas fa-arrow-left"></i></ButtonBack>
        <ButtonNext className = 'button-next'><i className="fas fa-arrow-right"></i></ButtonNext>
      </div>
      <div className = 'carousel__container'>
      <Slider className = 'carousel__slider'>
        <div className = 'product-card'>
           <Slide
              index = {0}
              style = {{
                width: '240px',
                height: '120px',
                border: '2px solid',
                marginLeft:'20px',
                marginRight: '20px',
                position: 'relative'
              }}
            >
          <PlusCircle size = {75} onClick = {addNewOutfitClick} />
          </Slide>
        </div>
          {cartItems.map((cartItem) => (
            <Slide
              key = {cartItem.id}
              index = {0}
              style = {{
                width: '240px',
                height: '120px',
                border: '2px solid',
                marginLeft:'20px',
                marginRight: '20px',
                position: 'relative'
              }}
            >
            <OutfitCard
              key = {cartItem.id}
              id = {cartItem.id}
              image = {cartItem.image}
              name = {cartItem.name}
              category = {cartItem.category}
              price = {cartItem.price}
              removeListItem = {removeListItem}
            />
          </Slide>
          ))}
        </Slider>
        </div>
      </CarouselProvider>
    </div>
  )
};

export default YourOutfitList;