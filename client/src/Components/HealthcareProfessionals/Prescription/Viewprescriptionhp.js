import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";

function Viewprescriptionhp() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [patientInfo, setPatientInfo] = useState({
    description: "",
    medicalcode: "",
    nameofmedicine: "",
    dosage: "",
    durationofuse: ""
  });
  const navigate = useNavigate();
  const [editmode, setEditmode] = useState(false);

  useEffect(() => {
    axiosInstance
      .post(`viewprescbyappoinmntid/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data || {});
        setPatientInfo({
          description: res.data.data?.description || "",
          medicalcode: res.data.data?.medicalcode || "",
          nameofmedicine: res.data.data?.nameofmedicine || "",
          dosage: res.data.data?.dosage || "",
          durationofuse: res.data.data?.durationofuse || ""
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const navbck = () => {
    navigate(-1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const saveChanges = () => {
    // Add validation here
    if (!patientInfo.description || !patientInfo.medicalcode || !patientInfo.nameofmedicine || !patientInfo.dosage || !patientInfo.durationofuse) {
      alert("All fields are required");
      return;
    }

    axiosInstance
      .post(`editprescbyid/${data._id}`, patientInfo)
      .then((res) => {
        console.log(res);
        setEditmode(false);
        // Optionally update the data with the response
        setData((prevData) => ({ ...prevData, ...patientInfo }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isEmpty = Object.keys(data).length === 0;
  const enableedit = () => {
    setEditmode(true);
  };

  return (
    <div>
      <div className="container view-pat-hrec">
        <Link
          onClick={navbck}
          className="ri-arrow-left-line"
          style={{ textDecoration: "none" }}
        ></Link>
        <div className="view-pat-prescription">
          <h1>Prescription</h1>
        </div>
        <hr />
        {isEmpty ? (
          <h3>Please add a prescription</h3>
        ) : (
          <div className="row view-pat-prescription-pd edit-viewhppresc">
            <div className="col-12 view-pat-hrcontent-main">
              <div className="row ">
                <div className="view-pat-hrechead">
                  <h1>Patient Information</h1>
                </div>
                <div className="col-4">
                  <h3>Name</h3>
                </div>
                <div className="col-8">
                  <p>: {data?.patientId?.name}</p>
                </div>
                <div className="col-4">
                  <h3>Date Of Birth</h3>
                </div>
                <div className="col-8">
                  <p>: {data?.patientId?.dob}</p>
                </div>
                <div className="col-4">
                  <h3>Gender</h3>
                </div>
                <div className="col-8">
                  <p>: {data?.patientId?.gender}</p>
                </div>
                <div className="view-pat-hrechead">
                  <h1>Diagnosis</h1>
                </div>
                <div className="col-4">
                  <h3>Description</h3>
                </div>
                <div className="col-8 view-pat-hrcontent-edit">
                  {editmode ? (
                    <textarea
                      name="description"
                      value={patientInfo.description}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>: {data?.description}</p>
                  )}
                </div>
                <div className="col-4">
                  <h3>Medical Code</h3>
                </div>
                <div className="col-8">
                  {editmode ? (
                    <input
                      type="text"
                      name="medicalcode"
                      value={patientInfo.medicalcode}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>: {data?.medicalcode}</p>
                  )}
                </div>
                <div className="view-pat-hrechead">
                  <h1>Medication</h1>
                </div>
                <div className="col-4">
                  <h3>Name of Medicine</h3>
                </div>
                <div className="col-8">
                  {editmode ? (
                    <input
                      type="text"
                      name="nameofmedicine"
                      value={patientInfo.nameofmedicine}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>: {data?.nameofmedicine}</p>
                  )}
                </div>
                <div className="col-4">
                  <h3>Dosage</h3>
                </div>
                <div className="col-8">
                  {editmode ? (
                    <input
                      type="text"
                      name="dosage"
                      value={patientInfo.dosage}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>: {data?.dosage}</p>
                  )}
                </div>
                <div className="col-4">
                  <h3>Frequency and Duration of Use</h3>
                </div>
                <div className="col-8">
                  {editmode ? (
                    <input
                      type="text"
                      name="durationofuse"
                      value={patientInfo.durationofuse}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>: {data?.durationofuse}</p>
                  )}
                </div>
                <div>
                  {editmode ? (
                    <>
                      <button type="button" onClick={saveChanges}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" onClick={enableedit}>
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Viewprescriptionhp;
