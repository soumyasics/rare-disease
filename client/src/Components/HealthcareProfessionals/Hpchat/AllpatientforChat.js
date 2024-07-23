import React from "react";
import img from "../../../Assets/doctorimg.jpg";
import { Link, useNavigate } from "react-router-dom";

function AllpatientforChat() {
    const navigate=useNavigate()
    const navbackfn=(()=>{
        navigate(-1)
    })
  return (
    <>
    <div className="view-chat-allcounse-container">
      <div className=" chatviewallcounsellor-search d-flex">
        <div className="chatviewallcounsellor-head" onClick={navbackfn}>
          <p className="ri-arrow-left-line">Chat</p>
        </div>
        <div
          className=" searchnav-adminhomemain"
          style={{ marginLeft: "auto" }}
        >
          <div className="search-containeradminnav">
            <i className="ri-search-line"></i>
            <input
              type="text"
              className="search-inputadminnav"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <div className="container chatviewallcounsellor-content">
        <div className="row chatviewallcounsellor-chead">
          <div className="col-3">
            <h6>Name</h6>
          </div>
          <div className="col-3">
            <h6>Care giver/Patient</h6>
          </div>
          <div className="col-3">
            <h6>disease information</h6>
          </div>
          <hr className="chat-viewco-hr" />



          <div className="col-3">
            <p>
              <img src={img} /> Name
            </p>
          </div>
          <div className="col-3">
            <p>Registration No</p>
          </div>
          <div className="col-3">
            <p>Address</p>
          </div>
          <div className="col-3">
         <Link to=""> <button type="button">Chat</button></Link>  
          </div>



          
        </div>
      </div>
    </div>
</>
  )
}

export default AllpatientforChat