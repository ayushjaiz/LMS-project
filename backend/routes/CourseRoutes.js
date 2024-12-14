import express from "express";
import {
  getAllCourses,
  createCourse,
  getCourseLecture,
  addLecture,
  deleteCourse,
  deleteLecture
} from "../controllers/CourseController.js";
import singleUpload from "../middlewares/Multer.js";
import {authorizedAdmin, isAuthenticated, authorizedSubscribers} from '../middlewares/Auth.js'

const router = express.Router();

// Get all courses without lectures
router.route("/courses").get(getAllCourses);

// create new course - only admins
router.route("/createcourse").post(isAuthenticated,authorizedAdmin,  singleUpload ,createCourse);

// Add lectures, delete course, get course details
router.route("/course/:id").get(isAuthenticated ,authorizedSubscribers, getCourseLecture).post(isAuthenticated, authorizedAdmin, singleUpload ,addLecture).delete(isAuthenticated, authorizedAdmin, deleteCourse)

// delete lectures
router.route("/lecture").delete(isAuthenticated,authorizedAdmin ,deleteLecture);

export default router;
