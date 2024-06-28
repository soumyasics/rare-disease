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
    gender:{
        type:String,
        require:true
    },
    dob:{
        type:String,
        require:true  
    },
    country:{
        type:String,
        require:true  
    },
    city:{
        type:String,
        require:true  
    },
    diseaseinfo:{
        type:String,
        require:true  
    },
    password:{
        type:String,
        required:true
    },
    usertype:{
        type:String,
        require:true
    },
    image:{
        type:Object,
        required: true
    },
    healthrecord:{
        type:Object,
        required:true
    }

   
});
module.exports=mongoose.model('patients',schema)

