import React, { Component } from 'react'
import '../BathroomRender/BathroomRender.css'
import ValidationError from '../ValidationError'
import PropTypes from "prop-types"

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handleLogInSubmit: this.props.handleLogInSubmit
        }
    }
    render(){
        const usernameValid = this.props.usernameValid
        const passwordValid = this.props.passwordValid
        const repeatPasswordValid = this.props.repeatPasswordValid
        const checkFormValid = this.props.checkFormValid
        const validationMessages = this.props.validationMessages
        return(
            <section className='createUser'>
            <form onSubmit={(e) => this.state.handleLogInSubmit(e)}>
                <fieldset>
                  <legend className='logTitle'>Sign up</legend>
                  <div className='field createNameInput'>
                      <label className='fieldTitle' htmlFor='create-name-input'>
                      Create an Account
                      </label>
                      <input
                          type='text' 
                          id='create-name-input' 
                          name='createNameInput'
                          placeholder='maximum of 20 characters' 
                          aria-label='Create username input'
                          aria-required='true'
                      />
                      <ValidationError hasError={!usernameValid} message={validationMessages.username}/>  
                  </div>
                  <div className='field createPasswordInput'>
                      <label className='fieldTitle' htmlFor='create-password-input'>
                      Password
                      </label>
                      <input
                          type='password' 
                          id='create-password-input' 
                          name='createPasswordInput'
                          placeholder='1 uppercase, 1 lowercase, 1 #' 
                          aria-label='Create password input'
                          aria-required='true'
                      />
                      <ValidationError hasError={!passwordValid} message={validationMessages.password}/>  
                  </div>
                  <div className='field checkPasswordInput'>
                      <label fieldset='fieldTitle' htmlFor='check-password-input'>
                      Re-type Password
                      </label>
                      <input
                          type='password' 
                          id='check-password-input' 
                          name='checkPasswordInput'
                          placeholder='repeat your password' 
                          aria-label='Check password Input'
                          aria-required='true'
                      />
                      <ValidationError hasError={!repeatPasswordValid} message={validationMessages.repeatPassword}/>  
                  </div>
                      <button type="submit" className="button createUserButton">
                          Sign Up
                      </button>
                      <ValidationError hasError={!checkFormValid} message={validationMessages.formErrorMessage}/>  
                </fieldset>
            </form>
          </section>
        )
    }
}
export default SignUpForm;

SignUpForm.propTypes = {
    handleLogInSubmit: PropTypes.func,
    usernameValid: PropTypes.bool,
    passwordValid: PropTypes.bool,
    repeatPasswordValid: PropTypes.bool,
    checkFormValid: PropTypes.bool,
    ValidationMessage: PropTypes.objectOf(PropTypes.string)
}