const mongoose= require("mongoose");

const schema=mongoose.Schema({
    title:{
        type:String,
              required:true,
           },
    author:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true,
    },
    image:{
        type:Object,
        required: true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    counsellorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "counsellor",
    },

   
});
module.exports=mongoose.model('blog',schema)

