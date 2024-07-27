import React, { useRef } from 'react'
import "./Homepage.css"
import img from "../../Assets/homepage.jpg"
import Homepage2 from './Homepage2'
import Aboutuspage from './Aboutuspage'
import Footer from '../Footer/Footer'
import imgant from "../../Assets/careimage.png"


function Homepage() {
    const aboutUsRef = useRef(null);

    const scrollToAboutUs = () => {
      aboutUsRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    
  return (
    // <div className='homepage-first'>
    <div className='homepage-first-box'>
        <div className='container'>
            <div className='row'>
            <div className='homepage-first-box-contain row'>
                <div className='col-sm-6 col-md-6 col-lg-6 homepage-firsts-conatain'>
                    <p><span id='span1'>We have a </span> 
                    <span id='span2'>Beautiful <br/> & Rare</span> 
                     <span id='span3'> Chance</span></p>
                     <h6>RARE CARE advances practical, meaningful, and enduring change so people with
                         rare diseases can live their fullest and best lives. Every day, we elevate care, advance research,
                         and drive policy in a purposeful and holistic manner to lift up the rare disease community.</h6>
                </div>
                <div className='col-sm-6 col-md-6 col-lg-6 homepage-first-conatain'>
                    <img src={img} alt='image' width='650px' height='400px' style={{objectFit:"cover"}} />
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12 homepage-first-content'>
                    <h5>Find Resources</h5>
                    <hr />
                    <p>You or a loved one has received a diagnosis. Now what? Gaining knowledge, connecting with advocacy 
                        organizations, and learning about<br/>
                         treatment at places like the Centers for Excellence are the next steps.</p>
                </div>

            </div>
            <Homepage2/>
            <div id="about-us-section" ref={aboutUsRef}>
            {/* <Aboutuspage/> */}
            <div className='aboutus-page'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-6 col-md-6 col-lg-6 aboutus-page'>
                    <img src={imgant} alt='image' width='450px' height='400px'/>
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
            </div>
            <div>
                
            </div>

        </div>

    </div>
    <Footer/>

     </div>
  )
}

export default Homepage