import React, { useEffect, useState } from 'react'
import "./PatientAppoinment.css"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json"
import { toast } from 'react-toastify';


function PatientAppoinment() {
    const [data,setData]=useState([])
    const id=localStorage.getItem("counsellorlogin")
    const navigate=useNavigate()

    useEffect(()=>{
        if(id===null){
            navigate("/")
        }
       
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
  const acceptfn=((id)=>{
    axiosInstance.post(`approvecounsellorBookingByid/${id}`)
    .then((res)=>{
      if(res.data.status==200){
        toast.success("Accepted Successfully")
        fetchCounsellorRequests()

      }
    })
    .catch((err)=>{
      console.log(err);
      toast.warn("Cannot Accept")
    })

  })

  const deletefn=((id)=>{
    axiosInstance.post(`rejectcounsellorBookingByid/${id}`)
    .then((res)=>{
      if(res.data.status==200){
        toast.success("Rejected Successfully")
        fetchCounsellorRequests()

      }
    })
    .catch((err)=>{
      console.log(err);
      toast.warn("Cannot Reject")
    })

  })

  return (
    <div className="col-9 counsellorreq-main">
    <div className=" counsreq-headc">Total Appoinments</div>
    <div className="counsereq-scrollmain">



    {data && data.length ? (
            data.map((a) => {
              return (

    <div className="patientappoinment-mainbox d-flex">
      {/* <div className="col-2 counreq-contentimg">
        <img src={`${url}/${a?.image?.filename}`} alt="Counsellor image" width="150px" height="150px" />
      </div> */}
      <div className="col-3">
        <div className="info-labelsreq">
          <p>Name</p>
          <p>City</p>
          <p>Email Id</p>
          <p>Contact Number</p>
          <p>Date Of Birth</p>
          <p>Gender</p>
          <p>Date</p>
          <p>Time Slot</p>
        </div>
      </div>
      <div className="col-4">
        <div className="info-valuesreq">
          <p>: {a?.patientId?.name}</p>
          <p style={{width:"600px"}}>: {a?.patientId?.city}</p>
          <p>: {a?.patientId?.email}</p>
          <p>: {a?.patientId?.phone}</p>
          <p>: {a?.patientId?.dob}</p>
          <p>: {a?.patientId?.gender}</p>
          <p>: {a?.date}</p>
          <p>: {a?.time}</p>

        </div>
      </div>
      <div className="col-3 counsereq-buttons" style={{paddingTop:"120px"}}>
        <div className="custreqbutton-container">
          <button type="submit" id="cusrreqbthn1"
          onClick={()=>acceptfn(a?._id)}
          >
            Approve
          </button>
          <button type="submit" id="cusrreqbthn2"
          onClick={()=>deletefn(a?._id)}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
               );
            })
          ) : (
            <div className="counsellornodatareq-lottie">
            <Lottie animationData={imglottiedata} />
          </div>       
             )} 




    </div>

  </div>

  )
}

export default PatientAppoinment