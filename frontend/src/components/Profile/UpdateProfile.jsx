import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import './profile-section.css';
import Loader from '../../CustomComponents/Loader/Loader';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitHandler = async e => {
    e.preventDefault();
    console.log('update profile submithandler');
    await dispatch(updateProfile(name, email));
    navigate('/profile');
    dispatch(loadUser());
  };

  const { loading } = useSelector(state => state.profile);
  return (
    <div className='profile-section-container' >
      <form onSubmit={submitHandler}>
       
        <h1 className="profile-section-heading">Update Profile</h1>

        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
          <input
            required
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name"
            type={'text'}
            className="profile-section-custom-input"
          />

          <input
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type={'email'}
            className="profile-section-custom-input"
          />

          <button
            className="button-lg"
            type="submit"
            style={{ width: '100%' }}
            disabled={loading ? true : false}
          >
            {loading ? <Loader color="#7442E9" /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
