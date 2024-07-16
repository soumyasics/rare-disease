import React, { useEffect, useState } from 'react'
import axiosInstance from '../../Constants/Baseurl'
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json";
import { Link } from "react-router-dom";

function Hpviewmedicalreport() {
    const id=localStorage.getItem("healthcareid")
    const [data,setData]=useState([])

    useEffect(()=>{
        axiosInstance.post(`viewacceptedBookingByhpid/${id}`)
        .then((res)=>{
        console.log(res);
        setData(res.data.data)
    })
    .catch((err)=>{
        console.log(err);
    })
    },[])

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    };

  return (
    <div className="col-9 adminviewallpatient-main">
    <div className="adminviewallpatient-headcmain d-flex">
        <div className="adminviewallpatient-headc " style={{ width: "350px" }}>
            View Patient Medical Record{" "}
        </div>
        <div className="adminviewallpatient-search">
            <div className=" searchnav-adminhomemain">
                <div className="search-containeradminnav">
                    <i className="ri-search-line"></i>
                    <input
                        type="text"
                        className="search-inputadminnav"
                        placeholder="Search"
                    />
                </div>
            </div>
        </div>
    </div>
    <div className="">
        <div className="admin-viewallpatient-insidebox">
            <div className="adminviewallpatient-scrollmain">
                <div className="row">

                     {data && data.length ? (
                        data.map((a) => {
                            return ( 
                                <div className="col-6 ">
                                    <div className="admin-viewpatient-box1st">
                                        <div className="row admin-viewpatient-contents">
                                            <div className="col-6">
                                                <p>Name</p>
                                            </div>
                                            <div className="col-6">
                                                <h6>: {a?.patientid?.name}</h6>
                                            </div>
                                            <div className="col-6">
                                                <p>Age</p>
                                            </div>
                                            <div className="col-6">
                                                <h6>: {calculateAge(a?.patientid?.dob)}</h6>
                                            </div>
                                            <div className="col-6">
                                                <p>Gender</p>
                                            </div>
                                            <div className="col-6">
                                                <h6>: {a?.patientid?.gender}</h6>
                                            </div>
                                        </div>
                                        
                                         <div className="admin-viewpatient-content">
                                         <Link to={`/health-Hpviewhealrecone/${a?.patientid?._id}`} style={{textDecoration:"none",color:"white"}}>
                                         View Medical Record </Link> 
                                          {/* <p className='view-health-button ri-add-circle-line'>  Add Prescription</p> */}
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
        </div>
    </div>
</div>
  )
}

export default Hpviewmedicalreport