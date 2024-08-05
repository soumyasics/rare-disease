import React, { useEffect, useState } from "react";
import img from "../../../Assets/counsellor.jpg";
import axiosInstance from "../../Constants/Baseurl";
import Lottie from "lottie-react";
import imglottiedata from "../../../Assets/nodatalottie.json";
import { Link } from "react-router-dom";

function ViewBlogpatient() {
  const [blog, setBlog] = useState([]);
  const url = axiosInstance.defaults.url;

  useEffect(() => {
    axiosInstance
      .post(`viewblogs`)
      .then((res) => {
        console.log(res);
        setBlog(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="container">
      <div className="row">
        {blog && blog.length ? (
          blog.map((a) => {
            return (
                <Link to={`/patient-viewoneblog/${a._id}`} style={{textDecoration:"none"}}>
              <div className="view-blog-mainbox">
                <div className="row view-blog-image">
                  <div className="col-4">
                    <img src={`${url}/${a?.image?.filename}`} alt="image" />
                  </div>
                  <div className="col-8 view-blog-content">
                    <h6>{a?.title}</h6>
                    <i>
                      {a?.author} | {a?.date} | {a?.category}
                    </i>
                    <p>{a?.content}</p>
                  </div>
                </div>
              </div>
              </Link>
            );
          })
        ) : (
          <div className="counsellornodatareq-lottie">
            <Lottie animationData={imglottiedata} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBlogpatient;
