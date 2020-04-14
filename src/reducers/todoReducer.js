import { GET_TODOS, CHANGE_PAGE } from '../actions/actions';

const initialState = {
	items: [],
	currentPage: 1,
	itemsPerPage: 10,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_TODOS:
			return {
				...state,
				items: action.payload,
			};
		case CHANGE_PAGE:
			return {
				...state,
				currentPage: action.payload,
			};
		default:
			return state;
	}
};
