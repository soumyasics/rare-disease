import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../HpDashboard/Hpdashboard.css"
import axiosInstance from '../../Constants/Baseurl';
import Lottie from "lottie-react"
import lottieimg from "../../../Assets/lottienodataanimation.json"
import lottieimg2 from "../../../Assets/lottiedata2.json"


function Hpdashboard() {
  const hpid=localStorage.getItem("healthcareid")
  console.log(hpid);
  const navigate=useNavigate()
  const [data,setData]=useState([])

  useEffect(()=>{
      if(hpid===null){
          navigate("/health-login")
      }
      else{
          axiosInstance.post(`viewBookingByhpid/${hpid}`)
          .then((res)=>{
              console.log(res);
              setData(res.data.data)
          })
          .catch((err)=>{
              console.log(err);
          })
      }

  },[])

  return (
    <div className="col-9 counsellordash-main">
    <div className="admindash">
<header className="Admindash-header">
  <div className="stats">
    <div className="stat-item col-4">
      <div className="stat-circle">
        <div className="stat-number">1300</div>
      </div>
      <div className="stat-label">Total Patients</div>
    </div>
    <div className="stat-item col-4">
      <div className="stat-circle">
        <div className="stat-number">{data.length}</div>
      </div>
      <div className="stat-label">Total Appoinments</div>
    </div>
    <div className="stat-item col-4">
      <div className="stat-circle">
        <div className="stat-number">11</div>
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
                <p>:{a?.patientid?.name} </p>
                <p>:{a?.patientid?.gender}</p>
                <p>:{a?.date}</p>
                <p>:{a?.time}</p>

              </div>

            </div>
           <Link to="/health-viewpatientrequests" style={{textDecoration:"none"}}><div
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
      <Lottie animationData={lottieimg2} style={{ width: 150, height: 150 }} />
    </div>       
    )}


     {data?.length > 0  && ( 
     <Link to="/health-viewpatientrequests" style={{textDecoration:"none"}}><p className="admindash-counsellorviewall">
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

export default Hpdashboard