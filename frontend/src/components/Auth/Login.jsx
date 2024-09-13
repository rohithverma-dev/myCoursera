import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../redux/actions/user';
import toast from 'react-hot-toast';
import Loader from '../../CustomComponents/Loader/Loader';

const Login = () => {
  const { loading, message, error } = useSelector(state => state.profile);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    console.log('form submitted successfully');
    e.preventDefault();
    dispatch(login(email, password));
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
    <div className='custom-container'  >
      <div className='custom-vstack' >
        <h1 style={{textAlign:'center'}} className='custom-heading-xl'> Welcome to MyCoursera </h1>
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <div style={{margin:'16px 0'}}>
            <label style={{ fontWeight: '500' }} htmlFor="email">
              Email Address
            </label>

            <input
              required
              className="custom-input"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              type="email"
            />
          </div>

          <div style={{margin:'16px 0'}}>
            <label style={{ fontWeight: '500' }} htmlFor="password">
              Password
            </label>

            <input
              required
              className="custom-input"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter Your Password"
              type="password"
            />
          </div>

          <div style={{margin:'16px 0'}}>
            <Link to="/forgetpassword">
              <button style={{color:'#8a97a7' , fontSize:'0.75rem' }} className='custom-button-link-yellow'>
                Forget Password?
              </button>
            </Link>
          </div>

          
          <button
            disabled={loading ? true : false}
            className="button-md"
            type="submit"
          >
            {loading ? <Loader /> : 'Login'}
          </button>

          <div style={{margin:'16px 0'}}>
            New User?
            <Link to="/register">
              <button className='custom-button-link-yellow ' >
                Sign Up
              </button>
              here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
