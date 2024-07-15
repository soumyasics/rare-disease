const express=require('express')
const router=express.Router()

const Patients=require("./Patients/patientController")
const Counsellor=require("./counsellor/counsellorController")
const Hp=require("./HP/hpController")
const patienthpreq=require("./HP/Patientreqhp/PatientreqHpController")
const Patientinfo=require("./Patients/Patientinfo/Patientinfocontroller")
const Patientcounsellorreq=require("./counsellor/PatientreqCounsellor/CounselllorReqController")
const blogs=require("./counsellor/Blog/blogController")


router.post("/registerpatient",Patients.upload,Patients.registerpatient)
router.post("/patientlogin",Patients.patientLogin)
router.post("/verifytooken",Patients.verifyToken)
router.post("/forgotPwdpatient",Patients.forgotPwdpatient)
router.post("/viewallpatients",Patients.viewallpatients)
router.post("/viewallpatientbyid/:id",Patients.viewpatientbyid)
router.post("/updatepatientprofile/:id",Patients.upload,Patients.updateprofilepatient)


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
router.post("/hpupdateprofile/:id",Hp.upload,Hp.hpupdateprofile)


// Patinet Request hp appoinment
router.post("/registerreq",patienthpreq.registerreq)
router.post("/viewBookingByhpid/:id",patienthpreq.viewBookingByhpid)
router.post("/approveBookingByid/:id",patienthpreq.approveBookingByid)
router.post("/rejectBookingByid/:id",patienthpreq.rejectBookingByid)
router.post("/viewBookingBypatientid/:id",patienthpreq.viewBookingBypatientid)
router.post("/patientpaymentconfirm/:id",patienthpreq.patientpaymentconfirm)


//patient information
router.post("/regpatientinfo",Patientinfo.regpatientinfo)

//Patient req counsellor
router.post("/registerreqcounsellor",Patientcounsellorreq.registerreqcounsellor)
router.post("/viewBookingByCounsellorid/:id",Patientcounsellorreq.viewBookingByCounsellorid)
router.post("/approvecounsellorBookingByid/:id",Patientcounsellorreq.approvecounsellorBookingByid)
router.post("/rejectcounsellorBookingByid/:id",Patientcounsellorreq.rejectcounsellorBookingByid)
router.post("/viewApprovedBookingByCounsellorid/:id",Patientcounsellorreq.viewApprovedBookingByCounsellorid)

//blogs
router.post("/uploadblog",blogs.upload,blogs.uploadblog)


module.exports=router
