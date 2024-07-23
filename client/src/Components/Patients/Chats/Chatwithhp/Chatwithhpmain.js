import React from "react";
import img from "../../../../Assets/doctorimg.jpg";
import sent from "../../../../Assets/sent.png";
import Chatwithhpside from "./Chatwithhpside";

function Chatwithhpmain() {
  return (
    <div className="">
    <div className="row container">
      <div className="col-3 viewconplaintmain">
        <Chatwithhpside/>
      </div>
       <div className="col-9">
        <div className="chat-mainbox">
          <div className="chat-main-headbox">
            <div className="ri-arrow-left-line d-flex chat-mainbox-arrow">
              <div className="chat-mainbox-image d-flex">
                <img src={img} alt="Doctor"/>
                <p>Dr Vinayak</p>
              </div>
            </div>
          </div>
          <div className="container chat-main-cnt-scrol">
            <div className="row chat-content-all">
              <div className="col-12 chat-content-from">
                <p>ffffffffffffffffffffgggggggggggg</p>
                <h6 style={{ textAlign: "end" }}>10:20am</h6>
              </div>
              <div className="col-12 chat-content-to">
                <p>ffffffffffffffffffffgggggggggggg</p>
                <h6 style={{ textAlign: "end" }}>10:20am</h6>
              </div>
              <div className="col-12 chat-content-from">
                <p>ffffffffffffffffffffgggggggggggg</p>
                <h6 style={{ textAlign: "end" }}>10:20am</h6>
              </div>
              <div className="col-12 chat-content-from">
                <p>ffffffffffffffffffffgggggggggggg</p>
                <h6 style={{ textAlign: "end" }}>10:20am</h6>
              </div>
              <div className="col-12 chat-content-to">
                <p>ffffffffffffffffffffgggggggggggg</p>
                <h6 style={{ textAlign: "end" }}>10:20am</h6>
              </div>
              <div className="col-12 chat-content-to">
                <p>ffffffffffffffffffffgggggggggggg</p>
                <h6 style={{ textAlign: "end" }}>10:20am</h6>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10 msg-send-box">
              <textarea/>
            </div>
            <div className="col-2 msg-send-sent">
              <img src={sent} alt="Send"/>
            </div>
          </div>
        </div>
      </div> 
    </div>
    </div>
  )
}

export default Chatwithhpmain