import React from 'react';
import RelatedProduct from './related-products.jsx';
import Questions from './Questions/Questions.jsx';
import Reviews from './Reviews/reviews.jsx';
import Overview from './Overview/Overview.jsx';

class App extends React.Component{
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <Overview />
        <RelatedProduct />
        <Questions />
        <Reviews />
     </div>
    )
  }
}

export default App;