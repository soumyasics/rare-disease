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

// view all blogs 

const viewallblogs=((req,res)=>{
  blogSchema.find()
  .exec()
  .then((result)=>{
    res.json({
      status:200,
      data:result
    })
  })
  .catch((err)=>{
    console.log(err);
    res.json({
      status:404,
      err:err
    })
  })
})

// view all blogs 

const viewblogsbyId=((req,res)=>{
  blogSchema.findById(req.params.id)
  .exec()
  .then((result)=>{
    res.json({
      status:200,
      data:result
    })
  })
  .catch((err)=>{
    console.log(err);
    res.json({
      status:404,
      err:err
    })
  })
})

// update blogs

const updateBlog=((req,res)=>{
  blogSchema.findByIdAndUpdate({_id:req.params.id},{
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    category: req.body.category,
    image: req.file,
  })
  .then((result) => {
    res.json({
        status: 200,
        data: result,
        msg: 'Updated'
    })
})
.catch(err => {
    res.json({
        status: 500,
        msg: 'Error in API',
        err: err
    })
})

})

module.exports={
    uploadblog,upload,
    viewallblogs,
    viewblogsbyId,
    updateBlog
}
