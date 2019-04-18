import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Page1 from './Page1';
import { ButtonSignIn } from './styled';

Enzyme.configure({ adapter: new Adapter() });

describe('<Page1 /> ', () => {
  it('Next button disabled when no email', () => {
    const loading = false;
    const formProps = { values: {}, errors: {} };
    const error = '';
    const onSubmit = () => {};

    const wrapper = shallow(<Page1 loading={loading} formProps={formProps} onSubmit={onSubmit} error={error} />);

    const isDisabled = wrapper.find(ButtonSignIn).props().disabled;

    expect(isDisabled).toEqual(true);
  });

  it('Next button disabled on form email error', () => {
    const loading = false;
    const formProps = { values: {}, errors: { email: 'Email error' } };
    const error = '';
    const onSubmit = () => {};

    const wrapper = shallow(<Page1 loading={loading} formProps={formProps} onSubmit={onSubmit} error={error} />);

    const isDisabled = wrapper.find(ButtonSignIn).props().disabled;

    expect(isDisabled).toEqual(true);
  });

  it('render error message', () => {
    const loading = false;
    const formProps = { values: {}, errors: {} };
    const error = 'Error message';
    const onSubmit = () => {};

    const wrapper = shallow(<Page1 loading={loading} formProps={formProps} onSubmit={onSubmit} error={error} />);

    expect(wrapper.find('.ant-form-explain').text()).toEqual('Error message');
  });

  it('Next button click event', () => {
    const loading = false;
    const formProps = { values: {}, errors: {} };
    const error = '';
    const mockOnSubmit = jest.fn();

    const wrapper = shallow(<Page1 loading={loading} formProps={formProps} onSubmit={mockOnSubmit} error={error} />);

    wrapper.find(ButtonSignIn).props().onClick();

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });
});
