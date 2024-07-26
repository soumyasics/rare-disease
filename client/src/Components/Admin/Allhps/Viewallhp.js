import React, { useEffect, useState } from "react";
import "./Viewallhp.css";
import img from "../../../Assets/rarecarelogin.jpg";
import axiosInstance from "../../Constants/Baseurl";
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json";

function Viewallhp() {
    const [data,setData]=useState([])
    const url = axiosInstance.defaults.url;
    const [searchInput, setSearchInput] = useState('')

    const fetchallhp=()=>{
        axiosInstance.post(`viewallhp`)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    useEffect(()=>{
        fetchallhp()
    },[])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearchInput(value)

        if (value.trim() === '') {
            fetchallhp()
        } else {
            const filteredData = data.filter(a => 
                a.name.toLowerCase().includes(value.toLowerCase())
            )
            setData(filteredData)
        }
    }


  return (
    <div className="col-9 adminviewallpatient-main">
      <div className="adminviewallpatient-headcmain d-flex">
        <div className="adminviewallpatient-headc " style={{ width: "350px" }}>
          Health Care Professionals{" "}
        </div>
        <div className="adminviewallpatient-search">
          <div className=" searchnav-adminhomemain">
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
      </div>
      <div className="">
        <div className="admin-viewallpatient-insidebox">
          <div className="adminviewallpatient-scrollmain">
            <div className="row">


            {data && data.length ? (
                data.map((a) => {
                  return (

                <div className="col-6">
                     <div className="col-6 allhp-insidemainbox">
                    <div className="">
                        <div className="row">
                            <div className="col-12">
                            <img
                            src={`${url}/${a?.image?.filename}`}
                            alt="image"
                            width="54px"
                            height="59px"
                          />
                            </div>
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>Name</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.name}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>Contact Number</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.phone}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>Email Id</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.email}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>Specialisation</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.specialisation}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>State/Province</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.state}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>City</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.city}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>Medial Licence Number</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.licenceno}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>Aadhar Number</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.aadharno}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5 allhp-insidemainpcontent">
                                <p>Year Of Experience</p>
                            </div>
                            <div className="col-7">
                                <p>: {a?.yearofexp}</p>
                            </div>
                        </div>
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
  );
}

export default Viewallhp;
