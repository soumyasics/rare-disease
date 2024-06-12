import React from "react";
import "./Homepage2.css";
import img from "../../Assets/support.png";
import img2 from "../../Assets/research.png";
import img3 from "../../Assets/hospital-building.png";
import img4 from "../../Assets/code.png";

function Homepage2() {
  return (
    <div className="home-two">
      <div className="container">
        <div className="row">
          <div className="col-sm-3  col-md-2 col-lg-3 homecount-main">
            <div className="homecount-box">
                <h3 className="text-center">15K +</h3>
                <p>ACTIVE <br/>PATIENTS</p>
            </div>
          </div>
          <div className="col-sm-3  col-md-2 col-lg-3 homecount-main">
            <div className="homecount-box">
            <h3 className="text-center">13K +</h3>
                <p>ACTIVE <br/>CAREGIVERS</p>     
            </div>
          </div>
          <div className="col-sm-3  col-md-2 col-lg-3 homecount-main">
            <div className="homecount-box">
            <h3 className="text-center">10K +</h3>
                <p>ACTIVE <br/>COUNSELOR</p>
            </div>
          </div>
          <div className="col-sm-3  col-md-2 col-lg-3 homecount-main">
            <div className="homecount-box">
            <h3 className="text-center">12K +</h3>
                <p>ACTIVE <br/>HEALTHCARE PROFESSIONALS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage2;
