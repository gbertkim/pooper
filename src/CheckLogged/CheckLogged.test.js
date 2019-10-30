import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CheckLogged from './CheckLogged'

xdescribe(`CheckLogged`, () => {
    it('Should render CheckLogged', () => {
        const wrapper = shallow(<CheckLogged/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
})