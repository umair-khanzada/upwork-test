import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../LoginForm.tsx';

const props = {
  page: 1,
  loading: false,
};

describe('LoginForm', () => {
  it('should render LoginForm', () => {
    const component = shallow(<LoginForm />);

    expect(component).toMatchSnapshot();
  });
});
