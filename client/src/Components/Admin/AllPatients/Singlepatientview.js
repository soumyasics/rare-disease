import React, { useEffect, useState } from 'react'
import "./Singlepatientview.css"
import { Link, useParams } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl';

function Singlepatientview() {
    const {id}=useParams()
    console.log(id);

    const [data,setData]=useState({})

    useEffect(()=>{
        axiosInstance.post(`viewallpatientbyid/${id}`)
        .then((result)=>{
            console.log(result);
            setData(result.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
  return (
    <div className="col-9 adminviewallpatient-main">
    <div className="adminviewallpatient-headcmain d-flex">
      <div className="adminviewallpatient-headc " style={{ width: "350px" }}>
        Patient Health Record{" "}
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
      <div className="admin-viewsinglepatient-insidebox">
        <div className="adminviewsinglepatient-scrollmain">
            <div className='container'>

         <Link to="/admin-allpatients" style={{textDecoration:"none"}}>  <h6 className='ri-arrow-left-line adminviewsingle-head'>Patient Information</h6></Link> 
            <div className='row adminviewsingle-personal'>
                <div className='col-4 '>
                    <p>Name</p>
                </div>
                <div className='col-8'>
                    <p>: {data?.name}</p>
                </div>
                <div className='col-4'>
                    <p>Email</p>
                </div>
                <div className='col-8'>
                    <p>: {data?.email}</p>
                </div>
                <div className='col-4'>
                    <p>Contact</p>
                </div>
                <div className='col-8'>
                    <p>: {data?.phone}</p>
                </div>

            </div>
            <h6 className='adminviewsingle-head'>diagnostic information</h6>
            <div className='row adminviewsingle-personal'>
            <div className='col-4'>
                <p>Disease Information</p>
            </div>
            <div className='col-8'>
                <p>: {data?.diseaseinfo}</p>
            </div>

            
            </div>
            </div>

    </div>
    </div>
    </div>
    </div>
  )
}

export default Singlepatientview