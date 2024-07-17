import React, { useEffect, useState } from "react";
import "./CounsellorPatientHealthRecord.css";
import img from "../../../Assets/counsellor.jpg";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";

function CounPatientHealthRecord() {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    axiosInstance
      .post(`viewinfobypId/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="col-9">
      <div className="container view-pat-hrec">
        <Link
          to="/counsellor-viewpatientrecord"
          style={{ textDecoration: "none" }}
        >
          <div className="view-pat-hrechead">
            <h1 className="ri-arrow-left-line">Patient Information</h1>
          </div>
        </Link>
        <div className="row">
          <div className="col-2 view-pat-hrimage">
            {/* <img src={img} alt='image'/> */}
          </div>
          <div className="col-8 sm-4 lg-4 view-pat-hrcontent-main">
            <div className="row">
              <div className="col-4">
                <h3>Name</h3>
              </div>
              <div className="col-8">
                <p>: {data?.patientid?.name}</p>
              </div>
              <div className="col-4">
                <h3>Date Of Birth</h3>
              </div>
              <div className="col-8">
                <p>: {data?.patientid?.dob}</p>
              </div>
              <div className="col-4">
                <h3>Gender</h3>
              </div>
              <div className="col-8">
                <p>: {data?.patientid?.gender}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="view-pat-hrechead">
            <h1>Medical History of {data?.patientid?.name}</h1>
          </div>
          <div className="row">
            <div className="col-2 view-pat-hrimage">
              {/* <img src={img} alt='image'/> */}
            </div>
            <div className="col-8 sm-4 lg-4 view-pat-hrcontent-main">
              <div className="row">
                <p>{data?.medicalhistory}</p>
              </div>
              <div>
                <Link
                  to={`/counsellor-viewpriscription/${data?.patientid?._id}`}
                >
                  {" "}
                  <button type="button" style={{ width: "200px" }}>
                    View Priscriptions
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounPatientHealthRecord;
