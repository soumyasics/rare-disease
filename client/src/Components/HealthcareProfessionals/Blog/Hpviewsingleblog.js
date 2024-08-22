import React, { useEffect, useState } from 'react'
import img from "../../../Assets/counsellor.jpg";
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl';

function Hpviewsingleblog() {
    const {id}=useParams()
    const url = axiosInstance.defaults.url;
    const [data,setData]=useState({})

    useEffect(()=>{
        axiosInstance.post(`viewblogbyid/${id}`)
        .then((res) => {
            console.log(res);
            setData(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
    
    },[])

  return (
    <div className='container'>
       <Link to="/health-viewallblogs" style={{textDecoration:"none"}}> <span className='ri-arrow-left-line back-line'/></Link>
        <div className='row opne-blog-main'>
            <div className='col-4'>
            <img src={`${url}/${data?.image?.filename}`} alt='image'/>
            </div>
            <div className='col-8'>
            <h6 style={{whiteSpace:"pre-wrap",wordWrap:"break-word"}}>
            <span style={{ color: "grey" }}>Title :</span>{data?.title}</h6>
            <div className='d-flex'>
            <span style={{ color: "grey" }}>category : </span> <p>{data?.category}</p>
                <span className='one-blog-autherend'>
                <span style={{ color: "grey" }}>Author :</span>-{data?.author}</span>
            </div>
            <span className='one-blog-autherend'>
            <span style={{ color: "grey" }}>Date of Upload : </span>{data?.date}</span><br/><br/>
            <h4  style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              textAlign: "justify",
              fontWeight:"400"
            }}>{data?.content}</h4>
            </div>

        </div>
    </div>
  )
}

export default Hpviewsingleblog