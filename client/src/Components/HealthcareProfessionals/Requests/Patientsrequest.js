import React, { useEffect, useState } from 'react'
import "./Patientrequest.css"
import img from "../../../Assets/doctor.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json"


function Patientsrequest() {
    const hpid=localStorage.getItem("healthcareid")
    console.log(hpid);
    const navigate=useNavigate()
    const [data,setData]=useState([])

    useEffect(()=>{
        if(hpid===null){
            navigate("/health-login")
        }
        // else{
        //     axiosInstance.post(`viewBookingByhpid/${hpid}`)
        //     .then((res)=>{
        //         console.log(res);
        //         setData(res.data.data)
        //     })
        //     .catch((err)=>{
        //         console.log(err);
        //     })
        // }

    },[])


    const fetchCounsellorRequests = () => {
        axiosInstance
          .post(`viewBookingByhpid/${hpid}`)
          .then((res) => {
            console.log(res);
            setData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
      useEffect(() => {
        fetchCounsellorRequests();
      }, []);
    
      const acceptfn=((id)=>{
        axiosInstance.post(`approveBookingByid/${id}`)
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
        axiosInstance.post(`rejectBookingByid/${id}`)
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
    <div className="counsreq-headc">Total Appoinments</div>
    <div className="counsereq-scrollmain">



    {data && data.length ? (
            data.map((a) => {
              return (

    <div className="patienthp-mainbox d-flex">
      <div className="col-3">
        <div className="info-labelsreq">
          <p>Name</p>
          <p>Email Id</p>
          <p>Date of Birth</p>
          <p>Gender</p>
          <p>City</p>
          <p>Contact </p>
          <p>Date</p>
          <p>Time Slot</p>
        </div>
      </div>
      <div className="col-4">
        <div className="info-valuesreq">
          <p>: {a?.patientid?.name}</p>
          <p>: {a?.patientid?.email}</p>
          <p>: {a?.patientid?.dob}</p>
          <p style={{width:"600px"}}>:{a?.patientid?.gender}</p>
          <p>: {a?.patientid?.city}</p>
          <p>: {a?.patientid?.phone}</p>
          <p>: {a?.date}</p>
          <p>: {a?.time} </p>        
        </div>
      </div>
      <div className="col-3 counsereq-buttons">
        <div className="custreqbutton-container patientreqhp-button">
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

export default Patientsrequest