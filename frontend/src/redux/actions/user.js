import { server } from '../store';
import axios from 'axios';
                                
            


                                       // return an async function
export const login = (email, password) => async (dispatch )=> {
  try {
    dispatch({ type: 'loginRequest' });

    const { data } = await axios.post(`${server}/login`,
      { email, password },    
      {
        withCredentials: true,
        // credentials: 'include',   // credentials is not working in subscribe , but working in E-Commerce and I don't know why
        // credentials: 'true',   // credentials is not working in subscribe , but working in E-Commerce and I don't know why
        headers: {
          'Content-type': 'application/json',
        },
      }
    );
    // console.log("data axiox", data);

    dispatch({ type: 'loginSuccess', payload: data });
  } catch (err) {  
    console.log("error axios" , err);
    dispatch({ type: 'loginFail', payload: err.response.data.message });
  }
};


export const register = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: 'registerRequest' });

    const { data } = await axios.post(`${server}/register`, formdata, {
      headers: {
        'Content-type': 'multipart/form-data',
      },

      withCredentials: true,
    });

    dispatch({ type: 'registerSuccess', payload: data });
  } catch (error) {
    dispatch({ type: 'registerFail', payload: error.response.data.message });
  }
};





export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });

    const { data } = await axios.get(
      `${server}/me`,

      {
        withCredentials: true,
      }
    );
    dispatch({ type: 'loadUserSuccess', payload: data.user });
  } catch (error) {
    dispatch({ type: 'loadUserFail', payload: error.response.data.message });
  }
};




export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'logoutRequest' });

    const { data } = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });
    dispatch({ type: 'logoutSuccess', payload: data.message });
  } catch (error) {
    dispatch({ type: 'logoutFail', payload: error.response.data.message });
  }
};






export const buySubscription = () => async (dispatch) => {
  try {
    dispatch({ type: 'buySubscriptionRequest' });

    const { data } = await axios.get(`${server}/subscribe`, {
      withCredentials: true,
    });

    dispatch({ type: 'buySubscriptionSuccess', payload: data.subscriptionId });
  } catch (error) {
    dispatch({
      type: 'buySubscriptionFail',
      payload: error.response.data.message,
    });
  }
};




export const cancelSubscription = () => async (dispatch) => {
  try {
    dispatch({ type: 'cancelSubscriptionRequest' });

    const { data } = await axios.delete(`${server}/subscribe/cancel`, {
      withCredentials: true,
    });

    dispatch({ type: 'cancelSubscriptionSuccess', payload: data.message });
  } catch (error) {
    dispatch({
      type: 'cancelSubscriptionFail',
      payload: error.response.data.message,
    });
  }
};
