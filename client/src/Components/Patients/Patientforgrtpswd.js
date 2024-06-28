import React, { useState } from 'react';
import "../Patients/Patientforgetpsrd.css";
import img from "../../Assets/iconlogin.png";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../Constants/Baseurl';

function Patientforgrtpswd() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [lengthError, setLengthError] = useState('');
  const [uppercaseError, setUppercaseError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [matchError, setMatchError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setLengthError('');
    setUppercaseError('');
    setNumberError('');
    setMatchError('');
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setMatchError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const validatePassword = (password) => {
    let isValid = true;

    if (password.length < 8) {
      setLengthError('Password must be at least 8 characters long.');
      isValid = false;
    }

    if (!/[A-Z]/.test(password)) {
      setUppercaseError('Password must contain at least one uppercase letter.');
      isValid = false;
    }

    if (!/[0-9]/.test(password)) {
      setNumberError('Password must contain at least one number.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate passwords
    const isPasswordValid = validatePassword(password);
    const doPasswordsMatch = password === newPassword;

    if (!isPasswordValid) {
      return;
    }

    if (!doPasswordsMatch) {
      setMatchError('Passwords do not match.');
      return;
    }

    axiosInstance.post(`forgotPwdpatient`, { email, password, newPassword })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          alert("Password reset successfully");
          navigate("/patinet-login"); 
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <div className="hplogin-container">
      <form className="hplogin-form" onSubmit={handleSubmit}>
     <Link to="/patinet-login" style={{textDecoration:"none",color:"black"}}> <i className="ri-arrow-left-line arrow-icon" style={{marginRight:"400px",fontSize:"30px"}}></i></Link>
        <div className="hplogin-icon">
          <img src={img} alt="icon" />
        </div>

        <h2>Forgot Password</h2>
        <div className="hploginform-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter Email"
            required
          />
        </div>

        <div className="hploginform-group">
          <label htmlFor="password">New Password</label>
          <div className="hppassword-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter New Password"
              required
            />
            <button type="button" onClick={togglePasswordVisibility}>
              <i className={showPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
            </button>
          </div>
          {lengthError && <p className="error-message">{lengthError}</p>}
          {uppercaseError && <p className="error-message">{uppercaseError}</p>}
          {numberError && <p className="error-message">{numberError}</p>}
        </div>

        <div className="hploginform-group">
          <label htmlFor="newPassword">Re-Enter New Password</label>
          <div className="hppassword-container">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Re-Enter New Password"
              required
            />
            <button type="button" onClick={toggleNewPasswordVisibility}>
              <i className={showNewPassword ? 'ri-eye-off-line' : 'ri-eye-line'}></i>
            </button>
          </div>
          {matchError && <p className="error-message">{matchError}</p>}
        </div>

        <button type="submit" className="hplogin-button" style={{width:"417px",marginLeft:"-10px"}}>Reset Password</button>
      </form>
    </div>
  );
}

export default Patientforgrtpswd;
