import React from 'react';

export default React.createContext({
  accounts: [],
  reviews: [],
  bathrooms: [],
  longitude: {},
  latitude: {},
  user_id: {},
  user_name: {},
  address: {},
  bathroomId: {},
  setBathroomId: () => {},
  addReview: () => {},
  addBathroom: () => {},
  deleteReview: () => {},
  deleteBathroom: () => {},
  deleteAccount: () => {},
  updateReview: () => {},
  updateBathroom: () => {},
  handleLoggedIn: () => {},
  logged: {}
})