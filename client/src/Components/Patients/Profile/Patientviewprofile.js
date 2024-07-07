import React, { useEffect, useState } from "react";
import "./Patientviewprofile.css";
import img from "../../../Assets/doctorimg.jpg";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Patientviewprofile = () => {
  const patientid = localStorage.getItem("patientid");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const url = axiosInstance.defaults.url;

  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    housename: "",
    street: "",
    city: "",
    state: "",
    country: "",
    diseaseinfo: "",
    healthrecord: "",
    image: "",
    dob: "",
    gender: "",
    usertype: "",
  });

  useEffect(() => {
    if (!patientid) {
      navigate("/");
    } else {
      axiosInstance
        .post(`viewallpatientbyid/${patientid}`)
        .then((result) => {
          setData(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [patientid, navigate]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };
// console.log(data);
  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.number()
      .typeError("Phone number must be a number")
      .integer("Phone number cannot be negative")
      .min(1000000000, "Phone number must be 10 digits")
      .max(9999999999, "Phone number must be 10 digits")
      .required("Phone number is required"),
    dob: Yup.date()
      .max(new Date(), "DOB cannot be a future date")
      .required("Date of Birth is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
    city: Yup.string().required("City is required"),
    usertype: Yup.string().required("User type is required"),
    diseaseinfo: Yup.string().required("Disease information is required"),
  });

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone);
      formData.append("email", values.email);
      formData.append("housename", values.housename);
      formData.append("street", values.street);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("country", values.country);
      formData.append("diseaseinfo", values.diseaseinfo);
      formData.append("dob", values.dob);
      formData.append("gender", values.gender);
      formData.append("usertype", values.usertype);
      if (values.image) {
        formData.append("files", values.image);
      }
      if (values.healthrecord) {
        formData.append("files", values.healthrecord);
      }
            console.log(values);
      axiosInstance
        .post(`updatepatientprofile/${patientid}`, formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            toast.success("Updated Successfully");
            setIsEditing(false);
            setData(res.data.data)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className="patientprofile-container">
      <div className="patient-profile-main">
        <div className="container">
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-4 sm-4 lg-4 patient-profile-image ">
                {isEditing ? (
                  <div style={{ paddingTop: "20px" }}>
                    <h5>Update Profile Image</h5>
                    <input
                      type="file"
                      name="image"
                      onChange={(event) => {
                        formik.setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    />
                  </div>
                ) : (
                  <img
                    src={data.image ? `${url}/${data.image.filename}` : img}
                    alt="profileimg"
                    width="180"
                    height="190"
                  />
                )}
              </div>
              <div className="col-8 sm-8 patient-profile-head">
                <h6>UserProfile</h6>
                <div className="row patient-profile-content">
                  <div className="col-4">
                    <p>Full Name</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          value={formik.values.name}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div className="error">{formik.errors.name}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.name}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>Email Id</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <input
                          type="email"
                          name="email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                          <div className="error">{formik.errors.email}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.email}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>Contact Number</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <input
                          type="number"
                          name="phone"
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                          <div className="error">{formik.errors.phone}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.phone}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>Date Of Birth</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <input
                          type="date"
                          name="dob"
                          value={formik.values.dob}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.dob && formik.errors.dob && (
                          <div className="error">{formik.errors.dob}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.dob}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>Gender</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <select
                          name="gender"
                          value={formik.values.gender}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option hidden>Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender && (
                          <div className="error">{formik.errors.gender}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.gender}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>Country</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          name="country"
                          value={formik.values.country}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.country && formik.errors.country && (
                          <div className="error">{formik.errors.country}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.country}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>City</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          name="city"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.city && formik.errors.city && (
                          <div className="error">{formik.errors.city}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.city}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>Patient /Care Givers</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <select
                          name="usertype"
                          value={formik.values.usertype}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          <option hidden>Select Usertype</option>
                          <option value="Patient">Patient</option>
                          <option value="Care Giver">Care Giver</option>
                        </select>
                        {formik.touched.usertype && formik.errors.usertype && (
                          <div className="error">{formik.errors.usertype}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.usertype}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>Rare disease information</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          name="diseaseinfo"
                          value={formik.values.diseaseinfo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.diseaseinfo && formik.errors.diseaseinfo && (
                          <div className="error">{formik.errors.diseaseinfo}</div>
                        )}
                      </>
                    ) : (
                      <>: {data?.diseaseinfo}</>
                    )}
                  </div>
                  <div className="col-4">
                    <p>Upload health records</p>
                  </div>
                  <div className="col-8">
                    {isEditing ? (
                      <>
                        <input
                          type="file"
                          name="healthrecord"
                          onChange={(event) => {
                            formik.setFieldValue("healthrecord", event.currentTarget.files[0]);
                          }}
                        />
                      </>
                    ) : (
                      <>: {data?.healthrecord?.filename}</>
                    )}
                  </div>
                  <div className="col-4 patient-profile-button">
                    {isEditing ? (
                      <>
                        <div className="d-flex">
                          <button type="submit">Save</button>
                          <button type="button" onClick={handleCancelClick}>
                            Cancel
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button type="button" onClick={handleEditClick}>
                          Edit
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Patientviewprofile;
