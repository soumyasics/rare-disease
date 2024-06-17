import React, { useState } from 'react'
import "../Admin/Adminlogin.css"
import img from "../../Assets/iconlogin.png"
import { useNavigate } from 'react-router-dom';


function Adminlogin() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate=useNavigate()

  let userName="Admin"
  let Passw0rd="Admin@123"

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
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
    if(userName===username){
        if(Passw0rd===password){
            alert("Login Successsfully")
            navigate("/admin-dashboard")
            localStorage.setItem("adminid",1)
        }
        else{
            alert("Password Error")
        }
    }
    else{
        alert("Username error")
    }
  };
  return (
    <div className="adminlogin-container">
    <form className="adminlogin-form" onSubmit={handleSubmit}>
    <div className="hplogin-icon">
        <img src={img} alt="icon" />
      </div>

      <h2>Admin</h2>
      <div className="adminform-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter Username"
          required
        />
      </div>
      <div className="adminform-group">
        <label htmlFor="password">Password</label>
        <div className="adminpassword-container">
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
        <a href="#" className="adminreset-password">Reset password</a>
      </div>
      <button type="submit" className="adminlogin-button">LOGIN</button>
    </form>
  </div>
  )
}

export default Adminlogin