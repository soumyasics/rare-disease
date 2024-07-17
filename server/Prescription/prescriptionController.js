const prescription = require("./prescriptionSchema");

const addprescription = async(req, res) => {
    const existingHistory=await prescription.findOne({patientId:req.body.patientId,hpId: req.body.hpId})
    if(existingHistory){
        return res.json({
          status: 404,
            msg: "This patient has already  have prescription",
        })
      }
    
  const hp = new prescription({
    patientId: req.body.patientId,
    hpId: req.body.hpId,
    date: new Date(),
    description: req.body.description,
    medicalcode: req.body.medicalcode,
    nameofmedicine:req.body.nameofmedicine,
    dosage:req.body.dosage,
    durationofuse:req.body.durationofuse,
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
        res.json({
            status:400,
            msg:err
        })
    })
};

module.exports={
    addprescription
}