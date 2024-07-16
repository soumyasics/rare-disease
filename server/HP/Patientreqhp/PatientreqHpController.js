const patientreqschema = require("./PatientreqHpSchema");


const registerreq = (req, res) => {
  const patient = new patientreqschema({
    patientid:req.body.patientid,
    date:req.body.date,
    time:req.body.time,
    hpid:req.body.hpid,
    diagnosis:req.body.diagnosis,
    allergies:req.body.allergies,
    medication:req.body.medication,
    emergencycontact:req.body.emergencycontact,
    medicalhistory:req.body.medicalhistory,

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

const viewBookingByhpid = (req, res) => {
    patientreqschema.find({hpid:req.params.id,hpacceptstatus:"pending",paymentstatus:true})
    .populate('patientid')
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
  const viewBookingByid = (req, res) => {
    patientreqschema.findById({_id:req.params.id})
    .populate('patientid')
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

  const patientpaymentconfirm = (req, res) => {
    patientreqschema.findByIdAndUpdate({_id:req.params.id},{
      paymentstatus:true
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


  const approveBookingByid = (req, res) => {
    patientreqschema.findByIdAndUpdate({_id:req.params.id},{
        hpacceptstatus:"approved"
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
  const rejectBookingByid = (req, res) => {
    patientreqschema.findByIdAndUpdate({_id:req.params.id},{
        hpacceptstatus:"rejected"
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
  const viewBookingBypatientid = (req, res) => {
    patientreqschema.find({patientid:req.params.id,paymentstatus:true})
    .populate('hpid')
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

  const viewacceptedBookingByhpid = (req, res) => {
    patientreqschema.find({hpid:req.params.id,hpacceptstatus:"approved",paymentstatus:true})
    .populate('patientid')
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
    registerreq,
    viewBookingByhpid,
    approveBookingByid,
    rejectBookingByid,
    viewBookingBypatientid,
    patientpaymentconfirm,
    viewacceptedBookingByhpid,
    viewBookingByid
}