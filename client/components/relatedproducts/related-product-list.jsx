import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import axios from 'axios';

const RelatedList = () => {
  //the productId state value should be dependent on lukas's product overview section
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

    console.log(relatedItems); //being passed the correct value
    relatedItems.forEach(item => {
      const url = `/proxy/api/fec2/hratx/products/${item}`;
      axios.get(url)
        .then(res => {
          renderedItems.push(res.data);

          if (relatedItems.length === renderedItems.length) {
            setRelatedItemsData(renderedItems);
          }
        })
        .catch(err => console.log(err));
    })

  },[relatedItems])


  //map the relatedItemsData here
  //for the cover, you need a clickable favorites icon, category, name, price, and star rating

    return (
      <div className = 'related-list'>
        <h1>Related items</h1>
        {relatedItemsData.map((relatedItem) => (
          <RelatedProductCard
            key = {relatedItem.id}
            category = {relatedItem.category}
            price = {relatedItem.default_price}
          />
        ))}
      </div>
    )

};
export default RelatedList;