import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';
import './payment-section.css';

const PaymentSuccess = () => {
  const reference = useSearchParams()[0].get('reference');
  console.log(reference);

  return (
    <div className="payment-section-container">
      <h1
        style={{ textTransform: 'none', textAlign: 'center', margin: '32px 0' }}
        className="payment-section-heading"
      >
        You have Pro Pack
      </h1>

      <div className="payment-section-vstack" style={{alignItems:'center' , paddingBottom:'64px' }} >
        <div  
          style={{ borderRadius: '8px 8px 0 0' , width:'100%' , padding:'16px' , backgroundColor :'#ECC94B' }}
        >
          <p>Payment Success</p>
        </div>

        <div style={{ padding: '16px' }}>
          <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center' , padding:'0 32px' , marginTop:'16px' , gap:'32px' , textAlign:'center' }}  >
            <p>
              Congratulation you're a pro member. You have access to premium
              content.
            </p>

            <h1 style={{fontSize:'4.5rem'}} >
              <RiCheckboxCircleFill />
            </h1>
          </div>
        </div>

        <Link to="/profile">
          <button
            style={{ backgroundColor: 'transparent' }}
            className="button-lg"
          >
            Go to profile
          </button>
        </Link>
        <h1
          className="payment-section-heading"
          style={{
            fontSize: '0.85rem',
            fontWeight: 'bolder',
            textTransform: 'none',
            margin:'0'
          }}
        >
          Reference: {reference}
        </h1>
      </div>
    </div>
  );
};

export default PaymentSuccess;
