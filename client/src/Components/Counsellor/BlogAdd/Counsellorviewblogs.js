import React,{useState,useEffect} from 'react'
import {Link,Navigate,useNavigate} from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl';
import './Counsellorviewblog.css'
import Lottie from "lottie-react"
import lottieimg from '../../../Assets/lottienodataanimation.json'
import CounsellorSingleviewblogs from './CounsellorSingleviewblogs';
import { Modal } from 'react-bootstrap';



function Counsellorviewblogs() {

  const id = localStorage.getItem("counsellorlogin");
  const [blogdata,setBlogData]=useState([]);
  const [currentUser, setCurrentUser] = useState(null);


const viewallblogs=()=>{
  axiosInstance.post(`viewablogsbucounsellorId/${id}`)
    .then((res)=>{
      console.log(res);
      setBlogData(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
      alert('Failed to Fetch Data')
    })
}

  useEffect(()=>{
    viewallblogs()
  },[])

const navigate=useNavigate();
  
const navigateToViewSingleBlog=(blog_id)=>{
  navigate(`/counsellor-viewsingleblog/${blog_id}`)
}
    

  return (
    <>
        <section className='container'>
        <div className="viewallblog-counsellor">
          <div className="viewblog-counsellor-shrink">Counsellor</div>
          <div className="row d-flex">
            {blogdata && blogdata.length ? (
              blogdata.map((a) => {
                return (
                  <div 
                  key={a?._id} 
                  className="col-4 viewblog-counsellor-counsellorcount">
                    <div className="viewblog-counsellor-dashpic row d-flex">
                      <div className='row'>
                        <div className="col">
                          <p>Title :</p>
                        </div>
                        <div className="col">
                          <p className="registration-number">{a?.title}</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className="col">
                          <p>Author :</p>
                        </div>
                        <div className="col">
                          <p className="registration-number">{a?.author}</p>
                        </div>
                      </div>
                      <div className='row'>
                        <div className="col">
                          <p>Category :</p>
                        </div>
                        <div className="col">
                          <p className="registration-number">{a?.category}</p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="view-moreadmindash1"
                      onClick={()=>navigateToViewSingleBlog(a?._id)}
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

            {/* {blogdata?.length > 0 && blogdata?.length >= 3 && (
             <Link to="/admin-counsellorreq" style={{textDecoration:"none"}}><p className="admindash-counsellorviewall">
                View all
                <span className="ri-arrow-right-s-line" />
              </p></Link> 
             )}  */}
          </div>
        </div>
      </section> 
      
    </>
  )
}

export default Counsellorviewblogs