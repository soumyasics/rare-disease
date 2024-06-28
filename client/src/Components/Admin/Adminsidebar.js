import React, { useEffect, useState } from "react";
import "../Admin/Adminsidebar.css";
import { Link, useNavigate } from "react-router-dom";
import imgicon from "../../Assets/adminlogin.png";
import imgreq from "../../Assets/reqest.png";
import imgpat from "../../Assets/patient.png";
import imgcoun from "../../Assets/counsellor.png";
import imghealth from "../../Assets/healthcare.png";
import imglogout from "../../Assets/logout.png";
import axiosInstance from "../Constants/Baseurl";
import Logoutpopu from "../Common/Popups/Logoutpopu";

function Adminsidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const[readerid,setReaderid]=useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("adminid");
    setReaderid(null);
    setShowModal(false);
    navigate("/admin-login")
  };

  const closeModal = () => {
    setShowModal(false);
  };


  const navigate=useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleRequestsDropdown = (e) => {
    e.stopPropagation(); 
    setIsRequestsOpen(!isRequestsOpen);
  };
  const adminid=localStorage.getItem("adminid")
  // console.log(adminid+"admin");
  // const handleLogout = () => {
  //   localStorage.removeItem("adminid");
  //   window.location.reload(); 
  // };
  useEffect(()=>{
    if(adminid===null){
      navigate("/admin-login")
    }
  },[])

  return (
    <div className="col-3">
      <div className="adminsidebar-container">
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
          <div className="adminsidebar-content">
            <div className="adminsidebar-head d-flex">
              <img src={imgicon} alt="admin" />
              <h4>ADMIN</h4>
            </div>

            <div className="sidebar-item">
              <Link to="/admin-dashboard" style={{ textDecoration: "none", color: "white" }}>
                Dashboard
              </Link>
            </div>
            <div className="sidebar-item" onClick={toggleRequestsDropdown}>
              <img src={imgreq} alt="requests" />
              <span className="adminsidebar-reqimg">Requests</span>
              {isRequestsOpen && (
                <div className="admindrop-main" onClick={(e) => e.stopPropagation()}>
                  <Link to="/admin-counsellorreq" style={{ textDecoration: "none", color: "white" }}><div className="dropdown-item">Counsellor Request</div></Link>
                  <Link to="/admin-hprequest" style={{ textDecoration: "none", color: "white" }}><div className="dropdown-item">Hcp Request</div></Link>
                 
                  </div>
                // <div className="dropdown-menu">
                //   <div className="dropdown-item">Counsellor Request</div>
                //   <div className="dropdown-item">HCP Request</div>
                // </div>
              )}
            </div>
            <div className="sidebar-item">
              <img src={imgpat} alt="patients" />
              <span className="adminsidebar-reqimg">Patients</span>
            </div>
            <div className="sidebar-item">
              <img src={imgcoun} alt="counsellor" />
              <span className="adminsidebar-reqimg">Counsellor</span>
            </div>
            <div className="sidebar-item">
              <img src={imghealth} alt="healthcare" />
              <span className="adminsidebar-reqimg">Health Care Professionals</span>
            </div>
            <div className="sidebar-item">
              <img src={imglogout} alt="logout" />
              <span className="adminsidebar-reqimg" onClick={handleLogout}>Logout</span>
              <Logoutpopu show={showModal} onClose={closeModal} onConfirm={confirmLogout} />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Adminsidebar;
