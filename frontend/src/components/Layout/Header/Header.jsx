import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url = '/', title = 'Home',  setHeadermodal }) => (
  <Link onClick={()=>setHeadermodal(false)} to={url}>
    <button
      style={{
        whiteSpace: 'nowrap',
        fontWeight: '500',
        fontSize: '1rem',
        padding: '8px 16px',
      }}
      className="courses-category-button"
    >
      {title}
    </button>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const [headermodal, setHeadermodal] = useState(true);
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    // onClose();
    setHeadermodal(false);
    dispatch(logout());
  };

  return (
    <>
      {/* <Button
        // onClick={onOpen}
        colorScheme={'yellow'}
        width="12"
        height={'12'}
        rounded="full"
        zIndex={'overlay'}
        position={'fixed'}
        top="6"
        left="6"
      >
        <RiMenu5Fill />
      </Button> */}

      <button
        onClick={()=>setHeadermodal(true)}
        style={{
          fontWeight: 'bold',
          width: '48px',
          height: '48px',
          borderRadius: '45px',
          position: 'fixed',
          top: '24px',
          left: '24px',
          padding: '15px',
          zIndex: '2',
        }}
        className="button-lg"
      >
        <RiMenu5Fill />
      </button>

      {headermodal && (
        <div className="header-modal" 
        style={{
          position:'fixed' ,
          top:'0' ,
          left:'0' ,
          bottom:'0' ,
          right:'0' ,
          zIndex:'10',
        }}
         >
          <div
            className='headermodal-overlay'
            onClick={() => setHeadermodal(false)}
            style={{
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backdropFilter: 'blur(2px)',
              backgroundColor:'rgba(0,0,0 , 0.5 )' ,
              position: 'fixed',
              zIndex: '2',
            }}
          ></div>
          <div 
            className='headermodal-content'
            style={{
              width: '320px',
              height: '100vh',
              boxShadow: ' 0 4px 6px rgba(0, 0, 0, 0.2)',
              backgroundColor: 'rgb(255, 251, 233 )' ,
              position:'relative'  ,
              zIndex:'10' ,
              borderWidth:'1px'
            }}
          >
            <h1
              style={{
                whiteSpace: 'nowrap',
                fontWeight: '600',
                fontSize: '20px',
                padding: '16px 24px',
                textTransform: 'none',
                margin: '10px 0',
                marginBottom: '16px',
                textAlign: 'left',
              }}
              className="courses-heading"
            >
              MYCOURSERA
            </h1>

            <div style={{ padding: '8px 24px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                <LinkButton
              
                  url="/"
                  setHeadermodal = {setHeadermodal}
                  title="Home"
                />
                <LinkButton
                
                  url="/courses"
                  title="Browse All Courses"
              setHeadermodal = {setHeadermodal}
                />
                <LinkButton
              
                  url="/request"
                  setHeadermodal = {setHeadermodal}
                  title="Request a Course"
                />
                <LinkButton
              
                  setHeadermodal = {setHeadermodal}
                  url="/contact"
                  title="Contact Us"
                  />
                <LinkButton
                setHeadermodal = {setHeadermodal}
                
                  url="/about"
                  title="About"
                />

                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: '2rem',
                    width: '80%',
                    justifyContent: 'space-evenly',
                  }}
                >
                  {isAuthenticated ? (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          gap: '0.5rem',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                          <Link 
                onClick={()=>setHeadermodal(false)}
                to="/profile">
                            <button
                              style={{
                                fontSize: '16px',
                                fontWeight: '501',
                                color: '#b7791f',
                                backgroundColor: 'transparent',
                                padding: '8px 16px',
                              }}
                              className="courses-category-button"
                            >
                              Profile
                            </button>
                          </Link>
                          <button
                            style={{
                              fontSize: '16px',
                              fontWeight: '501',
                              padding: '8px 16px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}
                            className="courses-category-button"
                            onClick={logoutHandler}
                          >
                            <RiLogoutBoxLine />
                            Logout
                          </button>
                        </div>
                        {user && user.role === 'admin' && (
                          <Link
                            onClick={() => setHeadermodal(false)}
                            style={{textDecoration:'none'}}
                            to="/admin/dashboard"
                          >
                            <button
                              style={{
                                fontSize: '16px',
                                fontWeight: '501',
                                padding: '8px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                color: '#6b46c1',
                              }}
                              className="courses-category-button"
                            >
                              <RiDashboardFill style={{ margin: '4px' }} />
                              Dashboard
                            </button>
                          </Link>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <Link onClick={() => setHeadermodal(false)} to="/login">
                        <button
                          style={{ fontSize: '16px', padding: '8px 16px' }}
                          className="button-lg"
                        >
                          Login
                        </button>
                      </Link>

                      <p>OR</p>

                      <Link
                        onClick={() => setHeadermodal(false)}
                        to="/register"
                      >
                        <button
                          style={{ fontSize: '16px', padding: '8px 16px' }}
                          className="button-lg"
                        >
                          Sign Up
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
