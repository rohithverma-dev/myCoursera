import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{height:'90vh'}} >
      <div style={{display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center' , gap:'16px' , height:'100%'  }} justifyContent={'center'} >
        <RiErrorWarningFill size={'5rem'} />
        <h1 style={{textTransform:'none'}} className='profile-section-heading' >Page Not Found</h1>
        <Link to="/">
          <button className='button-lg' style={{backgroundColor:'transparent'}} >Go to home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
