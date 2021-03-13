import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import RelatedList from '../../components/relatedproducts/related-product-list';
import Adapter from 'enzyme-adapter-react-16';
// import { render, fireEvent, getByTestId} from '@testing-library/react';

configure({adapter: new Adapter()})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RelatedList />, div);
  ReactDOM.unmountComponentAtNode(div);
})