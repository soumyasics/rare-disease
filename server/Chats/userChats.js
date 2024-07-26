const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      
    },
  

     fromId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients"
    
    },
    toId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients"
    
    },
 

  },
  { timestamps: true }
);

const Message = mongoose.model("userchats", messageSchema);

module.exports = Message;
