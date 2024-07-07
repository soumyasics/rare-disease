import React, { useEffect, useState } from "react";
import imgprofileicon from "../../../Assets/counsellor1.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";
import "./Hpprofileview.css";

function Hpprofileview() {
  const hpid = localStorage.getItem("healthcareid");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    state: "",
    city:"",
    licenceno:"",
    aadharno:"",
    yearofexp:"",
    specialisation:"",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  const url = axiosInstance.defaults.url;

  useEffect(() => {
    if (hpid === null) {
      navigate("/counsellor-login");
    } else {
      axiosInstance
        .post(`viewhpbyid/${hpid}`)
        .then((result) => {
          console.log(result);
          setData(result.data.data);
          setFormData({
            name: result.data.data.name,
            phone: result.data.data.phone,
            email: result.data.data.email,
            state: result.data.data.state,
            city:result.data.data.city,
            licenceno:result.data.data.licenceno,
            aadharno:result.data.data.aadharno,
            yearofexp:result.data.data.yearofexp,
            specialisation:result.data.data.specialisation,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [hpid, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: data.name,
      phone: data.phone,
      email: data.email,
      state: data.state,
      city: data.city,
      licenceno: data.licenceno,
      aadharno: data.aadharno,
      yearofexp: data.yearofexp,
      specialisation: data.specialisation,
    });
    setSelectedFile(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validateForm = () => {
    const phonePattern = /^\d{10}$/;
    const aadharPattern = /^\d{12}$/;
    const yearOfExpPattern = /^\d{1,3}$/;

    if (!phonePattern.test(formData.phone)) {
      toast.info("Phone number must have exactly 10 digits and cannot be negative.");
      return false;
    }

    if (formData.licenceno.length < 10) {
      toast.info("License number must have at least 10 characters.");
      return false;
    }

    if (!aadharPattern.test(formData.aadharno)) {
      toast.info("Aadhar number must have exactly 12 digits and cannot be negative.");
      return false;
    }

    if (!yearOfExpPattern.test(formData.yearofexp) || formData.yearofexp <= 0) {
      toast.info("Years of experience must be a positive number and cannot be more than 3 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("phone", formData.phone);
    updateData.append("email", formData.email);
    updateData.append("state", formData.state);
    updateData.append("city", formData.city);
    updateData.append("licenceno", formData.licenceno);
    updateData.append("aadharno", formData.aadharno);
    updateData.append("yearofexp", formData.yearofexp);
    updateData.append("specialisation", formData.specialisation);

    if (selectedFile) {
      updateData.append("image", selectedFile);
    }

    axiosInstance
      .post(`hpupdateprofile/${hpid}`, updateData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result);
        if (result.data.status === 200) {
          toast.success("Updated Successfully");
        }
        setData({
          ...formData,
          image: result.data.data.image.filename,
        });
        window.location.reload();
        setIsEditing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="col-9 Counsellorprofile-mainbox">
      <div className="hpprofile-box">
        <div className="counsellorprofile-head">
          <p>My Profile</p>
        </div>
        <div className="d-flex counsellorprofile-datamainclass">
          <div className="col-3 counsellorprofileimg">
            {isEditing ? (
              <input
                type="file"
                style={{ paddingTop: "30px" }}
                onChange={handleFileChange}
              />
            ) : (
              <img
                src={
                  data?.image?.filename
                    ? `${url}/${data.image.filename}?timestamp=${imageTimestamp}`
                    : imgprofileicon
                }
                alt="profile"
                width="150px"
                height="150px"
              />
            )}
          </div>
          <div className="col-4 counsellorprofile-name">
            <p>Name</p>
            <p>Contact No</p>

            {isEditing ? (
              <p style={{ paddingTop: "10px" }}>Email</p>
            ) : (
              <p>Email</p>
            )}
            {isEditing ? (
              <p style={{ paddingTop: "20px" }}>Specialisation</p>
            ) : (
              <p>Specialisation</p>
            )}

            {isEditing ? (
              <p style={{ paddingTop: "15px" }}>State/Province</p>
            ) : (
              <p>State/Province</p>
            )}

            <p>City</p>
            {isEditing ? (
              <p style={{ paddingTop: "20px" }}>Medical License Number</p>
            ) : (
              <p>Medical License Number</p>
            )}

            {isEditing ? (
              <p style={{ paddingTop: "15px" }}>Aadhar Number</p>
            ) : (
              <p>Aadhar Number</p>
            )}

            <p>Year Of Exp</p>
          </div>
          <div className="col-4 counsellorprofile-data">
            {isEditing ? (
              <>
                <p>
                  :{" "}
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  :{" "}
                  <input
                    type="number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  :{" "}
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  :{" "}
                  <input
                    type="text"
                    name="specialisation"
                    value={formData.specialisation}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  :{" "}
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  :{" "}
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  :{" "}
                  <input
                    type="text"
                    name="licenceno"
                    value={formData.licenceno}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  :{" "}
                  <input
                    type="number"
                    name="aadharno"
                    value={formData.aadharno}
                    onChange={handleChange}
                    required
                  />
                </p>
                <p>
                  :{" "}
                  <input
                    type="number"
                    name="yearofexp"
                    value={formData.yearofexp}
                    onChange={handleChange}
                    required
                  />
                </p>
              </>
            ) : (
              <>
                <p>: {data?.name}</p>
                <p>: {data?.phone}</p>
                <p>: {data?.email}</p>
                <p>: {data?.specialisation}</p>
                <p>: {data?.state}</p>
                <p>: {data?.city}</p>
                <p>: {data?.licenceno}</p>
                <p>: {data?.aadharno}</p>
                <p>: {data?.yearofexp}</p>
              </>
            )}
          </div>
        </div>
        <div className="d-flex counsellorprofile-button">
          <div className="col-6 counsellorprofile-button1">
            {isEditing ? (
              <button type="submit" form="profile-form" onClick={handleSubmit}>
                Update
              </button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>
          {isEditing && (
            <div className="col-6 counsellorprofile-button2">
              <button onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hpprofileview;
