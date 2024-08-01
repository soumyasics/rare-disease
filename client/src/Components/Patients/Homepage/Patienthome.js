import React from "react";
import "../Homepage/Patienthome.css";
import img from "../../../Assets/imagegroup.jpg";
import img1 from "../../../Assets/doctor1.jpg";
import img2 from "../../../Assets/doctor2.jpg";
import img3 from "../../../Assets/doctor3.png";
import Aboutuspage from "../../Common/Aboutuspage";
import Footer from "../../Footer/Footer";
import { useNavigate } from "react-router-dom";
import imgabt from "../../../Assets/careimage.png"

function Patienthome() {
    const navigate=useNavigate()
    const navfn=(()=>{
        navigate("/patient-reqappoinments")
    })
  return (
    <>
      <div className="patient-homecontainer">
        <div className="patient-homebackgroundtext">
          <p>
            Connect with others who understand your <br />
            journey. Join Rare Care today and find
            <br /> your support network.
          </p>

          <button type="submit" onClick={navfn}>
            Book Appoinment<span className="ri-arrow-right-line"></span>{" "}
          </button>
        </div>
      </div>
      <div className="patient-homecontainersecond">
        <p>Welcome To Rare Care</p>
        <hr className="horizondal-width" />
        <div className="patient-homecontainersecondpara">
          At Rare Care, we are dedicated to supporting patients with rare
          diseases. Our platform connects you with a community of individuals
          who share similar experiences and provides access to specialized
          counsellors and healthcare professionals. Together, we can navigate
          the challenges of rare diseases and find the care and support you
          need.
        </div>
        <div className="container patient-homecontainerthird-container">
          <div className="patient-homecontainerthird row">
            <div className="col-3">
              <img src={img} alt="images" />
            </div>
            <div className="col-9 patient-homecontainerthird-head">
              <h5>Join Our Community</h5>
              
              <p>
                Welcome to Rare Care, where individuals with rare diseases find
                understanding, support, and a community dedicated to their
                well-being. Joining our community means becoming part of a
                network that values empathy, knowledge-sharing, and collective
                strength in facing the challenges of rare diseases. 
                <br/><br/><br/>
                At Rare
                Care, we recognize the unique journey of each person affected by
                a rare disease. Whether you're a patient, caregiver, or
                healthcare professional, our community offers a safe space to
                connect, learn, and grow together.
              </p>
            </div>
          </div>
        </div>
        <div className="container patient-homecontainerforth">
        <h4>Services</h4>
        <div className="d-flex patient-rectangle-main">
            <div className="patient-headrectangle1">
                <img src={img1} alt="image1"/>
                <h3>Patients</h3>
            </div>
            <div className="patient-headrectangle1">
                <div className="patient-headimage2">
            <img src={img2} alt="image1"/>
                <h3>Counsellors</h3>
                </div>
            </div>
            <div className="patient-headrectangle1">
            <img src={img3} alt="image1"/>
                <h3>HCP</h3>
            </div>

        </div>
        </div>
      </div>
      {/* <Aboutuspage/> */}
      <div className='aboutus-page'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-6 col-md-6 col-lg-6 aboutus-page'>
                    <img src={imgabt} alt='image' width='450px' height='400px'/>
                </div>
                <div className='col-sm-6 col-md-6 col-lg-6 aboutus-page'>
                    <div className='aboutus-head'>
                       <i>About Us</i> 
                    </div><hr/>
                    <div className='aboutus-page'>
                        <p>At rare care, we are dedicated to empowering and supporting individuals and families affected by rare diseases. Our goal is to be a comprehensive and 
                            reliable resource for the rare disease community, offering up-to-date information, emotional support, and advocacy.<br></br><br></br>
                        {/* <i className='about-question'>How Rare care Can Help You?</i><br/> */}
                        Rrare care is a non-profit organization, who were personally affected by [specific rare disease or general
                         rare diseases]. Recognizing the urgent need for
                         support and information, we set out to create a community where patients, families, and healthcare professionals could 
                         connect and find hope.<br></br><br/>Thank you for visiting rare care. Together, we can make a difference in the lives of those affected by rare diseases.</p>
                    </div>
                </div>
                
            </div>

        </div>
    </div>
      <Footer/>
    </>
  );
}

export default Patienthome;
