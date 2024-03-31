import { getAppliedJobIdsByUser } from "../job-applications/jobApplication.model.js";
import { getJobs, addJobs, removeJob, getJob, updateJob } from "./job.model.js";
export const listAllJobs = (req, res) => {
  let jobs = getJobs();
  if (req.session.user) {
    const myAppliedJobIds = getAppliedJobIdsByUser(req.session.user.id);
    if (myAppliedJobIds.length) {
      jobs = jobs.filter((job) => {
        const check = myAppliedJobIds.includes(job.id + "");
        return check == false;
      });
    }
  }
  res.render("jobs", { jobs });
};
export const getAddJob = (req, res) => {
  res.render("addjob");
};
export const addJob = (req, res) => {
  const job = req.body;
  addJobs(job, req.session.user.id);
  res.redirect("/jobs");
};

export const applyJob = (req, res) => {
  console.log("body is ", req.body);
  return res.json({ status: "success" });
};
export const getJobsByRecruiter = (userId) => {
  const jobs = getJobs().filter((job) => job.createdBy == userId);
  return jobs;
};
export const deleteJobById = (req, res) => {
  removeJob(req.params.id);
  return res.status(204).json({ message: "deleted successfully" });
};
export const updateJobById = (req, res) => {
  const job = {
    ...req.body,
    id: req.params.id,
  };
  updateJob(job);
  req.flash("success", "Successfully updated post!");
  res.redirect("/api/jobs/" + job.id);
};
export const getUpdateFormById = (req, res) => {
  const job = getJob(req.params.id);
  if (!job) {
    req.flash("error", "Cannot find that post with given id!");
    return res.redirect("/");
  }
  res.render("updateJob", { job });
};
export const getJobById = (req, res) => {
  const job = getJob(req.params.id);
  if (!job) {
    req.flash("error", "Cannot find that post with given id!");
    return res.redirect("/");
  }
  res.render("viewJob", { job });
};
