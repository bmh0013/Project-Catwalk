import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';

const RelatedList = () => {
  const [productId, setProductId] = useState(['21111']);
  //this will be an array of productIDs based off the productID state
  const [relatedItems, setRelatedItems] = useState([]);
  //this will generate an array of objects in accordance to the relatedItems
  const [relatedItemsData, setRelatedItemsData] = useState([]);

  //this will do a componentDidMount-like functionality
  useEffect(() => {
    const url = `/proxy/api/fec2/hratx/products/${productId}/related`;
    axios.get(url)
      .then(res => {
        setRelatedItems(res.data);
      })
      .catch(err => console.log(err))
  }, [productId])

  //do useEffect again to pull all the data in accordance to the relatedItems array
  useEffect(() => {
    let renderedItems = [];
    let renderedPhotos = [];
    // console.log(relatedItems); //being passed the correct value
    relatedItems.forEach(item => {
      const url = `/proxy/api/fec2/hratx/products/${item}`;
      const url2 = `/proxy/api/fec2/hratx/products/${item}/styles`;
      axios.get(url)
        .then(res => {
          renderedItems.push(res.data);
        })
        .then(() => {
          axios.get(url2)
            .then(res => {
              renderedPhotos.push({id: res.data.product_id, image:res.data.results[0].photos[0].thumbnail_url})
              if (renderedItems.length === renderedPhotos.length) {
                for (let i = 0; i < renderedItems.length; i++) {
                  for (let j = 0; j < renderedPhotos.length; j++){
                    if (renderedItems[i].id == renderedPhotos[j].id) {
                      renderedItems[i]['image'] = renderedPhotos[j].image
                    }
                  }
                }
                let checkImageProperty = renderedItems.some(obj => obj.image);
                  if (checkImageProperty) {
                    setRelatedItemsData(renderedItems)
                  }
              }
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
    })
  },[relatedItems])

  //for the cover, you need a clickable favorites icon, category, name, price, and star rating

  const handleActionButton = (id) => {
    // make something happen when the user clicks/declicks the star
    // console.log('You clicked this button');
    // console.log('actionbutton', id);
  }

  return (
    <div className = 'related-list'>
      <h1 className = 'related-list-heading'>RELATED PRODUCTS</h1>
      <CarouselProvider
        className = 'c-related-items-carousel'
        naturalSlideHeight = {150}
        naturalSlideWidth = {125}
        totalSlides = {relatedItems.length}
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
      <Slider
        className = 'carousel__slider'>
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
              handleActionButton = {handleActionButton}
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