import React, { Component } from 'react'
import config from '../config'
import SubmitBathroom from '../SubmitBathroom/SubmitBathroom'
import ApiContext from '../ApiContext'


class AddBathroom extends Component {
    state = {error: null};
    static contextType = ApiContext;

    putBathroom = (newBathroom) => {
        fetch(`${config.API_ENDPOINT}/bathrooms`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newBathroom),
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then(bathroom => {
              this.context.addBathroom(bathroom)
              this.props.history.push(`/bathrooms/${newBathroom.id}`)
            })
            .catch(error => {
              console.error({ error })
            })
    }

    render(){
        const stateObject = {
            name: undefined || '',
            addy: '',
            longitude: null,
            latitude: null,
            men: false,
            women: false,
            unisex: false,
            handi: false,
            family: false,
            nameValid: false,
            addyValid: false,
            bathroomValid: false,
            formValid: false,
            validationMessages: {
                name: '',
            }
        }
        return (
            <SubmitBathroom {...this.props} 
                bathrooms={this.context.bathrooms} 
                user_id={this.context.user_id} 
                user_name={this.context.user_name} 
                logged={this.context.logged} 
                addBathroom={this.context.addBathroom}
                putBathroom={this.putBathroom}
                stateObject={stateObject}
            />
        )
	}
}
export default AddBathroom;
