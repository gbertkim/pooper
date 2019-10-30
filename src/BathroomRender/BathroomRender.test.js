import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import BathroomRender from './BathroomRender'

xdescribe(`BathroomRender`, () => {
    it('render BathroomRender with props', () => {
        const props = {
            bathroom: {
                "id":2,
                "overallScore": 3,
                "name":"Molca Salsa",
                "distanceFar": 5,
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
            convertBool: (boolean) => {
                if (boolean == true){
                    return "Yes";
                }
                else 
                    return "No";
            }
        };
        console.log(props.convertBool)
        const wrapper = shallow(<BathroomRender {...props}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
    })
})