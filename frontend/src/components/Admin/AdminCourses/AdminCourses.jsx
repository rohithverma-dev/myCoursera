// import {
//   useDisclosure,
// } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
// import { useDispatch, useSelector } from 'react-redux';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import CourseModal from './CourseModal';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../CustomComponents/Loader/Loader';
import './admincourses.css';

const AdminCourses = () => {
  // const courses = [
  //     {
  //         _id:"aKAKBAKAKSBHKABCS",
  //         title:"React Course",
  //         category:"Web Development",
  //         poster:{
  //             url:"https://cdn.pixabay.com/photo/2017/05/10/19/29/robot-2301646_1280.jpg",
  //         },
  //         createdBy:"Rohit Verma",
  //         views:123,
  //         numOfVideos:12
  //     }
  // ]

  const [modal, setModal] = useState(false)

  const { courses, lectures } = useSelector(state => state.course);

  const { loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  // const { isOpen, onClose, onOpen } = useDisclosure();

  const [courseId, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const coureDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    // onOpen();   // wait...
    setModal(true)
    setCourseId(courseId);
    setCourseTitle(title);
  };
  
  const deleteButtonHandler = courseId => {
    console.log(courseId);
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);

    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
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

    dispatch(getAllCourses());
  // }, [dispatch, error, message, onClose]);  // wait...
  }, [dispatch, error, message]);

  return (
    <div
      className="courses-grid"
      style={{
        cursor: `url(${cursor}), default`,
      }}
    >
      <div className="courses-box" style={{ overflowX: 'auto' }}>
        <h1 className="courses-heading">All Courses</h1>

        <div style={{ width: '100vw' }}>
          <table style={{ width: '100%', borderCollapse: 'separate' , borderSpacing:'0 20px' }}>
            <thead>
              <tr>
                <th style={{flex: 1.5  }} >Id</th>
                <th style={{flex: 1  }} >Poster</th>
                <th style={{flex: 1  }} >Title</th>
                <th style={{flex: 1  }} >Category</th>
                <th style={{flex: 1  }} >Creator</th>
                <th style={{flex: 1  }} >Views</th>
                <th style={{flex: 1  }} >Lectures</th>
                <th style={{flex: 1  }} >Action</th>
              </tr>
            </thead>

            <tbody>
              {courses.map(item => (
                <Row
                  coureDetailsHandler={coureDetailsHandler}
                  deleteButtonHandler={deleteButtonHandler}
                  key={item._id}
                  item={item}
                  loading={loading}
                />
              ))}
            </tbody>
          </table>
          <h1 style={{ color: '#4A5568', textAlign: 'center', width: '100%' , margin:'30px' }}>
            All available courses in the database
          </h1>
        </div>

        { modal &&   <CourseModal
            // isOpen={isOpen}
            // onClose={onClose}
            modal={modal}
            setModal={setModal}
            id={courseId}
            // id={"tyfyvghghg"}
            // courseTitle={"React Course"}
            courseTitle={courseTitle}
            deleteButtonHandler={deleteLectureButtonHandler}
            addLectureHandler={addLectureHandler}
            lectures={lectures}
            loading={loading}
          />}

      </div>

      <Sidebar />
    </div>
  );
};

function Row({ item, coureDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <tr>
      <td>#{item._id}</td>
      <td style={{padding:'0 0'}} >
        <img style={{width:'80px' , height:'100%' }} src={item.poster.url} alt="" />
      </td>

      <td>{item.title}</td>
      <td textTransform={'uppercase'}>{item.category}</td>
      <td>{item.createdBy}</td>
      <td >{item.views}</td>
      <td >{item.numOfVideos}</td>

      <td >
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="courses-button-lg"
            onClick={() => coureDetailsHandler(item._id, item.title)}
          >
            {loading ? <Loader color="#7442E9" /> : 'View Lectures'}
          </button>

          <button
            className="courses-button-lg"
            onClick={() => deleteButtonHandler(item._id)}
          >
            {loading ? <Loader color="#7442E9" /> : <RiDeleteBin7Fill />}
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AdminCourses;
