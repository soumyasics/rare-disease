import React, { useState } from "react";
import img from "../../Assets/logor.png";
import imgprofile from "../../Assets/proicon.png";
import { Link } from "react-router-dom";
import "./Homenav.css";

function Homenav() {
  const [openDropdown, setOpenDropdown] = useState(null);

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
            <Link to="/" style={{ textDecoration: "none" }}>
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
                  <Link to="/patinet-login" style={{ textDecoration: "none",color:"black" }}>
                  <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                    Patients
                  </button>
                  </Link>
                  <Link to="/counsellor-login" style={{ textDecoration: "none",color:"black" }}>
                  <button className="dropdown-item" onClick={closeDropdown}  style={{ textDecoration: "none",color:"black" }}>
                    Counsellor
                  </button>
                  </Link>
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
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Homenav;
