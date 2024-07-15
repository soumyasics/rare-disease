import React, { useEffect, useState } from 'react'
import "../../Counsellor/Dashboard/Counsellordash.css"
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'
import Lottie from "lottie-react"
import lottieimg from "../../../Assets/lottienodataanimation.json"
import lottieimg2 from "../../../Assets/lottiedata2.json"



function Counsellordashboard() {
  const [data,setData]=useState([])
  const id=localStorage.getItem("counsellorlogin")
  const navigate=useNavigate()
  const [patient,setPatient]=useState([])
  const [counsellor,setCounsellor]=useState([])
  const [hp,setHp]=useState([])



  useEffect(()=>{
      if(id===null){
          navigate("/")
      }
      axiosInstance.post(`viewallpatients`)
      .then((res)=>{
        console.log(res);
        setPatient(res.data.data)
      })
      .catch((err)=>{
        console.log(err);
      })
      axiosInstance.post(`viewallcounsellor`)
      .then((res)=>{
        console.log(res);
        setCounsellor(res.data.data)
      })
      .catch((err)=>{
        console.log(err);
      })
      axiosInstance.post(`viewallhp`)
      .then((res)=>{
        console.log(res);
        setHp(res.data.data)
      })
      .catch((err)=>{
        console.log(err);
      })
  },[])

  const fetchCounsellorRequests = () => {
      axiosInstance.post(`viewBookingByCounsellorid/${id}`)
      .then((res)=>{
          console.log(res);
          setData(res.data.data)
      })
      .catch((err)=>{
          console.log(err);
      })
};
useEffect(() => {
  fetchCounsellorRequests();
}, []);

  return (
    <div className="col-9 counsellordash-main">
            <div className="admindash">
        <header className="Admindash-header">
          <div className="stats">
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">{patient?.length}</div>
              </div>
              <div className="stat-label">Total Patients</div>
            </div>
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">{hp?.length}</div>
              </div>
              <div className="stat-label">Total Health Care Professionals</div>
            </div>
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">{counsellor?.length}</div>
              </div>
              <div className="stat-label">Total Counsellors</div>
            </div>
          </div>
          {/* <h2 className="admindash-headh2">Recent Request</h2> */}
        </header>

        <div className="counsellordash-counsellor">
          <div className="admindash-shrink">Appointments</div>
          <div className="row d-flex">
            {data && data.length ? (
              data.slice(0, 3).map((a) => {
                return (
                  <div  className="col-4 counsellordash-counsellorcount">
                    <div className="counsellor-dashdetails row d-flex">
                      <div className="col-2">
                        <p>Name</p>
                        <p>Gender</p>
                        <p>Date</p>
                        <p style={{width:"100px"}}>Time Slot</p>

                      </div>
                      <div className="col-4 counsellor-dashpdata">
                        <p>: {a?.patientId?.name} </p>
                        <p>: {a?.patientId?.gender}</p>
                        <p>: {a?.date}</p>
                        <p>: {a?.time}</p>

                      </div>

                    </div>
                    <Link to="/counsellor-viewpatientappoinmnt" style={{textDecoration:"none"}}>
                    <div
                      className="view-morecounsellordash"
                    //   onClick={() => openModal(a?._id, 'counsellor')}
                    >
                      view more
                    </div></Link>
                  </div>

                  
                 );
              })
            ) : (
              <div className="viewcounsellor-lottie">
              <Lottie animationData={lottieimg} style={{ width: 150, height: 150 }} />
            </div>      
               )} 

            {data?.length > 0 && data?.length >= 3 && (
             <Link to="/counsellor-viewpatientappoinmnt" style={{textDecoration:"none"}}><p className="admindash-counsellorviewall">
                View all
                <span className="ri-arrow-right-s-line" />
              </p></Link> 
             )} 
          </div>
        </div>
        <br />

      </div>

        </div>
  )
}

export default Counsellordashboard