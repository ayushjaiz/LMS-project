import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import intro from '../../assets/videos/intro.mp4';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { getCourseLectures } from '../../redux/actions/CourseAction';
import Loader from '../Layout/loader/Loader';

const CourseDetail = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);
  const dispatch = useDispatch();
  const params = useParams();
  const { lectures, loading } = useSelector(state => state.course);
  // console.log(lectures1);
  // const lectures = [
  //   {
  //     _id: 'msjnn',
  //     title: 'sample1',
  //     description: 'ndnjkf hfsfh fjsdofj s',
  //     video: {
  //       url: 'djijhfd',
  //     },
  //   },
  //   {
  //     _id: 'msjnn',
  //     title: 'sample2',
  //     description: 'ndnjkf hfsfh fjsdofj s',
  //     video: {
  //       url: 'djijhfd',
  //     },
  //   },
  //   {
  //     _id: 'msjnn',
  //     title: 'sample3',
  //     description: 'ndnjkf hfsfh fjsdofj s',
  //     video: {
  //       url: 'djijhfd',
  //     },
  //   },
  // ];

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [dispatch, params.id]);

  // ? user.subscriptions.status is not defined as we add lecture before payment router in backend to test performance

  // * we added subscription object to user Model to test performance manually

  // * if user.subscription is undefined, the condition (user.subscription?.status !== "active" ?? true) will evaluate to true, and the code will execute return <Navigate to={'/subscribe'} />.

  if (
    user.role !== 'admin' &&
    (user.subscription?.status !== 'active' ?? true)
  ) {
    return <Navigate replace to={'/subscribe'} />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']} mt={'20'}>
     {
      lectures && lectures?.length > 0 ? (<>
        <Box>
        <video
          width={'100%'}
          // autoPlay
          controls
          controlsList="nodownload  noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={lectures[lectureNumber]?.video?.url}
        ></video>
        <Heading
          m={'4'}
          children={`#${lectureNumber + 1} ${lectures[lectureNumber]?.title}`}
        />
        <Heading m={'4'} children="Description" />
        <Text m={'4'} children={lectures[lectureNumber]?.description} />
      </Box>

      <VStack>
        {lectures?.map((item, index) => (
          <button
            onClick={() => setLectureNumber(index)}
            key={item._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              margin: '0',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
          >
            <Text noOfLines={1}>
              #{index + 1} {item?.title}
            </Text>
          </button>
        ))}
      </VStack>
      </>) : (
        <>
          <Heading children={"No Lectures"} />
        </>
      )
     }
    </Grid>
  );
};

export default CourseDetail;
