const patientinfoschema = require("./PatientinfoSchema");


const regpatientinfo =async (req, res) => {
  const existingHistory=await patientinfoschema.findOne({ patientid:req.body.patientid})
  if(existingHistory){
    return res.json({
      status: 404,
        msg: "You have already added health record",
    })
  }
  const patient = new patientinfoschema({
    patientid:req.body.patientid,
    medicalhistory:req.body.medicalhistory
  });
 await patient
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


const viewinfobypId=((req,res)=>{
  patientinfoschema.findOne({patientid:req.params.id})
  .populate("patientid")
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
})

editinfobyid=((req,res)=>{
  patientinfoschema.findByIdAndUpdate({_id:req.params.id},{
    medicalhistory:req.body.medicalhistory
  })
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
})

module.exports={
    regpatientinfo,
    viewinfobypId,
    editinfobyid
}