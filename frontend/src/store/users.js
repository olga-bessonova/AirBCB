import csrfFetch from "./csrf";
import { RECEIVE_LISTING } from "./listings.js"

const RECEIVE_USER = 'users/receiveUser';
const RECEIVE_USERS = 'users/receiveUsers';

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user
});

export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

export const fetchUser = userId => async (dispatch) => {
  const response = await csrfFetch (`/api/users/${userId}`);

  if (response.ok) {
    const user = await response.json();
    dispatch(receiveUser(user));
  }
};
  
export const fetchUsers = () => async dispatch => {
  const response = await csrfFetch('/api/users');

  if (response.ok) {
      const data = await response.json();
      dispatch(receiveUsers(data.users));
  }
};

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...action.users };
    case RECEIVE_USER:
      return { ...state, [action.user.id]: action.user };
    // case RECEIVE_LISTING:
    //   return { ...state, [action.data.user.id]: action.data.user };
     case RECEIVE_LISTING:
      return { ...state, ...action.data.users };
    default:
      return state;
  }
}

export default usersReducer;
