import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../redux/actions/profile';
import { useNavigate } from 'react-router-dom';
import './profile-section.css';
import Loader from '../../CustomComponents/Loader/Loader';

const ChangePassword = () => {
  const { loading, message, error } = useSelector(state => state.profile);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    console.log('change password submit handler');
    dispatch(changePassword(oldPassword, newPassword));
    navigate('/profile');
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
    <div className="profile-section-container">
      <form onSubmit={submitHandler}>
        <h1 className="profile-section-heading">Change Password</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <input
            required
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            placeholder="Old Password"
            type={'password'}
            className="profile-section-custom-input"
          />

          <input
            required
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="New Password"
            type={'password'}
            className="profile-section-custom-input"
          />

        
          <button
            className="button-lg"
            type="submit"
            style={{ width: '100%' }}
            disabled={loading ? true : false}
          >
            {loading ? <Loader color="#7442E9" /> : 'Change'}
          </button>

        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
