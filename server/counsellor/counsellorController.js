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

const counsellorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await counsellorSchema.findOne({ email: email });

    if (user) {
      if (user.isActive === false) {
        return res.json({
          status: 403,
          msg: "Counsellor is not active. Please contact administrator.",
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
//login using jwt token completed

const viewcounsellorreq=((req,res)=>{
  counsellorSchema.find({isActive:false})
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

const viewcounsellorbyid=((req,res)=>{
  counsellorSchema.findById({_id:req.params.id})
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


const deleteCounsellorById = async (req, res) => {
  await counsellorSchema.findByIdAndDelete({ _id: req.params.id }).exec()
      .then((result) => {
          res.json({
              status: 200,
              data: result,
              msg: 'data deleted'
          })
      })
      .catch(err => {
          res.json({
              status: 500,
              msg: 'Error in API',
              err: err
          })
      })

}

const activateCounsellorById = async (req, res) => {
  await counsellorSchema.findByIdAndUpdate({ _id: req.params.id }, { isActive: true }).exec()
      .then((result) => {
          res.json({
              status: 200,
              data: result,
              msg: 'Accepted'
          })
      })
      .catch(err => {
          res.json({
              status: 500,
              msg: 'Error in API',
              err: err
          })
      })

}


const viewallcounsellor = async (req, res) => {
  await counsellorSchema.find({ isActive: true }).exec()
      .then((result) => {
          res.json({
              status: 200,
              data: result,
              msg: 'Counsellor found'
          })
      })
      .catch(err => {
          res.json({
              status: 500,
              msg: 'Error in API',
              err: err
          })
      })

}





module.exports={
    registercounsellor,upload,
    verifyToken,counsellorLogin,
    viewcounsellorreq,
    viewcounsellorbyid,
    deleteCounsellorById,
    activateCounsellorById,
    viewallcounsellor
}

