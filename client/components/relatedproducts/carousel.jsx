import React, {useState} from 'react';

const Carousel = ({image}) => {

  const [current, setCurrent] = useState(0);

  return(
    <div className="container">
    <h2>Carousel Example</h2>
    <div id="myCarousel" className="carousel slide" data-ride="carousel">
      {/* <!-- Indicators --> */}
      <ol className="carousel-indicators">
        <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
      </ol>

      {/* <!-- Wrapper for slides --> */}
      <div className="carousel-inner">
        <div className="item active">
          <img src={image} alt="Los Angeles" />
        </div>

        <div className="item">
          <img src={image} alt="Chicago"  />
        </div>

        <div className="item">
          <img src={image} alt="New york"/>
        </div>
      </div>

      {/* <!-- Left and right controls --> */}
      <a className="left carousel-control" href="#myCarousel" data-slide="prev">
        <span className="glyphicon glyphicon-chevron-left"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a className="right carousel-control" href="#myCarousel" data-slide="next">
        <span className="glyphicon glyphicon-chevron-right"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  </div>
  )
};

export default Carousel;