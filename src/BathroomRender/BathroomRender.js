import React, { Component } from 'react'
import './BathroomRender.css'
import PropTypes from "prop-types"

class BathroomRender extends Component {
    render(){
        const bathroom = this.props.bathroom
        const convertBool = this.props.convertBool
        return(
            <>
                <div className='bathroomCat'>Bathroom King/Queen: <span className='bathroomDetails'>{bathroom.bathroom_user_name}</span></div>
                <div className='bathroomCat'>Overall Score: <span className='bathroomDetails ovrScore'>{bathroom.overallScore}</span></div>
                <div className='bathroomCat'>Distance: <span className='bathroomDetails'>{bathroom.distanceFar} mi</span></div>
                <div className='bathroomCat'>Latitude: <span className='bathroomDetails'>{bathroom.latitude}</span></div>
                <div className='bathroomCat'>Longitude: <span className='bathroomDetails'>{bathroom.longitude}</span></div>
                <div className='bathroomCat'>Handicap Accessible: <span className='bathroomDetails'>{convertBool(bathroom.handi)}</span></div>
                <div className='bathroomCat'>Men's Bathroom: <span className='bathroomDetails'>{convertBool(bathroom.men)}</span></div>
                <div className='bathroomCat'>Women's Bathroom: <span className='bathroomDetails'>{convertBool(bathroom.women)}</span></div>
                <div className='bathroomCat'>Unisex Bathroom: <span className='bathroomDetails'>{convertBool(bathroom.unisex)}</span></div>
                <div className='bathroomCat'>Family Bathroom: <span className='bathroomDetails'>{convertBool(bathroom.family)}</span></div>
            </>
        )
    }
}
export default BathroomRender;

BathroomRender.propTypes = {
    bathroom: PropTypes.shape({
        id: PropTypes.number,
        bathroom_user_id: PropTypes.string,
        bathroom_user_name: PropTypes.string,
        name: PropTypes.string,
        longitude: PropTypes.string,
        latitude: PropTypes.string,
        handi: PropTypes.bool,
        women: PropTypes.bool,
        unisex: PropTypes.bool,
        family: PropTypes.bool,
        modified: PropTypes.string
      })
}