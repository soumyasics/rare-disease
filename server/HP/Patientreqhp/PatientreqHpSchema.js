const mongoose= require("mongoose");

const schema=mongoose.Schema({
    patientid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients",
        required: true,
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    hpid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hp",
    },
    diagnosis:{
        type:String,
        required:true
    },
    allergies:{
        type:String,
        required:true
    },
    medication:{
        type:String,
        required:true
    },
    emergencycontact:{
        type:String,
        required:true
    },
    medicalhistory:{
        type:String,
        required:true
    },
    hpacceptstatus:{
        type: String,
        default: "pending"
    }
 
});
module.exports = mongoose.model('userhprequest', schema);

