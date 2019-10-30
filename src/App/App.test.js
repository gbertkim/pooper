import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './App'

xdescribe(`App`, () => {
    it('renders a App by default', () => {
      const wrapper = shallow(<App />)
      expect(toJson(wrapper)).toMatchSnapshot()
    })
})