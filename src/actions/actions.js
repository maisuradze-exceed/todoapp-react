export const GET_TODOS = 'GET_TODOS';
export const NEW_TODO = 'NEW_TODO';
export const CHECK_TODO = 'CHECK_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const TOGGLE_DONE = 'TOGGLE_DONE';
export const EDIT_TODO = 'EDIT_TODO';
export const COMPLETE_TODOS = 'COMPLETE_TODOS';
export const UNCOMPLETE_TODOS = 'UNCOMPLETE_TODOS';
export const REMOVE_TODOS = 'REMOVE_TODOS';

export const getTodos = (data) => {
	dispatch({
		type: GET_TODOS,
		payload: data,
	});
};

// export const addTodo = (postData) => {
// 	const request = axios.post('https://exceed-react.herokuapp.com/list', {
// 		value: postData.value,
// 	});

// 	return (dispatch) => {
// 		request.then(({ data }) => {
// 			dispatch({
// 				type: NEW_TODO,
// 				payload: data,
// 			});
// 		});
// 	};
// };

// export const checkTodo = (postData) => (dispatch) => {
// 	axios
// 		.patch(`https://exceed-react.herokuapp.com/list/${postData.id}`, {
// 			isCompleted: postData.isCompleted,
// 		})
// 		.then((res) =>
// 			dispatch({
// 				type: CHECK_TODO,
// 				payload: res.data,
// 			})
// 		);
// };

// export const removeTodo = (postData) => (dispatch) => {
// 	axios
// 		.delete(`https://exceed-react.herokuapp.com/list/${postData}`)
// 		.then((res) =>
// 			dispatch({
// 				type: REMOVE_TODO,
// 				payload: res.data,
// 			})
// 		);
// };

// export const changePage = (postData) => (dispatch) => {
// 	dispatch({
// 		type: CHANGE_PAGE,
// 		payload: postData,
// 	});
// };

// export const editTodo = (postData) => (dispatch) => {
// 	axios
// 		.patch(`https://exceed-react.herokuapp.com/list/single/${postData.id}`, {
// 			value: postData.newValue,
// 		})
// 		.then((res) =>
// 			dispatch({
// 				type: EDIT_TODO,
// 				payload: res.data,
// 			})
// 		);
// };

// export const deleteTodos = (postData) => (dispatch) => {
// 	axios
// 		.delete(`https://exceed-react.herokuapp.com/list/multiple/${postData}`)
// 		.then((res) =>
// 			dispatch({
// 				type: REMOVE_TODOS,
// 				payload: res.data,
// 			})
// 		);
// };

// export const completeTodos = (postData) => (dispatch) => {
// 	axios
// 		.patch(`https://exceed-react.herokuapp.com/list/multiple/${postData}`, {
// 			check: true,
// 		})
// 		.then((res) =>
// 			dispatch({
// 				type: COMPLETE_TODOS,
// 				payload: res.data,
// 			})
// 		);
// };

// export const uncompleteTodos = (postData) => (dispatch) => {
// 	axios
// 		.patch(`https://exceed-react.herokuapp.com/list/multiple/${postData}`, {
// 			check: false,
// 		})
// 		.then((res) =>
// 			dispatch({
// 				type: UNCOMPLETE_TODOS,
// 				payload: res.data,
// 			})
// 		);
// };
