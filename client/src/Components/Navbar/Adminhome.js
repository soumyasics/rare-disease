import React from 'react'
import "../Navbar/Adminhome.css"
import { Link } from 'react-router-dom'
import img from "../../Assets/logor.png";


function Adminhome() {
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
          {/* <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            <p className="nav-item">Home</p>
          </Link>
          <Link to="/aboutus"
            // onClick={handleAboutClick}
           style={{ textDecoration: "none" }}>
            {" "}
            <p className="nav-item">About</p>
          </Link>
          <p className="nav-item">Contact Us</p>

          <div className=" image-profilelicon">
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
                <Link to="/admin-login" style={{ textDecoration: "none",color:"black" }}>
                  {" "}
                  <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                    Admin
                  </button>
                </Link>
                <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                  Patients
                </button>
                <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                  Counselor
                </button>
                <Link
                  to="/health-login"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                    Health Care Professionals
                  </button>
                </Link>
              </div>
            )}
          </div>*/}
           <div className=" image-profilelicon searchnav-adminhomemain">
           <div className="search-containeradminnav">
        <i className="ri-search-line"></i>
        <input type="text" className="search-inputadminnav" placeholder="Search"/>
    </div>         
      </div>
        </div> 
      </div>
    </nav>
  </div>

  )
}

export default Adminhome