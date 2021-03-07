import React from 'react';
import RelatedList from './relatedproducts/related-product-list.jsx';
import YourOutfitList from './relatedproducts/your-outfit-list.jsx';
import Questions from './Questions/Questions.jsx';
import Reviews from './Reviews/reviews.jsx';
import Overview from './Overview/Overview.jsx';
import API from '../../api.js';

class App extends React.Component{
  constructor() {
    super();
    this.state = {
      product_id: 21114
    }
  }

  render() {
    return(
      <div>
        <Overview />
        <RelatedList />
        <YourOutfitList />
        <Questions product_id={this.state.product_id}/>
        <Reviews product_id={this.state.product_id}/>
     </div>
    )
  }
}

export default App;
