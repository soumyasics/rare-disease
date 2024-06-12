const mongoose= require("mongoose");

const schema=mongoose.Schema({
    name:{
        type:String,
              required:true,
           },
    phone:{
        type:String,
        unique:true,
        required:true,
        dropDups: true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        dropDups: true
    },
    password:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },

    licenceno:{
        type:String,
        unique:true,
        required:true,
        dropDups: true
    },
    aadharno:{
        type:String,
        unique:true,
        required:true,
        dropDups: true
    },
    yearofexp:{
        type:String,
        required:true,
    },
    image:{
        type:Object,
        required: true
    },
    specialisation:{
        type:String,
        required:true
    }

   
});
module.exports = mongoose.model('hp', schema);

