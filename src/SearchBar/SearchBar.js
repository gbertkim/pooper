import React, { Component } from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import PropTypes from "prop-types"


class SearchBar extends Component {
    state = {
        error: null,
        addy: '',
        latitude: undefined,
        longitude: undefined,
        formValid: false
    };

    handleSubmitClick = (e) => {
        e.preventDefault();
        this.props.setLocation(this.state.addy, this.state.longitude, this.state.latitude, true);
        this.props.onClickCancel();
    };

    handleChange = addy => {
        this.setState({ addy });
    };

    handleSelect = addy => {
        this.setState({
            addy: addy,
            formValid: true
        })
        geocodeByAddress(addy)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                console.log('Success', latLng)
                this.setState({
                    latitude: latLng.lat,
                    longitude: latLng.lng})
            })
            .catch(error => console.error('Error', error));
    };

    handleError = message => {
        this.setState({
            error: {
                message: message
            }
        })

    }

    render(){
        const onError = (status, clearSuggestions) => {
            console.log('Google Maps API returned error with status: ', status)
            clearSuggestions()
            this.handleError('Place does not exist. Please select a suggested address.')
        }
        return (
            <section className='autoInput' data-test='autoInputTest'>
                <div className='AddLocationError' role='alert'>
                    {this.state.error && <p>{this.state.error.message}</p>}
                </div>
                <form className='searchForBathrooms'>
                    <fieldset className='fieldsetStart'>
                        <PlacesAutocomplete
                            value={this.state.addy}
                            onChange={this.handleChange}
                            onSelect = {this.handleSelect}
                            onError={onError}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className='field findPlacesInput'>
                                    <input {...getInputProps({
                                        type: "text",
                                        placeholder: 'Find your location to start',
                                        className: 'location-search-input',
                                    })}
                                    />
                                <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                            ? 'suggestion-item--active'
                                            : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                            ? { backgroundColor: '#FFFFFF', cursor: 'pointer' }
                                            : { backgroundColor: '#EBEAEA', cursor: 'pointer' };
                                            return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                                })}
                                            >
                                                <span className='suggestionDrop'>{suggestion.description}</span>
                                            </div>
                                        );
                                        })}
                                    </div>
                                </div>
                                )}
                        </PlacesAutocomplete>
                    </fieldset>
                    <button className="button FormButton" onClick={this.handleSubmitClick} disabled={!this.state.formValid}>
                        Search
                    </button>
                </form>
            </section>
        )
    }
}

export default SearchBar;

SearchBar.propTypes = {
    setLocation: PropTypes.func,
    onClickCancel: PropTypes.func
}