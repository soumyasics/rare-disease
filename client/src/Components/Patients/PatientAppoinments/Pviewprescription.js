import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";

function Pviewprescription() {
    const {id}=useParams()
    const [data,setData]=useState({})

    useEffect(()=>{
        axiosInstance.post(`viewprescbyappoinmntid/${id}`)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[id])
  return (
    <div>
      <div className="container view-pat-hrec">
        <Link
          to="/patient-home"
          className="ri-arrow-left-line"
          style={{ textDecoration: "none" }}
        ></Link>
        <div className="view-pat-prescription">
          <h1>Prescription</h1>
        </div>
        <hr />
        <div className="row view-pat-prescription-pd">
          <div className="col-12 view-pat-hrcontent-main">
            <div className="row ">
              <div className="view-pat-hrechead">
                <h1>Patient Information</h1>
              </div>
              <div className="col-4">
                <h3>Name</h3>
              </div>
              <div className="col-8">
                <p>: {data?.patientId?.name}</p>
              </div>
              <div className="col-4">
                <h3>Date Of Birth</h3>
              </div>
              <div className="col-8">
                <p>: {data?.patientId?.dob}</p>
              </div>
              <div className="col-4">
                <h3>Gender</h3>
              </div>
              <div className="col-8">
                <p>: {data?.patientId?.gender}</p>
              </div>
              <div className="view-pat-hrechead">
            <h1>Physician Information</h1>
          </div>
          <div className="col-3">
                <h3>Name</h3>
              </div>
              <div className="col-3">
                <p>: Dr.{data?.hpId?.name}</p>
                </div>
              <div className="col-3">
                <h3>Medical Licence No</h3>
              </div>
              <div className="col-3">
                <p>: {data?.hpId?.licenceno}</p>
              </div>

              <div className="col-3">
                <h3>Spetiality</h3>
              </div>
              <div className="col-9">
              <p>: {data?.hpId?.specialisation}</p>
              </div>
              <div className="view-pat-hrechead">
            <h1>Diagnosis</h1>
          </div>
          <div className="col-4">
                <h3>Description</h3>
              </div>
              <div className="col-8">
                <p>: {data?.description}</p>
              </div>  
               <div className="col-4">
                <h3>Medical Code</h3>
              </div>
              <div className="col-8">
              <p>: {data?.medicalcode}</p>
              </div>
              <div className="view-pat-hrechead">
            <h1>Medication</h1>
          </div>
          <div className="col-4">
                <h3>Name of Medicine</h3>
              </div>
              <div className="col-8">
              <p>: {data?.nameofmedicine}</p>
              </div>
              <div className="col-4">
                <h3>Dosage</h3>
              </div>
              <div className="col-8">
              <p>: {data?.dosage}</p>
              </div>   <div className="col-4">
                <h3>Frequency and Duration of Use</h3>
              </div>
              <div className="col-8">
              <p>: {data?.durationofuse}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pviewprescription;
