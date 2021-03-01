import React from 'react';
// import Product from './product-overview.jsx';
import RelatedProduct from './relatedproducts/related-product-list.jsx';
// import Questions from './questions.jsx';
// import Reviews from './reviews.jsx';

class App extends React.Component{
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <RelatedProduct />
     </div>
    )
  }
}

export default App;