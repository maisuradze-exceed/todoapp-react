import {
	GET_TODOS,
	NEW_TODO,
	CHECK_TODO,
	REMOVE_TODO,
	CHANGE_PAGE,
	EDIT_TODO,
	COMPLETE_TODOS,
	UNCOMPLETE_TODOS,
	REMOVE_TODOS,
} from '../actions/types';

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
		case NEW_TODO:
			return {
				...state,
				items: action.payload,
			};
		case CHECK_TODO:
			return {
				...state,
				items: action.payload,
			};
		case REMOVE_TODO:
			return {
				...state,
				items: action.payload,
			};
		case CHANGE_PAGE:
			return {
				...state,
				currentPage: action.payload,
			};
		case EDIT_TODO:
			return {
				...state,
				items: action.payload,
			};
		case REMOVE_TODOS:
			return {
				...state,
				items: action.payload,
			};
		case COMPLETE_TODOS:
			return {
				...state,
				items: action.payload,
			};
		case UNCOMPLETE_TODOS:
			return {
				...state,
				items: action.payload,
			};
		default:
			return state;
	}
};
