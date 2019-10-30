import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types"

class LogOutButton extends Component {
	render(){
		if (this.props.logged === true){
			return(
				<Link className='loggingButton' to='/account' onClick={this.props.handleLogged}>Log Out</Link>
			)		
		} else {
			return (
				<Link className='loggingButton' to='/log-in'>Log In</Link>
			)
		}	
	}
}
export default LogOutButton;

LogOutButton.propTypes = {
    handleLogged: PropTypes.func,
    logged: PropTypes.bool
}