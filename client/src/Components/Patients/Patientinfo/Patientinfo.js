import React, { useEffect, useState } from "react";
import "./Patientinfo.css";
import axios from "axios";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";

function Patientinfo() {
  const patientid = localStorage.getItem("patientid");

  const [data, setData] = useState({
    patientid: patientid,
    medicalhistory: ""
  });

  const [patient, setPatient] = useState({});

  const calculateAge = (dobString) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    axiosInstance.post(`viewallpatientbyid/${patientid}`)
      .then((res) => {
        console.log(res);
        const patientData = res.data.data;
        patientData.age = calculateAge(patientData.dob);
        setPatient(patientData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientid]);

  const changefn = (e) => {
    setData({
      ...data, [e.target.name]: e.target.value
    });
  };

  const submitfn = (a) => {
    a.preventDefault();
    axiosInstance.post(`regpatientinfo`, data)
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success("Added Successfully");
        } else {
          toast.error(res.data.msg);
        }
      });
  };

  return (
    <div className="patientinfo-container">
      <div className="patient-info-main">
        <form onSubmit={submitfn}>
          <div className="patient-info-head container">
            <p>Patient Information</p>
          </div>
          <div className="row patient-info-details">
            <div className="col-4">
              <p>Name</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.name} readOnly />
            </div>
            <div className="col-4">
              <p>Age</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.age} readOnly />
            </div>
            <div className="col-4">
              <p>Gender</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.gender} readOnly />
            </div>
            <div className="col-4">
              <p>Address</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.city} readOnly />
            </div>
            <div className="col-4">
              <p>Contact info</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.phone} readOnly />
            </div>
          </div>
          <div className="container profileinfo-bottm-textarea">
            <div className="col-12 profileinfo-bottm">
              <p>Medical History</p>
            </div>
            <div className="col-12">
              <textarea 
                placeholder="Enter your medical history here.." 
                name="medicalhistory"
                value={data.medicalhistory}
                onChange={changefn}
              />
            </div>
          </div>
          <div className="profileinfo-button">
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Patientinfo;
