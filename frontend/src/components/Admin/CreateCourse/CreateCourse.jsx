import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import toast from 'react-hot-toast';
import { createCourse } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import './createcourse.css';
import Loader from '../../../CustomComponents/Loader/Loader';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [imagePrev, setImagePrev] = useState('');

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector(state => state.admin);

  const categories = [
    'Web development',
    'Artificial Intellegence',
    'Data Structure & Algorithm',
    'App Development',
    'Data Science',
    'Game Development',
  ];

  const changeImageHandler = e => {
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

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);
    dispatch(createCourse(myForm));
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
  }, [dispatch, error, message]);

  return (
    <div
      className="createcourse-grid"
      style={{
        cursor: `url(${cursor}), default`,
      }}
    >
      <div style={{width:'70%'}} className='custom-container'  >
        <form onSubmit={submitHandler}>
          <h1 className="createcourse-heading">Create Course</h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              gap: '16px',
            }}
          >
            <input
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type="text"
              className="createcourse-custom-input"
            />

            <input
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              className="createcourse-custom-input"
            />

            <input
              value={createdBy}
              required
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              className="createcourse-custom-input"
            />

            <select
              className="createcourse-custom-input"
              required
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">Category</option>

              {categories.map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              accept="image/*"
              required
              type="file"
              style={{ width: '100%' }}
              className="file-upload"
              onChange={changeImageHandler}
            />

            {imagePrev && (
              <img
                style={{
                  width: '256px',
                  maxHeight: '320px',
                  objectFit: 'contain',
                }}
                src={imagePrev ? imagePrev : './Profile copy.png'}
                alt="profile pic"
              />
            )}

            <button
              disabled={loading ? true : false}
              style={{ width: '100%' }}
              className="createcourse-button-md"
              type="submit"
            >
              {loading ? <Loader /> : 'Create'}
            </button>
          </div>
        </form>
      </div>

      <Sidebar />
    </div>
  );
};

export default CreateCourse;
