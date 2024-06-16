import React, { useEffect, useState } from "react";
import "../Admin/Viewuserpopup.css";
import img from "../../Assets/doctor.jpg";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../Constants/Baseurl";
import { toast } from "react-toastify";

function Viewuserpopup({onClose,user, userType, updateCounsellorRequests,updatehpreq}) {
  // const id=useParams()
  // console.log(id+"counsellor");

  const [userData, setUserData] = useState(null);
  const url = axiosInstance.defaults.url;
// const navigate=useNavigate()

useEffect(() => {
  const fetchUserData = async () => {
    try {
      let res;
      // console.log(res);
      if (userType === 'counsellor') {
        res = await axiosInstance.post(`viewcouncellorbyid/${user}`);
      } else if (userType === 'hp') {
        res = await axiosInstance.post(`viewhpbyid/${user}`);
        console.log(res);
      }
      setUserData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchUserData();
}, [user, userType]);

const acceptfn = async (id) => {
  try {
    let res;
    if (userType === 'counsellor') {
      res = await axiosInstance.post(`activatecouncellor/${id}`);
    } else if (userType === 'hp') {
      res = await axiosInstance.post(`activatehp/${id}`);
    }

    if (res.data.status === 200) {
      toast.success("Approved Successfully");
      updateCounsellorRequests();
      updatehpreq()
      onClose();
    }
  } catch (err) {
    console.log(err);
  }
};

const deletefn = async (id) => {
  try {
    let res;
    if (userType === 'counsellor') {
      res = await axiosInstance.post(`deletecounsellorreq/${id}`);
    } else if (userType === 'hp') {
      res = await axiosInstance.post(`deletehpreq/${id}`);
    }

    if (res.data.status === 200) {
      toast.success("Rejected Successfully");
      updateCounsellorRequests();
      updatehpreq()
      onClose();
    }
  } catch (err) {
    console.log(err);
  }
};



  return (
    <div className="modal-overlay">
      {/* <div className="modal-content modalhead" style={{color:"black"}}> */}
      <div className="profile-cardpop">
      <div className="profileuser-header">
        <button className="close-buttonuser" onClick={onClose}>&times;</button>
      </div>
      <div className="profileuser-content">
        <div className="profileuser-info">
          <div className="info-labels">
            <p>Name</p>
            <p>Contact Number</p>
            <p>Email Id</p>
            {userType === "counsellor" &&<p>Counsellor Register No</p>}
            {userType === 'hp' && <p>Medical Licence Number</p>}
            {userType === 'hp' && <p>Specialisation</p>}
            {userType === 'hp' && <p>Aadhar No</p>}
            {userType === 'hp' && <p>City</p>}
            {userType === 'hp' && <p>State</p>}
            {userType === 'hp' && <p>Year of Experience</p>}
            {userType === "counsellor" &&<p>Address</p>}
          </div>
          <div className="info-values">
            <p>: {userData?.name}</p>
            <p>: {userData?.phone}</p>
            <p>: {userData?.email}</p>
            <p>: {userData?.regno || userData?.licenceno}</p>
            <p>: {userData?.address || userData?.specialisation}</p>
            {userType === 'hp' && <p>: {userData?.aadharno}</p>}
            {userType === 'hp' && <p>: {userData?.city}</p>}
            {userType === 'hp' && <p>: {userData?.state}</p>}
            {userType === 'hp' && <p>: {userData?.yearofexp}</p>}
          </div>
        </div>
        <img 
          src={`${url}/${userData?.image?.filename}`} 
          alt="Counselor" 
          className="profile-pic"
        />
      </div>
      <div className="profile-actions">
        <button className="userapprove-button" onClick={() => acceptfn(userData._id)}>Approve</button>
        <button className="userreject-button" onClick={() => deletefn(userData._id)}>Reject</button>
      </div>
    </div>
        </div>
  );
}

export default Viewuserpopup;
