import React, { useEffect, useState } from "react";
import "./Allcounsellors.css";
import img from "../../../Assets/rarecarelogin.jpg";
import axiosInstance from "../../Constants/Baseurl";
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json";

function Allcounsellors() {
  const [data, setData] = useState([]);
  const url = axiosInstance.defaults.url;

  useEffect(() => {
    axiosInstance
      .post(`viewallcounsellor`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="col-9 adminviewallpatient-main">
      <div className="adminviewallpatient-headcmain d-flex">
        <div className="adminviewallpatient-headc " style={{ width: "350px" }}>
          Counsellors{" "}
        </div>
        <div className="adminviewallpatient-search">
          <div className=" searchnav-adminhomemain">
            <div className="search-containeradminnav">
              <i className="ri-search-line"></i>
              <input
                type="text"
                className="search-inputadminnav"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="admin-viewallpatient-insidebox">
          <div className="adminviewallpatient-scrollmain">
            <div className="row">
              {data && data.length ? (
                data.map((a) => {
                  return (
                    <div className="col-6 sm-3 lg-6 allcounsellors-detailedbox d-flex">
                      <div className="row">
                        <div className="col-2 allcounsellor-image">
                          <img
                            src={ `${url}/${a.image.filename}`}
                            alt="image"
                            width="54px"
                            height="59px"
                          />
                        </div>
                      </div>
                      <div className="row allcounsellor-main-contents">
                        <div className="col-4">
                          <p>Name</p>
                        </div>
                        <div className="col-8">
                          <h6>: {a.name}</h6>
                        </div>
                        <div className="col-4">
                          <p>Email</p>
                        </div>
                        <div className="col-8">
                          <h6>: {a.email}</h6>
                        </div>
                        <div className="col-4">
                          <p>Contact</p>
                        </div>
                        <div className="col-8">
                          <h6>: {a?.phone}</h6>
                        </div>
                        <div className="col-4">
                          <p>Regno</p>
                        </div>
                        <div className="col-8">
                          <h6> : {a.regno}</h6>
                        </div>
                        <div className="col-4">
                          <p>Address</p>
                        </div>
                        <div className="col-8 allcounsellor-address">
                          <h6> : {a.address}</h6>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="counsellornodatareq-lottie">
                  <Lottie animationData={imglottiedata} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Allcounsellors;
