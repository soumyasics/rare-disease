import React, { useEffect, useState } from "react";
import axiosInstance from "../../Constants/Baseurl";
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddPrescription() {
  const { id } = useParams();
  const hpid = localStorage.getItem("healthcareid");
  const [patient, setPatient] = useState({});
  const [hp, sethp] = useState({});
  const [data, setData] = useState({
    patientId: id,
    hpId: hpid,
    description: "",
    medicalcode: "",
    nameofmedicine: "",
    dosage: "",
    durationofuse: "",
  });

  const navigate = useNavigate();
  const backfn = () => {
    navigate(-1);
  };

  useEffect(() => {
    axiosInstance
      .post(`viewallpatientbyid/${id}`)
      .then((res) => {
        console.log(res);
        setPatient(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .post(`viewhpbyid/${hpid}`)
      .then((res) => {
        console.log(res);
        sethp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmit = (a) => {
    a.preventDefault();
    axiosInstance
      .post(`addprescription`, data)
      .then((result) => {
        if (result.data.status == 200) {
          toast.success("Prescription added Successfully");
        } else {
          toast.err(result.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="col-9 adminviewallpatient-main">
      <div className="adminviewallpatient-headcmain d-flex">
        <Link
          onClick={backfn}
          className="link"
          style={{ textDecoration: "none" }}
        >
          {" "}
          <div
            className="adminviewallpatient-headc ri-arrow-left-line"
            style={{ width: "350px" }}
          >
            Patients Information{" "}
          </div>
        </Link>
      </div>
      <div className="">
        <div className="admin-viewallpatient-insidebox">
          <div className="adminviewallpatient-scrollmain">
            <form onSubmit={handlesubmit}>
              <div className="row add-prescription-content">
                <h2 className="add-prescription-head">Patient Information</h2>
                <div className="col-4">
                  <p>Name</p>
                </div>
                <div className="col-8">
                  <i>: {patient?.name}</i>
                </div>
                <div className="col-4">
                  <p>Date Of Birth</p>
                </div>
                <div className="col-8">
                  <i>: {patient.dob}</i>
                </div>
                <div className="col-4">
                  <p>Gender</p>
                </div>
                <div className="col-8">
                  <i>: {patient?.gender}</i>
                </div>
                <h2 className="add-prescription-head">Physician Details</h2>
                <div className="col-4">
                  <p>Name</p>
                </div>
                <div className="col-8">
                  <i>: {hp?.name}</i>
                </div>
                <div className="col-4">
                  <p>Medical Licence No</p>
                </div>
                <div className="col-8">
                  <i>: {hp?.licenceno}</i>
                </div>
                <div className="col-4">
                  <p>Specialisation</p>
                </div>
                <div className="col-8">
                  <i>: {hp?.specialisation}</i>
                </div>
                <h2 className="add-prescription-head">Diagnosis</h2>
                <div className="col-6">
                  <p>Description</p>
                  <textarea
                    placeholder="Description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <p>Medical Code</p>
                  <input
                    type="text"
                    placeholder="Medical Code"
                    name="medicalcode"
                    value={data.medicalcode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <h2 className="add-prescription-head">Medication</h2>
                <div className="col-6">
                  <p>Name of Medicines</p>
                  <textarea
                    placeholder="Name of Medicines"
                    name="nameofmedicine"
                    value={data.nameofmedicine}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <p>Dosage</p>
                  <input
                    type="text"
                    placeholder="Dosage"
                    name="dosage"
                    value={data.dosage}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-6">
                  <p>Frequency and duration of use</p>
                  <input
                    type="text"
                    placeholder="Duration of use"
                    name="durationofuse"
                    value={data.durationofuse}
                    onChange={handleChange}
                    required
                    className="add-prescription-inputlst"
                  />
                </div>
                <div className="add-presc-button">
                  <button type="submit">Upload</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPrescription;
