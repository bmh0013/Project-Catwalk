import React from 'react';
import RelatedList from './relatedproducts/related-product-list.jsx';
import YourOutfitList from './relatedproducts/your-outfit-list.jsx';
import Questions from './questions.jsx';
import Reviews from './reviews.jsx';
import Overview from './Overview/Overview.jsx';
import CardDetails from './relatedproducts/cardDetails.jsx';

class App extends React.Component{
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        <Overview />
        <RelatedList />
        <CardDetails />
        <YourOutfitList />
        <Questions />
        <Reviews />
     </div>
    )
  }
}

export default App;