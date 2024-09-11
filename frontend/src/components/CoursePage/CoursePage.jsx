import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader/Loader';
// import introVideo from '../../assets/videos/intro.mp4';


const CoursePage = ({ user }) => {

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
        <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      {
        lectures && lectures.length > 0 ? (
          <>
          <Box>
            <video
              width={'100%'}
              controls
              controlsList="nodownload noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              src={lectures[lectureNumber].video.url}
              // src={introVideo}
            ></video>

            <Heading m="4" children={`#${lectureNumber + 1} ${   lectures[lectureNumber].title }`}   />
            {/* <Heading m="4" children={`#${lectureNumber + 1} ${ lectureTitle  }  `}   /> */}

            <Heading m="4" children="Description" />
            <Text m="4" children={lectures[lectureNumber].description} />
            {/* <Text m="4" children={"asjcnsjkdjc aksjnanjcdjk"} /> */}
          </Box>

          <VStack>
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
                <Text noOfLines={1}>
                  #{index + 1} {element.title}
                </Text>
              </button>
            ))}
          </VStack>
        </>
        ) : 
        <Heading children="No Lectures" />
      }
    </Grid>
      )

    )

 
};

export default CoursePage;
