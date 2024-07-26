import React, { useEffect, useRef, useState } from "react";
import img from "../../../Assets/doctorimg.jpg";
import sent from "../../../Assets/sent.png";
import Viewrecepiants from "./Viewrecepiants";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";

function Chatwithpatient() {
  const {id}=useParams()
  const hpidid=localStorage.getItem("healthcareid")
  const navigate=useNavigate()

  const [mesg, setMesg] = useState({
    msg: "",
    from: "hpId",
    hpId: hpidid,
    patientId: id,
    createdAt: new Date().toISOString(), 

  });

  const handleChange = (e) => {
    setMesg({
      ...mesg,
      [e.target.name]: e.target.value,
    });
  };
  console.log(mesg);

  const handlemsgSubmit = () => {
    const messageWithTimestamp = {
      ...mesg,
      createdAt: new Date().toISOString(), 
    };

    axiosInstance
      .post("chat", messageWithTimestamp)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          setData((prevData) => [...prevData, messageWithTimestamp]);
          setMesg({
            ...mesg,
            msg: "",
            createdAt: new Date().toISOString(), 

          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
const navbackfn=(()=>{
  navigate(-1)
})

  // Chat viewing API
  const [chat, setChat] = useState({
    patientId: id,
    hpId: hpidid,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.post(`viewChatBetweenuserandHp`, chat)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chat]);
//viewing patient details
const [patient,setPatient]=useState({})

useEffect(()=>{
  axiosInstance.post(`viewallpatientbyid/${id}`)
  .then((res) => {
    console.log(res);
    setPatient(res.data.data);
  })
  .catch((err) => {
    console.log(err);
  });

},[])

const chatBodyRef = useRef(null);

useEffect(() => {
  if (chatBodyRef.current) {
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }
}, [data]);


  return (
    <div className=""
    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
    <div className="row ">
      {/* <div className="col-3 viewconplaintmain">
        <Viewrecepiants />
      </div> */}
       <div className="col-9">
        <div className="chat-mainbox">
          <div className="chat-main-headbox">
            <div className="ri-arrow-left-line d-flex chat-mainbox-arrow" onClick={navbackfn}>
              <div className="chat-mainbox-image d-flex">
                <img src={img} alt="Doctor"/>
                <p>{patient?.name}</p>
              </div>
            </div>
          </div>
          <div className="container chat-main-cnt-scrol">
            <div className="row chat-content-all">

            {data&&data.length?(
                data.map((message, index) => (

              // <div className="col-12 chat-content-from">
              <div
              key={index}
              className={`col-12 ${message.from === mesg.from ? "chat-content-to" : "chat-content-from"}`}
            >

                <p>{message.msg}</p>
                <h6 style={{ textAlign: "end" }}>{new Date(message?.createdAt).toLocaleTimeString()}</h6>
              </div>
                ))):(
                  <div className="viewcounsellor-lottiereqq">Start Chat</div>

                )}


            </div>
          </div>
          <div className="row msg-send mt-auto" ref={chatBodyRef}>
            <div className="col-10 msg-send-box">
              <textarea name="msg" value={mesg.msg} onChange={handleChange}/>
            </div>
            <div className="col-2 msg-send-sent">
              <img src={sent} alt="Send" onClick={handlemsgSubmit}/>
            </div>
          </div>
        </div>
      </div> 
    </div>
    </div>
  );
}

export default Chatwithpatient;
