import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
  changePassword,
  updateProfile,
  updateProfilePicture,
  forgetPassword,
  resetPassword,
  addToPlaylist,
  removeFromPlaylist,
  getAllUsers,
  updateUserRole,
  deleteUser,
  deleteMyProfile
} from "../controllers/UserController.js";
import { authorizedAdmin, isAuthenticated } from "../middlewares/Auth.js";
import singleUpload from "../middlewares/Multer.js"

const router = express.Router();

// to register a new user
router.route("/register").post(singleUpload ,register);

// login a user
router.route("/login").post(login);

// logout a user
router.route("/logout").get(logout);

// get my profile
router.route("/me").get(isAuthenticated, getMyProfile);

// delete my profile
router.route("/me").delete(isAuthenticated, deleteMyProfile);

// change password
router.route("/changepassword").put(isAuthenticated, changePassword);

// update profile
router.route("/updateprofile").put(isAuthenticated, updateProfile);

// update profile picture
router
.route("/updateprofilepicture")
.put(isAuthenticated,singleUpload ,updateProfilePicture);

// forget password
router.route("/forgetpassword").post( forgetPassword);

// reset password
router.route("/resetpassword/:token").put( resetPassword);

// add to playlist
router.route("/addtoplaylist").post(isAuthenticated, addToPlaylist);

// remove from playlist
router.route("/removefromplaylist").delete(isAuthenticated, removeFromPlaylist);

router.route("/admin/users").get(isAuthenticated,authorizedAdmin ,getAllUsers);

router.route("/admin/user/:id").put(isAuthenticated,authorizedAdmin ,updateUserRole).delete(isAuthenticated,authorizedAdmin ,deleteUser)

export default router;
