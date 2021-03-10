import React from 'react';
import { StaticRating } from '../../starRating.jsx';

const CharBreakdown = ({ metadata }) => {
  const charList = Object.keys(metadata.characteristics);

  return (
    <div>
      {charList.map(char => {
        const position = Math.round(100 * (metadata.characteristics[char].value / 5) )
        if (char === 'Quality' || char === 'Comfort') {
          return (
            <div key={char}>
              <h5>{char}</h5>
              <div className="slider-outer">
                <div id="triangle-down" style={{left: `${position - 5}%`}}></div>
                <div className="slider s1" style={{'backgroundColor': 'lightgrey'}}></div>&nbsp;
                <div className="slider s2" style={{'backgroundColor': 'lightgrey'}}></div>&nbsp;
                <div className="slider s3" style={{'backgroundColor': 'lightgrey'}}></div>&nbsp;
                <span style={{float: 'left'}}>Poor</span>
                <span style={{float: 'right'}}>Perfect</span>
              </div>
          </div>
        )} else {
          return (
            <div key={char}>
              <h5>{char}</h5>
              <div className="slider-outer">
                <div id="triangle-down" style={{left: `${position - 5}%`}}></div>
                <div className="slider s1" style={{'backgroundColor': 'lightgrey'}}></div>&nbsp;
                <div className="slider s2" style={{'backgroundColor': 'lightgrey'}}></div>&nbsp;
                <div className="slider s3" style={{'backgroundColor': 'lightgrey'}}></div>&nbsp;
                <span style={{float: 'left'}}>Too Small</span>
                <span style={{display: 'inline-block'}}>Perfect</span>
                <span style={{float: 'right'}}>Too Large</span>
              </div>
          </div>
        )
        }
      })}
    </div>
  )
}

export default CharBreakdown;
