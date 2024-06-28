import React from 'react'
import "./Aboutuspage.css"
import img from "../../Assets/careimage.png"
import { Button } from 'bootstrap'

function Aboutuspage() {
  return (
    <div className='aboutus-page'>
        <div className='container'>
            <div className='row'>
                <div className='col-sm-6 col-md-6 col-lg-6 aboutus-page'>
                    <img src={img} alt='image' width='450px' height='400px'/>
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
  )
}

export default Aboutuspage