import React,{useState,useEffect} from 'react'
import {AiFillStar } from "react-icons/ai"
import './ViewCounsellorList.css'
import axiosInstance from '../../Constants/Baseurl';

function ViewCounsellorList() {
    const [counsellordata,setCounsellorData]=useState('');
    useEffect(()=>{
        axiosInstance.post('viewallcounsellor')
        .then((res)=>{
            console.log(res);
            setCounsellorData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    console.log(counsellordata,"hcpdata");
  return (
    <>
        <section className='patient-viewcounlist'>
            <div className='container '>
                <div className='patient-viewcounlist-con pt-2' >
                    <h2 style={{color:'#0A5377',fontWeight:'700',fontSize:'50px'}}>Councellors</h2>
                </div>
                <div className='mt-5'>
                    <div className='row patient-viewcounlist-head '>
                        <div className='col'><h4>Name</h4></div>
                        <div className='col'><h4>Email Id</h4></div>
                        <div className='col'><h4>Reg.No</h4></div>
                        <div className='col'><h4>No Of Patients</h4></div>
                        <div className='col'><h4>Ratings</h4></div>
                    </div>
                    {counsellordata && counsellordata.length ? (
              counsellordata.map((a) => {
                return (
                    <div className='row mt-3 '>
                        <div className='col'><p>{a?.name}</p></div>
                        <div className='col'><p>{a?.email}</p></div>
                        <div className='col'><p>{a?.regno}</p></div>
                        <div className='col'><p>26</p></div>
                        <div className='col'><p><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></p></div>
                    </div>
                    );
                })
              ) : (
                 <div className="">
                    No Data Found
              </div>       
                 )} 
                </div>
            </div>
        </section>
    </>
  )
}

export default ViewCounsellorList