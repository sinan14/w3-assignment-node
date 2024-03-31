import multer from "multer";

const storage = multer.diskStorage({
  // Write your code here
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const name = Date.now() + "_" + file.originalname;
    req.body.fileName = name;
    cb(null, name);
  },
});

export default multer({ storage });
