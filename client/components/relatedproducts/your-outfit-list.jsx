import React, {useState, useEffect} from 'react';
import OutfitCard from './your-outfit-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import {PlusCircle} from 'react-bootstrap-icons'
import 'pure-react-carousel/dist/react-carousel.es.css';
// import localstorage from 'localstorage';
import axios from 'axios';

const YourOutfitList = () => {
  // const [localSession, setLocalSession]
  const [outfitItems, setOutfitItems] = useState([
    {id: 21254,
    image: null,
    name: 'Black jordans',
    category: 'shoes',
    price: '69.95'
    },
    {id: 21255,
    image: null,
    name: 'Banana Duck Jacket',
    category: 'jacket',
    price: '149.95'
    },
    {id: 21256,
      image: null,
      name: 'Sike Watermax',
      category: 'shoes',
      price: '249.95'
      }
    ]);

  const addNewOutfitClick = (productId) => {
    console.log('testing if this works');
  };

  const removeListItem = (id) => {
    let filteredItems = outfitItems.filter(outfitItem => outfitItem.id !== id);
    setOutfitItems(filteredItems);
  };

  return(
    <div className = 'outfit-section'>
      <h1>Your outfits</h1>
      <CarouselProvider
        className = 'c-cart-items-carousel'
        naturalSlideHeight = {150}
        naturalSlideWidth = {125}
        totalSlides = {outfitItems.length + 1}
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
              <div className = 'product-card plus-card'>
                <PlusCircle size = {75} onClick = {addNewOutfitClick} />
                <p>Add to Outfit</p>
              </div>
          </Slide>
          {outfitItems.map((outfitItem) => (
            <Slide
              key = {outfitItem.id}
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
              key = {outfitItem.id}
              id = {outfitItem.id}
              image = {outfitItem.image}
              name = {outfitItem.name}
              category = {outfitItem.category}
              price = {outfitItem.price}
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