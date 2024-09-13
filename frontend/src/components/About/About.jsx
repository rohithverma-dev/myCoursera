import './about.css';
import React from 'react';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Founder = ( {imgsrc }  ) => (

  <div className='about-founder-stack' >


    <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center' }} >
      <img className="about-avatar"
        src={ imgsrc ? imgsrc : "./Profile copy.png" }
        alt="profile pic" 
      />
      <p style={{ opacity: '0.5' , textAlign:'center' }} className="custom-text-xs">
        Co-Founder
      </p>
    </div>

    <div className='vstack' style={{ margin:5 , alignItems:'flex-start' ,    }}  >
      <h1 className='custom-heading-xl' style={{paddingLeft:'15px' , whiteSpace:'nowrap' , fontSize:'1.875rem' }}  >Rohit Verma</h1>
      <p className="custom-text-xl">
        Hi, I am a full-stack developer . Our mission is to provide quality
        content at reasonable price.
      </p>
    </div>


  </div>


);

const About = () => {
  return (
    <div className="about-container">
      <h1 className="custom-heading-xl">About Us</h1>
      <Founder imgsrc={"https://res.cloudinary.com/daucaeml9/image/upload/v1720418876/avatars/e6m53mhctm00z7n4ech6.jpg"} />
      <div className="stack" style={{ margin: '8px' }}>
        <p className="custom-text-xl" style={{ margin: '8px' }}>
          We are a video streaming platform with some premium courses available
          only for premium users.
        </p>

        <Link to="/subscribe">
          <button className="button-lg ghost">Checkout Our Plan</button>
        </Link>
      </div>

      <div className="about-hstack" my="4" p={'4'}>
        <RiSecurePaymentFill />
        <h1 className="about-custom-heading-xs">
          Payment is secured by Razorpay
        </h1>
      </div>
    </div>
  );
};

export default About;
