import { LOG_IN, LOG_OUT } from '../actions/actions';

const initialState = {
  isLoggedIn: false,
  id: '',
  token: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        isLoggedIn: true,
        id: action.payload.decodedToken._id,
        token: action.payload.token,
      };
    case LOG_OUT:
      return {
        isLoggedIn: false,
        id: '',
        token: '',
      };
    default:
      return state;
  }
};
