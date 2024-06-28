const hpschema = require("./hpSchema");
const multer = require("multer");
const jwt = require("jsonwebtoken");
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

const registerhp = (req, res) => {
  const hp = new hpschema({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    state: req.body.state,
    city:req.body.city,
    licenceno:req.body.licenceno,
    aadharno:req.body.aadharno,
    yearofexp:req.body.yearofexp,
    specialisation:req.body.specialisation,
    image: req.file,
  });
  hp
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
        if (err.keyPattern.phone) {
          errMsg = "Contact already in Use";
        } else if (err.keyPattern.email) {
          errMsg = "Email Id already in Use";
        } else if (err.keyPattern.licenceno) {
          errMsg = "Licence Number already in Use";
        } else if (err.keyPattern.aadharno) {
          errMsg = "Aadhar already in Use";
        }        return res.status(409).json({
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
      console.log(err);
    });
};

//hp registration completed

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

const hpLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await hpschema.findOne({ email: email });

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

//login using token completed

const viewhpreq=((req,res)=>{
  hpschema.find({isactive:false})
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

const viewhpbyid=((req,res)=>{
  hpschema.findById({_id:req.params.id})
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


const deletehpreqById = async (req, res) => {
  await hpschema.findByIdAndDelete({ _id: req.params.id }).exec()
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

const activatehpById = async (req, res) => {
  await hpschema.findByIdAndUpdate({ _id: req.params.id }, { isactive: true }).exec()
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

const viewallhp = async (req, res) => {
  await hpschema.find({isactive:true}).exec()
      .then((result) => {
          res.json({
              status: 200,
              data: result,
              msg: 'Counsellor Found'
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


const forgotPwdhp = (req, res) => {
  hpschema
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





module.exports={
    registerhp,upload,
    hpLogin,
    viewhpreq,
    viewhpbyid,
    deletehpreqById,
    activatehpById,
    viewallhp,
    forgotPwdhp
}

