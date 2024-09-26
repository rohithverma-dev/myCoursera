import React, { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profile';
import { cancelSubscription, loadUser } from '../../redux/actions/user';
import Loader from '../../CustomComponents/Loader/Loader';
import { RxCross1 } from 'react-icons/rx';
import './profile-section.css';
import "./profile-modal.css";

const Profile = ({ user }) => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false)
  const { loading, message, error } = useSelector(state => state.profile);
  const {
    loading: subscriptionLoading,
    message: subscriptionMessage,
    error: subscriptionError,
  } = useSelector(state => state.subscription);

  const removeFromPlaylistHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    console.log('updateprofilePicture', image, 'Image');
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const cancelSubscriptionHandler = () => {
    console.log('cancel subscription');
    dispatch(cancelSubscription());
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: 'clearError' });
    }
  }, [dispatch, error, message, subscriptionError, subscriptionMessage]);

  return (
    <div className="courses-container">
      <h1 style={{ margin: 32 }} className="courses-heading">
        Profile
      </h1>
      <div className="profile-stack">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              margin: '16px 0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              className="register-avatar"
              src={user.avatar.url}
              alt="profile pic"
            />
          </div>

          <button
            className="button-lg"
            style={{
              padding: '8px 11px',
              fontSize: '1rem',
              backgroundColor: 'transparent',
              color: '#B7791F',
            }}
            // onClick={onOpen}
            onClick={()=>{setModal(true)}}
          >
            Change Photo
          </button>
        </div>

        <div
          className="profile-vstack"
          spacing={'4'}
          alignItems={['center', 'flex-start']}
        >
          <div style={{ display: 'flex' }}>
            <p style={{ fontWeight: 'bold' }}>Name</p>
            <p style={{ marginInlineStart: '0.5rem' }}>{user.name}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ fontWeight: 'bold' }}>Email</p>
            <p style={{ marginInlineStart: '0.5rem' }}>{user.email}</p>
          </div>
          <div style={{ display: 'flex' }}>
            <p style={{ fontWeight: 'bold' }}>CreatedAt</p>
            <p style={{ marginInlineStart: '0.5rem' }}>
              {user.createdAt.split('T')[0]}
            </p>
          </div>
          {user.role !== 'admin' && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p style={{ fontWeight: 'bold' }}>Subscription</p>
              {user.subscription && user.subscription.status === 'active' ? (
                <button
                  className="button-lg"
                  style={{
                    padding: '8px 11px',
                    fontSize: '1rem',
                    backgroundColor: 'transparent',
                    color: '#B7791F',
                  }}
                  disabled={subscriptionLoading ? true : false}
                  onClick={cancelSubscriptionHandler}
                >
                  {subscriptionLoading ? (
                    <Loader color="#B7791F" />
                  ) : (
                    'Cancel Subscription'
                  )}
                </button>
              ) : (
                <Link to="/subscribe">
                  <button
                    style={{
                      fontSize: '0.95rem',
                      padding: '8px 11px',
                      fontWeight: 'bold',
                    }}
                    className="button-lg"
                  >
                    Subscribe
                  </button>
                </Link>
              )}
            </div>
          )}
          <div className="courses-stack" style={{ gap: '1.5rem' }}>
            <Link to="/updateprofile">
              <button
                style={{
                  whiteSpace: 'nowrap',
                  fontWeight: '500',
                  minWidth: '200px',
                }}
                className="courses-category-button"
              >
                Update Profile
              </button>
            </Link>

            <Link to="/changepassword">
              <button
                style={{
                  whiteSpace: 'nowrap',
                  fontWeight: '500',
                  minWidth: '200px',
                }}
                className="courses-category-button"
              >
                Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>

      <h1
        style={{
          margin: '32px 16px',
          textTransform: 'none',
          textAlign: 'left',
          fontSize: '1.25rem',
        }}
        className="courses-heading"
      >
        Playlist
      </h1>

      {user.playlist.length > 0 && (
        <div
          className="courses-stack"
          style={{ alignItems: 'center', padding: '16px', flexWrap: 'wrap' }}
        >
          {user.playlist.map(element => (
            <div
              className="profile-vstack"
              //  w="48" m="2"
              style={{ width: '192px', margin: '8px' }}
              key={element.course}
            >
              <img
                style={{ width: '100%', objectFit: 'contain' }}
                src={element.poster}
                alt="poster.."
              />

              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                <Link to={`/course/${element.course}`}>
                  <button
                    className="button-lg"
                    style={{
                      padding: '8px 11px',
                      fontSize: '1rem',
                      backgroundColor: 'transparent',
                      color: '#B7791F',
                    }}
                  >
                    Watch Now
                  </button>
                </Link>

                <button
                  style={{
                    whiteSpace: 'nowrap',
                    fontWeight: '500',
                    // minWidth: '200px',
                  }}
                  className="courses-category-button"
                  onClick={() => removeFromPlaylistHandler(element.course)}
                  disabled={loading ? true : false}
                >
                  {loading ? <Loader /> : <RiDeleteBin7Fill />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    { modal &&  <ChangePhotoBox
        changeImageSubmitHandler={changeImageSubmitHandler}
        modal={modal}
        setModal={setModal}
        loading={loading}
      />}
    </div>
  );
};

export default Profile;

function ChangePhotoBox({
  changeImageSubmitHandler,
  loading,
  modal,
  setModal,
}) {
  const [imagePrev, setImagePrev] = useState('');
  const [image, setImage] = useState('');

  const changeImage = e => {
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

  const closeHandler = () => {
    // onClose();
    setModal(false)
    setImagePrev('');
    setImage('');
  };

  return (
    <div className="modal">
      <div style={{background:'blur(10px)'}} className='modal-overlay' onClick={()=>{setModal(false)}} />
      <div 
        className='modal-content'
      >
        <h1
          style={{
            fontSize: '1.25rem',
            textAlign: 'left',
            textTransform: 'none',
            margin: '16px',
            marginBottom:'48px'
          }}
          className="courses-heading"
        >
          Change Photo
        </h1>
        <div
          style={{ top: '1rem', right: '1rem' , position:'absolute' }}
          className="modal-close-button"
        >
          <RxCross1 onClick={() => setModal(false)} />
        </div>
        <div>
          <div>
            <form onSubmit={e => changeImageSubmitHandler(e, image)}>
              <div
                className="profile-vstack"
                style={{ gap: '16px', alignItems: 'center' }}
              >
                {imagePrev && (
                  <img
                    className="register-avatar"
                    src={imagePrev}
                    alt="profile pic"
                  />
                )}
                <input
                  accept="image/*"
                  required
                  type="file"
                  className="file-upload"
                  style={{
                    width: '100%',
                  }}
                  onChange={changeImage}
                />

                <button
                  className="button-lg"
                  style={{ width: '100%', margin: '16px 0' }}
                  disabled={loading ? true : false}
                  type="submit"
                >
                  {loading ? <Loader color="#7442E9" /> : 'Change'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div style={{marginTop:'auto' , alignSelf:'flex-end' }} >
          <button
            style={{
              whiteSpace: 'nowrap',
              fontWeight: '501',
              minWidth: '100px',
              alignSelf:'flex-end'
            }}
            onClick={closeHandler}
            className="courses-category-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
