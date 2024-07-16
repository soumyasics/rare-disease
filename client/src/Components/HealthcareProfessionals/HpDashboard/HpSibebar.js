import React, { useEffect, useState } from 'react'
import "../HpDashboard/HpSidebar.css"
import { useNavigate,Link } from 'react-router-dom';
import imgappoinment from "../../../Assets/apponment.png"
import imgprisc from "../../../Assets/prescription2.png"
import imgrecord from "../../../Assets/record.png"
import imglogout from "../../../Assets/logout.png";
import imgchat from "../../../Assets/chat.png";
import imgblog from "../../../Assets/blog.png";
import axiosInstance from '../../Constants/Baseurl';
import Logoutpopu from '../../Common/Popups/Logoutpopu';



function HpSibebar() {
    const [isOpen, setIsOpen] = useState(true);
    const [isRequestsOpen, setIsRequestsOpen] = useState(false);
    const[readerid,setReaderid]=useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate=useNavigate()
    const url = axiosInstance.defaults.url;
    const [data,setData]=useState({})

  
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };
    const hpid=localStorage.getItem("healthcareid")
    console.log(hpid);
  

  
    // const toggleRequestsDropdown = (e) => {
    //   e.stopPropagation(); 
    //   setIsRequestsOpen(!isRequestsOpen);
    // };
    // const handleLogout = () => {
    //   localStorage.removeItem("healthcareid");
    //   window.location.reload(); 
    // };



    useEffect(()=>{
      if(hpid===null){
        navigate("/health-login")
      }
      else {
        axiosInstance.post(`viewhpbyid/${hpid}`)
        .then((result)=>{
            console.log(result);
            setData(result.data.data)
        })
        .catch((err)=>{
            console.log(err);
        })
      }
    },[])

    //logout Fuctionality

  
    const handleLogout = () => {
      setShowModal(true);
    };
  
    const confirmLogout = () => {
      localStorage.removeItem("healthcareid");
      setReaderid(null);
      setShowModal(false);
      navigate("/")
    };
  
    const closeModal = () => {
      setShowModal(false);
    };
  

  return (
    <div className="col-3">
    <div className="adminsidebar-container">
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="adminsidebar-content">
          <div className="adminsidebar-head d-flex counsellor-headimage" >
           <Link to="/health-profile"> <img src={`${url}/${data?.image?.filename}`} alt="admin" width="150px" height="150px"/></Link>
            <h4>{data.name}</h4>
          </div>

          <div className="sidebar-item">
            <Link to="/health-dashboard" style={{ textDecoration: "none", color: "white" }}>
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
          <Link to="/health-viewpatientrequests" style={{textDecoration:"none"}}>
          <div className="sidebar-item">
            <img src={imgappoinment} alt="patients" />
           <span className="adminsidebar-reqimg">Appoinments</span>
          </div></Link> 
          <Link to="/health-viewpatients" style={{textDecoration:"none"}}>
          <div className="sidebar-item">
            <img src={imgrecord} alt="healthcare" />
            <span className="adminsidebar-reqimg">Patient</span>
          </div></Link>
          <div className="sidebar-item">
            <img src={imgchat} alt="healthcare" />
            <span className="adminsidebar-reqimg">Chat With Patient</span>
          </div>

          {/* <div className="sidebar-item">
            <img src={imgprisc} alt="counsellor" />
            <span className="adminsidebar-reqimg">Prescription</span>
          </div> */}
                    <Link to="/health-viewmedicalreport" style={{textDecoration:"none"}}>
          <div className="sidebar-item">
            <img src={imgblog} alt="healthcare" />
            <span className="adminsidebar-reqimg">Medical Reports</span>
          </div></Link>

          <div className="sidebar-item">
            <img src={imglogout} alt="logout" />
            <span className="adminsidebar-reqimg" onClick={handleLogout}>Logout</span>
            <Logoutpopu show={showModal} onClose={closeModal} onConfirm={confirmLogout} />

          </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default HpSibebar