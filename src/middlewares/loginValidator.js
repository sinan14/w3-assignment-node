// Please don't change the pre-written code
// Import the necessary modules here
import { body, validationResult } from "express-validator";

export const validateLogin = async (req, res, next) => {
  // Write your code here
  const rules = [
    body("email").trim().isEmail().withMessage("Enter a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 15 })
      .withMessage("password length should be betwenn 4-15 characters"),
    body("usertype").custom((value, { req }) => {
      if (value !== "recruiter" && value !== "job-seeker") {
        // If not, throw an error
        throw new Error("Invalid usertype. ");
      }
      return true;
    }),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));
  // Validate exact fields
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    req.flash(
      "error",
      errors.array().map((e) => e.msg)
    );
    res.redirect("/api/user/login");
  } else {
    next();
  }
};
export const validateRegister = async (req, res, next) => {
  // Write your code here
  const rules = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Enter a valid email"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 15 })
      .withMessage("password length should be betwenn 4-15 characters"),
    body("usertype").custom((value) => {
      if (value !== "recruiter" && value !== "job-seeker") {
        // If not, throw an error
        throw new Error("Invalid usertype. ");
      }
      return true;
    }),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());

    req.flash(
      "error",
      errors.array().map((e) => e.msg)
    );
    res.redirect("/api/user/register");
  } else {
    next();
  }
};
