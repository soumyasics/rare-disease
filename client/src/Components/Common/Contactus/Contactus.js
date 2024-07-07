import React from 'react'
import "./Contactus.css"
import Footer from '../../Footer/Footer'
import img from "../../../Assets/Rectangle223.jpg"
import { Link } from 'react-router-dom'

function Contactus() {
  return (
    <div>
    <div className="patientprofile-container">
    <div className="contactus-main">
    <div className='container'>
      <Link to="/" style={{textDecoration:"none",fontSize:"20px"}}>  <div className='ri-arrow-left-line'></div></Link>
    <div className='row'>
        <div className='col-6 contactus-image'>
            <img src={img} alt='image'/>
        </div>
        <div className='col-6 '>
            <div className='contactus-content'>
            <h5>Contact Us</h5>
            <p className='contactus-contentp1'>Phone 1</p>
            <p className='ri-phone-fill'>+91886345778</p>
            <p className='contactus-contentp1'>Phone 2</p>
            <p className='ri-phone-fill'>+91886345778</p>
            <p className='contactus-contentp1'>Email</p>
            <p className='ri-mail-fill'>Rarediseaseinfo@gmail.com</p>
            <p className='contactus-contentp1'>Address</p>
            <p className='ri-map-pin-2-fill'>123, Rainbow Apartments Near Green Park Market South Extension New Delhi - 110049 India</p>
            </div>
        </div>

    </div>
        </div>
    </div>
</div>
</div>
  )
}

export default Contactus