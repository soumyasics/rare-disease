import React, { useEffect, useRef, useState } from "react";
import img from "../../../../Assets/doctorimg.jpg";
import sent from "../../../../Assets/sent.png";
import Chatwithhpside from "./Chatwithhpside";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../Constants/Baseurl";

function Chatwithhpmain() {
  const { id } = useParams();
  const navigate = useNavigate();
  const navbackfn = () => {
    navigate(-1);
  };
  const url = axiosInstance.defaults.url;
  const patientId = localStorage.getItem("patientid");
  const [hp, setHp] = useState({});

  const [mesg, setMesg] = useState({
    msg: "",
    from: "userId",
    hpId: id,
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
    axiosInstance.post(`viewhpbyid/${id}`)
      .then((res) => {
        setHp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // Chat viewing API
  const [chat, setChat] = useState({
    patientId: patientId,
    hpId: id,
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
  
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [data]);


  return (
    <div
      className=""
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <div className="row">
        <div className="col-12">
          <div className="chat-mainbox">
            <div className="chat-main-headbox">
              <div className="ri-arrow-left-line d-flex chat-mainbox-arrow" onClick={navbackfn}>
                <div className="chat-mainbox-image d-flex">
                  <img src={`${url}/${hp?.image?.filename}`} alt="Doctor" />
                  <p>Dr {hp?.name}</p>
                </div>
              </div>
            </div>
            <div className="container chat-main-cnt-scrol" ref={chatBodyRef}>
              <div className="row chat-content-all">
              {data&&data.length?(
                data.map((message, index) => (
                  <div
                    key={index}
                    className={`col-12 ${message.from === mesg.from ? "chat-content-to" : "chat-content-from"}`}
                  >
                    <p>{message.msg}</p>
                    <h6 style={{ textAlign: "end" }}>{new Date(message?.createdAt).toLocaleTimeString()}
                    </h6>
                  </div>
                ))):(
                  <div className="viewcounsellor-lottiereqq">Start Chat</div>

                )}
              </div>
            </div>
            <div className="row msg-send mt-auto">
              <div className="col-10 msg-send-box">
                <textarea name="msg" value={mesg.msg} onChange={handleChange} />
              </div>
              <div className="col-2 msg-send-sent">
                <img src={sent} alt="Send" onClick={handlemsgSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatwithhpmain;
