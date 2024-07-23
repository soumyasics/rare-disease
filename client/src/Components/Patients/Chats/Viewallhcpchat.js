import "./ViewallCounsellor.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./ViewallCounsellor.css";
import img from "../../../Assets/doctorimg.jpg";
import axiosInstance from "../../Constants/Baseurl";
import Lottie from "lottie-react"
import lottieimg2 from "../../../Assets/lottiedata2.json"



function Viewallhcpchat() {
  const id=localStorage.getItem("patientid")
  const url = axiosInstance.defaults.url;

    const[data,setData]=useState([])
    const [searchInput, setSearchInput] = useState('')


    const fetchAllRescueMembers = () => {
      axiosInstance.post(`viewBookingBypatientid/${id}`)
          .then((res) => {
              console.log(res)
              setData(res.data.data)
          })
          .catch((err) => {
              console.log(err)
          })
  }

  useEffect(() => {
      fetchAllRescueMembers()
  }, [])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchInput(value)

    if (value.trim() === '') {
        fetchAllRescueMembers()
    } else {
        const filteredData = data.filter(a => 
            a.hpid.name.toLowerCase().includes(value.toLowerCase())
        )
        setData(filteredData)
    }
}

    const navigate=useNavigate()
    const navbackfn=(()=>{
        navigate(-1)
    })

  return (
    <>
      <div className="view-chat-allcounse-container">
        <div className=" chatviewallcounsellor-search d-flex">
          <div className="chatviewallcounsellor-head" onClick={navbackfn}>
            <p className="ri-arrow-left-line">Chat</p>
          </div>
          <div
            className=" searchnav-adminhomemain"
            style={{ marginLeft: "auto" }}
          >
            <div className="search-containeradminnav">
              <i className="ri-search-line"></i>
              <input
                type="text"
                className="search-inputadminnav"
                placeholder="Search"
                value={searchInput}
                onChange={handleSearch}
  
              />
            </div>
          </div>
        </div>

        <div className="container chatviewallcounsellor-content">
          <div className="row chatviewallcounsellor-chead">
            <div className="col-3">
              <h6>Name</h6>
            </div>
            <div className="col-3">
              <h6>Medical License No</h6>
            </div>
            <div className="col-3">
              <h6>Specialization</h6>
            </div>
            <hr className="chat-viewco-hr" />

            {data && data.length ? (
              data.map((e) => {
                return (

            <>
            <div className="col-3">
              <p>
                <img src={`${url}/${e?.hpid?.image?.filename}`} /> {e?.hpid?.name}
              </p>
            </div>
            <div className="col-3">
              <p>{e?.hpid?.licenceno}</p>
            </div>
            <div className="col-3">
              <p>{e?.hpid?.specialisation}</p>
            </div>
            <div className="col-3">
             <Link to="/patient-chatwithhp"><button type="button">Chat</button></Link> 
            </div>
            </>
                );
              })
            ) : (
              <div className="viewcounsellor-lottie">
              <Lottie animationData={lottieimg2} style={{ width: 150, height: 150 }} />
            </div>       
            )}



            
          </div>
        </div>
      </div>
      </>
  )
}

export default Viewallhcpchat