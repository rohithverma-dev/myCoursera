import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../../redux/actions/user';
import Loader from '../../CustomComponents/Loader/Loader';
import "./register.css"

export const fileUploadCss = {
  cursor: 'pointer',
  marginLeft: '-5%',
  width: '110%',
  border: 'none',
  height: '100%',
  color: '#ECC94B',
  backgroundColor: 'white',
};

const Register = () => {
  console.log('okay rohit repeat');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImagePrev(reader.result);
        setImage(file);
      };
    }
  };

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);
    myForm.append('file', image);

    dispatch(register(myForm));
  };

  return (
    <div className='custom-container' >
      <div className='custom-vstack' >
        <h1 style={{textAlign:'center'}} className='custom-heading-xl'> REGISTRATION </h1>
        <form onSubmit={submitHandler} style={{ width: '100%' }}>
          <div style={{margin:'16px 0' , display:'flex' , justifyContent:'center' }} >
            <img
              className="register-avatar"
              src={imagePrev ? imagePrev : './Profile copy.png'}
              alt="profile pic"
            />
          </div>
          <div style={{margin:'16px 0'}}>
            <label style={{ fontWeight: '500' }} htmlFor="name">
              Name
            </label>
            <input
              required
              className="custom-input"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="abc"
              type="text"
            />
          </div>

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
            <label style={{ fontWeight: '500' }} htmlFor="chooseAvatar">
              Choose Avatar
            </label>

            <input
              accept="image/*"
              required
              id="chooseAvatar"
              type="file"
              className="file-upload"
              onChange={changeImageHandler}
            />
          </div>

          <button style={{ width: '7rem' }} className="button-md" type="submit">
            Sign Up
          </button>

          <div style={{margin:'16px 0'}}>
            Already Signed Up?{' '}
            <Link to="/login">
              <button className='custom-button-link-yellow'>
                Login
              </button>
              here
            </Link>
          </div>
          <br />
          <br />
          <br />
        </form>
      </div>
    </div>
  );
};

export default Register;
