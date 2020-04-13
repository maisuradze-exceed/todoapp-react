import axios from 'axios';

export const getTodos = () => {
	return (dispatch) => {
		axios.get('https://exceed-react.herokuapp.com/list');
	};
};
