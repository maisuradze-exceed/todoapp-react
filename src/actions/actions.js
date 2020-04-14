export const GET_TODOS = 'GET_TODOS';
export const CHANGE_PAGE = 'CHANGE_PAGE';

export const getTodos = (data) => ({
	type: GET_TODOS,
	payload: data,
});

export const changePage = (data) => ({
	type: CHANGE_PAGE,
	payload: data,
});
