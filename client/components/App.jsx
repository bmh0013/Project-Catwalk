import React from 'react';git
import RelatedList from './relatedproducts/related-product-list.jsx';
import YourOutfitList from './relatedproducts/your-outfit-list.jsx';
import TOKEN from '../../token.js';
import axios from 'axios';

class App extends React.Component{
  constructor() {
    super();
  }

  componentDidMount() {
    let options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx',
      headers: {
        'User-Agent': 'request',
        'Authorization': TOKEN
      }
    };

    axios.get(options.url, options.headers)
      .then (res => {
        console.log(res.data);
      })
  }
  render() {
    return(
      <div>
        <RelatedList />
        <YourOutfitList />
     </div>
    )
  }
}

export default App;