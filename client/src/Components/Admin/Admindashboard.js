import React, { useEffect, useState } from "react";
import "./Admindashboard.css";
import imgicon from "../../Assets/counsellorpic.png";
import Viewuserpopup from "./Viewuserpopup";
import axiosInstance from "../Constants/Baseurl";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react"
import lottieimg from "../../Assets/lottienodataanimation.json"
import lottieimg2 from "../../Assets/lottiedata2.json"


function Admindashboard() {
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // New state to keep track of user type
  const [counsellor, setCounsellor] = useState([]);
  const [hp, setHp] = useState([]);
  const [counsellorcount,setCounsellorcount]=useState([])
  const [hpcount,sethpcount]=useState([])
  const [patientcount,setpatientcount]=useState([])

  const url = axiosInstance.defaults.url;

  const adminid=localStorage.getItem("adminid")
  console.log(adminid+"adminid");
  const navigate=useNavigate()
  useEffect(()=>{
    if(adminid===null){
      navigate("/admin-login")
    }

  },[])

  const openModal = (user, type) => {
    setCurrentUser(user);
    setUserType(type); // Set the user type
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentUser(null);
    setUserType(null); // Reset the user type
  };

  // Counsellor requests
  const updateCounsellorRequests = () => {
    axiosInstance
      .post(`viewcouncellorreq`)
      .then((res) => {
        console.log(res);
        setCounsellor(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateCounsellorRequests();
  }, []);

  // HP requests
  const updatehpreq=()=>{
    axiosInstance
      .post(`viewhprequest`)
      .then((res) => {
        console.log(res);
        setHp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }
  useEffect(() => {
    updatehpreq();
  }, []);


  //counsellor count view
  useEffect(()=>{
    axiosInstance.post(`viewallhp`)
    .then((res)=>{
      console.log(res);
      sethpcount(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  useEffect(()=>{
    axiosInstance.post(`viewallcounsellor`)
    .then((res)=>{
      console.log(res);
      setCounsellorcount(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])
  useEffect(()=>{
    axiosInstance.post(`viewallhp`)
    .then((res)=>{
      console.log(res);
      setpatientcount(res.data.data)
    })
    .catch((err) => {
      console.log(err);
    });
  },[])

  return (
    <div className="col-9 admindash-main">
      <div className="admindash">
        <header className="Admindash-header">
          <div className="stats">
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">{patientcount.length}</div>
              </div>
              <div className="stat-label">Total Patients</div>
            </div>
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">{hpcount.length}</div>
              </div>
              <div className="stat-label">Total Health Care Professionals</div>
            </div>
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">{counsellorcount.length}</div>
              </div>
              <div className="stat-label">Total Counsellors</div>
            </div>
          </div>
          <h2 className="admindash-headh2">Recent Request</h2>
        </header>

        <div className="admindash-counsellor">
          <div className="admindash-shrink">Counsellor</div>
          <div className="row d-flex">
            {counsellor && counsellor.length ? (
              counsellor.slice(0, 3).map((a) => {
                return (
                  <div key={a?._id} className="col-4 admindash-counsellorcount">
                    <div className="counsellor-dashpic row d-flex">
                      <div className="col-2">
                        <img
                          src={`${url}/${a?.image?.filename}`}
                          alt="image icon"
                          className="avatar"
                        />
                      </div>
                      <div className="col-10">
                        <p>{a?.name}</p>
                        <p className="registration-number">
                          Registration No: {a?.regno}
                        </p>
                      </div>
                    </div>
                    <div
                      className="view-moreadmindash"
                      onClick={() => openModal(a?._id, 'counsellor')}
                    >
                      view more
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="viewcounsellor-lottie">
              <Lottie animationData={lottieimg} style={{ width: 150, height: 150 }} />
            </div>       
               )}

            {counsellor?.length > 0 && counsellor?.length >= 3 && (
             <Link to="/admin-counsellorreq" style={{textDecoration:"none"}}><p className="admindash-counsellorviewall">
                View all
                <span className="ri-arrow-right-s-line" />
              </p></Link> 
            )}
          </div>
        </div>
        <br />

        <div className="admindash-counsellor">
          <div className="admindash-shrink" style={{ width: "307px" }}>
            Health Care Professionals
          </div>
          <div className="row d-flex">
            {hp && hp.length ? (
              hp.slice(0, 3).map((e) => {
                return (
                  <div key={e?._id} className="col-4 admindash-counsellorcount">
                    <div className="counsellor-dashpic row d-flex">
                      <div className="col-2">
                        <img
                          src={`${url}/${e?.image?.filename}`}
                          alt="image icon"
                          className="avatar"
                        />
                      </div>
                      <div className="col-10">
                        <p>{e?.name}</p>
                        <p className="registration-number">
                          Registration No: <br />
                          {e?.licenceno}
                        </p>
                      </div>
                    </div>
                    <div
                      className="view-moreadmindash"
                      onClick={() => openModal(e?._id, 'hp')}
                    >
                      view more
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="viewcounsellor-lottie">
              <Lottie animationData={lottieimg2} style={{ width: 150, height: 150 }} />
            </div>       
            )}

            {hp?.length > 0 && hp?.length >= 3 && (
             <Link to="/admin-hprequest" style={{textDecoration:"none"}}> <p className="admindash-counsellorviewall">
                View all
                <span className="ri-arrow-right-s-line" />
              </p></Link>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <Viewuserpopup
          show={showModal}
          onClose={closeModal}
          user={currentUser}
          userType={userType} // Pass user type
          updateCounsellorRequests={updateCounsellorRequests}
          updatehpreq={updatehpreq}
        />
      )}
    </div>
  );
}

export default Admindashboard;
