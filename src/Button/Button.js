import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from "prop-types"

class Button extends Component {
	render(){
		if (this.props.logged === true){
			return(
				<Link className='loggingButton' to='/account' onClick={this.props.handleLogged}>Account</Link>
			)		
		} else {
			return (
				<Link className='loggingButton' to='/log-in'>Log In</Link>
			)
		}	
	}
}
export default Button;

Button.propTypes = {
	logged: PropTypes.bool,
	handleLogged: PropTypes.func
}