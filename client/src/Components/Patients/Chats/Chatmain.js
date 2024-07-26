import React from 'react'
import { Col, Row } from 'react-bootstrap'
import main_img from '../../../Assets/chat.jpg'
import right_arrow from '../../../Assets/right-arrow.png'
import { Link } from 'react-router-dom'

function Chatmain() {
  return (
    <div>
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
                            className='patient-req-appo-col-p px-5 mt-3'>Get in touch with our counsellors chat now for any doubts we are here to help you!</p>
                            <div style={{textAlign:'center'}}>
                         <Link to="/patient-viewallcounsellororchat">  <button
                            className='patient-req-appo-btn mt-3'
                            >Chat Now <span className='ri-wechat-line' /></button></Link> </div>
                        </div>
                    </div>
                    <hr style={{maxWidth:'100vh'}}></hr>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='patient-req-appo-col-h3'>Healthcare professionals</h3>
                            <p
                            className='patient-req-appo-col-p px-5 mt-3'
                            >Get in touch with our health care professionals chat now for any rare disease doubts we are here to help you!</p>
                            <div style={{textAlign:'center'}}>
                          <Link to="/patient-viewallhporchat"> <button
                            className='patient-req-appo-btn mt-3'
                            >Chat Now <span className='ri-wechat-line' /></button></Link> 
                            </div>
                        </div>
                    </div>

                    <hr style={{maxWidth:'100vh'}}></hr>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='patient-req-appo-col-h3'>Patients</h3>
                            <p
                            className='patient-req-appo-col-p px-5 mt-3'
                            >Get in touch with other patients who suffer with rare diseases and chat now for any rare disease doubts we are here to help you!</p>
                            <div style={{textAlign:'center'}}>
                          <Link to="/patient-viewallpatientrchat"> <button
                            className='patient-req-appo-btn mt-3'
                            >Chat Now <span className='ri-wechat-line' /></button></Link> 
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>

    </div>
  )
}

export default Chatmain