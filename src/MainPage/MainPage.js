import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './MainPage.css'

class MainPage extends Component {
    render(){
        return(
            <div className='aboutPage' data-test='aboutPageTest'>
                <h2 className='slogan'>Find clean bathrooms!</h2>
                <ul className='howToSection'>
                    <li className='howToList'>Share and find clean restrooms with other like-minded people!</li> 
                    <li className='howToList'>Start by searching your location above or creating an account through the 
                    <Link className='aboutLinks' to='/log-in'>Log in</Link> page.</li>
                    <li className='howToList'>When you are the first to find a hidden gem, a clean bathroom, you become the bathroom's King or Queen.</li> 
                </ul>
            </div>
        )
    }
}
export default MainPage;