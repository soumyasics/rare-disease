const counselloreqschema = require("./CounsellorReqSchema");


const registerreqcounsellor = (req, res) => {
  const patient = new counselloreqschema({
    patientId:req.body.patientId,
    date:req.body.date,
    time:req.body.time,
    counsellorId:req.body.counsellorId,

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
        res.json({
            status:500,
            err:err
        })
    });
};

const viewBookingByCounsellorid = (req, res) => {
    counselloreqschema.find({counsellorId:req.params.id,counsellorAcceptStatus:"pending"})
    .populate('patientId')
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }


  const viewCounsellorBookingByPatientid = (req, res) => {
    counselloreqschema.find({patientId:req.params.id,counsellorAcceptStatus:"approved"})
    .populate('patientId counsellorId')
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }

  const viewBookingByPid = (req, res) => {
    counselloreqschema.find({patientId:req.params.id})
    .populate('counsellorId')
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }

  const approvecounsellorBookingByid = (req, res) => {
    counselloreqschema.findByIdAndUpdate({_id:req.params.id},{
        counsellorAcceptStatus:"approved"
    }).exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Approved successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }
  const rejectcounsellorBookingByid = (req, res) => {
    counselloreqschema.findByIdAndDelete({_id:req.params.id}).exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Approved successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }
  const viewApprovedBookingByCounsellorid = (req, res) => {
    counselloreqschema.find({counsellorId:req.params.id,counsellorAcceptStatus:"approved"})
    .populate('patientId')
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }


module.exports={
    registerreqcounsellor,
    viewBookingByCounsellorid,
    approvecounsellorBookingByid,
    rejectcounsellorBookingByid,
    viewApprovedBookingByCounsellorid,
    viewBookingByPid,
    viewCounsellorBookingByPatientid
}
