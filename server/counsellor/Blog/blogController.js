const blogSchema = require("./blogSchema");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const uploadblog = (req, res) => {
  const blog = new blogSchema({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    category: req.body.category,
    date: req.body.date,
    counsellorId:req.body.counsellorId,
    image: req.file,
  });
  blog
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted Successfully",
        data: data,
      });
    })
    .catch((err) => {
        res.json({
            status:404,
            msg:err
        })
    });
};

module.exports={
    uploadblog,upload
}
