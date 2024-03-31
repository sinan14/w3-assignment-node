import express from "express";
import { auth, restrictTo } from "../../middlewares/auth.middleware.js";
import { setLastVisit } from "../../middlewares/lastVisit.middleware.js";
import {
  addJob,
  applyJob,
  deleteJobById,
  getAddJob,
  getJobById,
  getUpdateFormById,
  listAllJobs,
  updateJobById,
} from "./job.controller.js";
const router = express.Router();
router.get("/", setLastVisit, listAllJobs);
router.get("/add", auth, restrictTo("recruiter"), getAddJob);
router.get("/:id", getJobById);
router.use(auth);
router.post("/", addJob);
router.get("/updatefrom/:id", getUpdateFormById);
router.put("/:id", updateJobById).delete("/:id", deleteJobById);
router.post("/apply", applyJob);
export default router;
