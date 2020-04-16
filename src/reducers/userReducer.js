import { LOG_IN, CREATE_USER, LOG_OUT } from '../actions/actions';

const initialState = {
	isLoggedIn: false,
	users: [
		{
			email: 'test@email.com',
			password: '123456',
		},
		{
			email: 'qwerty@email.com',
			password: '123',
		},
		{
			email: 'admin@email.com',
			password: 'qwerty',
		},
	],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case LOG_IN:
			return {
				...state,
				isLoggedIn: action.payload,
			};
		case CREATE_USER:
			return {
				users: action.payload,
				isLoggedIn: true,
			};
		case LOG_OUT:
			return {
				...state,
				isLoggedIn: action.payload,
			};
		default:
			return state;
	}
};
