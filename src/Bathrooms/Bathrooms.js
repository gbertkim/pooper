import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import { NavLink, Link } from 'react-router-dom'
import { getDistance } from 'geolib'
import Pagination from '../Pagination'
import BathroomRender from '../BathroomRender/BathroomRender'
import config from '../config'
import './Bathrooms.css'

class Bathrooms extends Component {
    state = {
        overallScore: 0,
        distance: 0,
        currentPage: 1,
        postsPerPage: 2,
        distanceFilter: 10000,
        scoreFilter: 0,
        five: false,
        ten: false,
        twenty: false
    }
    static contextType = ApiContext;
    
    convertBool = (boolean) => {
        if (boolean == true){
            return "Yes";
        }
        else 
            return "No";
    }

    handleSortClick = (score, distance) => {
        this.setState({
            overallScore: score,
            distance: distance
        })
    }

    handleFiveFilter = (event, distance) => {
        this.setState({
            five: event.target.checked,
            ten: false,
            twenty: false, 
            distanceFilter: distance
        })
        if (event.target.checked === false)
        this.setState({
            distanceFilter: 10000
        })
    }

    handleTenFilter = (event, distance) => {
        this.setState({
            five: true,
            ten: event.target.checked,
            twenty: false, 
            distanceFilter: distance
        })
        if (event.target.checked === false)
        this.setState({
            distanceFilter: 5
        })
    }

    handleTwentyFilter = (event, distance) => {
        this.setState({
            five: true,
            ten: true,
            twenty: event.target.checked, 
            distanceFilter: distance
        })
        if (event.target.checked === false)
        this.setState({
            distanceFilter: 10
        })
    }
    
    clicker = (bathroom) => {
        this.context.setBathroomId(bathroom)
    }
    
    //Find distance between two points logic
    roundNumber = (i) => {return Math.round(i * 0.000621371192 * 10) / 10}
    handleDistance = (start, end) => this.roundNumber(getDistance(start, end));
    handlePaginate = (pageNumber) => this.setState({
        currentPage: pageNumber
    })

    deleteBathroomHandle = (bathroomId) => {
        fetch(`${config.API_ENDPOINT}/bathrooms/${bathroomId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            },
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
              this.context.deleteBathroom(bathroomId)
              // allow parent to perform extra behaviour
            })
            .catch(error => {
              console.error({ error })
            })
    }
    
    render() {
        const { bathrooms=[], reviews=[] } = this.context;
        const bathroomArray = bathrooms;
        const startPoint = {latitude: this.context.latitude, longitude: this.context.longitude};

        //Edit Bathroom array to average the overallscore from Reviews
        //Edit Bathroom array to add distance from user address and stored bathrooms
        const editedBathroom = bathroomArray.map(bathroom => {
            let sum = 0;
            let filteredReviews = reviews.filter(review => review.bathroom_id === bathroom.id);
            filteredReviews.forEach(
                review => {sum = sum + (Number(review.overall_score))
            });
            let scoreMath;
            if (isNaN(sum / (filteredReviews.length))){
                scoreMath = 'Not Yet Reviewed'
            } else {
                scoreMath = (sum / (filteredReviews.length))
            }
            bathroom.overallScore = scoreMath;
            bathroom.distanceFar = (this.handleDistance({latitude: bathroom.latitude, longitude: bathroom.longitude}, startPoint));
            return bathroom;
        })

        //Filtering the range logic
        const filteredBathrooms = editedBathroom.filter(bathroom => (bathroom.distanceFar <= this.state.distanceFilter))

        //Sorting logic
        const descending = (a,b) => {
            return b.overallScore-a.overallScore;
        }
        const ascending = (a,b) => {
            return a.distanceFar-b.distanceFar;
        } 
        if (this.state.overallScore === 1) {
            filteredBathrooms.sort(descending);
        }
        if (this.state.distance === 1) {
            filteredBathrooms.sort(ascending);
        }
        
        //Pagination Logic
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = filteredBathrooms.slice(indexOfFirstPost, indexOfLastPost);

        return (
            <div className='bathroomsPage' data-test='bathroomsPageTest'>
            <h3 className='bathroomsPageTitle'>Bathrooms</h3>
            <Link className='addBathroomLink' to='/AddBathroom'>Add a Bathroom</Link>
            <Link className='addBathroomSmall' to='/AddBathroom'>+</Link>

            <fieldset className='sortBy'>
                <button 
                    className='button sortButton'
                    onClick = {() => this.handleSortClick(1,0)}
                    >
                    Sort by Score
                </button>
                <button
                    className='button sortButton' 
                    onClick = {() => this.handleSortClick(0,1)}
                    >
                    Sort by Distance
                </button>
            </fieldset>
            <section className='filterBy'>
                <div className='checkboxPair'>
                    <label className='fieldTitle' htmlFor='filter-five-miles'>
                        5 mile range
                    </label>
                    <input
                        className='checkBox' 
                        type="checkbox"
                        value='true'
                        checked={!!this.state.five}
                        id='filter-five-miles' 
                        name='filter-five-miles' 
                        onChange = {(e) => this.handleFiveFilter(e,5)}
                    />
                </div>
                <div className='checkboxPair'> 
                    <label className='fieldTitle' htmlFor='filter-ten-miles'>
                        10 mile range
                    </label>
                    <input
                        className='checkBox' 
                        type="checkbox"
                        value='true'
                        checked={!!this.state.ten}
                        id='filter-ten-miles' 
                        name='filter-ten-miles' 
                        onChange = {(e) => this.handleTenFilter(e, 10)}
                    />
                </div>
                <div className='checkboxPair'>
                    <label className='fieldTitle' htmlFor='filter-twenty-miles'>
                        20 mile range
                    </label>
                    <input
                        className='checkBox' 
                        type="checkbox"
                        value='true'
                        checked={!!this.state.twenty}
                        id='filter-twenty-miles' 
                        name='filter-twenty-miles' 
                        onChange = {(e) => this.handleTwentyFilter(e, 20)}
                    />
                </div>
            </section>                      
            <ul className='itemLists'>
                {currentPosts.map(bathroom => 
                <li 
                    className='bathroomPost'
                    key={bathroom.id}>
                    <NavLink
                    className='bathroomLink'
                    to={`/bathrooms/${bathroom.id}`}
                    onClick = {() => this.clicker(bathroom.id)}
                    >
                    {bathroom.name}
                    </NavLink>
                    {bathroom.bathroom_user_id === this.context.user_id ? 
                    <div className='editDelete'>
                        <button className='button editDeleteButtons' onClick = {() => {if (window.confirm('Are you sure? Deleting the bathroom will erase all reviews associated with it')) this.deleteBathroomHandle(bathroom.id)}}>Delete</button>
                        <button className='button editDeleteButtons' onClick = {() => this.props.history.push('/EditBathroom', { id: bathroom.id })}>Edit</button>
                    </div> : <></> }
                    <BathroomRender bathroom={bathroom} convertBool={this.convertBool}/>
                </li>
                )}
            </ul>
            <Pagination postsPerPage={this.state.postsPerPage} totalPosts={filteredBathrooms.length} paginate={this.handlePaginate} currentPage={this.state.currentPage}/> 
            </div>  
        )
    }
}

export default Bathrooms;

// Bathrooms.contextTypes = {
//     bathrooms: PropTypes.any,
//     reviews: PropTypes.any,
//     longitude: PropTypes.any,
//     latitude: PropTypes.any
// }