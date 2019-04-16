import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../Home';
describe('MyComponent', () => {
  it('should render HomePage', () => {
    const component = shallow(<HomePage />);

    expect(component).toMatchSnapshot();
  });
});
