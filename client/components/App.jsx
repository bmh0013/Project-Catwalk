import React from 'react';
import Product from './product-overview.jsx';
import RelatedProduct from './related-products.jsx';
import Questions from './questions.jsx';
import Reviews from './reviews.jsx';

class App extends React.Component{
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <Product />
        <RelatedProduct />
        <Questions />
        <Reviews />
     </div>
    )
  }
}

export default App;