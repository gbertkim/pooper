import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class CheckLogged extends Component {
    render(){
        return(
            <div className = "logInRequired">
                <p>Please <Link className='linkAway' to='/log-in'>log in</Link> to view this page</p>
            </div>
        )
    }
}

export default CheckLogged;