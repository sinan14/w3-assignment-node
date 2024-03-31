import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import session from "express-session";
import methodOverride from "method-override";
import path from "path";
import flash from "connect-flash";
import jobRoutes from "./src/features/jobs/job.routes.js";
import userRoutes from "./src/features/user/user.routes.js";
import applyRoutes from "./src/features/job-applications/jobApplicationRouter.js";

const app = express();
app.use(express.static(path.resolve("public")));
app.use(cookieParser());

app.use(
  session({
    secret: "top secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);

app.use(flash());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.set("layout", "layouts/layout");
app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(methodOverride("_method"));
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  console.log(req.method, "==>", req.url);
  next();
});
app.use("/api/user", userRoutes);
app.use("/api/jobs/apply", applyRoutes);
app.use("/api/jobs", jobRoutes);
app.all("*", (req, res) => {
  return res.redirect("/api/jobs");
});
export default app;
