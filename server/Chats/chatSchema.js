const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      
    },
    from: {
      type: String,
      required: true,
    },
    to:{
      type: String,
      required: true,
    },
    patientId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "patients"
    
    },
  
    hpId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "hp"
    
    },
    councellorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "counsellor"
    
    },
   date:{
      type: Date,
      required: true,
    }

  },
  { timestamps: true }
);

const Message = mongoose.model("chats", messageSchema);

module.exports = Message;
