import {
	GET_TODOS,
	NEW_TODO,
	CHECK_TODO,
	REMOVE_TODO,
	CHANGE_PAGE,
	EDIT_TODO,
} from './types';
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

export const checkTodo = (postData) => (dispatch) => {
	axios
		.patch(`https://exceed-react.herokuapp.com/list/${postData.id}`, {
			isCompleted: postData.isCompleted,
		})
		.then((res) =>
			dispatch({
				type: CHECK_TODO,
				payload: res.data,
			})
		);
};

export const removeTodo = (postData) => (dispatch) => {
	axios
		.delete(`https://exceed-react.herokuapp.com/list/${postData}`)
		.then((res) =>
			dispatch({
				type: REMOVE_TODO,
				payload: res.data,
			})
		);
};

export const changePage = (postData) => (dispatch) => {
	dispatch({
		type: CHANGE_PAGE,
		payload: postData,
	});
};

export const editTodo = (postData) => (dispatch) => {
	axios
		.patch(`https://exceed-react.herokuapp.com/list/single/${postData.id}`, {
			value: postData.newValue,
		})
		.then((res) =>
			dispatch({
				type: EDIT_TODO,
				payload: res.data,
			})
		);
};
