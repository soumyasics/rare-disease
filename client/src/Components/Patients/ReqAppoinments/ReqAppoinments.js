import React from 'react'
import './ReqAppoinments.css'
import { Col, Row } from 'react-bootstrap'
import main_img from '../../../Assets/patient-reqapp.png'
import right_arrow from '../../../Assets/right-arrow.png'

function ReqAppoinments() {
  return (
    <>
        <section className=''>
            <div className='row patient-req-appo-main-row '>
                <div className='col patient-req-appo-main-col mx-2'>
                    <img className='patient-req-appo-img' src={main_img} />
                </div>
                <div className='col mt-5 '>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='patient-req-appo-col-h3'>Counsellors</h3>
                            <p 
                            className='patient-req-appo-col-p px-5 mt-3'>Schedule your session with our experienced counsellors by filling out the form below. We’re here to support you</p>
                            <div style={{textAlign:'center'}}>
                            <button
                            className='patient-req-appo-btn mt-3'
                            >Get Appoinment <img src={right_arrow} /></button></div>
                        </div>
                    </div>
                    <hr style={{maxWidth:'100vh'}}></hr>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='patient-req-appo-col-h3'>Healthcare professionals</h3>
                            <p
                            className='patient-req-appo-col-p px-5 mt-3'
                            >Please complete the form below to schedule an appointment with one of our healthcare professionals</p>
                            <div style={{textAlign:'center'}}>
                            <button
                            className='patient-req-appo-btn mt-3'
                            >Get Appoinment <img src={right_arrow} /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default ReqAppoinments