import React, {useState, useEffect} from 'react';
import useLocalStorageState from 'use-local-storage-state';
import OutfitCard from './your-outfit-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import {PlusCircle} from 'react-bootstrap-icons'
import 'pure-react-carousel/dist/react-carousel.es.css';
import api from '../../../api.js';

const YourOutfitList = ({product_id}) => {
  const [storageOutfitItems, setStorageOutfitItems] = useLocalStorageState('outfitItems', [])
  const [outfitItems, setOutfitItems] = useState(storageOutfitItems)
  //initialize outfit list array accordingly to the local storage data
  useEffect (() => setStorageOutfitItems(outfitItems),[]);

  //edit the localstorage array if the outfit list changes
  useEffect (() => setStorageOutfitItems(outfitItems),[outfitItems]);

  const getProductFunction = async () => {
    let productData;

    await api.getProduct(product_id)
      .then(res => productData = res.data)
      .then(() => api.getMetadata({product_id}))
      .then(res => productData['ratings'] = res.data.ratings)
      .then(() => api.getProductStyles(product_id))
      .catch(() => console.log('error, cannot fetch API', err))
      .then(res => productData['image'] = res.data.results[0].photos[0].thumbnail_url)
      .then(() => setOutfitItems([...outfitItems, productData]))
      .catch(err => console.log('error, cannot change outfit items state', err))
  };

  const addNewOutfitClick = (productId) => {
    let productFound = false;

    for (let i = 0; i < outfitItems.length; i++) {
      if (product_id === outfitItems[i].id) {
        productFound = true;
      }
    }
    if (productFound === false) {
      getProductFunction()
    } else return;
  };

  const removeListItem = (id) => {
    let filteredItems = outfitItems.filter(outfitItem => outfitItem.id !== id);
    setOutfitItems(filteredItems);
  };

  return(
    <div className = 'product-list'>
      <h1 className = 'heading-list'>YOUR OUTFITS</h1>
      <CarouselProvider
        className = 'items-carousel'
        naturalSlideHeight = {200}
        naturalSlideWidth = {200}
        totalSlides = {outfitItems.length + 1}
        visibleSlides = {3}
        dragEnabled = {false}
        style = {{
          position:'relative',
          width: '70%',
          height: 'auto',
        }}
      >
      <div className = 'buttons'>
        <ButtonBack className = 'button-back'><i className="fas fa-arrow-left"></i></ButtonBack>
        <ButtonNext className = 'button-next'><i className="fas fa-arrow-right"></i></ButtonNext>
      </div>
        <Slider className = 'carousel__slider'>
           <Slide
              index = {0}
              style = {{
                width: '225px',
                height: '310px',
                border: '2px solid',
                marginRight: '25px',
                position: 'relative',
                zIndex: '2'
              }}
            >
              <div className = 'product-card add-card' onClick = {(event) => addNewOutfitClick(product_id)}>
                <PlusCircle size = {55}
                   style = {{
                     display: 'block',
                  }}
                />
                <p className = 'plus-card-caption'>Add to Outfit</p>
              </div>
          </Slide>
          {outfitItems.map(outfitItem => (
            <Slide
              key = {outfitItem.id}
              index = {Math.random()}
              style = {{
                width: '225px',
                height: '310px',
                border: '2px solid',
                marginRight: '25px',
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
              rating = {outfitItem.ratings}
              removeListItem = {removeListItem}
            />
          </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </div>
  )
};

export default YourOutfitList;