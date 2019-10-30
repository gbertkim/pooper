import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ValidationError from '../ValidationError.js'
import CheckLogged from '../CheckLogged/CheckLogged'
import './SubmitBathroom.css'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

export default class SubmitBathroom extends Component {
    state = {
        name: undefined || '',
        addy: undefined || '',
        longitude: null,
        latitude: null,
        men: false,
        women: false,
        unisex: false,
        handi: false,
        family: false,
        nameValid: true,
        addyValid: true,
        bathroomValid: true,
        formValid: true,
        validationMessages: {
            name: '',
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
            this.setState({
                name: this.props.stateObject.name,
                addy: this.props.stateObject.addy,
                longitude: this.props.stateObject.longitude,
                latitude: this.props.stateObject.latitude,
                men: this.props.stateObject.men,
                women: this.props.stateObject.women,
                unisex: this.props.stateObject.unisex,
                handi: this.props.stateObject.handi,
                family: this.props.stateObject.family,
                nameValid: this.props.stateObject.nameValid,
                addyValid: this.props.stateObject.addyValid,
                bathroomValid: this.props.stateObject.bathroomValid,
                formValid: this.props.stateObject.formValid,
                validationMessages: {
                    name: '',
                }
            })
        }
    }

    updateName(name) {
        this.setState({name}, () => {this.validateName(name)});
    }
    updateMen = event => {
        this.setState({men: event.target.checked},() => {this.validateBathroom(this.state.men, this.state.women, this.state.unisex)});
    }
    updateWomen = event => {
        this.setState({women: event.target.checked},() => {this.validateBathroom(this.state.men, this.state.women, this.state.unisex)});
    }
    updateUnisex = event => {
        this.setState({unisex: event.target.checked},() => {this.validateBathroom(this.state.men, this.state.women, this.state.unisex)});
    }
    updateHandi = event => {
        this.setState({handi: event.target.checked});
    }
    updateFamily = event => {
        this.setState({family: event.target.checked});
    }

    validateName(fieldValue) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
    
        fieldValue = fieldValue.trim();
        if(fieldValue.length === 0) {
          fieldErrors.name = 'Bathroom name is required';
          hasError = true;
        } else {
          if(fieldValue.length < 3){
            fieldErrors.name = 'Bathroom name must be greater than 3 characters long';
            hasError = true;
          } else {
            fieldErrors.name = '';
            hasError = false;
          }
        }
        this.setState({
          validationMessages: fieldErrors,
          nameValid: !hasError
        }, this.formValid );
    
      }

    validateBathroom(men, women, unisex) {
        const fieldErrors = {...this.state.validationMessages};
        let hasError = false;
        if(men === false && women === false && unisex === false) {
            fieldErrors.bathroom = 'Men, Women, or Unisex must be clicked';
            hasError = true;
            } else {
                fieldErrors.bathroom = '';
                hasError = false;
            }
        this.setState({
          validationMessages: fieldErrors,
          bathroomValid: !hasError
        }, this.formValid );
    }

    formValid() {
        this.setState({
            formValid: this.state.addyValid && this.state.nameValid && this.state.bathroomValid
        });
    }

    routeChange = () => {
        this.props.history.push('/bathrooms')
    }

    handleChange = addy => {
        this.setState({ addy });
    };

    handleSelect = addy => {
        this.setState({
            addy: addy,
            addyValid: true
        })
        geocodeByAddress(addy)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.setState({
                    latitude: latLng.lat,
                    longitude: latLng.lng}, this.formValid
                    )
            })
            .catch(error => console.error('Error', error));
    };

    handleError = message => {
        const fieldErrors = {...this.state.validationMessages};
        fieldErrors.addy = message
        this.setState({
            validationMessages: fieldErrors,
            addyValid: false
        }, this.formValid);
    }

    handleSubmit = e => {
        e.preventDefault()
        let bathroomIdNum;
        let bathroomSorted;
        console.log(this.props.bathrooms[7])
        if (this.props.bathrooms.length === 0){
            bathroomIdNum = 1
        } else {
            bathroomSorted = this.props.bathrooms.sort((a,b) =>{
                return a.id - b.id
            })
            bathroomIdNum = this.props.bathrooms[this.props.bathrooms.length - 1].id + 1
        }
        const newBathroom = {
          id: bathroomIdNum,
          name: this.state.name,
          bathroom_user_id: this.props.user_id,
          bathroom_user_name: this.props.user_name,
          longitude: this.state.longitude,
          latitude: this.state.latitude,
          men: this.state.men,
          women: this.state.women,
          unisex: this.state.unisex,
          handi: this.state.handi,
          family: this.state.family,
          modified: new Date()
        }        
        if (this.state.formValid === true){
            this.props.putBathroom(newBathroom)
        } else {
          return new Error(`Form is invalid`);
        }
    }

    render(){
        const { addy, name} = this.state
        const onError = (status, clearSuggestions) => {
            console.log('Google Maps API returned error with status: ', status)
            clearSuggestions()
            this.handleError('Place does not exist. Please select a suggested address.')
        }
        if (this.props.logged === false){
            return (<CheckLogged />)
        } else {
        return(
            <section className='addBathroom' data-test='addBathroomTest'>
            <form className='form bathroomForm' onSubmit={e => this.handleSubmit(e)}>           
                <fieldset className='bathroomFormFieldset'>
                    <legend className='formTitle'>Create a Bathroom</legend>
                <div className='AddLocationError' role='alert'>
                        {this.state.error && <p>{this.state.error.message}</p>}
                </div>
                <PlacesAutocomplete
                    className='submitAutoInput'
                    value={addy}
                    onChange={this.handleChange}
                    onSelect = {this.handleSelect}
                    onError={onError}
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div className='field autoCompleteSubmit'>
                            <label 
                            className='fieldTitle'
                            htmlFor='bathroom-address-input'>
                                Search for Bathroom Address: 
                            </label>
                            <input {...getInputProps({
                                type: "text",
                                placeholder: 'Search Places ...',
                                className: 'location-submit-input',
                            })}
                            />
                            <div className='dropWrapper'>
                            <div className="autocompleteSubmit-dropdown">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                        ? { backgroundColor: '#ffffff', cursor: 'pointer' }
                                        : { backgroundColor: '#EBEAEA', cursor: 'pointer' };
                                        return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                    })}
                            </div>
                            </div>
                        <ValidationError hasError={!this.state.addyValid} message={this.state.validationMessages.addy}/>  
                    </div>
                    )}
                    </PlacesAutocomplete>
                    <div className='field bathroomAddressInput'>
                        <label className='fieldTitle' htmlFor='add-name-input'>
                        Name of Bathroom Location
                        </label>
                        <input 
                            type='text'
                            id='add-name-input' 
                            name='add-name-input' 
                            placeholder='(i.e. Store Name, Park Name, Restaurant etc...)' 
                            value={name}
                            onChange={e => this.updateName(e.target.value)} 
                            aria-label='Add bathroom name input'
                            aria-required='true'
                        />
                        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>  
                    </div> 
                    <div className='field bathroomCheckboxes'>
                        <h4 className='check-bathroom-title'>Click all that apply</h4>
                        <div className='check-bathroom'>
                            <div className='checkboxPair'>
                                <label className='fieldTitle' htmlFor='add-bathroom-men'>
                                    Men
                                </label>
                                <input 
                                    type="checkbox"
                                    value='true'
                                    checked={!!this.state.men}
                                    id='add-bathroom-men' 
                                    name='add-bathroom-men' 
                                    onChange={this.updateMen}
                                />
                            </div>
                            <div className='checkboxPair'>
                                <label className='fieldTitle' htmlFor='add-bathroom-women'>
                                    Women
                                </label>
                                <input 
                                    type="checkbox"
                                    value='true'
                                    checked={!!this.state.women}
                                    id='add-bathroom-women' 
                                    name='add-bathroom-women' 
                                    onChange={this.updateWomen}
                                />
                            </div>
                            <div className='checkboxPair'>
                                <label className='fieldTitle' htmlFor='add-bathroom-unisex'>
                                    Unisex
                                </label>
                                <input 
                                    type="checkbox"
                                    value='true'
                                    checked={!!this.state.unisex}
                                    id='add-bathroom-unisex' 
                                    name='add-bathroom-unisex' 
                                    onChange={this.updateUnisex}
                                />
                            </div>                        
                        </div>
                        <ValidationError hasError={!this.state.bathroomValid} message={this.state.validationMessages.bathroom}/>  
                        <div className='checkboxPair'>
                            <label className='fieldTitle' htmlFor='check-handicap'>
                                    Handicap Accessible
                            </label>
                            <input 
                                type="checkbox"
                                value='true'
                                checked={!!this.state.handi}
                                id='check-handicap' 
                                name='check-handicap' 
                                onChange={this.updateHandi}
                            />
                        </div>
                        <div className='checkboxPair'>
                            <label className='fieldTitle' htmlFor='check-family'>
                                Family Bathroom
                            </label>
                            <input 
                                type="checkbox"
                                value='true'
                                checked={!!this.state.family}
                                id='check-family' 
                                name='check-handicap' 
                                onChange={this.updateFamily}
                            />
                        </div>     
                    </div>
                    <button type="submit" className="button addBathroom_button" disabled={!this.state.formValid}>
                        Add Bathroom
                    </button>
                    </fieldset>
                </form>
            </section>
        )}
    }
}

SubmitBathroom.propTypes = {
    stateObject: PropTypes.shape({
        name: PropTypes.string,
        addy: PropTypes.string,
        longitude: PropTypes.string,
        latitude: PropTypes.string,
        men: PropTypes.bool,
        women: PropTypes.bool,
        unisex: PropTypes.bool,
        handi: PropTypes.bool,
        family: PropTypes.bool,
        nameValid: PropTypes.bool,
        addyValid: PropTypes.bool,
        bathroomValid: PropTypes.bool,
        formValid: PropTypes.bool,
        validationMessages: PropTypes.objectOf(PropTypes.string)
    }),
    putBathroom: PropTypes.func
}