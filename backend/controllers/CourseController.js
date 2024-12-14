import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import { Course } from "../models/Course.js";
import { Stats } from "../models/Stats.js";
import getDataUri from "../utils/DataUri.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

export const getAllCourses = catchAsyncError(async (req, res, next) => {

  const keyword = req.query.keyword || ""
  const category = req.query.category || ""
  const courses = await Course.find({
    title:{
      $regex:keyword,
      $options:"i",
    },
    category:{
      $regex:category,
      $options:"i",
    }
  }).select("-lectures");
  res.status(200).json({
    success: true,
    courses,
  });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
  const { title, description, category, createdBy } = req.body;
  if (!title || !description || !category || !createdBy)
    return next(new ErrorHandler("Please add all fields", 400));

  const file = req.file;
  // console.log(file)

  const fileUri = getDataUri(file);

  // console.log(fileUri.content)

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

  await Course.create({
    title,
    description,
    category,
    createdBy,
    poster: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Course Created Successfully. You can add lectures now",
  });
});

export const getCourseLecture = catchAsyncError(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  course.views += 1;

  await course.save();

  res.status(201).json({
    success: true,
    lectures: course.lectures,
  });
});

// MAx Video size is only 100Mb for free account in cloudinary is allowed
export const addLecture = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const { title, description } = req.body;
  const file = req.file;

  if (!title || !description || !file)
    return next(new ErrorHandler("Please add all fields", 400));

  const fileUri = getDataUri(file);

  const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
    resource_type: "video",
  });

  const course = await Course.findById(id);

  if (!course) return next(new ErrorHandler("Course not found", 404));

  // upload file here

  course.lectures.push({
    title,
    description,
    video: {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    },
  });

  course.numOfVideos = course.lectures.length;

  await course.save();

  res.status(201).json({
    success: true,
    message: "Lecture added in course",
  });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  // delete lecture from cloudinary

  await cloudinary.v2.uploader.destroy(course.poster.public_id);

  for (let i = 0; i < course.lectures.length; i++) {
    const singleLecture = course.lectures[i];

    await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
      resource_type: "video",
    });
  }

  const result = await Course.deleteOne({ _id: id });
  if (result.deletedCount === 0) {
    // Handle case when no document was deleted
    return next(new ErrorHandler("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Course deleted successfully.",
  });
});


export const deleteLecture = catchAsyncError(async (req, res, next) => {
  const { courseId, lectureId } = req.query;
  const course = await Course.findById(courseId);
  if (!course) return next(new ErrorHandler("Course not found", 404));

  const lecture = course.lectures.filter((item) => {
    if(item._id.toString() === lectureId.toString()) return item
  })
  console.log(lecture[0].video.public_id)

  await cloudinary.v2.uploader.destroy(lecture[0].video.public_id,{
    resource_type:"video",
  });

  course.lectures = course.lectures.filter((item) => {
    if(item._id.toString() !== lectureId.toString()) return item
  })

  course.numOfVideos = course.lectures.length;

  await course.save()


  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully.",
  });
});

Course.watch().on("change",async () => {
  const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

  const courses = await Course.find({})

  let totalViews = 0

  for(let i = 0;i<courses.length;i++){
    const course = courses[i]
    totalViews += course.views
  }


  stats[0].views = totalViews
  stats[0].createdAt = new Date(Date.now())
  await stats[0].save()
})
