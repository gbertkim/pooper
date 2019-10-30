import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import PropTypes from "prop-types"
import ApiContext from '../ApiContext'
import config from '../config'
import SearchBar from '../SearchBar/SearchBar.js'
import Bathrooms from '../Bathrooms/Bathrooms.js'
import BathroomPage from '../BathroomPage/BathroomPage.js'
import Button from '../Button/Button.js'
import LogIn from '../LogIn/LogIn.js'
import MainPage from '../MainPage/MainPage.js'
import AccountPage from '../AccountPage/AccountPage.js'
import LogOutButton from '../LogOutButton/LogOutButton.js'
import AddBathroom from '../AddBathroom/AddBathroom.js'
import AddReview from '../AddReview/AddReview.js'
import EditBathroom from '../EditBathroom/EditBathroom.js'
import EditReview from '../EditReview/EditReview.js'



import './App.css'

class App extends Component {
  state = {
    address: '',
    error: null,
    longitude: 0,
    latitude: 0,
    redirectKey: false,
    bathrooms: [],
    reviews: [],
    bathroomId: null,
    logged: false,
    user_id: '', 
    user_name: '',
    modified: ''
  };

  //Fetch all the bathrooms and reviews
  componentDidMount() {
    if (Boolean(sessionStorage.getItem('logged')) === true) {
      let boolLog = sessionStorage.getItem('logged')
      this.setState({
        logged: Boolean(boolLog),
        user_id: sessionStorage.getItem('user_id'),
        user_name: sessionStorage.getItem('user_name'),
        modified: sessionStorage.getItem('modified')
      })
    }
    if (sessionStorage.getItem('bathroomId') !== null) {
      this.setState({
        bathroomId: Number(sessionStorage.getItem('bathroomId'))
      })
    }
    Promise.all([
      fetch(`${config.API_ENDPOINT}/bathrooms`),
      fetch(`${config.API_ENDPOINT}/reviews`)
    ])
      .then(([bathroomsRes, reviewsRes]) => {
        if (!bathroomsRes.ok)
          return bathroomsRes.json().then(e => Promise.reject(e))
        if (!reviewsRes.ok)
          return reviewsRes.json().then(e => Promise.reject(e))
        return Promise.all([
          bathroomsRes.json(),
          reviewsRes.json(),
        ])
      })
      .then(([bathrooms, reviews]) => {
        this.setState({ bathrooms, reviews })
      })
      .catch(error => {
        console.error({ error })
      })
  }


  // Callback functions and state manipulation
  setLocation = (addy, long, lat) => {
    this.setState({
      address: addy,
      longitude: long,
      latitude: lat,
      error: null,
      redirectKey: true
    })
  }

  handleBathroomId = (bathroom) => {
    console.log('Bathroom chosen with id')
    this.setState({
      bathroomId: Number(bathroom)
    })
    sessionStorage.setItem('bathroomId', Number(bathroom))
  }

  handleAddReview = review => {
    console.log('Review added')
    this.setState({
      reviews: [
        ...this.state.reviews,
        review
      ]
    })
  }

  handleAddBathroom = bathroom => {
    console.log('Bathroom added')
    this.setState({
      bathrooms: [
        ...this.state.bathrooms,
        bathroom
      ]
    })
  }

  handleDeleteReview = reviewId => {
    this.setState({
      reviews: this.state.reviews.filter(review => review.id !== reviewId)
    })
  }

  handleDeleteAccount = () => {
    this.setState({
      user_id: '',
      user_name: '',
      modified: '',
    })
    this.handleLogged()
  }

  handleDeleteBathroom = bathroomId => {
    this.setState({
      bathrooms: this.state.bathrooms.filter(bathroom => bathroom.id !== bathroomId)
    })
  }
  handleDeleteBathroom = bathroomId => {
    this.setState({
      bathrooms: this.state.bathrooms.filter(bathroom => bathroom.id !== bathroomId)
    })
  }
  handleUpdateReview = updatedReview => {
    console.log(updatedReview)
    const newReviews = this.state.reviews.map(review => 
        (review.id === updatedReview.id) 
          ? updatedReview
          : review
    )
    this.setState({
      reviews: newReviews
    })
  }

  handleUpdateBathroom = updatedBathroom => {
    console.log(updatedBathroom)
    const newBathrooms = this.state.bathrooms.map(bathroom => 
        (bathroom.id === updatedBathroom.id) 
          ? updatedBathroom
          : bathroom
    )
    this.setState({
      bathrooms: newBathrooms
    })
  }
  
  handleLogged = () => {
    console.log('Logging out')
    this.setState({
      logged: false,
      user_id: '',
      user_name: ''
    })
    sessionStorage.clear();
  }

  handleLoggedIn = (account, log) => {
    console.log('Logging in')
    this.setState({
      logged: log,
      user_id: account.user_identifier,
      user_name: account.user_name,
      modified: account.modified
    })
    sessionStorage.setItem('logged', true)
    sessionStorage.setItem('user_id', account.user_identifier)
    sessionStorage.setItem('user_name', account.user_name)
    sessionStorage.setItem('modified', account.modified)
  }


  // Handle all the routes
  renderMainRoutes() {
    console.log('Main routes rendered')
    return (
      <>
        <Route
          exact
          path='/bathrooms'
          render={(props) => (
            <Bathrooms {...props} />
          )}
        />
        <Route
          path='/bathrooms/:bathroomId'
          render={(props) => (
            <BathroomPage {...props} />
          )}
        />
        <Route
          path='/addbathroom'
          render={(props) => (
            <AddBathroom {...props} />
          )}
        />
        <Route
          path='/editbathroom'
          render={(props) => (
            <EditBathroom {...props} />
          )}
        />
        <Route
          path='/addreview'
          render={(props) => (
            <AddReview {...props} />
          )}
        />
        <Route
          path='/editreview'
          render={(props) => (
            <EditReview {...props} />
          )}
        />        
        <Route
          path='/log-in'
          render={(props) => (
            <LogIn {...props} />
          )}
        />
        <Route
          exact path='/'
          render={(props) => (
            <MainPage />
          )}
        />
        <Route
          path='/account'
          render={(props) => (
            <AccountPage {...props} />
          )}
        />      
      </>
    )
  }
  renderHeaderRoutes() {
    console.log('Header routes rendered')
    return (
      <header className='app_header'>
        <section className='topBar'>
          <Route path='/'
            render={({ history }) => {
              return <section>
                <h1 className='app_title'>
                  <Link className='headerLink' to='/'>Pooper</Link>
                </h1>
                <SearchBar
                  setLocation={this.setLocation}
                  onClickCancel={() => history.push('/bathrooms')}
                />
              </section>
            }}>
          </Route>

          {['/', '/bathroom', '/bathrooms', '/bathrooms/:bathroomId', '/addbathroom', '/addreview', '/editbathroom', '/editreview'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              render={(props) => (
                <Button className='button loggedButton' logged={this.state.logged} />
              )}
            />
          )}
          <Route
            path='/account'
            render={(props) => (
              <LogOutButton logged={this.state.logged} handleLogged={this.handleLogged} />
            )}
          />            
          {['/log-in', '/bathroom', '/bathrooms', '/bathrooms/:bathroomId', '/addbathroom', '/addreview', '/account', '/editbathroom', '/editreview'].map(path =>
            <Route
              exact
              key={path}
              path={path}
              render={({ history }) => {
                return (
                  <>
                    <button className='button goBackButton' onClick={() => history.goBack()}>Back</button>
                  </>
                )
              }
              }
            />
          )}
        </section>
      </header>
    )
  }

  render() {
    const value = {
      user_id: this.state.user_id,
      user_name: this.state.user_name,
      modified: this.state.modified,
      address: this.state.address,
      reviews: this.state.reviews,
      bathrooms: this.state.bathrooms,
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      bathroomId: this.state.bathroomId,
      setBathroomId: this.handleBathroomId,
      addReview: this.handleAddReview,
      addBathroom: this.handleAddBathroom,
      deleteReview: this.handleDeleteReview,
      deleteBathroom: this.handleDeleteBathroom,
      deleteAccount: this.handleDeleteAccount,
      updateReview: this.handleUpdateReview,
      updateBathroom: this.handleUpdateBathroom,
      handleLoggedIn: this.handleLoggedIn,
      logged: this.state.logged
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          {this.renderHeaderRoutes()}
          <main>
            {this.renderMainRoutes()}
            <Route path='/map' component={Map} />
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App

ApiContext.Provider.propTypes = {
  value: PropTypes.shape({
    accounts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      user_identifier: PropTypes.string,
      user_name: PropTypes.string,
      user_pass: PropTypes.string,
      modified: PropTypes.instanceOf(Date)
    })),
    bathrooms: PropTypes.arrayOf(PropTypes.shape({
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
    })),
    reviews: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      bathroom_id: PropTypes.number,
      review_user_id: PropTypes.string,
      review_user_name: PropTypes.string,
      sex: PropTypes.string,
      clean: PropTypes.number,
      privacy: PropTypes.number,
      smell: PropTypes.number,
      overall_score: PropTypes.string,
      direction: PropTypes.string,
      comment: PropTypes.string,
      modified: PropTypes.string
    })),
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    user_id: PropTypes.string,
    user_name: PropTypes.string,
    address: PropTypes.string,
    bathroomId: PropTypes.number,
    setBathroomId: PropTypes.func,
    addReview: PropTypes.func,
    addBathroom: PropTypes.func,
    deleteReview: PropTypes.func,
    deleteBathroom: PropTypes.func,
    deleteAccount: PropTypes.func,
    updateReview: PropTypes.func,
    updateBathroom: PropTypes.func,
    handleLoggedIn: PropTypes.func,
    logged: PropTypes.bool
  })
}