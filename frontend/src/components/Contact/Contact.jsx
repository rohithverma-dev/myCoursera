import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { contactUs } from '../../redux/actions/other';
import Loader from '../../CustomComponents/Loader/Loader';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const {
    loading,
    error,
    message: stateMessage,
  } = useSelector(state => state.other);

  const submitHandler = e => {
    e.preventDefault();
    console.log('Contact  Submitt handler');
    dispatch(contactUs(name, email, message));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (stateMessage) {
      toast.success(stateMessage);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, stateMessage]);

  return (
      <div className='custom-container'>
        <div className="custom-vstack">
          <h1
            style={{ marginTop: '4rem', textAlign: 'center' }}
            className="custom-heading-xl"
          >
            Contact Us
          </h1>

          <form onSubmit={submitHandler} style={{ width: '100%' }}>
            <div style={{ margin: '16px 0' }}>
              <label style={{ fontWeight: '500' }} htmlFor="name">
                Name{' '}
              </label>
              <input
                required
                className="custom-input"
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Abc"
                type="text"
              />
            </div>

            <div style={{ margin: '16px 0' }}>
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

            <div style={{ margin: '16px 0' }}>
              <label style={{ fontWeight: '500' }} htmlFor="message">
                Message
              </label>
              <textarea
                required
                id="message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Your Message...."
                focusBorderColor="yellow.500"
                className="custom-textarea"
              />
            </div>
            
            <button
              style={{ width: '7rem', opacity: loading ? 0.7 : 1 }}
              disabled={loading ? true : false}
              className="button-md"
              type="submit"
            >
              {loading ? <Loader color="white" /> : 'Send Mail'}
            </button>

            <div style={{ margin: '16px 0' }}>
              Request for a course?{' '}
              <Link to="/request">
                <button className="custom-button-link-yellow">Click</button>
                here
              </Link>
            </div>
          </form>
        </div>
      </div>
  );
};

export default Contact;
