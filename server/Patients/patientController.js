const patientschema = require("./patientSchema");
const multer = require("multer");
const jwt = require("jsonwebtoken");
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

// const upload = multer({ storage: storage }).array("files",2);
const upload = multer({ storage: storage }).single("files");

// const upload = multer({ storage: storage }).array("files");
// const upload2 = multer({ storage: storage }).single("image");


const registerpatient = (req, res) => {
  console.log("req",req.file);
  const patient = new patientschema({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    gender:req.body.gender,
    dob:req.body.dob,
    password: req.body.password,
    country:req.body.country,
    city: req.body.city,
    diseaseinfo:req.body.diseaseinfo,
    usertype:req.body.usertype,
    // healthrecord:req.files[0],
    image: req.file,
  });
  patient
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

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  console.log("t1", token);
  console.log("secret", secret);
  if (!token) {
    return res.json({ status: 401, msg: "Unauthorized" });
  }
  jwt.verify(token, secret, (err, decodedToken) => {
    console.log(decodedToken);
    if (err) {
      return res.json({ status: 401, messagge: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    next();
    return res.json({ status: 200, msg: "ok", user: decodedToken.userId });
  });
  console.log(req.user);
};

const patientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await patientschema.findOne({ email: email });

    if (user) {
      if (user.isactive === false) {
        return res.json({
          status: 403,
          msg: "User is not active. Please contact administrator.",
        });
      } else if (user.password === password) {
        const token = jwt.sign(
          { email: user.email, password: user.password },
          "secret_key",
          { expiresIn: 86400 }
        );
        return res.json({
          status: 200,
          msg: "Login Successfully",
          token,
          id: user._id,
        });
      }
      //   return res
      //     .status(200)
      //     .json({ message: "Login successful", token, id: user._id });
      // }
      else {
        return res.status(401).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//patient login completed

const forgotPwdpatient = (req, res) => {
  patientschema
    .findOneAndUpdate(
      { email: req.body.email },
      { password: req.body.password }
    )
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully",
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });
};
//patient forgotpswd completed

const viewallpatients = (req, res) => {
  patientschema
    .find({})
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: "successfully get",
      });
    })
    .catch((err) => {
      res.json({
        status: 404,
        msg: err,
      });
    });
};
//view all patient completed

const viewpatientbyid = (req, res) => {
  patientschema
    .findById({ _id: req.params.id })
    .then((result) => {
      res.json({
        status: 200,
        data: result,
        msg: "successfully get",
      });
    })
    .catch((err) => {
      res.json({
        status: 404,
        msg: err,
      });
    });
};
//view patientby id completed

const updateprofilepatient = (req, res) => {
  // const files = req.files || [];
  // const healthRecordFile = files.find((file) => file.originalname === req.body.healthrecord);
  // const imageFile = files.find((file) => file.originalname === req.body.image);

  patientschema
    .findByIdAndUpdate(
     {_id: req.params.id},
      {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        gender: req.body.gender,
        dob: req.body.dob,
        country: req.body.country,
        city: req.body.city,
        diseaseinfo: req.body.diseaseinfo,
        usertype: req.body.usertype,
        // healthrecord: healthRecordFile ? healthRecordFile.filename : undefined,
        image: req.file,
      },
      // { new: true } 
    )
    .exec()
    .then((result) => {
      res.json({
        status: 200,
        msg: "updated successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: 404,
        err: err,
        msg: "error in update",
      });
    });
};

const searchpatientByName = (req, res) => {
  patientschema.find({ name: { $regex: req.params.name, $options: 'i' } })
      .then(user => {
          if (user.length === 0) {
              return res.status(404).json({ message: 'No User Found With The Name.' });
          }
          res.status(200).json(user);
      })
      .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Server Error' });
      });
}

module.exports = {
  registerpatient,
  upload,
  patientLogin,
  verifyToken,
  forgotPwdpatient,
  viewallpatients,
  viewpatientbyid,
  updateprofilepatient,
  searchpatientByName
};
