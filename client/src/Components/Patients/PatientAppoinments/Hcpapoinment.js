import React, { useEffect, useState } from "react";
import "./Hcpappoinment.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import img from "../../../Assets/doctor1.jpg";
import { toast } from "react-toastify";

function Hcpapoinment() {
  const hcpid = localStorage.getItem("patientid");
  const navigate = useNavigate();
  const [patient, setPatient] = useState({});
  const [hp, setHp] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    hpid: "",
    diagnosis: "",
    allergies: "",
    medication: "",
    emergencycontact: "",
    medicalhistory: "",
  });

  useEffect(() => {
    if (hcpid === null) {
      navigate("/patinet-login");
    } else {
      axiosInstance
        .post(`/viewallpatientbyid/${hcpid}`)
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
      .post(`viewallhp`)
      .then((res) => {
        setHp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { emergencycontact } = formData;
    const contactPattern = /^\d{10}$/;
    return contactPattern.test(emergencycontact);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Emergency contact must be a 10-digit number and cannot be negative.");
      return;
    }

    const payload = {
      patientid: hcpid,
      ...formData,
    };

    axiosInstance
      .post("/registerreq", payload)
      .then((res) => {
        console.log(res.data);
        if(res.data.status==200){
            toast.success("Appoinment Booked Successfully")
            window.location.reload()
        }
        else{
            toast.error("Something Went Wrong")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="patinet-hcprequestcontainer">
      <div className="patinet-hcprequestmainbox">
        <div className="container">
          <div className="row">
           <Link to="/patient-home" style={{textDecoration:"none"}} ><h2 className="ri-arrow-left-line personal-infohpapoinmnt">
              Professional Information
            </h2></Link>
            <form onSubmit={handleSubmit} >
            <div className="d-flex row patient-infoinputs">
              <div className="col-6 pb-3">
                <input type="text" value={patient?.name} readOnly />
              </div>
              <div className="col-6 pb-3">
                <input type="text" value={patient?.dob} readOnly />
              </div>
              <div className="col-6 pb-3">
                <input type="text" value={patient?.phone} readOnly />
              </div>
              <div className="col-6 pb-3">
                <input type="text" value={patient?.email} readOnly />
              </div>
              <div className="col-6 pb-3">
                <input type="text" value={patient?.city} readOnly />
              </div>
              <div className="col-6 pb-3">
                <input type="text" value={patient?.country} readOnly />
              </div>
              <div className="col-6 pb-3">
                <input type="text" value={patient?.gender} readOnly />
              </div>
              <div className="col-6 pb-3">
                <input type="text" value={patient?.usertype} readOnly />
              </div>
              <h2 className="personal-infohpapoinmnt">Appointment Details</h2>
              <div className="col-6 pb-3">
                <input
                  type="date"
                  name="date"
                  min={today}
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6 pb-3">
                <select name="time" value={formData.time} onChange={handleInputChange} required>
                  <option hidden>Select Time Slot</option>
                  <option>09:30am to 10:30am</option>
                  <option>11:00am to 12:30pm</option>
                  <option>01:30pm to 2:00pm</option>
                  <option>02:30pm to 3:30pm</option>
                </select>
              </div>
              <div className="col-6 pb-3">
                <select
                  className="specialization-hpapoinment"
                  name="hpid"
                  value={formData.hpid}
                  onChange={handleInputChange}
                  required
                >
                  <option hidden>Preferred Health Care Professional</option>
                  {hp && hp.length
                    ? hp.map((a) => {
                        return (
                          <option key={a._id} value={a._id}>
                            {a?.name} {a?.specialisation}
                          </option>
                        );
                      })
                    : null}
                </select>
              </div>
              <h2 className="personal-infohpapoinmnt">Medical Information</h2>
              <div className="col-6 pb-3">
                <input
                  type="text"
                  name="diagnosis"
                  placeholder="Rare Disease Diagnosis"
                  value={formData.diagnosis}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6 pb-3">
                <input
                  type="text"
                  name="allergies"
                  placeholder="Allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6 pb-3">
                <input
                  type="text"
                  name="medication"
                  placeholder="Current Medications"
                  value={formData.medication}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-6 pb-3">
                <input
                  type="number"
                  name="emergencycontact"
                  placeholder="Emergency Contact info"
                  value={formData.emergencycontact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-12 pb-3">
                <textarea
                  name="medicalhistory"
                  placeholder="Medical History"
                  value={formData.medicalhistory}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="patient-infoinpbutton-container">
                <button
                  type="submit"
                  className="patient-infoinpbutton"
                //   onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hcpapoinment;
