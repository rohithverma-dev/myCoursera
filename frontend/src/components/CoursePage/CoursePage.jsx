import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';
import "./coursePage.css"


const CoursePage = ({ user }) => {

  const [watching, setWatching] = useState(0)
  
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures , loading }   =  useSelector(state=>state.course)
  
//   const lectures = [{
//     _id:"jksadjndkae",
//     title:"sample",
//     description: "sample secfdf ndfds fsf ssdjsdkjn a,njdnk",
//     video: {
//       url:"sasmass",
//     }
//   },
//   {
//     _id:"jksadjndkae2",
//     title:"sample2",
//     description: "sample secfdf ndfds fsf ssdjsdkjn a,njdnk",
//     video: {
//       url:"sasmass",
//     }
//   },
//   {
//     _id:"jksadjndkae3",
//     title:"sample3",
//     description: "sample secfdf ndfds fsf ssdjsdkjn a,njdnk",
//     video: {
//       url:"sasmass",
//     }
//   },
//  ]

 const dispatch = useDispatch()
 const params = useParams();

 useEffect(() => {
  dispatch(getCourseLectures(params.id));
}, [dispatch, params.id]);

// if (
//   user.role !== 'admin' &&
//   (user.subscription === undefined || user.subscription.status !== 'active')
// ) {
//   return <Navigate to={'/subscribe'} />;
// }

if (user.role !== "admin") {
  
  if (user.subscription ===  undefined  || user.subscription.status !== "active") {
    return <Navigate to={"/subscribe"} />
  }else{

  }

}

    return (
      loading ? <Loader/> : (
        <div className='coursepage-grid' >
      {
        lectures && lectures.length > 0 ? (
          <>
          <div>
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
              // src={introVideo}
            ></video>

            {/* <Heading m="4" children={`#${lectureNumber + 1} ${ lectureTitle  }  `}   /> */}
            <h1 style={{margin:'16px'}} className='coursepage-heading' >{`#${lectureNumber + 1} ${ lectures[lectureNumber].title }`}</h1>
            

            <h1 style={{margin:'16px' , textTransform:'none' }} className='coursepage-heading' >Description</h1>
            <p style={{margin:'16px'}} className='custom-text' >{lectures[lectureNumber].description}</p>
          </div>

          <div style={{display:'flex', flexDirection:'column' }} >
            {lectures.map((element, index) => (
              <button
                onClick={() => setLectureNumber(index)}
                key={element._id}
                style={{
                  width: '100%',
                  padding: '1rem',
                  textAlign: 'center',
                  margin: 0,
                  borderBottom: '1px solid rgba(0,0,0,0.2)',
                }}
              >
                <p onClick={()=>setWatching(index)} style={{ whiteSpace:'nowrap' , fontWeight:'500' , textOverflow:'ellipsis' , backgroundColor: (watching === index) ?  "lightgreen" : 'lightblue' }} className='custom-text' >
                   #{index + 1} {element.title}
                </p>

              </button>
            ))}
          </div>
        </>
        ) : 
        <h1 style={{margin:'16px' , textTransform:'none' }} className='coursepage-heading' >No Lectures</h1>
      }
    </div>
      )
    )

 
};

export default CoursePage;
