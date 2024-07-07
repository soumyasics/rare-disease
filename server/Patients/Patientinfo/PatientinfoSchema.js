const mongoose= require("mongoose");

const schema=mongoose.Schema({
    patientid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients",
        unique:true,
        required:true,
        dropDups: true
    },
    medicalhistory:{
        type:String,
              required:true,
           },

});
module.exports=mongoose.model('patientinfo',schema)

