import React, { useEffect, useRef, useState } from "react";
import img from "../../../../Assets/doctorimg.jpg";
import sent from "../../../../Assets/sent.png";
import Counsellorchatsidebar from "./Counsellorchatsidebar";
import axiosInstance from "../../../Constants/Baseurl";
import { useNavigate, useParams } from "react-router-dom";

function Counsellorchat() {


  const { id } = useParams();
  const navigate = useNavigate();
  const navbackfn = () => {
    navigate(-1);
  };
  const url = axiosInstance.defaults.url;
  const patientId = localStorage.getItem("patientid");
  const [counsellor, setCounsellor] = useState({});

  const [mesg, setMesg] = useState({
    msg: "",
    from: "userId",
    councellorId: id,
    patientId: patientId,
    createdAt: new Date().toISOString(), 
  });

  const handleChange = (e) => {
    setMesg({
      ...mesg,
      [e.target.name]: e.target.value,
    });
  };

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

  // View hp
  useEffect(() => {
    axiosInstance.post(`viewcouncellorbyid/${id}`)
      .then((res) => {
        setCounsellor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Chat viewing API
  const [chat, setChat] = useState({
    patientId: patientId,
    councellorId: id,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance.post(`viewChatBetweenuserandCouncellor`, chat)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chat]);

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
        <Counsellorchatsidebar/>
      </div> */}
       <div className="col-9">
        <div className="chat-mainbox">
          <div className="chat-main-headbox">
            <div className="ri-arrow-left-line d-flex chat-mainbox-arrow" onClick={navbackfn}>
              <div className="chat-mainbox-image d-flex">
                <img src={`${url}/${counsellor?.image?.filename}`} alt="Doctor"/>
                <p>{counsellor?.name}</p>
              </div>
            </div>
          </div>
          <div className="container chat-main-cnt-scrol" ref={chatBodyRef}>
            <div className="row chat-content-all">

            {data&&data.map?(
            data.map((message, index) => (
                  <div
                    key={index}
                    className={`col-12 ${message.from === mesg.from ? "chat-content-to" : "chat-content-from"}`}
                  >
                <p>{message.msg}</p>
                <h6 style={{ textAlign: "end" }}>{new Date(message?.createdAt).toLocaleTimeString()}</h6>
              </div>
                ))):(
                  <div>Start the conversation</div>
                )}


            </div>
          </div>
          <div className="row msg-send mt-auto">
            <div className="col-10 msg-send-box">
              <textarea name="msg" value={mesg.msg} onChange={handleChange}/>
            </div>
            <div className="col-2 msg-send-sent">
              <img src={sent} alt="Send" onClick={handlemsgSubmit} />
            </div>
          </div>
        </div>
      </div> 
    </div>
    </div>
  )
}

export default Counsellorchat