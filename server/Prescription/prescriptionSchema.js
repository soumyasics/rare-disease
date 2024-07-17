const mongoose= require("mongoose");

const schema=mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients",
        required: true,
    },
    appoinmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userhprequest",
        required: true,
    },

    hpId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "hp",
        required: true,
    },
    date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    medicalcode:{
        type:String,
        required:true
    },
    nameofmedicine:{
        type:String,
        required:true
    },
    dosage:{
        type:String,
        required:true
    },
    durationofuse:{
        type:String,
        required:true
    },

});
module.exports = mongoose.model('prescription', schema);

