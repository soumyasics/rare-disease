import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'
import { toast } from 'react-toastify'
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json"


function Hprequest() {
    const adminid=localStorage.getItem("adminid")
    // console.log(adminid+"adminid");
    const navigate=useNavigate()
    useEffect(()=>{
      if(adminid===null){
        navigate("/admin-login")
      }
    },[])
  
    const [hp,setHp]=useState([])
    const url = axiosInstance.defaults.url;
  
  
    const fetchhpRequests = () => {
      axiosInstance
        .post(`viewhprequest`)
        .then((res) => {
          console.log(res);
          setHp(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      fetchhpRequests();
    }, []);


    const acceptfn=((id)=>{
        axiosInstance.post(`activatehp/${id}`)
        .then((res)=>{
          if(res.data.status==200){
            toast.success("Accepted Successfully")
            fetchhpRequests()
    
          }
        })
        .catch((err)=>{
          console.log(err);
          toast.warn("Cannot Accept")
        })
    
      })
    
      const deletefn=((id)=>{
        axiosInstance.post(`deletehpreq/${id}`)
        .then((res)=>{
          if(res.data.status==200){
            toast.success("Rejected Successfully")
            fetchhpRequests()
    
          }
        })
        .catch((err)=>{
          console.log(err);
          toast.warn("Cannot Reject")
        })
    
      })
    
    
  
  return (
    <div className="col-9 counsellorreq-main">
    <div className="counsreq-headc" style={{width:"350px"}}>Health Care Professionals Request</div>
    <div className="counsereq-scrollmain">



    {hp && hp.length ? (
            hp.map((a) => {
              return (

    <div className="counreq-mainbox d-flex" style={{height:"319px"}}>
      <div className="col-2 counreq-contentimg">
        <img 
        src=
        {`${url}/${a?.image?.filename}`}
         alt="Counsellor image" width="150px" height="150px" />
      </div>
      <div className="col-3">
        <div className="info-labelsreq">
          <p>Name</p>
          <p>Contact Number</p>
          <p>Email Id</p>
          <p>Specialisation</p>
          <p>State/Province</p>
          <p>Medical Licence Number</p>
          <p>Aadhar Number</p>
          <p>Year of Experience</p>


        </div>
      </div>
      <div className="col-4">
        <div className="info-valuesreq">
        <p>: {a?.name}</p>
        <p>: {a?.phone}</p>
        <p>: {a?.email}</p>
        <p>: {a?.specialisation}</p>
        <p>: {a?.state}</p>
        <p>: {a?.licenceno}</p>
        <p>: {a?.aadharno}</p>
        <p>: {a?.yearofexp}</p>
        </div>
      </div>
      <div className="col-3 counsereq-buttons">
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

export default Hprequest