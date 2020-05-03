import { LOG_IN, LOG_OUT } from '../actions/actions';

const initialState = {
  isLoggedIn: false,
  user: '',
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        isLoggedIn: true,
        user: action.payload.decodedToken._id,
        token: action.payload.token,
      };
    case LOG_OUT:
      return {
        isLoggedIn: false,
        user: '',
        token: '',
      };
    default:
      return state;
  }
};
