import React, { useEffect, useState } from 'react'
import "../../Counsellor/Dashboard/Counsellorsidebar.css"
import imgprofileicon from "../../../Assets/counsellor1.jpg"
import { Link, useNavigate } from 'react-router-dom';
import imgappoinment from "../../../Assets/apponment.png"
import imgprisc from "../../../Assets/prescription2.png"
import imgrecord from "../../../Assets/record.png"
import imglogout from "../../../Assets/logout.png";
import imgchat from "../../../Assets/chat.png";
import imgblog from "../../../Assets/blog.png";
import axiosInstance from '../../Constants/Baseurl';


function Counsellorsidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isRequestsOpen, setIsRequestsOpen] = useState(false);
    const navigate=useNavigate()
    const url = axiosInstance.defaults.url;
    const [data,setData]=useState({})

  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const counselorid=localStorage.getItem("counsellorlogin")
    console.log(counselorid);
  

  
    // const toggleRequestsDropdown = (e) => {
    //   e.stopPropagation(); 
    //   setIsRequestsOpen(!isRequestsOpen);
    // };
    // const adminid=localStorage.getItem("adminid")
    // console.log(adminid+"admin");
    const handleLogout = () => {
      localStorage.removeItem("counsellorlogin");
      window.location.reload(); 
    };
    useEffect(()=>{
      if(counselorid===null){
        navigate("/counsellor-login")
      }
      else {
        axiosInstance.post(`viewcouncellorbyid/${counselorid}`)
        .then((result)=>{
            console.log(result);
            setData(result.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
      }
    },[])

  return (
    <div className="col-3">
    <div className="adminsidebar-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="adminsidebar-content">
          <div className="adminsidebar-head d-flex counsellor-headimage" >
           <Link to="/counsellor-priofile"> <img src={`${url}/${data?.image?.filename}`} alt="admin" width="150px" height="150px"/></Link>
            <h4>{data.name}</h4>
          </div>

          <div className="sidebar-item">
            <Link to="/counsellor-dashboard" style={{ textDecoration: "none", color: "white" }}>
              Dashboard
            </Link>
          </div>
          {/* <div className="sidebar-item" onClick={toggleRequestsDropdown}>
            <img src={imgreq} alt="requests" />
            <span className="adminsidebar-reqimg">Requests</span>
            {isRequestsOpen && (
              <div className="admindrop-main" onClick={(e) => e.stopPropagation()}>
                <Link to="/admin-counsellorreq" style={{ textDecoration: "none", color: "white" }}><div className="dropdown-item">Counsellor Request</div></Link>
                <Link to="/admin-hprequest" style={{ textDecoration: "none", color: "white" }}><div className="dropdown-item">Hcp Request</div></Link>
               
                </div>
              // <div className="dropdown-menu">
              //   <div className="dropdown-item">Counsellor Request</div>
              //   <div className="dropdown-item">HCP Request</div>
              // </div>
            )}
          </div> */}
          <div className="sidebar-item">
            <img src={imgappoinment} alt="patients" />
           <Link to="/counsellor-viewpatientappoinmnt" style={{textDecoration:"none"}}><span className="adminsidebar-reqimg">Appoinments</span></Link> 
          </div>
          <div className="sidebar-item">
            <img src={imgprisc} alt="counsellor" />
            <Link to="/" style={{textDecoration:"none"}}> <span className="adminsidebar-reqimg">Prescription</span></Link>
          </div>
          <div className="sidebar-item">
            <img src={imgrecord} alt="healthcare" />
            <Link to="/counsellor-viewpatientrecord" style={{textDecoration:"none"}}> <span className="adminsidebar-reqimg">Patient Records</span></Link>
          </div>
          <div className="sidebar-item">
            <img src={imgchat} alt="healthcare" />
            <span className="adminsidebar-reqimg">Chat With Patient</span>
          </div>
          <Link to="/counsellor-addblog" style={{textDecoration:"none"}}> <div className="sidebar-item">
            <img src={imgblog} alt="healthcare" />
            <span className="adminsidebar-reqimg">Blogs</span>
          </div></Link>
          <Link to="/counsellor-viewblog" style={{textDecoration:"none"}}> <div className="sidebar-item">
            <img src={imgblog} alt="healthcare" />
            <span className="adminsidebar-reqimg">View Blogs</span>
          </div></Link>

          <div className="sidebar-item">
            <img src={imglogout} alt="logout" />
            <span className="adminsidebar-reqimg" onClick={handleLogout}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Counsellorsidebar