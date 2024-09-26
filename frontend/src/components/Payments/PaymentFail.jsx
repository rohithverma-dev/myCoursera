import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import './payment-section.css';

const PaymentFail = () => {
  return (
    <div className="payment-section-container">
      <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center' , height:'100%' , gap:'16px' }} >
        <RiErrorWarningFill size={'5rem'} />
        <h1 className='payment-section-heading' >Payment Fail</h1>
        <Link to="/subscribe">
          <button className='button-lg' style={{backgroundColor:'transparent'}} > Try Again </button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;
