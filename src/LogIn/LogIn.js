import React, { Component } from 'react'
import config from '../config.js'
import ApiContext from '../ApiContext'
import './LogIn.css'
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repeatPassword: '',
            checkUsername: '',
            checkPassword: '',
            comment: '',
            usernameValid: true,
            passwordValid: true,
            repeatPasswordValid: true,
            checkUsernameValid: false,
            checkPasswordValid: false,
            check: true,
            directionValid: true,
            commentValid: true,
            formValid: false,
            loginValid: false,
            checkFormValid: true,
            validationMessages: {
                name: '',
            }
        }
    }
    static defaultProps = {
        history: {
            push: () => { }
        }
    }
    static contextType = ApiContext;

    validateUsername(fieldValue) {
        if (fieldValue === undefined){
          fieldValue = '';
        }
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.username = 'Username input is required.';
          hasError = true;
        } else {
            if (fieldValue.length > 20 || fieldValue < 5) {
                fieldErrors.username = 'Must be more than 5 and less than 20 letters.';
                hasError = true;
            } else {
                fieldErrors.username = '';
                hasError = false;
            }
        }
        this.setState({
          validationMessages: fieldErrors,
          usernameValid: !hasError
        }, this.formValid );
        return new Promise((resolve) => {
          resolve(fieldValue)
        })
    }

    validatePassword(fieldValue) {
      if (fieldValue === undefined){
        fieldValue = '';
      }
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;  
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.password = 'Password is required';
          hasError = true;
        } else {
            if (fieldValue.length > 20 || fieldValue < 5) {
                fieldErrors.password = 'Must be more than 5 and less than 20 letters.';
                hasError = true;
          } else {
                if (!fieldValue.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/)){
                    fieldErrors.password = 'Password must contain an uppercase letter and a number.';
                    hasError = true;
                } else {
                        fieldErrors.password = '';
                        hasError = false;
                        }
                }
        }
        this.setState({
          validationMessages: fieldErrors,
          passwordValid: !hasError
        }, this.formValid );
        return new Promise((resolve) => {
          resolve(fieldValue)
        })
    
    }

    validateRepeatPassword(fieldValue, fieldValue2) {
        if (fieldValue === undefined){
          fieldValue = '';
        }
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.repeatPassword = 'Please type your password again';
          hasError = true;
        } else {
          if (fieldValue !== fieldValue2) {
            fieldErrors.repeatPassword = 'Your passwords must match';
            hasError = true;
          } else {
            fieldErrors.repeatPassword = '';
            hasError = false;
          }
        }
        this.setState({
          validationMessages: fieldErrors,
          repeatPasswordValid: !hasError
        }, this.formValid );
        return new Promise((resolve) => {
          resolve(fieldValue)
        })
    }

    validateCheckUsername(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.checkUsername = 'Username input is required';
          hasError = true;
        } else {
            fieldErrors.checkUsername = '';
            hasError = false;
        }
        this.setState({
          validationMessages: fieldErrors,
          checkUsernameValid: !hasError
        }, this.loginValid );
        return new Promise((resolve) => {
          resolve(fieldValue)
        })
    }

    validateCheckPassword(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.checkPassword = 'Password input is required';
          hasError = true;
        } else {
            fieldErrors.checkPassword = '';
            hasError = false;
        }
        this.setState({
          validationMessages: fieldErrors,
          checkPasswordValid: !hasError
        }, this.loginValid );
        return new Promise((resolve) => {
          resolve(fieldValue)
        })
    }

    formValid() {
        this.setState({
            formValid: this.state.usernameValid && this.state.passwordValid && this.state.repeatPasswordValid
        })
    }

    loginValid() {
        this.setState({
            loginValid: this.state.checkUsernameValid && this.state.checkPasswordValid
        })
    }
    
    handleSignInSubmit = e => {
        e.preventDefault()
        const existingAccount = {
          user_name: e.target.accountNameInput.value,
          user_pass: e.target.accountPasswordInput.value,
        }
        this.validateCheckUsername(existingAccount.user_name)
          .then(() => {
            this.validateCheckPassword(existingAccount.user_pass)
          })
            .then(() => {
              if (this.state.loginValid === true){
                fetch(`${config.API_ENDPOINT}/accounts/check`, {
                  method: 'POST',
                  headers: {
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify(existingAccount),
                })
                  .then(res => {
                    if (!res.ok)
                      return res.json().then(e => Promise.reject(e))
                    return res.json()
                  })
                  .then(account => {
                    this.context.handleLoggedIn(account, true)
                    this.props.history.goBack()
                  })
                  .catch(error => {
                    const fieldErrors = {...this.state.validationMessages};
                    fieldErrors.formError = `${error.error.message}`;
                    let hasError = true;
                    this.setState({
                      validationMessages: fieldErrors,
                      checkFormValid: !hasError
                    })
                    
                  })
              } else {
                return new Error(`Form is invalid`);
              }
            })
    }

    handleLogInSubmit = e => {
        e.preventDefault()
        const newAccount = {
          user_name: e.target.createNameInput.value,
          user_pass: e.target.createPasswordInput.value,
          user_identifier: [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join(''),
          modified: new Date(),
        }
        const repeatPassword = e.target.checkPasswordInput.value
        this.validateUsername(newAccount.user_name)
          .then(()=> {
            this.validatePassword(newAccount.user_pass)
          })
          .then(()=> {
            this.validateRepeatPassword(repeatPassword, newAccount.user_pass)
          })
          .then(()=>{
            if (this.state.formValid === true){
              fetch(`${config.API_ENDPOINT}/accounts`, {
                method: 'POST',
                headers: {
                  'content-type': 'application/json'
                },
                body: JSON.stringify(newAccount),
              })
                .then(res => {
                  if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                  return res.json()
                })
                .then(account => {
                  this.props.history.push(`/`)
                  this.context.handleLoggedIn(account, true)
                })
                .catch(error => {
                  console.error({ error })
                })
            } else {
              return new Error(`Form is invalid`);
            }
          })
    }

    render(){
        return(
            <div className='logInPage' data-test='logInPageTest'>
              <div className='middleDivider'>
                <LoginForm 
                  handleSignInSubmit={this.handleSignInSubmit} 
                  checkUsernameValid={this.state.checkUsernameValid} 
                  checkPasswordValid={this.state.checkPasswordValid}
                  checkFormValid={this.state.checkFormValid}
                  validationMessages={this.state.validationMessages} 
                />
                <SignUpForm 
                  handleLogInSubmit={this.handleLogInSubmit}
                  usernameValid={this.state.usernameValid}
                  passwordValid={this.state.passwordValid}
                  repeatPasswordValid={this.state.repeatPasswordValid}
                  checkFormValid={this.state.checkFormValid}
                  validationMessages={this.state.validationMessages}
                />
              </div>
            </div>
        )
    }
}

export default LogIn