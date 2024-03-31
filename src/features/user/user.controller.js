import { getJobsByRecruiter } from "../jobs/job.controller.js";
import { registerUser, authenticateUser } from "./user.model.js";

export const getRegister = (req, res) => {
  res.render("user-register");
};
export const getLogin = (req, res) => {
  res.render("user-login");
};
export const addUser = (req, res) => {
  const check = registerUser(req.body);
  if (check) {
    res.render("user-login");
  } else {
    req.flash("error", "signup failed");
    return res.redirect("/api/user/register");
  }
};
export const getRecruiterLandingPage = (req, res) => {
  const jobs = getJobsByRecruiter(req.session.user.id);
  res.render("recruiterLanding", { jobs });
};
export const loginUser = (req, res) => {
  const user = authenticateUser(req.body);
  if (user) {
    req.session.user = user;
    if (user.usertype === "recruiter") {
      return res.redirect("/api/user/recruiter");
    }
    return res.redirect("/");
  }
  req.flash("error", "login failed");

  return res.redirect("/api/user/login");
};
export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) res.status(401).send(err);
    else res.redirect("/api/user/login");
  });
};
