import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SubmitBathroom from './SubmitBathroom'
import CheckLogged from './CheckLogged'

xdescribe(`SubmitBathroom`, () => {
    it('Should render SubmitBathroom', () => {
        const wrapper = shallow(<SubmitBathroom/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('Should render main section', () => {
        const wrapper = shallow(<SubmitBathroom/>);
        const section = wrapper.find(`[data-test='addBathroomTest']`);
        expect(section.length).toBe(1);
    })
    it('Should render one forms', () => {
        const wrapper = shallow(<SubmitBathroom />);
        const form = wrapper.find('form');
        expect(form.length).toBe(1);
    })
    it('Should emit a callback on submit of form', () => {
        const wrapper = shallow(<SubmitBathroom />);
        const instance = wrapper.instance();
        const form = wrapper.find('form');
        instance.handleSubmit = jest.fn();
        form.simulate('submit');
        expect(instance.handleSubmit).toHaveBeenCalled();
    })
    it('Should return a please login page', () => {
        const props = {
            logged: false
        }
        const wrapper = shallow(<SubmitBathroom {...props}/>);
        console.log(wrapper.debug())
        const checkLogged = wrapper.find(CheckLogged);
        expect(checkLogged.length).toBe(1);
    })
    it('Should return a form', () => {
        const props = {
            logged: true
        }
        const wrapper = shallow(<SubmitBathroom {...props} />);
        console.log(wrapper.debug())
        const section = wrapper.find(`[data-test='addBathroomTest']`);
        expect(section.length).toBe(1);
    })
})