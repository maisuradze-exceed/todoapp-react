import { GET_TODOS, NEW_TODO } from './types';
import axios from 'axios';

export const getTodos = () => (dispatch) => {
	axios.get('https://exceed-react.herokuapp.com/list').then((res) =>
		dispatch({
			type: GET_TODOS,
			payload: res.data,
		})
	);
};

export const addTodo = (postData) => (dispatch) => {
	axios
		.post('https://exceed-react.herokuapp.com/list', {
			value: postData.value,
		})
		.then((res) =>
			dispatch({
				type: NEW_TODO,
				payload: res.data,
			})
		);
};
