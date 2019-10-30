import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Button from './Button'
import {Link} from 'react-router-dom'

xdescribe(`Button`, () => {
    it('Should render Button', () => {
        const wrapper = shallow(<Button />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
    it('Should render Log Out', () => {
        const props = {
            logged: true
        }
        const wrapper = shallow(<Button {...props}/>);
        console.log(wrapper.debug())
        expect(wrapper.find(Link).children().text()).toBe('Account')
    })
    it('Should render Log In', () => {
        const props = {
            logged: false
        }
        const wrapper = shallow(<Button {...props}/>);
        console.log(wrapper.debug())
        expect(wrapper.find(Link).children().text()).toBe('Log In')
    })
})