import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import cursor from '../../../assets/images/cursor.png';
import SideBar from '../SideBar';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import CourseModal from '../CourseModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/CourseAction';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/AmdinAction';
import { toast } from 'react-hot-toast';
import Loader from '../../Layout/loader/Loader';
const AdminCourses = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [courseId, setCourseId] = useState();
  const [courseTitle, setCourseTitle] = useState();
  // const courses = [
  //   {
  //     _id: 'jfnsfhishfoi',
  //     title: 'react course',
  //     category: 'Web Development',
  //     poster: {
  //       url: my_profile,
  //     },
  //     createdBy: 'DarkNight',
  //     views: 123,
  //     numOfVideos: 12,
  //   },
  // ];

  const { courses, lectures, loading:courseLoading } = useSelector(state => state.course);
  const { loading, error, message } = useSelector(state => state.admin);
  const dispatch = useDispatch();

  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };
  const deleteButtonHandler = courseId => {
    dispatch(deleteCourse(courseId));
  };
  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
    console.log(':Hide');
  };
  const addLectureButtonHandler = async (
    e,
    courseId,
    title,
    description,
    videos
  ) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', videos);
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
  }, [dispatch, error, message]);

  return (
    <Grid
      // css={{
      //   cursor: `url(${cursor}), default`,
      // }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      {courseLoading ? (
        <Loader color="purple.500" />
      ) : (
        <>
          <Box p={['0', '8']} overflowX={'auto'}>
            <Heading
              textTransform={'uppercase'}
              children="All Courses"
              my="16"
              textAlign={['center', 'left']}
            />

            <TableContainer w={['100vw', 'full']}>
              <Table variant={'simple'} size={'lg'}>
                <TableCaption>
                  All available courses in the database
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Id</Th>
                    <Th>Poster</Th>
                    <Th>Title</Th>
                    <Th>Category</Th>
                    <Th>Creator</Th>
                    <Th isNumeric>Views</Th>
                    <Th isNumeric>Lectures</Th>
                    <Th isNumeric>Action</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {courses.map(item => (
                    <Row
                      item={item}
                      key={item._id}
                      courseDetailsHandler={courseDetailsHandler}
                      deleteButtonHandler={deleteButtonHandler}
                      loading={loading}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <CourseModal
              isOpen={isOpen}
              onClose={onClose}
              id={courseId}
              courseTitle={courseTitle}
              deleteLectureButtonHandler={deleteLectureButtonHandler}
              addLectureButtonHandler={addLectureButtonHandler}
              lectures={lectures}
              loading={loading}
            />
          </Box>
        </>
      )}
      <SideBar />
    </Grid>
  );
};

export default AdminCourses;

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.poster.url} />
      </Td>
      <Td>{item.title}</Td>
      <Td textTransform={'uppercase'}>{item.category}</Td>
      <Td>{item.createdBy}</Td>
      <Td isNumeric>{item.views}</Td>
      <Td isNumeric>{item.numOfVideos}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => courseDetailsHandler(item._id, item.title)}
            variant={'outline'}
            color={'purple.500'}
            isLoading={loading}
          >
            View Lecture
          </Button>
          <Button
            color={'purple.600'}
            onClick={() => deleteButtonHandler(item._id)}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}
