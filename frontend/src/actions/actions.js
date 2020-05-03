export const GET_TODOS = 'GET_TODOS';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export const getTodos = (data) => ({
  type: GET_TODOS,
  payload: data,
});

export const changePage = (data) => ({
  type: CHANGE_PAGE,
  payload: data,
});

export const logInUser = (data) => ({
  type: LOG_IN,
  payload: data,
});

export const logOut = () => ({
  type: LOG_OUT,
});
