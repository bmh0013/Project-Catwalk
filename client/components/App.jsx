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
      product_id: 21112
    }
  }

  renderNewProductId(id) {
    this.setState({
      product_id: id
    })
  }

  render() {
    return(
      <div>
        <Overview product_id = {this.state.product_id}/>

        <div className = 'product-lists-container'>
          <RelatedList
            product_id = {this.state.product_id}
            renderNewProductId = {this.renderNewProductId.bind(this)}
          />
          <YourOutfitList product_id = {this.state.product_id}/>
        </div>

        <Questions product_id = {this.state.product_id}/>
        <Reviews product_id = {this.state.product_id}/>
        <div style={{marginBottom: '200px'}}></div>
     </div>
    )
  }
}

export default App;
