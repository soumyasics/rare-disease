import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'

function Hpviewhealrecone() {
    const {id}=useParams()
    const [data,setData]=useState({})
    const navigate=useNavigate()
    useEffect(()=>{
        axiosInstance.post(`viewinfobypId/${id}`)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const navbck=(()=>{
        navigate(-1)
    })

  return (
    <div className='col-9'>
        <div className='container view-pat-hrec'>
            <Link onClick={navbck} style={{textDecoration:"none"}}>
        <div className='view-pat-hrechead'><h1 className='ri-arrow-left-line'>Patient Information</h1></div></Link>
        <div className='row'>
            <div className='col-2 view-pat-hrimage'>
            {/* <img src={img} alt='image'/> */}
            </div>
            <div className='col-8 sm-4 lg-4 view-pat-hrcontent-main'>
            <div className='row'>
                <div className='col-4'>
                <h3>Name</h3>
                </div>
                <div className='col-8'>
                <p>: {data?.patientid?.name}</p>
                </div>
                <div className='col-4'>
                <h3>Date Of Birth</h3>
                </div>
                <div className='col-8'>
                <p>: {data?.patientid?.dob}</p>
                </div>
                <div className='col-4'>
                <h3>Gender</h3>
                </div>
                <div className='col-8'>
                <p>: {data?.patientid?.gender}</p>
                </div>

            </div>
            </div>

        </div>
        <div>
            <div className='view-pat-hrechead'><h1>Medical History of {data?.patientid?.name}</h1></div>
            <div className='row'>
            <div className='col-2 view-pat-hrimage'>
            {/* <img src={img} alt='image'/> */}
            </div>
            <div className='col-8 sm-4 lg-4 view-pat-hrcontent-main'>
            <div className='row'>
                <p>{data?.medicalhistory}</p>
            </div>
            </div>
            </div>
        </div>
        </div>

    </div>
  )
}

export default Hpviewhealrecone