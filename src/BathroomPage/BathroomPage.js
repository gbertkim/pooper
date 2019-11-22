import React from 'react'
import ApiContext from '../ApiContext'
import Pagination from '../Pagination.js'
import BathroomRender from '../BathroomRender/BathroomRender'
import config from '../config'
import './BathroomPage.css'
import '../BathroomRender/BathroomRender.css'

export default class BathroomPage extends React.Component {
    state = {
        currentPage: 1,
        postsPerPage: 5
    }
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext

    convertBool = (boolean) => {
        if (boolean == true){
            return "Yes";
        }
        else 
            return "No";
    }

    routeChange = (bathroom) => {
        this.context.setBathroomId(bathroom)
        this.props.history.push('/addReview')
    }

    deleteReviewHandle = (reviewId) => {
        fetch(`${config.API_ENDPOINT}/reviews/${reviewId}`, {
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
              this.context.deleteReview(reviewId)
              // allow parent to perform extra behaviour
            })
            .catch(error => {
              console.error({ error })
            })
    }

    handlePaginate = (pageNumber) => this.setState({
        currentPage: pageNumber
    })

    render() {
        const { bathrooms=[], reviews=[] } = this.context
        const { bathroomId } = this.props.match.params
        const findBathroom = (bathrooms = [], bathroomId) =>
            bathrooms.find(bathroom => bathroom.id == bathroomId)
        const findReviews = (reviews = [], bathroomId) =>
            reviews.filter(review => review.bathroom_id == bathroomId)
        const bathroom = findBathroom(bathrooms, bathroomId) || { content: '' }
        const reviewList = findReviews(reviews, bathroomId) || { content: '' }
      
      
        // overall score logic
        let sum = 0;
        reviewList.forEach(
            review => {sum = sum + (Number(review.overall_score))
        });
        let scoreMath;
        if (isNaN(sum / (reviewList.length))){
        scoreMath = 'Not Yet Reviewed'
        } else {
            scoreMath = (sum / (reviewList.length))
        }
        bathroom.overallScore = scoreMath; 

        // Pagination Logic
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = reviewList.slice(indexOfFirstPost, indexOfLastPost); 

        return (
            <div className='bathroomById' data-test='bathroomByIdTest'>
                <section className='bathroomByIdInfo' data-test='bathroomByIdInfoTest' >
                    <h4 className='bathroomDetailTitle'>{bathroom.name}</h4>
                    <BathroomRender bathroom={bathroom} convertBool={this.convertBool}/>
                    <button className='addReviewButton' onClick = {() => this.routeChange(bathroomId)}>Add a Review</button>
                </section>
                <section className='reviewsSection' data-test='reviewsSectionTest'>
                    <h2 className='ReviewTitle'>Reviews</h2>
                    <button className='addReviewSmall' onClick = {() => this.routeChange(bathroomId)}>+</button>
                    <ul className='itemLists'>
                        {currentPosts.map( review =>
                            <li 
                                className='reviewPost'
                                key={review.id}
                            >
                                {review.review_user_id === this.context.user_id ? 
                                    <div className='editDelete'>
                                        <button className='button editDeleteButtons' onClick = {() => {if (window.confirm('Are you sure?')) this.deleteReviewHandle(review.id)}}>Delete</button>
                                        <button className='button editDeleteButtons' onClick = {() => this.props.history.push('/EditReview',  { id: review.id })}>Edit</button>
                                    </div> : <></> }
                                <div className='bathroomCat'>Modified: <span className='bathroomDetails'>{new Date(review.modified).toLocaleString()}</span></div>
                                <div className='bathroomCat' data-test='gilbear'>Review by: <span className='bathroomDetails'>{review.review_user_name}</span></div>
                                <div className='bathroomCat'>Overall Score: <span className='bathroomDetails'>{review.overall_score}</span></div> 
                                <div className='bathroomCat'>Cleanliness: <span className='bathroomDetails'>{review.clean}</span></div>
                                <div className='bathroomCat'>Privacy: <span className='bathroomDetails'>{review.privacy}</span></div>
                                <div className='bathroomCat'>Bathroom Used: <span className='bathroomDetails'>{review.sex}</span></div>
                                <div className='bathroomCat'>Smell:<span className='bathroomDetails'>{review.smell}</span></div>
                                <div className='textCat'>Bathroom Location: <span className='textDetails'>{review.direction}</span></div>
                                <div className='textCat'>Comment: <span className='textDetails'>{review.comment}</span></div>
                            </li>
                        )}
                    </ul>
                </section>
                <Pagination postsPerPage={this.state.postsPerPage} totalPosts={reviewList.length} paginate={this.handlePaginate} currentPage={this.state.currentPage}/>  
            </div>
        )
    }
}

// Needs contextTypes for testing
// BathroomPage.contextTypes = {
//     bathrooms: PropTypes.any,
//     reviews: PropTypes.any
// }