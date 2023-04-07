import csrfFetch from "./csrf";

// Export the following action constants and write the corresponding actions:
export const RECEIVE_LISTINGS = 'listings/RECEIVE_LISTINGS';
export const RECEIVE_LISTING = 'listings/RECEIVE_LISTING';
export const REMOVE_LISTING = 'listings/REMOVE_LISTING';

export const receiveListings = (listings) => ({
  type: RECEIVE_LISTINGS,
  listings
});

export const receiveListing = (listing) => ({
  type: RECEIVE_LISTING,
  listing
});

export const removeListing = (listingId) => ({
  type: REMOVE_LISTING,
  listingId
});

/* 
`getListing` selector takes in a `listingId` and returns the specified
listing from the store.

`getListings` selector returns an array of all the listings in the
store.
*/
export const getListing = listingId => state => {
  return state?.listings ? state.listings[listingId] : null;
}

export const getListings = state => {
  return state?.listings ? Object.values(state.listings) : [];
}

// Below are fetch functions that call fetch to perform the desired db operation 
// and dispatch the appropriate action upon a successful response
export const fetchListings = () => async (dispatch) => {
  debugger
  const response = await csrfFetch ('/api/listings');

  if (response.ok) {
    const listings = await response.json();
    dispatch(receiveListings(listings));
  }
};

export const fetchListing = listingId => async (dispatch) => {
  const response = await csrfFetch (`/api/listings/${listingId}`);

  if (response.ok) {
    const listing = await response.json();
    dispatch(fetchListing(listing));
  }
};

export const createListing = listing => async (dispatch) => {
  const response = await csrfFetch(`/api/listings/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(listing)
  });

  if (response.ok) {
    const listing = await response.json();
    dispatch(receiveListing(listing));
  }
};

export const updateListing = listing => async (dispatch) => {
  const response = await csrfFetch(`/api/listings/${listing.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(listing)
  });
    
  if (response.ok) {
    const listing = await response.json();
    dispatch(receiveListing(listing));
  }
};

export const deleteListing = listingId => async (dispatch) => {
  const response = await csrfFetch (`/api/listings/${listingId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(removeListing(listingId));
  }
};

const listingsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LISTINGS:
      debugger
      return { ...action.listings };
    case RECEIVE_LISTING:
      return { ...state, [action.listing.id]: action.listing };
    case REMOVE_LISTING:
      const newState = { ...state };
      delete newState[action.listingId];
      return newState;
    default:
      return state;
  }
}

export default listingsReducer;