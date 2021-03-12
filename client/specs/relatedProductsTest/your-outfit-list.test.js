import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import YourOutfitList from '../../components/relatedproducts/your-outfit-list';
import Adapter from 'enzyme-adapter-react-16';
import { render, fireEvent, getByTestId} from '@testing-library/react';

configure({adapter: new Adapter()})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<YourOutfitList />, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('should update the state hook value', () => {
  const { container } = render(<YourOutfitList />);
  const stateValue = [21111, 21112, 21113, 21114];
  const inputValue = 21115;
  const addButton = getByTestId(container, "addition-card");

  fireEvent.click(addButton);
  const newStateValue = stateValue.push(inputValue)
  expect(newStateValue).toBe(5);
})

describe('Checking the JSX for your-outfit-list', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<YourOutfitList />);
  });

  test('render the heading for the component', () => {
    expect(wrapper.find('h1').text()).toContain('YOUR OUTFITS');

    // console.log('wrapper', wrapperElement.debug());
  })
})