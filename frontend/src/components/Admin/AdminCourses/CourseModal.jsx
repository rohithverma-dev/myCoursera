import React from 'react';
import { useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import './coursemodal.css';
import { RxCross1 } from 'react-icons/rx';

import Loader from '../../../CustomComponents/Loader/Loader';

const CourseModal = ({
  modal,
  setModal,
  id,
  deleteButtonHandler,
  addLectureHandler,
  courseTitle,
  // lectures = [1,2,3,4,5,6,7,8],
  lectures = [],
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoPrev, setVideoPrev] = useState('');

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        setVideoPrev(reader.result);
        setVideo(file);
      };
    }
  };

  const handleClose = () => {
    // setTitle('');
    // setDescription('');
    setVideo('');
    setVideoPrev('');
    // onClose();    // wait...
    // setModal(false)
  };

  return (
    <div
      style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0 }}
      // isOpen={isOpen}
      // size="full"
      // onClose={handleClose}
      // scrollBehavior="outside"
    >
      {/* <ModalOverlay /> */}
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
          overflow: 'auto',
          backgroundColor: 'white',
        }}
      >
        <p
          className="modal-heading"
          style={{
            margin: '0',
            padding: '25px 25px',
            paddingBottom: '0',
            fontSize: '1.25rem',
            fontWeight: '501',
            textTransform: 'none',
          }}
        >
          {courseTitle}
        </p>

        <div className="modal-close-button" >
          <RxCross1
            onClick={() => setModal(false)}
          />
        </div>

        <div style={{ padding: '64px' }}>
          <div className="modal-grid" templateColumns={['1fr', '3fr 1fr']}>
            <div className="modal-box">
              <div style={{ margin: '20px 0' }}>
                <h1
                  className="modal-heading"
                  style={{ textTransform: 'none', margin: '0' }}
                >
                  {courseTitle}
                </h1>
                <h1
                  className="modal-text"
                  style={{
                    opacity: '0.45',
                    marginTop: '0',
                    marginBottom: '40px',
                  }}
                >{`#${id}`}</h1>
              </div>

              <h1
                className="modal-heading"
                style={{
                  fontSize: '1.75rem',
                  textTransform: 'none',
                  marginTop: '0',
                  marginBottom: '30px',
                }}
              >
                {'Lectures'}
              </h1>

              {lectures.map((item, i) => (
                <VideoCard
                  key={i}
                  title={item.title}
                  description={item.description}
                  num={i + 1}
                  lectureId={item._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                  loading={loading}

                  // key={i}
                  // title="React Intro"
                  // description={"this is a intro lecture , whereyou will know the basics of react "}
                  // num={i+1}
                  // lectureId="bbkgt"
                  // courseId={id}
                  // deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </div>

            <div>
              <form
                onSubmit={e => { addLectureHandler(e, id, title, description, video); handleClose(); } }
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    alignItems: 'center',
                  }}
                >
                  <h1
                    style={{ fontSize: '1.25rem', margin: '0' }}
                    className="modal-heading"
                  >
                    Add Lecture
                  </h1>

                  <input
                    required
                    placeholder="Title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"
                    className="createcourse-custom-input"
                  />

                  <input
                    required
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    className="createcourse-custom-input"
                  />

                  <input
                    accept="video/mp4"
                    required
                    type={'file'}
                    className="file-upload"
                    onChange={changeVideoHandler}
                  />

                  {videoPrev && (
                    <video
                      controlsList="nodownload"
                      controls
                      src={videoPrev}
                    ></video>
                  )}

                  <button
                    disabled={loading ? true : false}
                    style={{ width: '100%' }}
                    className="createcourse-button-md"
                    type="submit"
                  >
                    {loading ? <Loader /> : 'Upload'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
        >
          <button
            className="modal-button-lg"
            style={{ fontWeight: '500', color: 'black' }}
            onClick={() => setModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;

function VideoCard({
  title,
  description,
  num,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  return (
    <div
      className="videocard-div"
      style={{
        margin: '32px',
        boxShadow: '0 0 10px rgba(107,70,193,0.5)',
      }}
    >
      <div>
        <h1
          style={{
            fontWeight: 'bolder',
            textTransform: 'uppercase',
            margin: 0,
          }}
          className="modal-text"
        >
          {`#${num} ${title}`}
        </h1>
        <p style={{ margin: 0, fontWeight: 'normal' }} className="modal-text">
          {description}
        </p>
      </div>

      <button
        disabled={loading ? true : false}
        className="modal-button-lg"
        onClick={() => deleteButtonHandler(courseId, lectureId)}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
            {loading ? <Loader color="#7442E9" /> : <RiDeleteBin7Fill />}
      </button>
    </div>
  );
}
