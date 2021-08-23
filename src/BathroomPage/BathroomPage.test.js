import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BathroomPage from './BathroomPage'
// import ApiContext from './ApiContext'

xdescribe(`BathroomPage`, () => {
    it('renders SearchBar', () => {
        const wrapper = shallow(<BathroomPage />);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
    it('Should render the div bathroomByIdTest', () => {
        const wrapper = shallow(<BathroomPage />)
        const section = wrapper.find(`[data-test='bathroomByIdTest']`)
        expect(section.length).toBe(1);
    })
    it('Should render the section bathroomByIdInfoTest', () => {
        const wrapper = shallow(<BathroomPage />);
        const section = wrapper.find(`[data-test='bathroomByIdInfoTest']`);
        expect(section.length).toBe(1);
    })
    it('Should render the section reviewsSectionTest', () => {
        const wrapper = shallow(<BathroomPage />);
        const section = wrapper.find(`[data-test='reviewsSectionTest']`);
        expect(section.length).toBe(1);
    })
    it('Should render a button', () => {
        const wrapper = shallow(<BathroomPage />);
        const button = wrapper.find('button').at(0);
        expect(button.length).toBe(1);
    })
    it('Should emit a callback on click', () => {
        const wrapper = shallow(<BathroomPage />)
        const instance = wrapper.instance();
        const button = wrapper.find('button').at(0);
        instance.routeChange = jest.fn();
        button.simulate('click');
        expect(instance.routeChange).toHaveBeenCalled();
    })
    it('render BathroomPage renders first review by gilbear', () => {
        const context = {
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
        const wrapper = shallow(<BathroomPage {...props}/>, {context});
        const gilbear = wrapper.find(`[data-test='gilbear']`);
        expect(gilbear.text()).toBe('Review by: gilbear');
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})