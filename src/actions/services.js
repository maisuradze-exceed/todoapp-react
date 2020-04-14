import axios from 'axios';

export const fetchTodos = () => {
	return axios
		.get(`https://exceed-react.herokuapp.com/list/`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const addTodo = (data) => {
	return axios
		.post(`https://exceed-react.herokuapp.com/list/`, {
			value: data,
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const checkTodo = (data) => {
	return axios
		.patch(`https://exceed-react.herokuapp.com/list/${data.id}`, {
			isCompleted: data.isCompleted,
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const deleteTodo = (id) => {
	return axios
		.delete(`https://exceed-react.herokuapp.com/list/${id}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const editTodo = (data) => {
	return axios
		.patch(`https://exceed-react.herokuapp.com/list/single/${data.id}`, {
			value: data.newValue,
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const deleteAllTodo = (ids) => {
	return axios
		.delete(`https://exceed-react.herokuapp.com/list/multiple/${ids}`)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const completeAllTodo = (ids) => {
	return axios
		.patch(`https://exceed-react.herokuapp.com/list/multiple/${ids}`, {
			check: true,
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};

export const uncompleteAllTodo = (ids) => {
	return axios
		.patch(`https://exceed-react.herokuapp.com/list/multiple/${ids}`, {
			check: false,
		})
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			throw error;
		});
};
