import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Bathrooms from './Bathrooms'

xdescribe(`Bathrooms`, () => {
    it('Should render Bathrooms', () => {
        const wrapper = shallow(<Bathrooms />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
    it('Should render the main div', () => {
        const wrapper = shallow(<Bathrooms />);
        const div = wrapper.find(`[data-test='bathroomsPageTest']`);
        expect(div.length).toBe(1);
    })
    it('Should render 2 buttons', () => {
        const wrapper = shallow(<Bathrooms />);
        const button = wrapper.find('button');
        expect(button.length).toBe(2);
    })
    it('Should emit a callback on click of first button', () => {
        const wrapper = shallow(<Bathrooms />)
        const instance = wrapper.instance();
        const button = wrapper.find('button').at(0);
        instance.handleSortClick = jest.fn();
        button.simulate('click');
        expect(instance.handleSortClick).toHaveBeenCalled();
    })
    it('Should emit a callback on click of second button', () => {
        const wrapper = shallow(<Bathrooms />)
        const instance = wrapper.instance();
        const button = wrapper.find('button').at(1);
        instance.handleSortClick = jest.fn();
        button.simulate('click');
        expect(instance.handleSortClick).toHaveBeenCalled();
    })
    it('Should render with context', () => {
        const context = {
            latitude: 33.8703645,
            longitude: 117.92421230000002,
            bathrooms: [
                {
                    "id":2,
                    "name":"Molca Salsa",
                    "distanceFar": 2,
                    "overallScore": 3,
                    "bathroom_user_id":"u5kz5iofaz",
                    "bathroom_user_name":"gilbear",
                    "longitude":"-117.93226909999998",
                    "latitude":"33.9177213",
                    "handi":false,
                    "men":true,
                    "women":true,
                    "unisex":false,
                    "family":false
                },
                {
                    "id":3,
                    "name":"Target in Amerige ",
                    "distanceFar": 3,
                    "overallScore": 2,
                    "bathroom_user_id": "se8f1cqw5e",
                    "bathroom_user_name":"gigi",
                    "longitude":"-117.96115729999997",
                    "latitude":"33.8798667",
                    "handi":true,
                    "men":true,
                    "women":true,
                    "unisex":true,
                    "family":true
                },
            ],
            reviews:[
                {
                    "id":1,
                    "bathroom_id":2,
                    "review_user_id":"u5kz5iofaz",
                    "review_user_name":"gilbear",
                    "modified":"2019-09-04T05:01:19.430Z",
                    "sex":"Men",
                    "clean":1,
                    "privacy":1,
                    "smell":1,
                    "comment":"Very dirty!",
                    "direction":"around the back of the restaurant",
                    "overall_score":"1"
                },
            ],
        };
        const props = {
            match: {
                params: {
                    bathroomId: 2
                }
            }
        };
        const wrapper = shallow(<Bathrooms {...props}/>, {context});
        console.log(wrapper.debug());
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})