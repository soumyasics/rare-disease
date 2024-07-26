const chat = require("./chatSchema");
const userchat = require("./userChats");

const chatting = async (req, res) => {
  // Create a new message
  const message = new chat({
    msg: req.body.msg,
    from: req.body.from,
    hpId: req.body.hpId,
    patientId: req.body.patientId,
    councellorId: req.body.councellorId,

    date: new Date(),
  });
  await message
    .save()

    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

// const viewChatRecipientsforUserById = (req, res) => {
//   let uniqueUsers=[],support=false
//   chat
//     .find({ $or:[{fromId:req.params.id},{toId:req.params.id}]})
//     .populate("fromId toId")
  

//     .exec()
//     .then((data) => {
//       // console.log(data);
//       if (data.length > 0) {
//         let users = []
//         data.map((x) => {
//           if(x.fromId || x.toId){
        
//           users.push(x.fromId);
        
//           users.push(x.toId);
//             }
          
//         if(x.from=="support" || x.to=="support")
//           support=true
//         });
//         if(users.length>0)
//          users = [...new Set(users)]
       

//         res.json({
//           status: 200,
//           msg: "Data obtained successfully",
//           users: users,
//         support:support
//         });
//       } else {
//         res.json({
//           status: 200,
//           msg: "No Data obtained ",
//         });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({
//         status: 500,
//         msg: "Data not Inserted",
//         Error: err,
//       });
//     });
// };
// const viewChatRecipientsforUserId = (req, res) => {
//   chat
//     .find({ userId: req.params.id })
//     .populate("advId")
//     .exec()
//     .then((data) => {
//       if (data.length > 0) {
//         adv = [];
//         data.map((x) => {
//           adv.push(x.advId);
//         });
//         const uniqueAdvs = [...new Set(adv)];
//         res.json({
//           status: 200,
//           msg: "Data obtained successfully",
//           data: uniqueAdvs,
//         });
//       } else {
//         res.json({
//           status: 200,
//           msg: "No Data obtained ",
//         });
//       }
//     })
//     .catch((err) => {
//       res.json({
//         status: 500,
//         msg: "Data not Inserted",
//         Error: err,
//       });
//     });
// };



const viewChatRecipientsforUserById = (req, res) => {
  let hp=[],coun=[]

  chat
    .find({  patientId: req.params.id })
    .populate("councellorId hpId")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        let users = [];
        data.forEach((x) => {
          if (x.councellorId) {
            coun.push(x.councellorId);
          }
          
          if (x.hpId) {
            hp.push(x.hpId);
          }
         
        });

        // Remove duplicates
        hp = hp.filter((user, index, self) =>
          index === self.findIndex((t) => t._id.toString() === user._id.toString())
        );
        coun = coun.filter((user, index, self) =>
          index === self.findIndex((t) => t._id.toString() === user._id.toString())
        );
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          hp: hp,
          counsellors: coun,
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained",
          hp: [],
          counsellors: [],
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not obtained",
        error: err,
      });
    });
};


const viewChatBetweenuserandHp = (req, res) => {
  let patientId = req.body.patientId;
  let hpId = req.body.hpId;
  console.log("hpId",hpId);
  chat
    .find({
      // $or: [{
        hpId: hpId, patientId: patientId },
        // { rpid: parentid, parentid: rpid },
      // ],}
    )
    .sort({ date: 1 })
    .populate('patientId')
    .populate('hpId')
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "got it successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};

const viewChatBetweenuserandCouncellor = (req, res) => {
  let patientId = req.body.patientId;
  let councellorId = req.body.councellorId;
  console.log("hpId",councellorId);
  chat
    .find({
      // $or: [{
        councellorId: councellorId, patientId: patientId },
        // { rpid: parentid, parentid: rpid },
      // ],}
    )
    .sort({ date: 1 })
    .populate('patientId')
    .populate('councellorId')
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "got it successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};





//User Chats


const userChatting = async (req, res) => {
  // Create a new message
  const message = new userchat({
    msg: req.body.msg,
       fromId: req.body.fromId,
    toId: req.body.toId,
  });
  await message
    .save()

    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};



const viewChatBetweenUsers = (req, res) => {
  let fromId = req.body.fromId;
  let toId = req.body.toId;
  console.log(fromId,toId);
  userchat
    .find({
      $or: [
        {
          fromId: fromId,
          toId: toId,
        },
        { fromId: toId, toId: fromId },
      ],
    })
    .sort({ createdAt: 1 })
    .populate("fromId")
    .populate("toId")
    .exec()

    .then((data) => {
      res.json({
        status: 200,
        msg: "got it successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};


const viewChatRecipientsforUserByUserId = (req, res) => {
  let users=[]

  userchat
    .find({ $or: [{ fromId: req.params.id }, { toId: req.params.id }] })
    .populate("fromId toId")
    .exec()
    .then((data) => {
      if (data.length > 0) {
        let users = [];
        data.forEach((x) => {
          if (x.fromId && x.fromId._id.toString() !== req.params.id) {
            users.push(x.fromId);
          }
          if (x.toId && x.toId._id.toString() !== req.params.id) {
            users.push(x.toId);
          }
          
        });

        // Remove duplicates
        users = users.filter((user, index, self) =>
          index === self.findIndex((t) => t._id.toString() === user._id.toString())
        );

        res.json({
          status: 200,
          msg: "Data obtained successfully",
          users: users
        });
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained",
          users: []
          
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not obtained",
        error: err,
      });
    });
};



module.exports = {
  chatting,
  // viewChatBetweenUsers,
  viewChatBetweenuserandHp,
  viewChatBetweenuserandCouncellor,
  viewChatRecipientsforUserById,

  userChatting,
viewChatRecipientsforUserByUserId,
viewChatBetweenUsers
};
