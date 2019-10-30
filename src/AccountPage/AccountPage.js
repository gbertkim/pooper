import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AccountPage.css'

class AccountPage extends Component {
    static contextType = ApiContext;
    deleteAccountHandle = (user_identifier) => {
        fetch(`${config.API_ENDPOINT}/accounts`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({user_identifier: user_identifier}),
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
              this.context.deleteAccount()
            })
            .catch(error => {
              console.error({ error })
            })
    }
    render(){
        let event = Date(this.context.modified)
        return(
            <div className='accountPage' data-test='accountPageTest'>
                <h2 className='accountDetails'>Account Name: <div className='accountDetails'>{this.context.user_name}</div></h2>
                <h4 className='accountDetails'>Created Date: <div className='accountDetails'>{event.toString()}</div></h4>
                <button className='button' onClick = {() => {if (window.confirm('Are you sure? Deleting will remove all bathrooms and reviews related to this account.')) this.deleteAccountHandle(this.context.user_id)}}>Delete Account</button> 
            </div>
        )
    }
}
export default AccountPage;