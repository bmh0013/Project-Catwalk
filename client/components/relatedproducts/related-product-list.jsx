import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import api from '../../../api.js';

const RelatedList =  ({product_id, renderNewProductId}) => {
  //array of productIDs based off the productID state
  const [relatedItems, setRelatedItems] = useState([]);
  //array of objects in accordance to the relatedItems
  const [relatedItemsData, setRelatedItemsData] = useState([]);
  const[relatedItemsStyles, setRelatedItemsStyles] = useState([]);
  const [productReview, updateReview] = useState(null);

  useEffect(() => {
    relatedIdFunction();
  }, [product_id])

  const relatedIdFunction = async () => {
    await api.getRelatedProductIds(product_id)
      .then(res => {
        const distinctRelatedItems = [...new Set(res.data)]
          return distinctRelatedItems
      })
      .then(res => setRelatedItems(res))
      .catch(err => console.log ('error retrieving the relevant product ids', err))
  };

  useEffect(() => {
    generateRelatedItems(relatedItems);
  }, [relatedItems])

  const generateRelatedItems = async (relatedItems) => {
    let renderedItems = [];
    let renderedStarRatings = [];
    let renderedStyles = [];

    let promiseChain = Promise.resolve();

    relatedItems.forEach(item => { ['21111']
      promiseChain = promiseChain
        .then(() => api.getProduct(item))
        .catch(err => console.log('error retrieving the product information', err))
        .then(res => renderedItems.push(res.data))
        .then(() => api.getMetadata({product_id: item}))
        .then(res => {
          renderedStarRatings.push({id: res.data.product_id, ratings: res.data.ratings})
        })
        //instead of creating multiple arrays, try pushing everything into 1 array
        //figure out a way to see if the pulled data exists in the renderedItems array, then push that corresponding data as a property into the array item
        .then(() => api.getProductStyles(item))
        .then(res => {
          setRelatedItemsStyles(res.data)
          renderedStyles.push({id: res.data.product_id, image:res.data.results[0].photos[0].thumbnail_url})

          if (renderedItems.length === relatedItems.length && renderedStyles.length === relatedItems.length && renderedStarRatings.length === relatedItems.length) {
            for (let i = 0; i < renderedItems.length; i++) {
              for (let j = 0; j < renderedStyles.length; j++){
                for (let k = 0; k < renderedStarRatings.length; k++) {
                  if (renderedItems[i].id == renderedStyles[j].id && renderedItems[i].id == renderedStarRatings[k].id) {
                    renderedItems[i]['image'] = renderedStyles[j].image
                    renderedItems[i]['ratings'] = renderedStarRatings[k].ratings
                  }
                }
              }
            }
            let checkImageProperty = renderedItems.some(obj => obj.image);
              if (checkImageProperty) {
                setRelatedItemsData(renderedItems)
              }
          }
        })
        .catch(err => console.log('error retrieving the product styles', err))
    })
  };

   //if you click on the card, that productid should be imported into the api request for that product info
  const sendProductId = (id) => {
    renderNewProductId(id);
  };

  return (
    <div className = 'product-list'>
      <h1 className = 'heading-list'>RELATED PRODUCTS</h1>
      <CarouselProvider
        className = 'items-carousel'
        naturalSlideHeight = {150}
        naturalSlideWidth = {125}
        totalSlides = {relatedItems.length}
        visibleSlides = {3}
        dragEnabled = {false}
        style = {{
          position:'absolute',
          width: '100%',
          height: 'auto',
        }}
      >
      <div className = 'buttons'>
        <ButtonBack className = 'button-back'><i className="fas fa-arrow-left"></i></ButtonBack>
        <ButtonNext className = 'button-next'><i className="fas fa-arrow-right"></i></ButtonNext>
      </div>
      <div className = 'carousel__container'>
      <Slider className = 'carousel__slider'>
        {relatedItemsData.map((relatedItem) => (
          <Slide
            key = {relatedItem.id}
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
            <RelatedProductCard
              key = {relatedItem.id}
              id = {relatedItem.id}
              image = {relatedItem.image}
              name = {relatedItem.name}
              category = {relatedItem.category}
              price = {relatedItem.default_price}
              starRating = {relatedItem.ratings}
              sendProductId = {sendProductId}
              // this information is for the modal
              currentProductId = {product_id}
              relatedItemsStyles = {relatedItemsStyles}
              features = {relatedItem.features}
            />
          </Slide>
        ))}
      </Slider>
      </div>
      </CarouselProvider>
    </div>
  )
};

export default RelatedList;