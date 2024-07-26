import React, { useEffect, useRef, useState } from "react";
import img from "../../../../Assets/doctorimg.jpg";
import sent from "../../../../Assets/sent.png";
import Chatuserside from "./Chatuserside";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../Constants/Baseurl";

function Chatusermain() {
  const { id } = useParams();
  const url = axiosInstance.defaults.url;
  const patientId = localStorage.getItem("patientid");
  const [user, setUser] = useState({});

  //view user
  useEffect(() => {
    axiosInstance
      .post(`viewallpatientbyid/${id}`)
      .then((res) => {
        console.log(res);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //chat with user functionality

  const [mesg, setMesg] = useState({
    msg: "",
    fromId: patientId,
    toId: id,
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
      .post("userChatting", messageWithTimestamp)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          window.location.reload();
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

  //view chats
  const [chat, setChat] = useState({
    fromId: patientId,
    toId: id,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`viewChatBetweenUsers`, chat)
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
    <div className="">
      <div className="row container">
        <div className="col-3 viewconplaintmain">
          <Chatuserside />
        </div>
        <div className="col-9">
          <div className="chat-mainbox">
            <div className="chat-main-headbox">
              <div className="d-flex chat-mainbox-arrow">
                <div className="chat-mainbox-image d-flex">
                  <img src={`${url}/${user?.image?.filename}`} alt="Doctor" />
                  <p>{user?.name}</p>
                </div>
              </div>
            </div>
            <div className="container chat-main-cnt-scrol" ref={chatBodyRef}>
              <div className="row chat-content-all">
                {data && data.length ? (
                  data.map((message, index) => (
                    // <div className="col-12 chat-content-from">
                    <div
                      key={index}
                      className={`col-12 ${
                        message.fromId._id === mesg.fromId
                          ? "chat-content-to"
                          : "chat-content-from"
                      }`}
                    >
                      <p>{message.msg}</p>
                      <h6 style={{ textAlign: "end" }}>
                        {new Date(message?.createdAt).toLocaleTimeString()}
                      </h6>
                    </div>
                  ))
                ) : (
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

export default Chatusermain;
