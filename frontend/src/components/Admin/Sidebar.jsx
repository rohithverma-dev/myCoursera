import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  return (
    <div
    style={{
      display:'flex',
      padding:'64px',
      boxShadow:'-2px 0 10px rgba(107,70,193,0.5)',
      gap:'32px',
      flexDirection:'column',
    }}
    >
      <LinkButton
        Icon={RiDashboardFill}
        text="Dashboard"
        url={'dashboard'}
        active={location.pathname === '/admin/dashboard'}
      />
      <LinkButton
        Icon={RiAddCircleFill}
        text="Create Course"
        url={'createcourse'}
        active={location.pathname === '/admin/createcourse'}
      />
      <LinkButton
        Icon={RiEyeFill}
        text="Courses"
        url={'courses'}
        active={location.pathname === '/admin/courses'}
      />
      <LinkButton
        Icon={RiUser3Fill}
        text="Users"
        url={'users'}
        active={location.pathname === '/admin/users'}
      />
    </div>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link style={{textDecoration:'none'}} to={`/admin/${url}`}>
      <button
        className='admin-sidebar-button'
        style={{ color:  active ? '#6B46C1' : '' , backgroundColor:'transparent'  }}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </button>
    </Link>
  );
}
