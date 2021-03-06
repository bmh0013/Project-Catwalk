import React, {useState, useEffect} from 'react';
import useLocalStorageState from 'use-local-storage-state';
import OutfitCard from './your-outfit-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import {PlusCircle} from 'react-bootstrap-icons'
import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';

const YourOutfitList = () => {
  const [storageOutfitItems, setStorageOutfitItems] = useLocalStorageState('outfitItems', [])
  const [outfitItems, setOutfitItems] = useState(storageOutfitItems)

  //initialize outfit list array accordingly to the local storage data
  useEffect (() => setStorageOutfitItems(outfitItems),[]);

  //edit the localstorage array if the outfit list changes
  useEffect (() => setStorageOutfitItems(outfitItems),[outfitItems]);

  const addNewOutfitClick = (productId) => {
    let productFound = false;

    for (let i = 0; i < outfitItems.length; i++) {
      if (productId === outfitItems[i].id) {
        productFound = true;
      }
    }
    if (productFound === false) {
      const productUrl = `/proxy/api/fec2/hratx/products/${productId}`;
      axios.get(productUrl)
        .then(res => {
          setOutfitItems([...outfitItems, res.data])
        })
        .catch(err => console.log('error, cannot retrieve outfit', err))
    } else return;
  };

  const removeListItem = (id) => {
    let filteredItems = outfitItems.filter(outfitItem => outfitItem.id !== id);
    setOutfitItems(filteredItems);
  }

  return(
    <div className = 'outfit-section'>
      <h1 className = 'heading-list'>YOUR OUTFITS</h1>
      <CarouselProvider
        className = 'items-carousel'
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
              <div className = 'product-card'>
       {/* here, instead of 21111, pass in the productid value from the product overview */}
                <PlusCircle size = {75} onClick = {(event) => addNewOutfitClick(21114)}
                   style = {{
                    position: 'absolute',
                    left: '7.5rem',
                    top: '12.5rem',
                    zIndex: '2'
                  }}
                />
                <p className = 'plus-card-caption'>Add to Outfit</p>
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
              price = {outfitItem.default_price}
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