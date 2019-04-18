import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { Typography } from 'antd';
const { Title } = Typography;
import Heading from './Heading';

describe('<Heading />', () => {
    it('renders one <Title /> component inside header', () => {
        const wrapper = shallow(<Heading />);
        expect(wrapper.find(Title)).to.have.lengthOf(1);
    });

    it('<Header /> must contain className that pass through props', () => {
        const className = 'subHeading';
        const wrapper = mount(<Heading className={className} />);
        expect(wrapper.hasClass(className)).equal(true);
        wrapper.unmount();
    });

    it('render <Header /> with titleText props', () => {
        const title = 'Hi John we missed you.';
        const wrapper = mount(<Heading titleText={title} />);
        const text = wrapper.find(Title).text();
        expect(text).equal(title);
        wrapper.unmount();
    });

    it('render <Header /> with level props', () => {
        const level = 2;
        const wrapper = mount(<Heading level={level} />);
        const title = wrapper.find(Title);
        expect(title.props().level).equal(level);
        wrapper.unmount();
    });
});