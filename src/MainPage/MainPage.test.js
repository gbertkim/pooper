import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import MainPage from './MainPage'

xdescribe(`MainPage`, () => {
    it('Should render MainPage', () => {
        const wrapper = shallow(<MainPage/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('Should render main div', () => {
        const wrapper = shallow(<MainPage/>);
        const div = wrapper.find(`[data-test='aboutPageTest']`);
        expect(div.length).toBe(1);

    })
})