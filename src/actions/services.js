import axios from 'axios';

export const fetchTodos = (token) => {
  return axios
    .get(`https://exceed-react.herokuapp.com/api/data/`, {
      headers: { 'auth-token': `${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const addTodo = (data, token, user) => {
  return axios
    .post(
      `https://exceed-react.herokuapp.com/api/data/`,
      {
        value: data,
        user,
      },
      {
        headers: { 'auth-token': `${token}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const checkTodo = (data, token, user) => {
  return axios
    .patch(
      `https://exceed-react.herokuapp.com/api/data/${data.id}`,
      {
        isCompleted: data.isCompleted,
        user,
      },
      {
        headers: { 'auth-token': `${token}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteTodo = (id, token) => {
  return axios
    .delete(`https://exceed-react.herokuapp.com/api/data/${id}`, {
      headers: { 'auth-token': `${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const editTodo = (data, token, user) => {
  return axios
    .patch(
      `https://exceed-react.herokuapp.com/api/data/single/${data.id}`,
      {
        value: data.newValue,
        user,
      },
      {
        headers: { 'auth-token': `${token}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteAllTodo = (ids, token) => {
  return axios
    .delete(`https://exceed-react.herokuapp.com/api/data/multiple/${ids}`, {
      headers: { 'auth-token': `${token}` },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const completeAllTodo = (ids, token, user) => {
  return axios
    .patch(
      `https://exceed-react.herokuapp.com/api/data/multiple/${ids}`,
      {
        check: true,
        user,
      },
      {
        headers: { 'auth-token': `${token}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const uncompleteAllTodo = (ids, token, user) => {
  return axios
    .patch(
      `https://exceed-react.herokuapp.com/api/data/multiple/${ids}`,
      {
        check: false,
        user,
      },
      {
        headers: { 'auth-token': `${token}` },
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
