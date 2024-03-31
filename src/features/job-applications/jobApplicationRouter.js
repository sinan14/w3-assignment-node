import express from "express";
import { auth } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/fileUpload.middleware.js";
import {
  apply,
  getApply,
  getJobApplicationsByJobId,
} from "./jobApplication.controller.js";
const router = express.Router();
router.use(auth);
router.post("/", upload.single("file"), apply);
router.get("/get_apply", getApply);
router.get("/:id", getJobApplicationsByJobId);
export default router;
