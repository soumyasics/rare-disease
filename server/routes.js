const express=require('express')
const router=express.Router()

const Patients=require("./Patients/patientController")
const Counsellor=require("./counsellor/counsellorController")
const Hp=require("./HP/hpController")
const patienthpreq=require("./HP/Patientreqhp/PatientreqHpController")
const Patientinfo=require("./Patients/Patientinfo/Patientinfocontroller")
const Patientcounsellorreq=require("./counsellor/PatientreqCounsellor/CounselllorReqController")
const blogs=require("./counsellor/Blog/blogController")
const prescription=require("./Prescription/prescriptionController")
const Chat=require("./Chats/chatController")

router.post("/registerpatient",Patients.upload,Patients.registerpatient)
router.post("/patientlogin",Patients.patientLogin)
router.post("/verifytooken",Patients.verifyToken)
router.post("/forgotPwdpatient",Patients.forgotPwdpatient)
router.post("/viewallpatients",Patients.viewallpatients)
router.post("/viewallpatientbyid/:id",Patients.viewpatientbyid)
router.post("/updatepatientprofile/:id",Patients.upload,Patients.updateprofilepatient)
router.post("/searchpatientByName/name",Patients.searchpatientByName)


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


// Patient Request hp appoinment
router.post("/registerreq",patienthpreq.registerreq)
router.post("/viewBookingByhpid/:id",patienthpreq.viewBookingByhpid)
router.post("/approveBookingByid/:id",patienthpreq.approveBookingByid)
router.post("/rejectBookingByid/:id",patienthpreq.rejectBookingByid)
router.post("/viewBookingBypatientid/:id",patienthpreq.viewBookingBypatientid)
router.post("/patientpaymentconfirm/:id",patienthpreq.patientpaymentconfirm)
router.post("/viewacceptedBookingByhpid/:id",patienthpreq.viewacceptedBookingByhpid)
router.post("/viewBookingByid/:id",patienthpreq.viewBookingByid)


//patient information
router.post("/regpatientinfo",Patientinfo.regpatientinfo)
router.post("/viewinfobypId/:id",Patientinfo.viewinfobypId)
router.post("/editinfobyid/:id",Patientinfo.editinfobyid)


//Patient req counsellor
router.post("/registerreqcounsellor",Patientcounsellorreq.registerreqcounsellor)
router.post("/viewBookingByCounsellorid/:id",Patientcounsellorreq.viewBookingByCounsellorid)
router.post("/approvecounsellorBookingByid/:id",Patientcounsellorreq.approvecounsellorBookingByid)
router.post("/rejectcounsellorBookingByid/:id",Patientcounsellorreq.rejectcounsellorBookingByid)
router.post("/viewApprovedBookingByCounsellorid/:id",Patientcounsellorreq.viewApprovedBookingByCounsellorid)
router.post("/viewBookingByPid/:id",Patientcounsellorreq.viewBookingByPid)

//blogs
router.post("/uploadblog",blogs.upload,blogs.uploadblog)
router.post("/viewablogsbucounsellorId/:id",blogs.viewablogsbucounsellorId)
router.post("/viewblogsbyId/:id",blogs.viewblogsbyId)
router.post("/updateBlog/:id",blogs.upload,blogs.updateBlog)
router.post("/viewblogs",blogs.viewblogs)
router.post("/viewblogbyid/:id",blogs.viewblogbyid)

//prescription
router.post("/addprescription",prescription.addprescription)
router.post("/viewprescbyappoinmntid/:id",prescription.viewprescbyappoinmntid)
router.post("/editprescbyid/:id",prescription.editprescbyid)
router.post("/viewprescbypatientid/:id",prescription.viewprescbypatientid)
router.post("/viewprescbyid/:id",prescription.viewprescbyid)


//chat
router.post("/chat",Chat.chatting)
router.post("/viewChatRecipientsforUserById/:id",Chat.viewChatRecipientsforUserById)

router.post("/viewChatBetweenuserandCouncellor",Chat.viewChatBetweenuserandCouncellor)
router.post("/viewChatBetweenuserandHp",Chat.viewChatBetweenuserandHp)

module.exports=router
