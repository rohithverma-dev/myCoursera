import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/actions/profile';
import Loader from '../../CustomComponents/Loader/Loader';

const ResetPassword = () => {
  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    console.log('reset password Submitt handler');
    dispatch(resetPassword(params.token, password));
    // navigate("/login")
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
      
    <div className='forgotpassword-container'  >
      <form onSubmit={submitHandler}>
        <h1 style={{margin:'64px 0'}} autoFocus={true} className='custom-heading-xl'>Reset Password</h1>

        <div style={{display:'flex' , flexDirection:'column' , gap: '32px' }} spacing={'8'}>
          
          <input 
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="New Password"
            type={'password'}
            className='custom-input'
          />

          <button
            disabled={loading ? true : false}
            type="submit"
            className="button-lg"
          >
            {loading ? <Loader /> : 'Reset Password'}
          </button>

        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
