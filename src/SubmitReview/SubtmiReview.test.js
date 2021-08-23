import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SubmitReview from './SubmitReview'
import CheckLogged from '../CheckLogged/CheckLogged'

describe(`SubmitReview`, () => {
    it('Should render SubmitReview', () => {
        const wrapper = shallow(<SubmitReview/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('Should render main section', () => {
        const wrapper = shallow(<SubmitReview/>);
        const section = wrapper.find(`[data-test='addReviewTest']`);
        expect(section.length).toBe(1);
    })
    it('Should render one forms', () => {
        const wrapper = shallow(<SubmitReview />);
        const form = wrapper.find('form');
        expect(form.length).toBe(1);
    })
    it('Should emit a callback on submit of form', () => {
        const wrapper = shallow(<SubmitReview />);
        const instance = wrapper.instance();
        const form = wrapper.find('form');
        instance.handleSubmit = jest.fn();
        form.simulate('submit');
        expect(instance.handleSubmit).toHaveBeenCalled();
    })
    it('Should return a choose a bathroom page', () => {
        const props = {
            bathroomId: null,
            logged: false
        }
        const wrapper = shallow(<SubmitReview {...props}/>);
        console.log(wrapper.debug())
        const checkLogged = wrapper.find('div');
        expect(checkLogged.length).toBe(1);
    })
    it('Should return a please login page', () => {
        const props = {
            bathroomId: 2,
            logged: false
        }
        const wrapper = shallow(<SubmitReview {...props}/>);
        const checkLogged = wrapper.find(CheckLogged);
        expect(checkLogged.length).toBe(1);
    })
    it('Should return a form', () => {
        const context = {
            bathroomId: 2,
            logged: true
        }
        const wrapper = shallow(<SubmitReview />, {context});
        const section = wrapper.find(`[data-test='addReviewTest']`);
        expect(section.length).toBe(1);
    })
})