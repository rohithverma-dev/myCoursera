import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCourses } from '../../redux/actions/course';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import './courses.css';
import Loader from '../../CustomComponents/Loader/Loader';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
  loading,
}) => {
  return (
    <div
      style={{ gap: '5px', marginBottom: '32px' }}
      className="courses-vstack"
      alignItems={['center', 'flex-start']}
    >
      <img src={imageSrc} style={{height:240 , width:240 , objectFit:'contain' }} alt="" />
      <h1
        style={{
          maxWidth: '200px',
          margin: '0',
          textTransform: 'none',
          fontSize: '1rem',
        }}
        className="courses-heading"
      >
        {title}
      </h1>
      <p style={{ margin: '0' }}>{description}</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '0.5rem',
          gap: '1rem',
        }}
      >
        <p style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
          {'Creator'}
        </p>
        <p style={{ textTransform: 'uppercase' }}>{creator}</p>
      </div>

      <h1
        style={{ fontSize: '0.85rem', fontWeight: 'bolder', margin: '0' }}
        className="courses-heading"
      >{`Lectures - ${lectureCount}`}</h1>

      <h1
        style={{ fontSize: '0.85rem', fontWeight: 'bolder', margin: '0' }}
        className="courses-heading"
      >{`Views - ${views}`}</h1>

      <div
        className="courses-stack"
        direction={['column', 'row']}
        alignItems="center"
      >
        <Link to={`/course/${id}`}>
          <button
            style={{
              fontSize: '0.95rem',
              padding: '8px 11px',
              fontWeight: 'bold',
            }}
            className="button-lg"
          >
            Watch Now
          </button>
        </Link>

        <button
          className="button-lg"
          style={{
            padding: '8px 11px',
            fontSize: '1rem',
            backgroundColor: 'transparent',
            color: '#B7791F',
          }}
          disabled={loading ? true : false}
          onClick={() => addToPlaylistHandler(id)}
        >
          {loading ? <Loader color="#B7791F" /> : 'Add to playlist'}
        </button>
      </div>
    </div>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();

  const addToPlaylistHandler = async couseId => {
    await dispatch(addToPlaylist(couseId));
    dispatch(loadUser());
  };

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const { loading, courses, error, message } = useSelector(
    state => state.course
  );

  useEffect(() => {
    dispatch(getAllCourses(category, keyword));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [category, keyword, dispatch, error, message]);

  return (
    <div className="courses-container">
      <h1
        className="courses-heading"
        style={{ margin: '32px', textAlign: 'left' }}
      >
        All Courses
      </h1>

      <input
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        placeholder="Search a course..."
        type={'text'}
        className="courses-custom-input"
      />

      <div 
        style={{
          display:'flex' ,
          overflowX:'auto' ,
          padding : '32px' ,
          gap:'16px',
        }}
      >
        {categories.map((item, index) => (
          <button style={{minWidth:'240px', whiteSpace:'nowrap' }} className='courses-category-button' key={index} onClick={() => setCategory(item)} >
            <p>{item}</p>
          </button>
        ))}
      </div>

      <div className='courses-stack' >
        {courses.length > 0 ? (
          courses.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.numOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <h1 className="courses-heading" style={{ marginTop: '64px' }}>
            Courses Not Found
          </h1>
        )}
      </div>
    </div>
  );
};

export default Courses;
