import React, { useEffect, useState } from "react";
import "../../Admin/Requests/Counsellorreq.css";
import img from "../../../Assets/doctor.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json"

function Counsellorreq() {
  const adminid=localStorage.getItem("adminid")
  // console.log(adminid+"adminid");
  const navigate=useNavigate()
  useEffect(()=>{
    if(adminid===null){
      navigate("/admin-login")
    }
  },[])

  const [counsellor,setCounsellor]=useState([])
  const url = axiosInstance.defaults.url;


  const fetchCounsellorRequests = () => {
    axiosInstance
      .post(`viewcouncellorreq`)
      .then((res) => {
        console.log(res);
        setCounsellor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCounsellorRequests();
  }, []);

  const acceptfn=((id)=>{
    axiosInstance.post(`activatecouncellor/${id}`)
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
    axiosInstance.post(`deletecounsellorreq/${id}`)
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
      <div className="counsreq-headc">Counsellors Requests</div>
      <div className="counsereq-scrollmain">



      {counsellor && counsellor.length ? (
              counsellor.map((a) => {
                return (

      <div className="counreq-mainbox d-flex">
        <div className="col-2 counreq-contentimg">
          <img src={`${url}/${a?.image?.filename}`} alt="Counsellor image" width="150px" height="150px" />
        </div>
        <div className="col-3">
          <div className="info-labelsreq">
            <p>Name</p>
            <p>Address</p>
            <p>Email Id</p>
            <p>Contact Number</p>
            <p>Counsellor Register No</p>
          </div>
        </div>
        <div className="col-4">
          <div className="info-valuesreq">
            <p>: {a?.name}</p>
            <p style={{width:"600px"}}>: {a?.address}</p>
            <p>: {a?.email}</p>
            <p>: {a?.phone}</p>
            <p>: {a?.regno}</p>
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
  );
}

export default Counsellorreq;
