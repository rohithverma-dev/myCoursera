import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buySubscription } from '../../redux/actions/user';
import { server } from '../../redux/store';
import toast from 'react-hot-toast';
import logo from '../../assets/images/logo.png';
import './payment-section.css';
import Loader from '../../CustomComponents/Loader/Loader';

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState('');

  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const { error: courseError } = useSelector(state => state.course);

  const subscribeHandler = async () => {
    // const data  = await axios.get(`${server}/razorpaykey`);
    // setKey(data.key);

    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    setKey(key);
    dispatch(buySubscription());
    console.log('subscribeHandler');
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (courseError) {
      toast.error(courseError);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: 'NewTon School',
          description: 'Get access to all premium content',
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: '',
          },
          notes: {
            address: 'Rohit  Programmer',
          },
          theme: {
            color: '#FFC800',
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    error,
    courseError,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);

  return (
    <div className="payment-section-container">
      <h1
        style={{ textTransform: 'none', textAlign: 'center', margin: '32px' }}
        className="payment-section-heading"
      >
        Welcome
      </h1>

      <div className="payment-section-vstack">
        <div style={{ borderRadius: '8px 8px 0 0' , padding:'16px' , backgroundColor:'#ECC94B' }}>
          <p style={{ color: 'black', fontSize: '1rem' }}>
            {`Pro Pack - ₹499.00`}
          </p>
        </div>
        <div style={{ padding: '16px' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '32px',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '0 32px',
              marginTop: '16px',
            }}
          >
            <p style={{ fontSize: '1rem' }}>
              {`Join pro pack and get access to all content.`}
            </p>
            <h1
              style={{
                fontSize: '1.25rem',
                textAlign: 'left',
                textTransform: 'none',
                margin: 0,
              }}
              className="payment-section-heading"
            >
              ₹299 Only
            </h1>
          </div>

          <button
            className="button-lg"
            style={{ width: '100%', margin: '32px 0' }}
            disabled={loading ? true : false}
            onClick={subscribeHandler}
          >
            {loading ? <Loader color="#7442E9" /> : ' Buy Now'}
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#858585',
            padding: '16px',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <h1
            style={{
              fontSize: '1rem',
              margin: '0',
              textAlign: 'left',
              color: 'white',
            }}
            className="payment-section-heading"
          >
            {'100% refund at cancellation'}
          </h1>
          <p style={{ color: 'white', fontSize: '0.75rem' }}>
            {' '}
            *Terms & Conditions Apply{' '}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
