import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axiosInstance from '../../Constants/Baseurl'
import './CounsellorSingleviewblogs.css'
import { toast } from 'react-toastify';

function CounsellorSingleviewblogs() {
    const [blogdata,setBlogData]=useState([]);
    const {blog_id}=useParams();
    const viewblogbyid=()=>{
        axiosInstance.post(`viewblogsbyId/${blog_id}`)
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
        viewblogbyid()
      },[])

      const url = axiosInstance.defaults.url;
      const navigate=useNavigate();
  
const navigateToViewallBlog=()=>{
  navigate(`/counsellor-viewblog`)
}
const navigateToEditBlog=(blog_id)=>{
    navigate(`/counsellor-editblog/${blog_id}`)
  }

  const deletefn=(()=>{
    axiosInstance.post(`deleteblog/${blog_id}`)
    .then((res)=>{
        console.log(res);
        if(res.data.status==200){
            toast.success("Deleted Successfully")
            navigate("/counsellor-viewblog")
        }
      })
      .catch((err)=>{
        console.log(err);
        alert('Failed to delete')
      })

  })
  return (
    <>
    <div className="container viewblog-maindiv mx-2">
        <div className='mt-3' onClick={navigateToViewallBlog} style={{cursor:'pointer'}}>
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" 
            width="28px" height="28px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xmlspace="preserve">
            <path d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z"/>
            </svg> View Blogs
        </div>
        <div className=' mt-3 '>
                <img 
                    src={`${url}/${blogdata?.image?.filename}`} 
                    alt="Counselor" 
                    className="viewblog-profile-pic"
                />
            </div>
            <div className='mx-3'>
        <div className='row viewblog-row '>
            <div className='col-2'>

            </div>
            <div className='col-2'>
                    <p className='viewblog-head-p'>Title </p>
            </div>
            <div className='col-8'>
                    <p className='viewblog-value-p'>{blogdata?.title}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>

            </div>
            <div className='col-2'>
                    <p className='viewblog-head-p'>Author </p>
            </div>
            <div className='col-8'>
                    <p className='viewblog-value-p'>{blogdata?.author}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>

            </div>
            <div className='col-2'>
                    <p className='viewblog-head-p'>Content</p>
            </div>
            <div className='col-8 viewblog-content-p'>
                    <p className='viewblog-value-p'>{blogdata?.content}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>

            </div>
            <div className='col-2'>
                    <p className='viewblog-head-p'>Category </p>
            </div>
            <div className='col-8'>
                    <p className='viewblog-value-p'>{blogdata?.category}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>

            </div>
            <div className='col-2'>
                    <p className='viewblog-head-p'>Posted On </p>
            </div>
            <div className='col-8'>
                    <p className='viewblog-value-p'>{blogdata?.date}</p>
            </div>
        </div>
        </div>
        <div className=' mt-3 viewblog-editbtn-div mb-3'>
            <button className='viewblog-editbtn' onClick={()=>navigateToEditBlog(blogdata._id)}>Edit Blog</button>
        </div>
        <div className=' mt-3 viewblog-editbtn-div mb-3'>
            <button className='viewblog-editbtn' onClick={deletefn} style={{backgroundColor:"red"}}>Delete Blog</button>
        </div>

    </div>
    </>
  )
}

export default CounsellorSingleviewblogs