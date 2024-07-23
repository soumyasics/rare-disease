import React, { useEffect, useState } from "react";
import "./CounsellorAppoinment.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";

function CounsellorAppoinment() {
  const patientId = localStorage.getItem("patientid");
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [counsellor, setCounsellor] = useState([]);
  const [data, setData] = useState({
    patientId: patientId,
    date: "",
    time: "",
    counsellorId: "",
  });

  useEffect(() => {
    if (patientId === null) {
      navigate("/patinet-login");
    } else {
      axiosInstance
        .post(`/viewallpatientbyid/${patientId}`)
        .then((res) => {
          setPatient(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    axiosInstance
      .post(`viewallcounsellor`)
      .then((res) => {
        setCounsellor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validateForm()) {
    //   alert("Emergency contact must be a 10-digit number and cannot be negative.");
    //   return;
    // }

    const payload = {
      patientId: patientId,
      ...data,
    };

    axiosInstance
      .post("/registerreqcounsellor", payload)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 200) {
          toast.success("Appoinment Booked Successfully");
          // window.location.reload();
          navigate("/patient-home")
        } else {
          toast.error("Something Went Wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container counsellor-appoinmnt-main">
      <div className="counsellor-appo-box">
        <div className="counsellor-appo-head">
          <Link to="/patient-home" style={{ textDecoration: "none" }}>
            {" "}
            <h2 className="ri-arrow-left-line">Request Appoinment</h2>
          </Link>
        </div>
        <form onSubmit={handleSubmit} required>
          <div className="row counsellor-req-data">
            <div className="col-6 ">
              <p>Name</p>
            </div>
            <div className="col-6 ">
              <input type="text" value={patient.name} readOnly />
            </div>
            <div className="col-6 ">
              <p>Date Of Birth</p>
            </div>
            <div className="col-6 ">
              <input type="text" value={patient?.dob} readOnly />
            </div>
            <div className="col-6 ">
              <p>Gender</p>
            </div>
            <div className="col-6 ">
              <input type="text" value={patient?.gender} readOnly />
            </div>
            <div className="col-6 ">
              <p>City</p>
            </div>
            <div className="col-6 ">
              <input type="text" value={patient?.city} readOnly />
            </div>
            <div className="col-6 ">
              <p>Select a Counsellor</p>
            </div>
            <div className="col-6 ">
              <select
                name="counsellorId"
                value={data.counsellorId}
                onChange={handleInputChange}
                required
              >
                <option hidden></option>
                {counsellor && counsellor.length
                  ? counsellor.map((a) => {
                      return (
                        <option key={a._id} value={a._id}>
                          {" "}
                          {a?.name}{" "}
                        </option>
                      );
                    })
                  : null}
              </select>
            </div>
            <div className="col-6 ">
              <p>Date for Appoinment</p>
            </div>
            <div className="col-6 ">
              <input
                type="date"
                min={today}
                name="date"
                value={data.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-6 ">
              <p>Time Slot</p>
            </div>
            <div className="col-6 ">
              <select
                name="time"
                value={data.time}
                onChange={handleInputChange}
                required
              >
                <option hidden></option>
                <option>09:30 am to 10:30 am</option>
                <option>11:00 am to 12:30 am</option>
                <option>02:00 pm to 03:30 am</option>
                <option>04:30 am to 05:30 am</option>
              </select>
            </div>
            <div className="col-6"></div>
            <div className="col-6">
              <button type="submit">Book Now</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CounsellorAppoinment;
