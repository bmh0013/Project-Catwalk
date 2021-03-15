import React, { useState } from 'react';


function AllSizes({ sizes }) {
  let sizeArr = [];
  for (let size in sizes) {
    sizeArr.push([size, sizes[size].quantity, sizes[size].size]);
    console.log(sizeArr);
  }

  if (sizeArr.length > 0) {
    return (
      <div>
        {sizeArr.map(size => {
          return (
            <option key={size[0]} quantity={size[1]} size={size[2]}>{size[2]}</option>
          )
        })}
      </div>
    )
  } else {
    return (
      <div>
        <option> OUT OF STOCK </option>
      </div>
    )
  }

}

export{
  AllSizes
}