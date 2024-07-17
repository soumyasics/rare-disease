import React, { useEffect, useState } from "react";
import "../Viewappoinments/Viewhpappoinments.css";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Constants/Baseurl";
import Lottie from "lottie-react";
import lottieimg from "../../../Assets/lottienodataanimation.json";
import lottieimg2 from "../../../Assets/lottiedata2.json";

function Viewhpappoinments() {
  const patient = localStorage.getItem("patientid");
  console.log(patient);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (patient === null) {
      navigate("/patinet-login");
    } else {
      axiosInstance
        .post(`viewBookingBypatientid/${patient}`)
        .then((res) => {
          console.log(res);
          setData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="col-12 pb-6 ">
        <Link to="/patient-home" style={{ textDecoration: "none" }}>
          <p className="ri-arrow-left-line viewhpreq-insidecontent">
            View Doctor Appoinment Status
          </p>
        </Link>
        <div className="row ">
          {data && data.length ? (
            data.map((a) => {
              return (
                <div className="col-4 pb-3 viewhpreq-insidebox">
                  <div className=" viewhpreq-insideboxsecond d-flex ">
                    <div className="col-4 firstpviewhpreq-insidebox">
                      <p>Doctor Name </p>
                      <p>Date </p>
                      <p>Time</p>
                      <p>Diagnosis</p>
                    </div>
                    <div className="col-6 ">
                      <p>: {a?.hpid?.name} </p>
                      <p>: {a?.date} </p>
                      <p>: {a?.time}</p>
                      <p className="viewhpreq-insideboxseconfp">
                        : {a?.diagnosis}
                      </p>
                    </div>
                  </div>
                  <div className="viewhpreq-containerdiv">
                    {a.hpacceptstatus === "approved" && (
                        <>
                      <button
                        type="submit"
                        className="ri-check-line viewhpreqapproved"
                      >
                        Approved
                      </button>
                      <div className="viewhp-app-pre-btn">
                     <Link to={`/patient-viewprescription/${a?._id}`}>  <button type="button">View Prescription</button></Link>
                      </div>
                      </>
                    )}
                    {a.hpacceptstatus === "rejected" && (
                      <button
                        type="submit"
                        className="ri-close-large-fill viewhpreqrejected"
                      >
                        Rejected
                      </button>
                    )}
                    {a.hpacceptstatus === "pending" && (
                      <button
                        type="submit"
                        className="ri-pass-pending-line viewhpreqpending"
                      >
                        Pending ..
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="viewcounsellor-lottie">
              <Lottie
                animationData={lottieimg}
                style={{ width: 150, height: 150 }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Viewhpappoinments;
