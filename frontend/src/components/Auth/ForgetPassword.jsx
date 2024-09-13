import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { forgetPassword } from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';

import './forgotpassword.css';
import Loader from '../../CustomComponents/Loader/Loader';

const ForgetPassword = () => {
  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const submitHandler = e => {
    e.preventDefault();
    console.log('forgot password Submitt handler');
    dispatch(forgetPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  return (
    <div className='forgotpassword-container'>
      <form onSubmit={submitHandler}>
        <h1 class="forgotpassword-custom-heading">Forget Password</h1>
        <div className='forgotpassword-vstack'>
          <input
            className="forgotpassword-custom-input"
            type="email"
            placeholder="abc@gmail.com"
            onChange={e => setEmail(e.target.value)}
            required
          />

          <button
            className="forgotpassword-button"
            type="submit"
            style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
            disabled={loading ? true : false}
          >
            {loading ? <Loader color="white" /> : ' Send Reset Link'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgetPassword;
