import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken'
import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT } from './types';


//      Load user
//================================
export const loadUser = (props) => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users/get_auth_user');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}


//      Login user
//================================
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email: email, password: password });


    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch(setAlert(err.response.data.error, 'danger'));
        dispatch({ type: LOGIN_FAIL });
    }

}


//      Register user
//================================
export const register = (props) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        name: props.name,
        email: props.email,
        password: props.password
    });


    try {
        const res = await axios.post('/api/auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        dispatch(setAlert(err.response.data.error, 'danger'));
        dispatch({ type: REGISTER_FAIL });
    }

}



//  Logout user / Clear profile
//================================
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
}



