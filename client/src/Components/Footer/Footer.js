import React from "react";
import "./Footer.css";
import img from "../../Assets/hearbeat.png"

function Footer() {
  return (
    <div className="mainclass">
      <div className="container">

      <div className="row">
        {/* <div className="col-12 md-6"> */}
          <div>
            {/* <div className="row"> */}
              {/* <div className="col-6 md-4 footer-text2">
                <p>
                  {" "}
                  <span className="text2">Online disaster</span>
                  <br />
                  <span className="text3">
                    Stay vigilant online. Guard against e-
                    <br />
                    <span style={{ paddingLeft: "40px" }}>
                      disasters. #StaySafeOnline .
                    </span>{" "}
                  </span>
                </p>
              </div> */}
              {/* <div className="col-6 md-4 footer-text3 ">
                <p>Platform</p>
                <br />
                <p>Incident Management</p>
                <br />
                <p>Crisis Communication</p>
                <br />
                <p>Emergency Responce</p>
                <br />
              </div> */}
            {/* </div> */}
            <div className="row ">
            <div className="col-4 about-contenthelp ">
              <p><i>Help.</i><br/>
              <img src={img}/><br/>
              Contact Us<br/>
              FAQ<br/>
              Accessibility
              </p>
            </div>
            <div className="col-4 about-contenthelp ">
              <p>Privacy Policy<br/>
              <img src={img}/><br/>
              Privacy<br/>
              Terms And Conditions
              </p>
            </div>
            <div className="col-4 about-contenthelp ">
              <p>Contact Now<br/>
              <img src={img}/><br/>
              <span className="ri-mail-line"> Email</span><br/>
              <span className="ri-whatsapp-line"> +919889988998</span><br/>
              </p>
            </div>


            {/* </div> */}
          </div>
          <p className="text-center ri-copyright-line abpout-copy">2024 Copyright</p>
        </div>
                
      </div>
      </div>
    </div>
  );
}

export default Footer;
