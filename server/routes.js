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
router.post("/counsellorlogin",Counsellor.counsellorLogin)
router.post("/viewcouncellorreq",Counsellor.viewcounsellorreq)
router.post("/viewcouncellorbyid/:id",Counsellor.viewcounsellorbyid)
router.post("/deletecounsellorreq/:id",Counsellor.deleteCounsellorById)
router.post("/activatecouncellor/:id",Counsellor.activateCounsellorById)
router.post("/viewallcounsellor",Counsellor.viewallcounsellor)
router.post("/forgotPwdcounsellor",Counsellor.forgotPwdcounsellor)
router.post("/updatecounsellor/:id",Counsellor.upload,Counsellor.updatecounsellor)


router.post("/hpregister",Hp.upload,Hp.registerhp)
router.post("/hplogin",Hp.hpLogin)
router.post("/viewhprequest",Hp.viewhpreq)
router.post("/viewhpbyid/:id",Hp.viewhpbyid)
router.post("/deletehpreq/:id",Hp.deletehpreqById)
router.post("/activatehp/:id",Hp.activatehpById)
router.post("/viewallhp",Hp.viewallhp)
router.post("/forgotPwdhp",Hp.forgotPwdhp)





module.exports=router
