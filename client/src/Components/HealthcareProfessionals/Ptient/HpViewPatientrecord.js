import React, { useEffect, useState } from 'react'
import "./HpViewPatientrecord.css"
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'

function HpViewPatientrecord() {
    const {pid}=useParams()
    const {id}=useParams()
    const [data,setData]=useState({})
    const [record,setRecord]=useState({})

    useEffect(()=>{
        axiosInstance.post(`viewBookingByid/${id}`)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
        axiosInstance.post(`viewinfobypId/${pid}`)
        .then((res)=>{
            console.log(res);
            setRecord(res.data.data)
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
    <div className='col-9'>
        <div className='container hpview-patientrecord'>
    <Link to="/health-viewpatients" style={{textDecoration:"none"}} > <div className='hpview-patientrecord-head'><p className='ri-arrow-left-line'>Patient Information</p></div></Link> 
       
        <div className='row hpview-patientrecord-content'>
            <div className='col-4'>
            <p>Name</p>
            </div>
            <div className='col-8'>
            <h6>: {data?.patientid?.name}</h6>
            </div>
            <div className='col-4'>
            <p>Age</p>
            </div>
            <div className='col-8'>
            <h6>: {calculateAge(data?.patientid?.dob)}</h6>
            </div>

            <div className='col-4'>
            <p>Gender</p>
            </div>
            <div className='col-8'>
            <h6>: {data?.patientid?.gender}</h6>
            </div>
            <div className='hpview-patientrecord-head'><h3>Diagnostic Information</h3></div>

            <div className='col-4'>
            <p>Date of Appoinment</p>
            </div>
            <div className='col-8'>
            <h6>: {data?.date}</h6>
            </div>
            <div className='col-4'>
            <p>Diagnosis</p>
            </div>
            <div className='col-8'>
            <h6>: {data?.diagnosis}</h6>
            </div>
            <div className='col-4'>
            <p>Allergies</p>
            </div>
            <div className='col-8'>
            <h6>: {data?.allergies}</h6>
            </div>
            <div className='col-4'>
            <p>Disese Information</p>
            </div>
            <div className='col-8'>
            <h6>: {data?.patientid?.diseaseinfo}</h6>
            </div>
            <div className='hpview-patientrecord-head'><h3>Medical History of {data?.patientid?.name}</h3></div>
            <div className='col-1'>
            </div>
            <div className='col-11'>
            <h6>{record?.medicalhistory}</h6>
            </div>
            <div className='col-4 view-health-button'>
           <Link to={`/health-addprescription/${data?.patientid?._id}/${id}`}> <button type='button' className='ri-add-circle-line'>Add Prescription</button></Link>
            </div>
            <div className='col-4 view-health-button'>
            <Link to={`/health-viewprescription/${id}`}> <button type='button' className='ri-eye-line'>View Prescription</button></Link>
            </div>

        </div>
        </div>
    </div>
  )
}

export default HpViewPatientrecord