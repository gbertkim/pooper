import React, { Component } from 'react'
import config from '../config'
import ApiContext from '../ApiContext'
import SubmitReview from '../SubmitReview/SubmitReview'


class AddReview extends Component {
    state = {error: null};
    static contextType = ApiContext;

    putReview = (newReview) => {
        fetch(`${config.API_ENDPOINT}/reviews`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newReview),
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then(review => {
              this.context.addReview(review)
              this.props.history.push(`/bathrooms/${newReview.bathroom_id}`)
            })
            .catch(error => {
              console.error({ error })
            })
    }

    render(){
        const stateObject = {
            sex: undefined,
            clean: undefined,
            privacy: undefined,
            smell: undefined,
            direction: undefined,
            comment: undefined,
            sexValid: false,
            cleanValid: false,
            privacyValid: false,
            directionValid: false,
            commentValid: false,
            smellValid: false,
            formValid: false,
            validationMessages: {
                name: '',
            }
        }
        return (
            <SubmitReview {...this.props}
                reviews={this.context.reviews}
                bathroomId={this.context.bathroomId}
                bathrooms={this.context.bathrooms} 
                user_id={this.context.user_id} 
                user_name={this.context.user_name} 
                logged={this.context.logged} 
                addReview={this.context.addReview}
                putReview={this.putReview}
                stateObject={stateObject}
            />
        )
	}
}
export default AddReview;
