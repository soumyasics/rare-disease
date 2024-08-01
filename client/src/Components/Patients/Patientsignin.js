import React, { useState } from "react";
import "../Patients/Patientsignin.css";
import img from "../../Assets/doctorimg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import axiosInstance from "../Constants/Baseurl";
import { useFormik } from "formik";
import { patientregschema } from "../Constants/Schema";

function Patientsignin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      gender: "",
      dob: "",
      password: "",
      confirmpassword: "",
      country: "",
      city: "",
      diseaseinfo: "",
      usertype: "",
      // healthrecord: null, 
      image: "",
    },
    validationSchema: patientregschema,
    onSubmit: (values) => {
      console.log("form submitted");
      // console.log(values);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("gender", values.gender);
      formData.append("dob", values.dob);
      formData.append("password", values.password);
      formData.append("confirmpassword", values.confirmpassword);
      formData.append("country", values.country);
      formData.append("city", values.city);
      formData.append("diseaseinfo", values.diseaseinfo);
      formData.append("usertype", values.usertype);
      // formData.append("files", values.healthrecord);
      formData.append("files", values.image);

      console.log(values);

      axiosInstance
        .post(`/registerpatient`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            alert("Registration Successful");
            navigate("/patinet-login");
          } else {
            alert(res.response.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.msg);
        });
    },
  });


  // const handleFileChange = (e) => {
  //   const { name, files } = e.target;
  //   setFieldValue({  [name]: files[0] });
  // };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // Update state using setFieldValue
    setFieldValue(name, files[0]);
  };
  
  return (
    <div className="patient-signin">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 patient-signin_img">
            <img src={img} alt="image" width="550px" height="600px" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 patient-signin">
            <p className="patient-signin">Create Your Account</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6 pb-3 patient-signin-input">
                  <input
                    type="text"
                    placeholder="Full name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.name && touched.name && (
                    <i className="error">{errors.name}</i>
                  )}
                </div>
                <div className="col-6 pb-3 patient-signin-input">
                  <input
                    type="email"
                    placeholder="Email id"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.email && touched.email && (
                    <i className="error">{errors.email}</i>
                  )}
                </div>
                <div className="col-6 pb-3 patient-signin-input">
                  <input
                    type="number"
                    placeholder="Contact"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.phone && touched.phone && (
                    <i className="error">{errors.phone}</i>
                  )}
                </div>
                <div className="col-6 pb-3 patient-signin-input">
                  <select
                    name="usertype"
                    value={values.usertype}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="" label="Select user type" disabled />
                    <option value="patient">Patient</option>
                    <option value="caregiver">Caregiver</option>
                  </select>
                  {errors.usertype && touched.usertype && (
                    <i className="error">{errors.usertype}</i>
                  )}
                </div>
                <div className="col-12 pb-3 patient-signin-radio">
                  <label htmlFor="gender" className="pb-3">
                    Gender:{" "}
                  </label>
                  <label htmlFor="male"> &nbsp;Male &nbsp;</label>
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.gender === "male"}
                  />
                  <label htmlFor="female">&nbsp;Female&nbsp;</label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.gender === "female"}
                  />
                  <label htmlFor="others">&nbsp;Others&nbsp;</label>
                  <input
                    type="radio"
                    id="others"
                    name="gender"
                    value="others"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    checked={values.gender === "others"}
                  />
                  {errors.gender && touched.gender && (
                    <i className="error">{errors.gender}</i>
                  )}
                </div>
                <div className="col-6 pb-3 patient-signin-input">
                  <input
                    type="text"
                    placeholder="Date of Birth"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.dob && touched.dob && (
                    <i className="error">{errors.dob}</i>
                  )}
                </div>
                <div className="col-6 pb-3 patient-signin-input">
                  <select
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  >
                    <option value="" label="Select country" disabled />
                    <option value="India">India</option>
                    <option value="France">France</option>
                    <option value="UK">UK</option>
                    <option value="US">US</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Germany">Germany</option>
                  </select>
                  {errors.country && touched.country && (
                    <i className="error">{errors.country}</i>
                  )}
                </div>
                <div className="col-6 pb-3 patient-signin-input">
                  <input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.city && touched.city && (
                    <i className="error">{errors.city}</i>
                  )}
                </div>
                <div className="col-12 pb-3 patient-signin-input">
                  <input
                    type="text"
                    placeholder="Rare Disease Information"
                    name="diseaseinfo"
                    value={values.diseaseinfo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.diseaseinfo && touched.diseaseinfo && (
                    <i className="error">{errors.diseaseinfo}</i>
                  )}
                </div>
                <div className="col-6 pb-3 patient-signin-input">
                {/* <span className="patient-signin-span">
                  Upload Health Record
                </span>
                <input
                  type="file"
                  name="healthrecord"
                  onChange={(e) => handleFileChange(e, "healthrecord")}
                  multiple
                  accept="image/*,application/pdf"
                  required
                />
                {errors.healthrecord && touched.healthrecord && (
                  <i className="error">{errors.healthrecord}</i>
                )} */}
              </div>
              <div className="col-6 pb-3 patient-signin-input">
                <span className="patient-signin-span">Upload Image</span>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleFileChange(e, "image")}
                  multiple
                  accept="image/*,application/pdf"
                  required
                />
                {errors.image && touched.image && (
                  <i className="error">{errors.image}</i>
                )}
              </div>
              
                  <div className="col-6 pb-3 patient-signin-input">
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                    </span>
                  </div>
                  {errors.password && touched.password && (
                    <i className="error">{errors.password}</i>
                  )}
                </div>
                <div className="col-6 pb-3 patient-signin-input">
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="ReEnter Password"
                      name="confirmpassword"
                      value={values.confirmpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <span
                      className="password-toggle-icon"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      {showConfirmPassword ? <RiEyeOffFill /> : <RiEyeFill />}
                    </span>
                  </div>
                  {errors.confirmpassword && touched.confirmpassword && (
                    <i className="error">{errors.confirmpassword}</i>
                  )}
                </div>
                <div className="col-12 pb-3 patient-signin-inputbutton">
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </div>
                <div className="col-12 pb-3 patient-signin-account">
                  <h6>
                    Already have an account?
                    <Link to="/patinet-login"> Login </Link>
                  </h6>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patientsignin;
