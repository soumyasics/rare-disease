const patientinfoschema = require("./PatientinfoSchema");


const regpatientinfo = (req, res) => {
  const patient = new patientinfoschema({
    patientid:req.body.patientid,
    medicalhistory:req.body.medicalhistory
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

module.exports={
    regpatientinfo
}