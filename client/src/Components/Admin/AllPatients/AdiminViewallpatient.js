import React, { useEffect, useState } from "react";
import "./Adminviewallpatient.css";
import axiosInstance from "../../Constants/Baseurl";
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json";
import { Link } from "react-router-dom";

function AdiminViewallpatient() {
    const [data, setData] = useState([]);
    const [searchInput, setSearchInput] = useState('')

   

    const fetchallpatients=()=>{
        axiosInstance.post(`viewallpatients`)
            .then((res) => {
                console.log(res);
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }
    useEffect(() => {
        fetchallpatients()
    }, []);

    // Function to calculate age from DOB
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

    //search functionality
    const handleSearch = (e) => {
        const value = e.target.value
        setSearchInput(value)

        if (value.trim() === '') {
            fetchallpatients()
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
                    View all Patient Health Record{" "}
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
                                        <div className="col-6 " key={a.id}>
                                            <div className="admin-viewpatient-box1st">
                                                <div className="row admin-viewpatient-contents">
                                                    <div className="col-6">
                                                        <p>Name</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>: {a?.name}</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <p>Age</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>: {calculateAge(a?.dob)}</h6>
                                                    </div>
                                                    <div className="col-6">
                                                        <p>Gender</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <h6>: {a?.gender}</h6>
                                                    </div>
                                                </div>
                                                
                                                <div className="admin-viewpatient-content">
                                                <Link to={`/admin-singlepatient/${a._id}`} style={{textDecoration:"none",color:"white"}}>
                                                    View More</Link>
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

export default AdiminViewallpatient;
