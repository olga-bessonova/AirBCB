import csrfFetch from './csrf';
import { RECEIVE_LISTING } from "./listings.js"


export const RECEIVE_REVIEWS = 'reviews/RECEIVE_REVIEWS';
export const RECEIVE_REVIEW = 'reviews/RECEIVE_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';

export const receiveReviews = (reviews) => ({
  type: RECEIVE_REVIEWS,
  reviews
});

export const receiveReview = (review) => ({
  type: RECEIVE_REVIEW,
  review
});

export const removeReview = (reviewId) => ({
  type: REMOVE_REVIEW,
  reviewId
});


export const getReview = reviewId => state => {
  return state?.reviews ? state.reviews[reviewId] : null;
}

export const getReviews = state => {
  return state?.reviews ? Object.values(state.reviews) : [];
}

export const fetchReviews  = () => async (dispatch) => {
  const response = await csrfFetch ('/api/reviews');

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReviews(data.reviews));
  }
};

export const fetchReview = reviewId => async (dispatch) => {
  const response = await csrfFetch (`/api/reviews/${reviewId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(receiveReview(data.review));
  }
};

export const createReview = review => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(review)
  });

  if (response.ok) {
    const review = await response.json();
    dispatch(receiveReview(review));
  }
};

export const deleteReview = reviewId => async (dispatch) => {
  const response = await csrfFetch (`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    dispatch(removeReview(reviewId));
  }
};

const reviewsReducer = (state = {}, action) => {
  debugger
  switch (action.type) {
    case RECEIVE_REVIEWS:
      return { ...action.reviews };
    case RECEIVE_REVIEW:
      return { ...state, [action.review.id]: action.review };
    case RECEIVE_LISTING:
      return { ...state, [action.data.review.id]: action.data.review };
    case REMOVE_REVIEW:
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;