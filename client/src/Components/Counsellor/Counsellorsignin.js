import React, { useState } from "react";
import img from "../../Assets/regimg.png";
import { Link, useNavigate } from "react-router-dom";
import "../Counsellor/Counsellorsignin.css";
import axiosInstance from "../Constants/Baseurl";
import { useFormik } from "formik";
import { counsellorRegSchema } from "../Constants/Schema";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function Counsellorsignin() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate=useNavigate()
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [error, setError] = useState('');
  const onSubmit = (e) => {
    
    // e.preventDefault()
    const passwordRule =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (values.phone.toString().length !== 10) {
      alert("Contact number must be a 10-digit number");
      return;
    }
    if (values.regno.toString().length !== 9) {
      alert("Registration number must be a 9-digit number");
      return;
    }

    if (!passwordRule.test(values.password)) {
      alert("Password must meet the specified criteria");
      return;
    }

    if (values.password !== values.confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    axiosInstance
      .post(`/counsellorregistration`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          alert("Registration Successful");
          navigate("/counsellor-login")
        } else {
          alert(res.response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.msg);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const { values, errors, touched, handleBlur, setFieldValue, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
        address: "",
        phone: "",
        regno: "",
        image: "",
      },
      validationSchema: counsellorRegSchema,
      onSubmit: onSubmit,
    });
  console.log(values);
  const handleImageChange = (event) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div className="patient-signin">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 patient-signin_img">
            <img
              src={img}
              alt="image"
              width="650px"
              height="600px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 patient-signin">
            <p className="patient-signin">Create Your Account</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-8 pb-3 patient-signin-input">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
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
                <div className="col-8 pb-3 patient-signin-input">
                  <input
                    type="number"
                    placeholder="Enter Contact No"
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
                <div className="col-8 pb-3 patient-signin-input">
                  <input
                    type="email"
                    placeholder="Enter Email"
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
                <div className="col-8 pb-3 patient-signin-input">
                  <input
                    type="text"
                    placeholder="Enter Reg No"
                    name="regno"
                    value={values.regno}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.regno && touched.regno && (
                    <i className="error">{errors.regno}</i>
                  )}
                </div>
                <div className="col-8 pb-3 patient-signin-input">
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    onBlur={handleBlur}
                    required
                  />
                </div>

                <div className="col-8 pb-3 patient-signin-input">
                  <textarea
                    placeholder="Enter Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {errors.address && touched.address && (
                    <i className="error">{errors.address}</i>
                  )}
                </div>
                {/* <div className="col-6 pb-3 patient-signin-input"></div> */}
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
                  {error && <i style={{ color: 'red' }}>{error}</i>}
                  {/* {errors.confirmpassword && touched.confirmpassword && (
                    <i className="error">{errors.confirmpassword}</i>
                  )} */}
                </div>                <div className="col-12 pb-3 patient-signin-inputbutton ">
                  <button type="submit" className="btn btn-primary" style={{marginLeft:"70px"}}>
                    Register
                  </button>
                  {/* <button type="reset" className="btn btn-primary">
                    Cancel
                  </button> */}
                </div>
                <div className="col-12 pb-3 patient-signin-account">
                  <h6>
                    Already have an account?<Link to="/counsellor-login"> Login </Link>
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

export default Counsellorsignin;
