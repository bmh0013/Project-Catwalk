import React from "react";
import RelatedList from "./relatedproducts/related-product-list.jsx";
import YourOutfitList from "./relatedproducts/your-outfit-list.jsx";
import Questions from "./Questions/Questions.jsx";
import Reviews from "./Reviews/reviews.jsx";
import Overview from "./Overview/Overview.jsx";
import Box from "@material-ui/core/Box";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product_id: 21114,
    };
  }

  renderNewProductId(id) {
    this.setState({
      product_id: id,
    });
  }

  render() {
    return (
      <div>
        <Overview product_id={this.state.product_id} />
        <Box
          className="product-lists-container"
          alignItems="start"
          justifyContent="center"
          marginLeft="10px"
        >
          <RelatedList
            product_id={this.state.product_id}
            renderNewProductId={this.renderNewProductId.bind(this)}
          />
          <YourOutfitList product_id={this.state.product_id} />
        </Box>
        <Questions product_id={this.state.product_id} />
        <Reviews product_id={this.state.product_id} />
        <div style={{ marginBottom: "200px" }}></div>
      </div>
    );
  }
}

export default App;
