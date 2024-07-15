const mongoose= require("mongoose");

const schema=mongoose.Schema({
    patientId: {
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
    counsellorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "counsellor",
    },
    counsellorAcceptStatus:{
        type: String,
        default: "pending"
    }
 
});
module.exports = mongoose.model('userreqcounsellor', schema);

