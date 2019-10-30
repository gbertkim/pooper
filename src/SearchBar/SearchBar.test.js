import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SearchBar from './SearchBar.js'

xdescribe(`SearchBar`, () => {
    it('renders SearchBar', () => {
        const wrapper = shallow(<SearchBar />)
        console.log(wrapper.debug())
        expect(toJson(wrapper)).toMatchSnapshot()
    })
    it('Should render a button', () => {
        const wrapper = shallow(<SearchBar />)
        const button = wrapper.find('button').at(0);
        expect(button.length).toBe(1);
    })
    it('Should render the section autoInput', () => {
        const wrapper = shallow(<SearchBar />)
        const section = wrapper.find(`[data-test='autoInputTest']`)
        expect(section.length).toBe(1);
    })
    it('Should emit a callback on click and run a history push function', () => {
        let mockFunc = jest.fn();
        const props = {
                setLocation: mockFunc,
                onClickCancel: mockFunc
        }
        const wrapper = shallow(<SearchBar {...props}/>)
            wrapper.find('button').at(0).simulate('click', { preventDefault(){} })
            const callback = mockFunc.mock.calls.length;
            expect(callback).toBe(2);
    })
})