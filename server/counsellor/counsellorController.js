const multer = require("multer");
const jwt = require("jsonwebtoken");
const counsellorSchema = require("./counsellorSchema");
// const secret = process.env.JWT_SECRET || 'Secret-key';
const secret = "secret_key";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");

const registercounsellor = (req, res) => {
  const counsellor = new counsellorSchema({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    regno:req.body.regno,
    image: req.file,
  });
  counsellor
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted Successfully",
        data: data,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        let errMsg = "Data not Inserted";
        if (err.keyPattern.hasOwnProperty("phone")) {
          errMsg = "Contact already in Use";
        } else if (err.keyPattern.hasOwnProperty("email")) {
          errMsg = "Email Id already in Use";
        }else if(err.keyPattern.hasOwnProperty("regno")){
            errMsg="Reg No already in Use"
        }
        return res.status(409).json({
          status: 409,
          msg: errMsg,
          Error: err,
        });
      }
      res.status(500).json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};



module.exports={
    registercounsellor,upload
}

