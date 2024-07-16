import React from 'react'
import './ViewHcpList.css'
import {AiFillStar } from "react-icons/ai"
function ViewHcpList() {
  return (
    <>
        <section className='patient-viewhcplist'>
            <div className='container '>
                <div className='patient-viewhcplist-con pt-2' >
                    <h2 style={{color:'#0A5377',fontWeight:'700',fontSize:'50px'}}>Health Care Professionals</h2>
                </div>
                <div className='mt-5'>
                    <div className='row patient-viewhcplist-head '>
                        <div className='col'><h4>Name</h4></div>
                        <div className='col'><h4>Email Id</h4></div>
                        <div className='col'><h4>Designation</h4></div>
                        <div className='col'><h4>No Of Patients</h4></div>
                        <div className='col'><h4>Ratings</h4></div>
                    </div>
                    <div className='row mt-3 '>
                        <div className='col'><p>Shaihin</p></div>
                        <div className='col'><p>shaihin@gmail.com</p></div>
                        <div className='col'><p>MD</p></div>
                        <div className='col'><p>26</p></div>
                        <div className='col'><p><AiFillStar/></p></div>
                    </div>
                    <div className='row mt-3 '>
                        <div className='col'><p>Shaihin</p></div>
                        <div className='col'><p>shaihin@gmail.com</p></div>
                        <div className='col'><p>MD</p></div>
                        <div className='col'><p>26</p></div>
                        <div className='col'><p><AiFillStar/></p></div>
                    </div>
                    <div className='row mt-3 '>
                        <div className='col'><p>Shaihin</p></div>
                        <div className='col'><p>shaihin@gmail.com</p></div>
                        <div className='col'><p>MD</p></div>
                        <div className='col'><p>26</p></div>
                        <div className='col'><p><AiFillStar/></p></div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default ViewHcpList