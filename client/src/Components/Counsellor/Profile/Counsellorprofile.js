import React, { useEffect, useState } from "react";
import "../Profile/Counsellorprofile.css";
import imgprofileicon from "../../../Assets/counsellor1.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";

function Counsellorprofile() {
  const counselorid = localStorage.getItem("counsellorlogin");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    regno: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  const url = axiosInstance.defaults.url;

  useEffect(() => {
    if (counselorid === null) {
      navigate("/counsellor-login");
    } else {
      axiosInstance
        .post(`viewcouncellorbyid/${counselorid}`)
        .then((result) => {
          console.log(result);
          setData(result.data.data);
          setFormData({
            name: result.data.data.name,
            phone: result.data.data.phone,
            email: result.data.data.email,
            regno: result.data.data.regno,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [counselorid, navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      name: data.name,
      phone: data.phone,
      email: data.email,
      regno: data.regno,
    });
    setSelectedFile(null);
    setErrors({});
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

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be a 10-digit number";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.regno) newErrors.regno = "Registration number is required";
    else if (formData.regno.length < 8) newErrors.regno = "Registration number must be at least 8 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updateData = new FormData();
    updateData.append("name", formData.name);
    updateData.append("phone", formData.phone);
    updateData.append("email", formData.email);
    updateData.append("regno", formData.regno);

    if (selectedFile) {
      updateData.append("image", selectedFile);
    }

    axiosInstance
      .post(`updatecounsellor/${counselorid}`, updateData, {
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
      <div className="counsellorprofile-box">
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
              <>
                <p style={{ paddingTop: "15px" }}>Email Id</p>
              </>
            ) : (
              <p>Email Id</p>
            )}

            {isEditing ? (
              <>
                <p style={{ paddingTop: "20px" }}>Counsellor Registration Number</p>
              </>
            ) : (
              <p>Counsellor Registration Number</p>
            )}
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
                  />
                  {errors.name && <span className="error">{errors.name}</span>}
                </p>
                <p>
                  :{" "}
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="error">{errors.phone}</span>}
                </p>
                <p>
                  :{" "}
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error">{errors.email}</span>}
                </p>
                <p>
                  :{" "}
                  <input
                    type="text"
                    name="regno"
                    value={formData.regno}
                    onChange={handleChange}
                  />
                  {errors.regno && <span className="error">{errors.regno}</span>}
                </p>
              </>
            ) : (
              <>
                <p>: {data.name}</p>
                <p>: {data.phone}</p>
                <p>: {data.email}</p>
                <p>: {data.regno}</p>
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

export default Counsellorprofile;
