import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import CardDetails from './cardDetails.jsx';
import axios from 'axios';

const RelatedList = () => {
  const [productId, setProductId] = useState(['21111']);
  //this will be an array of productIDs based off the productID state
  const [relatedItems, setRelatedItems] = useState([]);
  //this will generate an array of objects in accordance to the relatedItems
  const [relatedItemsData, setRelatedItemsData] = useState([]);
  const [booleanValue, setBooleanValue] = useState('false');

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
              renderedPhotos.push(res.data.results[0].photos[0].thumbnail_url)
              if (renderedItems.length === renderedPhotos.length) {
                for (let i = 0; i < renderedItems.length; i++) {
                  for (let j = 0; j < renderedPhotos.length; j++){
                    if (i === j) {
                      renderedItems[i]['image'] = renderedPhotos[j]
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
  const handleCardClick = () => {
    console.log('You clicked me');
    <CardDetails />
  }

  const handleActionButton = (boolean) => {
    console.log('You clicked this button');
  }

  return (
    <div className = 'related-list'>
      <h1 className = 'related-list-heading'>RELATED PRODUCTS</h1>
      {relatedItemsData.map((relatedItem) => (
        <RelatedProductCard
          key = {relatedItem.id}
          image = {relatedItem.image}
          name = {relatedItem.name}
          category = {relatedItem.category}
          price = {relatedItem.default_price}
          handleCardClick = {handleCardClick}
          handleActionButton = {handleActionButton}
          booleanValue = {booleanValue}
        />
      ))}
    </div>
  )
};

export default RelatedList;