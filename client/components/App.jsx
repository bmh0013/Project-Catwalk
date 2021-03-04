import React from 'react';
import RelatedList from './relatedproducts/related-product-list.jsx';
import YourOutfitList from './relatedproducts/your-outfit-list.jsx';
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
        {/* <Overview /> */}
        <RelatedList />
        <YourOutfitList />
        {/* <Questions />
        <Reviews /> */}
     </div>
    )
  }
}

export default App;