import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Pagination from './Pagination'

xdescribe(`Pagination`, () => {
    it('Should render Pagination', () => {
        const wrapper = shallow(<Pagination/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('Should render main div', () => {
        const wrapper = shallow(<Pagination/>);
        const div = wrapper.find(`[data-test='paginationTest']`);
        expect(div.length).toBe(1);

    })
    it('Should render 4 buttons', () => {
        const wrapper = shallow(<Pagination />);
        const button = wrapper.find('button');
        expect(button.length).toBe(4);
    })
    it('Should emit a callback on submit of Sign in', () => {
        let mockFunc = jest.fn();
        const props = {
            postsPerPage: 10, 
            totalPosts: 100,
            paginate: mockFunc,
            currentPage: 3
        }
        const wrapper = shallow(<Pagination {...props}/>);
        const button1 = wrapper.find('button').at(0);
        const button2 = wrapper.find('button').at(1);
        const button3 = wrapper.find('button').at(2);
        const button4 = wrapper.find('button').at(3);
        button1.simulate('click');
        button2.simulate('click');
        button3.simulate('click');
        button4.simulate('click');
        const callback = mockFunc.mock.calls.length;
        expect(callback).toBe(4);
    })
})