import { server } from '../Store';
import axios from 'axios';

export const contactUs = (name, email, message ) =>
  async dispatch => {
    try {
      dispatch({ type: 'contactUsRequest' });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }

      const { data } = await axios.post(
        `${server}/contact`,
        {name, email, message},
        config
      );

      dispatch({
        type: 'contactUsSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'contactUsFail',
        payload: error.response.data.message,
      });
    }
  };
export const requestCourse = (name, email, course ) =>
  async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
      
      dispatch({ type: 'requestCourseRequest' });
      const { data } = await axios.post(
        `${server}/courserequest`,
        {name, email, course},
        config
      );
      // console.log(data)

      dispatch({
        type: 'requestCourseSuccess',
        payload: data.message,
      });
    } catch (error) {
      dispatch({
        type: 'requestCourseFail',
        payload: error.response.data.message,
      });
    }
  };
