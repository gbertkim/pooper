import React, { Component } from 'react'
import config from '../config'
import SubmitBathroom from '../SubmitBathroom/SubmitBathroom'
import ApiContext from '../ApiContext'


class EditBathroom extends Component {
    static contextType = ApiContext;
    state = {
        name: undefined || '',
        addy: '',
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
        },
        error: null
    };

    componentDidMount() {
        const bathroomId = this.props.location.state.id
        fetch(config.API_ENDPOINT + `/bathrooms/${bathroomId}`, {
          method: 'GET',
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
            return res.json()
          })
          .then(bathroom => {
            this.setState({
              name: bathroom.name,
              longitude: bathroom.longitude,
              latitude: bathroom.latitude,
              handi: bathroom.handi,
              men: bathroom.men,
              women: bathroom.women,
              unisex: bathroom.unisex,
              family: bathroom.family
            })
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
      }

    putBathroom = (newBathroom) => {
        const bathroomId = Number(this.props.location.state.id)
        newBathroom.id = Number(bathroomId)
        console.log(newBathroom)
        fetch(config.API_ENDPOINT + `/bathrooms/${bathroomId}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(newBathroom),
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            })
            .then(bathroom => {
              this.context.updateBathroom(newBathroom)
              this.props.history.push(`/bathrooms/${newBathroom.id}`)
            })
            .catch(error => {
              console.error({ error })
            })
    }

    render(){
        const stateObject = {
            name: this.state.name,
            addy: '',
            longitude: this.state.longitude,
            latitude: this.state.latitude,
            men: this.state.men,
            women: this.state.women,
            unisex: this.state.unisex,
            handi: this.state.handi,
            family: this.state.family,
            nameValid: this.state.nameValid,
            addyValid: this.state.addyValid,
            bathroomValid: this.state.bathroomValid,
            formValid: this.state.formValid,
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
export default EditBathroom;
