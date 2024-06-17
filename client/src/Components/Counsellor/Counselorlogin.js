import React, { useState } from 'react'
import {Link} from "react-router-dom"
import img from "../../Assets/iconlogin.png"
import axiosInstance from '../Constants/Baseurl';

function Counselorlogin() {
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
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axiosInstance.post(`counsellorlogin`,{email,password})
      .then((res)=>{
        console.log(res);
        if(res.data.status===200){
            alert("Login Successfully")
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

      <h2>Counsellor</h2>
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
          <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>          </button>
        </div>
        <a href="#" className="hpreset-password">Reset password</a>
      </div>
      <button type="submit" className="hplogin-button">LOGIN</button>
      <div className='hplofin-reg'>
        <p>New To Rare Care!<Link to="/healthcare-signin" style={{textDecoration:"none"}}><i>Register Now</i></Link> </p>
    </div>

    </form>
  </div>



  )
}

export default Counselorlogin