import fs from "fs";
import { promisify } from "util";
import {
  createNewApplication,
  getApplicationByJobId,
} from "./jobApplication.model.js";
import { getJob } from "../jobs/job.model.js";
import { getUserById } from "../user/user.model.js";
import { sendMail } from "../../middlewares/sendMail.middleware.js";
const uploadDirectory = "./public/uploads";
const unlinkAsync = promisify(fs.unlink);

export const getApply = (req, res) => {
  res.render("applyJob");
};
export const apply = async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      req.flash("error", "No file uploaded");
      return res.redirect("/api/jobs/apply/get_apply");
    }

    // Determine the file type
    const fileExtension = req.file.mimetype ? req.file.mimetype : null;
    console.log("file extension  ==>", fileExtension);
    // Check if the file is already in PDF format
    if (fileExtension != "application/pdf") {
      const path = `${uploadDirectory}/${req.body.fileName}`;
      if (fs.existsSync(path)) await unlinkAsync(path);
      req.flash("error", "Wrong file format");
      return res.redirect("/api/jobs/apply/get_apply");
    }
    const newApplication = {
      jobId: req.body.jobId,
      resume: req.body.fileName,
      userId: req.session.user.id,
    };
    createNewApplication(newApplication);
    req.flash("success", "Applied successfully");
    // send email on successfull apply
    const { email, name } = req.session.user;
    const subject = `Re: Applied`;
    const job = getJob(req.body.jobId);
    const mailText = `Hi ${name} \n your apply for the job post ${job.title} is done.`;
    sendMail(email, subject, mailText);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    const path = `${uploadDirectory}/${req.body.fileName}`;
    if (fs.existsSync(path)) await unlinkAsync(path);
    req.flash("error", "No file uploaded");
    return res.redirect("/api/jobs/apply/get_apply");
  }
};
export const getJobApplicationsByJobId = (req, res) => {
  const jobId = req.params.id;
  const job = getJob(jobId);
  const applicants = getApplicationByJobId(jobId);
  applicants.forEach((applicant) => {
    const userId = applicant.userId;
    const user = getUserById(userId);
    applicant.name = user.name;
    applicant.email = user.email;
  });
  res.render("view-applications", { applicants, job });
};
