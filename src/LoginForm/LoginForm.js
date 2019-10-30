import React, { Component } from 'react'
import ValidationError from '../ValidationError'
import '../BathroomRender/BathroomRender.css'
import PropTypes from "prop-types"

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleSignInSubmit: this.props.handleSignInSubmit,
        }
    }

    render(){
        const checkUsernameValid = this.props.checkUsernameValid
        const checkPasswordValid = this.props.checkPasswordValid
        const checkFormValid = this.props.checkFormValid
        const checkUsernameMessage = this.props.validationMessages.checkUsername
        const checkPasswordMessage = this.props.validationMessages.checkPassword
        const formErrorMessage = this.props.validationMessages.formError
        return(
            <section className='userLogIn'>
                <form onSubmit={(e) => this.state.handleSignInSubmit(e)}>
                    <fieldset>
                      <legend className='logTitle'>Log in</legend>
                        <div className='field logUsernameInput'>
                            <label className='fieldTitle' htmlFor='account-name-input'>
                            Username
                            </label>
                            <input
                                type='text' 
                                id='account-name-input' 
                                name='accountNameInput'
                                placeholder='your username' 
                                aria-label='Username input'
                                aria-required='true'
                            />
                            <ValidationError hasError={!checkUsernameValid} message={checkUsernameMessage}/>  
                        </div>
                        <div className='field logPasswordInput'>
                            <label className='fieldTitle' htmlFor='account-password-input'>
                            Password
                            </label>
                            <input
                                type='password' 
                                id='account-password-input' 
                                name='accountPasswordInput'
                                placeholder='your password' 
                                aria-label='Password input'
                                aria-required='true'
                            />
                            <ValidationError hasError={!checkPasswordValid} message={checkPasswordMessage}/>  
                        </div>
                          <button type="submit" className="button checkUserButton">
                              Log In
                          </button>
                          <ValidationError hasError={!checkFormValid} message={formErrorMessage}/>  
                      </fieldset>
                </form>
            </section>
        )
    }
}
export default LoginForm;

LoginForm.propTypes = {
    handleSignInSubmit: PropTypes.func,
    checkUsernameValid: PropTypes.bool,
    checkFormValid: PropTypes.bool,
    validationMessages: PropTypes.objectOf(PropTypes.string)
}