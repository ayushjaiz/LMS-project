import express from "express";
import { authorizedAdmin, isAuthenticated } from "../middlewares/Auth.js";
import { contact, contactRequest, getDashboardStats } from "../controllers/OtherControllers.js";
 

const router = express.Router();

// contact form 
router.route("/contact").post(contact)

// Request form 
router.route("/courserequest").post(contactRequest)

// get admin Dashboard stats

router.route("/admin/stats").get(isAuthenticated, authorizedAdmin, getDashboardStats)



export default router;
