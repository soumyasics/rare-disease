import React, { useEffect, useState } from 'react'
import './ViewHcpList.css'
import {AiFillStar } from "react-icons/ai"
import axiosInstance from '../../Constants/Baseurl';
function ViewHcpList() {
    
    const [hcpdata,setHcpData]=useState([]);
    const url = axiosInstance.defaults.url;

    useEffect(()=>{
        axiosInstance.post('viewallhp')
        .then((res)=>{
            console.log(res);
            setHcpData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    console.log(hcpdata,"hcpdata");
  return (
    <>
        <section className='patient-viewhcplist'>
            <div className='container '>
                <div className='patient-viewhcplist-con pt-2' >
                    <h2 style={{color:'#0A5377',fontWeight:'700',fontSize:'50px'}}>Health Care Professionals</h2>
                </div>
                <div className='mt-5'>
                    <div className='row patient-viewhcplist-head '>
                        <div className='col'><h4>Name</h4></div>
                        <div className='col'><h4>Email Id</h4></div>
                        <div className='col'><h4>Specialisation</h4></div>
                        <div className='col'><h4>Year of Experience</h4></div>
                        <div className='col'><h4>Image</h4></div>
                    </div>
                    {hcpdata && hcpdata.length ? (
              hcpdata.map((a) => {
                return (
                    <div className='row mt-3 '>
                        <div className='col'><p>{a?.name}</p></div>
                        <div className='col'><p>{a?.email}</p></div>
                        <div className='col'><p>{a?.specialisation}</p></div>
                        <div className='col'><p>{a?.yearofexp}</p></div>
                        <div className='col allcounser-user-image'><img src={`${url}/${a?.image?.filename}`}/></div>

                        {/* <div className='col '><p><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></p></div> */}
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

export default ViewHcpList