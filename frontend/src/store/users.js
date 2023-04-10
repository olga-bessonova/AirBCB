import csrfFetch from "./csrf";

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

const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...action.users };
    case RECEIVE_USER:
      return { ...state, [action.user.id]: action.user };
    default:
      return state;
  }
}

export default usersReducer;
