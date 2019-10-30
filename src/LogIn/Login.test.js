import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Login from './Login'

xdescribe(`Login`, () => {
    it('Should render CheckLogged', () => {
        const wrapper = shallow(<Login/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('Should render main div', () => {
        const wrapper = shallow(<Login/>);
        const div = wrapper.find(`[data-test='logInPageTest']`);
        expect(div.length).toBe(1);
    })
})

// it('Should render two forms', () => {
//     const wrapper = shallow(<Login />);
//     const form = wrapper.find('form');
//     expect(form.length).toBe(2);
// })
// it('Should emit a callback on submit of Sign in', () => {
//     const wrapper = shallow(<Login />);
//     const instance = wrapper.instance();
//     const form = wrapper.find('form').at(0);
//     instance.handleSignInSubmit = jest.fn();
//     form.simulate('submit');
//     expect(instance.handleSignInSubmit).toHaveBeenCalled();
// })
// it('Should emit a callback on submit of log in', () => {
//     const wrapper = shallow(<Login />);
//     const instance = wrapper.instance();
//     const form = wrapper.find('form').at(1);
//     instance.handleLogInSubmit = jest.fn();
//     form.simulate('submit');
//     expect(instance.handleLogInSubmit).toHaveBeenCalled();
// })