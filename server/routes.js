const express=require('express')
const router=express.Router()

const Patients=require("./Patients/patientController")
const Counsellor=require("./counsellor/counsellorController")
const Hp=require("./HP/hpController")

router.post("/registerpatient",Patients.upload,Patients.registerpatient)
router.post("/patientlogin",Patients.patientLogin)
router.post("/verifytooken",Patients.verifyToken)
router.post("/forgotPwdpatient",Patients.forgotPwdpatient)
router.post("/viewallpatients",Patients.viewallpatients)
router.post("/viewallpatientbyid/:id",Patients.viewpatientbyid)
router.post("/updatepatientprofile/:id",Patients.updateprofilepatient,Patients.upload)


router.post("/counsellorregistration",Counsellor.upload,Counsellor.registercounsellor)



router.post("/hpregister",Hp.upload,Hp.registerhp)
router.post("/hplogin",Hp.hpLogin)


module.exports=router
