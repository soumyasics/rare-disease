import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'

function Hpviewhealrecone() {
    const {id}=useParams()
    const [data,setData]=useState({})
    const navigate=useNavigate()
    const url = axiosInstance.defaults.url;

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
            <div className='col-12 sm-6 lg-6 view-pat-hrcontent-main'>
            <div className='row'>
                <p>{data?.medicalhistory}</p>
            </div>
            </div>
            </div>
            
        </div>
        <div>
            <div className='view-pat-hrechead'><h1>Image of Medical Report of {data?.patientid?.name}</h1></div>
            <div className=''>
            <div className='col-12 sm-6 lg-6 view-pat-hrcontent-main'>
            <div className='row'>
                <img src={`${url}/${data?.image?.filename}`} width="400px" height="400px"/>
            </div>
            </div>
            </div>
            
        </div>
        </div>

    </div>
  )
}

export default Hpviewhealrecone