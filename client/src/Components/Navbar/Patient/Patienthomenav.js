import React, { useState } from 'react'
import img from "../../../Assets/logor.png";
import imgprofile from "../../../Assets/proicon.png";
import { Link, useNavigate } from "react-router-dom";
import "../Homenav.css";
import Logoutpopu from '../../Common/Popups/Logoutpopu';


function Patienthomenav() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const[readerid,setReaderid]=useState(null);
    const [showModal, setShowModal] = useState(false);
  
    const handleLogout = () => {
      setShowModal(true);
    };
  const navigate=useNavigate()

    const confirmLogout = () => {
      localStorage.removeItem("patientid");
      setReaderid(null);
      setShowModal(false);
      navigate("/patinet-login")
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  
  

    const toggleDropdown = (dropdown) => {
      setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };
  
    const closeDropdown = () => {
      setOpenDropdown(null);
    };
  
    const handleAboutClick = () => {
      const aboutUsSection = document.getElementById('about-us-section');
      aboutUsSection.scrollIntoView({ behavior: 'smooth' });
    };
  
  return (
    <div class="container-fluid ">
    <nav class="navbar navbar-expand-lg user_navbar ">
      <div class="container ">
        <a class="navbar-brand" href="#">
          <img
            src={img}
            alt="logo"
            width="189px"
            height="104px"
            style={{ borderRadius: "50px" }}
          />
        </a>

        <div className="header-boxcontain d-flex">
          <Link to="/patient-home" style={{ textDecoration: "none" }}>
            {" "}
            <p className="nav-item">Home</p>
          </Link>
          <Link to=""
            // onClick={handleAboutClick}
           style={{ textDecoration: "none" }}>
            {" "}
            <p className="nav-item">About</p>
          </Link>
          <Link to="/patient-counsellorappoinment"
            // onClick={handleAboutClick}
           style={{ textDecoration: "none" }}>
          <p className="nav-item">Counsellors</p></Link>
          <Link to="/patient-hcpappoinment"
           style={{ textDecoration: "none" }}> <p className="nav-item">HCP</p></Link>
         <Link to="/patient-viewblogs"
           style={{ textDecoration: "none" }}>  <p className="nav-item">Blogs</p></Link>

          <div className=" image-profilelicon" style={{paddingLeft:"300px"}}>
            <img
              src={imgprofile}
              className={`dropdown-button ${
                openDropdown === "dropdown1" ? "active" : ""
              }`}
              onClick={() => toggleDropdown("dropdown1")}
            />
            <i
              className={`${
                openDropdown === "dropdown1" ? "up" : "down"
              }-s-line`}
            ></i>
            {openDropdown === "dropdown1" && (
              <div className="dropdown-content">
                <Link  style={{ textDecoration: "none",color:"black" }}>
                  {" "}
                  <button className="dropdown-item" onClick={handleLogout} style={{ textDecoration: "none",color:"black" }}>
                    Logout
                  </button>
                </Link>
                <Logoutpopu show={showModal} onClose={closeModal} onConfirm={confirmLogout} />
                <Link to="/patient-info" style={{ textDecoration: "none",color:"black" }}>
                <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                  Health Record
                </button>
                </Link>

                <Link to="/patient-viewhrappoinment" style={{ textDecoration: "none",color:"black" }}>
                <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                  View Hp Appoinment Status
                </button>
                </Link>
                <Link to="/patient-viewcounsellorappoinment" style={{ textDecoration: "none",color:"black" }}>
                <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                  View Counsellor Appoinment Status
                </button>
                </Link>

                <Link to="/patient-viewprofile" style={{ textDecoration: "none",color:"black" }}>
                <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                  Profile
                </button>

                </Link>
                {/* <Link to="/" style={{ textDecoration: "none",color:"black" }}>
                <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                  Counsellor
                </button>
                </Link> */}
                {/* <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                    Health Care Professionals
                  </button>
                </Link> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  </div>

  )
}

export default Patienthomenav