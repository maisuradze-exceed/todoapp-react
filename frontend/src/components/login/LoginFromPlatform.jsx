import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logInUser } from '../../actions/actions';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert/Alert';
import axios from 'axios';

const LoginFromPlatform = (props) => {
  useEffect(() => {
    const { logInUser } = props.actions;
    axios
      .get(
        'http://exceed-react.herokuapp.com/api/otherlogin/auth/complete/redirect=success/redirecting'
      )
      .then((res) => {
        localStorage.setItem('auth-token', `${res.data}`);
        axios.defaults.headers.common['auth-token'] = res.data;
      })
      .then(() => {
        const token = localStorage.getItem('auth-token');
        const decodedToken = jwtDecode(token);
        logInUser({
          token,
          decodedToken,
        });
      })
      .catch(() => window.location.replace('/'));
  });
  return (
    <div style={{ textAlign: 'center' }}>
      <Alert severity='info' style={{ textAlign: 'center' }}>
        Loading data...
      </Alert>
      <CircularProgress
        style={{
          width: '10%',
          height: '10%',
          alignSelf: 'center',
          marginTop: 150,
        }}
      />
    </div>
  );
};

const matchDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ logInUser }, dispatch),
  };
};

export default connect(null, matchDispatchToProps)(LoginFromPlatform);
