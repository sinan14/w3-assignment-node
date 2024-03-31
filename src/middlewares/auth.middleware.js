export const auth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/api/user/login");
  }
};
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'job-seeker','recruiter']
    if (!roles.includes(req.session.user.usertype)) {
      req.flash("error", "You do not have permission to perform this action");
      return res.redirect("/api/user/login");
    }
    next();
  };
};
