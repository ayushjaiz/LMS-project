import { server } from '../Store';
import axios from 'axios';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    // console.log(data)
    dispatch({ type: 'loginSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'loginFail', payload: error.response.data.message });
  }
};
export const getMyProfile = () => async dispatch => {
  try {
    dispatch({ type: 'loginUserRequest' });

    const { data } = await axios.get(`${server}/me`, {
      withCredentials: true,
    });

    // console.log(data)
    dispatch({ type: 'loginUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loginUserFail', payload: error.response.data.message });
  }
};
export const logout = () => async dispatch => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });

    // console.log(data)
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};
export const register = formdata => async dispatch => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });

    // console.log(data)
    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};

// * payment action
export const buySubscription = () => async dispatch =>  {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });

    // console.log(data)
    dispatch({ type: 'buySubscriptionSuccess', payload: "12345" });
  } catch (error) {
    dispatch({ type: 'buySubscriptionFail', payload: error.response.data.message });
  }
};
export const cancelSubscription = () => async dispatch =>  {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    // console.log(data)
    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'cancelSubscriptionFail', payload: error.response.data.message });
  }
};
