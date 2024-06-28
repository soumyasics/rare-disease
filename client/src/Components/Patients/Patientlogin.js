import React, { useState } from "react";
import "../Patients/Patientlogin.css";
import img from "../../Assets/iconlogin.png"
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../Constants/Baseurl';


function Patientlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

//   console.log(username,password);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post(`patientlogin`,{email,password})
    .then((res)=>{
      console.log(res);
      if(res.data.status===200){
          localStorage.setItem("counsellorlogin", res.data.id)
           alert("Login Successfully")
          // navigate("/counsellor-dashboard")
      }
      else{
          alert(res.data.msg)
      }
    })
    .catch((err)=>{
      console.log(err);
      alert(err.response.data.message)

    })

  };

  return (
    <div className="hplogin-container">
    <form className="hplogin-form" onSubmit={handleSubmit}>
    <div className="hplogin-icon">
        <img src={img} alt="icon" />
      </div>

      <h2>Patient</h2>
      <div className="hploginform-group">
        <label htmlFor="username">Email</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={handleUsernameChange}
          placeholder="Enter Email"
          required
        />
      </div>
      <div className="hploginform-group">
        <label htmlFor="password">Password</label>
        <div className="hppassword-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter Password"
            required
          />
          <button type="button" onClick={togglePasswordVisibility}>
          <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>  
                  </button>
        </div>
        <Link className="hpreset-password" to="/patient-forgetpswd">Reset password</Link>
      </div>
      <button type="submit" className="hplogin-button">LOGIN</button>
      <div className='hplofin-reg'>
        <p>New To Rare Care!<Link to="/patient_signin" style={{textDecoration:"none"}}><i>Register Now</i></Link> </p>
    </div>

    </form>
  </div>
  );
}

export default Patientlogin;
