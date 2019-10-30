import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import ValidationError from '../ValidationError.js'
import CheckLogged from '../CheckLogged/CheckLogged'
import './SubmitReview.css'

export default class SubmitReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sex: undefined || '',
            clean: undefined || '',
            privacy: undefined || '',
            smell: undefined || '',
            direction: undefined || '',
            comment: undefined || '',
            sexValid: false,
            smellValid: false,
            cleanValid: false,
            privacyValid: false,
            directionValid: false,
            commentValid: false,
            formValid: false,
            validationMessages: {
                name: '',
            }
        }
    }
    static defaultProps = {
        history: {
            push: () => { }
        },
        stateObject: {}
    }
    
    componentDidUpdate(prevProps) {
      if (this.props.stateObject !== prevProps.stateObject) {
          console.log(this.props.stateObject)
          this.setState({
            sex: this.props.stateObject.sex,
            clean: this.props.stateObject.clean,
            privacy: this.props.stateObject.privacy,
            smell: this.props.stateObject.smell,
            direction: this.props.stateObject.direction,
            comment: this.props.stateObject.comment,
            sexValid: this.props.stateObject.sexValid,
            cleanValid: this.props.stateObject.cleanValid,
            smellValid: this.props.stateObject.smellValid,
            privacyValid: this.props.stateObject.privacyValid,
            directionValid: this.props.stateObject.directionValid,
            commentValid: this.props.stateObject.commentValid,
            formValid: this.props.stateObject.formValid,
              validationMessages: {
                  name: '',
              }
          })
      }
  }

  updateSex(sex) {
      this.setState({sex}, () => {this.validateSex(sex)});
      console.log(sex);
  }
  updateClean(clean) {
      this.setState({clean}, () => {this.validateClean(clean)});
      console.log(clean);
  }
  updatePrivacy(privacy) {
      this.setState({privacy}, () => {this.validatePrivacy(privacy)});
      console.log(privacy);
  }
  updateSmell(smell) {
      this.setState({smell}, () => {this.validateSmell(smell)});
      console.log(smell);
  }
  updateDirection(direction) {
      this.setState({direction}, () => {this.validateDirection(direction)});
      console.log(direction)
  }
  updateComment(comment) {
      this.setState({comment}, () => {this.validateComment(comment)});
      console.log(comment)
  }

  validateClean(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;
  
      fieldValue = fieldValue.trim();
      if(fieldValue.length === 0) {
        fieldErrors.clean = 'Number input is required';
        hasError = true;
      } else {
        if (fieldValue < 1 || fieldValue > 5) {
          fieldErrors.clean = 'Number must be within 1-5';
          hasError = true;
        } else {
          fieldErrors.clean = '';
          hasError = false;
        }
      }
  
      this.setState({
        validationMessages: fieldErrors,
        cleanValid: !hasError
      }, this.formValid );
  
  }

  validatePrivacy(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;
  
      fieldValue = fieldValue.trim();
      if(fieldValue.length === 0) {
        fieldErrors.privacy = 'Number input is required';
        hasError = true;
      } else {
        if (fieldValue < 1 || fieldValue > 5) {
          fieldErrors.privacy = 'Number must be within 1-5';
          hasError = true;
        } else {
          fieldErrors.privacy = '';
          hasError = false;
        }
      }
  
      this.setState({
        validationMessages: fieldErrors,
        privacyValid: !hasError
      }, this.formValid );
  
  }

  validateSmell(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;
      fieldValue = fieldValue.trim();
      console.log(fieldValue);
      if(fieldValue.length === 0) {
        fieldErrors.smell = 'Number input is required';
        hasError = true;
      } else {
        if (fieldValue < 1 || fieldValue > 5) {
          fieldErrors.smell = 'Number must be within 1-5';
          hasError = true;
        } else {
          fieldErrors.smell = '';
          hasError = false;
        }
      }
  
      this.setState({
        validationMessages: fieldErrors,
        smellValid: !hasError
      }, this.formValid );
  
  }

  validateDirection(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;
  
      fieldValue = fieldValue.trim();
      if(fieldValue.length === 0) {
        fieldErrors.direction = 'Content is required';
        hasError = true;
      } else {
        if (fieldValue.length < 3) {
          fieldErrors.direction = 'Direction content must be at least 3 characters long';
          hasError = true;
        } else {
          fieldErrors.direction = '';
          hasError = false;
        }
      }
  
      this.setState({
        validationMessages: fieldErrors,
        directionValid: !hasError
      }, this.formValid );

  }

  validateComment(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;
  
      fieldValue = fieldValue.trim();
      if(fieldValue.length === 0) {
        fieldErrors.comment = 'Content is required';
        hasError = true;
      } else {
        if (fieldValue.length < 3) {
          fieldErrors.comment = 'Comment content must be at least 3 characters long';
          hasError = true;
        } else {
          fieldErrors.comment = '';
          hasError = false;
        }
      }
  
      this.setState({
        validationMessages: fieldErrors,
        commentValid: !hasError
      }, this.formValid );

  }

  validateSex(fieldValue) {
      const fieldErrors = {...this.state.validationMessages};
      let hasError = false;
      fieldValue = fieldValue.trim();
      console.log(fieldValue);
      if(fieldValue === 'null' || fieldValue === '' || fieldValue === undefined) {
        fieldErrors.sex = 'Please select which bathroom you used';
        hasError = true;
      } else {
          fieldErrors.sex = '';
          hasError = false;
      }

      this.setState({
        validationMessages: fieldErrors,
        sexValid: !hasError
      }, this.formValid );
  
    }
  
  formValid() {
      this.setState({
          formValid: this.state.cleanValid && this.state.privacyValid && this.state.smellValid && this.state.directionValid && this.state.commentValid && this.state.sexValid
      });
  }
    
  handleSubmit = e => {
      e.preventDefault()
      let cleanAvg = Number(this.state.clean)
      let privacyAvg = Number(this.state.privacy)
      let smellAvg = Number(this.state.smell)
      let overallAvg = (cleanAvg + privacyAvg + smellAvg)/3
      let reviewIdNum;
      let reviewSorted;
      if (this.props.reviews.length === 0){
          reviewIdNum = 1
      } else {
        reviewSorted = this.props.reviews.sort((a,b) =>{
            return a.id - b.id
        })
        reviewIdNum = this.props.reviews[this.props.reviews.length - 1].id + 1
    }
      const newReview = {
        id: reviewIdNum,
        bathroom_id: this.props.bathroomId,
        review_user_id: this.props.user_id,
        review_user_name: this.props.user_name,
        sex: this.state.sex,
        clean: this.state.clean,
        privacy: this.state.privacy,
        smell: this.state.smell,
        modified: new Date(),
        direction: this.state.direction,
        comment: this.state.comment,
        overall_score: overallAvg
      }
      if (this.state.formValid === true){
        this.props.putReview(newReview)
      } else {
        return new Error(`Form is invalid`);
      }
  }
  render(){
      if (this.props.bathroomId === null){
          return (
              <div className='logInRequired'><p>Go back and choose a <Link className='linkAway' to = '/'>bathroom</Link> to add a review for</p></div>
          )
      } else if (this.props.logged === false){
          return (<CheckLogged />)
      } else {
          return(
          <section className='addReview' data-test='addReviewTest'>
          {/* <h2 className='formTitle'>Create a Review</h2> */}
          <form className='form reviewForm' onSubmit={e => this.handleSubmit(e)}>
              <fieldset className='reviewFormFieldset'>    
                  <legend className='formTitle'>Review Form</legend>
                  <div className='bathroomSelect'>
                      <label className='fieldTitle' htmlFor='review-bathroom-select'>
                      Bathroom:
                      </label>
                      <select
                          className='fieldSelector' 
                          id='review-bathroom-select' 
                          name='review-bathroom-select'
                          value={this.state.sex}
                          onChange={e => this.updateSex(e.target.value)}
                      >
                          <option className='bathroomSelect' key="null" value='null'>...</option>
                          <option className='bathroomSelect' key='Men' value='Men'>Men</option>
                          <option className='bathroomSelect' key='Women' value='Women'>Women</option>
                          <option className='bathroomSelect' key='Unisex' value='Unisex'>Unisex</option>
                      </select>
                      <ValidationError hasError={!this.state.sexValid} message={this.state.validationMessages.sex}/>  
                  </div>
                  <div className='cleanInput'>
                      <label className='fieldTitle' htmlFor='review-clean-input'>
                      Cleanliness:
                      </label>
                      <input 
                          type='number'
                          id='review-clean-input' 
                          name='review-clean' 
                          placeholder='1-5, 5 is best'
                          value={this.state.clean} 
                          onChange={e => this.updateClean(e.target.value)} 
                          aria-label='Review Cleanliness Input'
                          aria-required='true'
                      />
                      <ValidationError hasError={!this.state.cleanValid} message={this.state.validationMessages.clean}/>  
                  </div>
                  <div className='privacyInput'>
                      <label className='fieldTitle' htmlFor='review-privacy-input'>
                      Privacy:
                      </label>
                      <input 
                          type='number'
                          id='review-privacy-input' 
                          name='review-privacy' 
                          placeholder='1-5, 5 is best'
                          value={this.state.privacy} 
                          onChange={e => this.updatePrivacy(e.target.value)} 
                          aria-label='Review Privacy Input'
                          aria-required='true'
                      />
                      <ValidationError hasError={!this.state.privacyValid} message={this.state.validationMessages.privacy}/>  
                  </div>
                  <div className='smellInput'>
                      <label className='fieldTitle' htmlFor='review-smell-input'>
                      Smell:
                      </label>
                      <input 
                          type='number'
                          id='review-smell-input' 
                          name='review-smell' 
                          placeholder='1-5, 5 is best'
                          value={this.state.smell} 
                          onChange={e => this.updateSmell(e.target.value)} 
                          aria-label='Review Smelll Input'
                          aria-required='true'
                      />
                      <ValidationError hasError={!this.state.smellValid} message={this.state.validationMessages.smell}/>  
                  </div>
                  <div className='directionInput'>
                      <label className='fieldTitle' htmlFor='review-direction-input'>
                      Location of Bathroom:
                      </label>
                      <textarea 
                          type='textarea'
                          id='review-direction-input' 
                          name='review-direction'
                          maxlength='255' 
                          placeholder='Describe where the bathroom is located and how to access it' 
                          value={this.state.direction}
                          onChange={e => this.updateDirection(e.target.value)} 
                          aria-label='Review Direction Input'
                          aria-required='true'
                      />
                      <ValidationError hasError={!this.state.directionValid} message={this.state.validationMessages.direction}/>  
                  </div>
                  <div className='commentInput'>
                      <label className='fieldTitle' htmlFor='review-comment-input'>
                      Comment:
                      </label>
                      <textarea 
                          type='textarea'
                          id='review-comment-input' 
                          name='review-comment' 
                          placeholder='Write about your overall experience'
                          value={this.state.comment} 
                          maxlength='4000'
                          onChange={e => this.updateComment(e.target.value)} 
                          aria-label='Review comment Input'
                          aria-required='true'
                      />
                      <ValidationError hasError={!this.state.commentValid} message={this.state.validationMessages.comment}/>  
                  </div>
                  <button className='button submitReviewButton' type="submit" disabled={!this.state.formValid}>
                      Add Review
                  </button>
              </fieldset>
          </form>
          </section>
        )
    }
  }
}

SubmitReview.propTypes = {
  stateObject: PropTypes.shape({
    sex: PropTypes.string,
    clean: PropTypes.number,
    privacy: PropTypes.number,
    smell: PropTypes.number,
    direction: PropTypes.string,
    comment: PropTypes.string,
    sexValid: PropTypes.bool,
    cleanValid: PropTypes.bool,
    privacyValid: PropTypes.bool,
    directionValid: PropTypes.bool,
    commentValid: PropTypes.bool,
    smellValid: PropTypes.bool,
    formValid: PropTypes.bool,
    validationMessages: PropTypes.objectOf(PropTypes.string)
  })
}

// SubmitReview.contextTypes = {
//   bathroomId: PropTypes.any,
//   logged: PropTypes.any
// }