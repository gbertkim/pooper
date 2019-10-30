import React, { Component } from 'react'
import config from '../config'
import ApiContext from '../ApiContext'
import SubmitReview from '../SubmitReview/SubmitReview'


class EditReview extends Component {
    static contextType = ApiContext;
    state = {
        error: null,
        review: {}
    };

    componentDidMount() {
        const reviewId = this.props.location.state.id
        fetch(config.API_ENDPOINT + `/reviews/${reviewId}`, {
          method: 'GET',
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
            return res.json()
          })
          .then(review => {
            this.setState({
              review: review
            })
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
    }

    putReview = (newReview) => {
        const reviewId = Number(this.props.location.state.id)
        newReview.id = Number(reviewId)
        fetch(config.API_ENDPOINT + `/reviews/${reviewId}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newReview),
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            })
            .then(review => {
              this.context.updateReview(newReview)
              this.props.history.push(`/bathrooms/${newReview.bathroom_id}`)
            })
            .catch(error => {
              console.error({ error })
            })
    }
    
    render(){
        const stateObject = {
            sex: this.state.review.sex,
            clean: this.state.review.clean,
            privacy: this.state.review.privacy,
            smell: this.state.review.smell,
            direction: this.state.review.direction,
            comment: this.state.review.comment,
            sexValid: true,
            cleanValid: true,
            privacyValid: true,
            directionValid: true,
            commentValid: true,
            smellValid: true,
            formValid: true,
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
export default EditReview;
