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
    address:{
        type:String,
        required:true,
    },
    regno:{
        type:String,
        unique:true,
        required:true,
        dropDups: true
    },
    image:{
        type:Object,
        required: true
    },
    isActive:{
        type:Boolean,
        default:false
    }

   
});
module.exports=mongoose.model('counsellor',schema)

