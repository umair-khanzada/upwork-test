import React from 'react';
import { shallow } from 'enzyme';
import Page1 from '../Page1.tsx';

describe('Page1', () => {
  it('should render LoginForm', () => {
    // causing crash
    const component = shallow(<Page1 />);

    expect(component).toMatchSnapshot();
  });
});
