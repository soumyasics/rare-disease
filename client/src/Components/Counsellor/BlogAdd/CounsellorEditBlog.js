import React,{ useState, useEffect,useRef} from 'react'
import axiosInstance from '../../Constants/Baseurl';
import { useParams,useNavigate } from 'react-router-dom';
import './CounsellorSingleviewblogs.css'
import { FaEdit } from "react-icons/fa";
import img from '../../../Assets/doctorimg.jpg'


function CounsellorEditBlog() {
    const url = axiosInstance.defaults.url;

    const [image, setImage] = useState(null);
    const [errorcover, setErrorCover] = useState(null);
    const [blogdata,setBlogData]=useState({
        title:"",
        author:"",
        content:"",
        category:"",
        image:{filename:''},
        // date:''
    })
    const [errors, setErrors] = useState({
        title:"",
        author:"",
        content:"",
        category:"",
        image:"",
        // date:''
    });
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

      const navigate=useNavigate();
  
const navigateToViewallBlog=()=>{
  navigate(`/counsellor-viewsingleblog/${blog_id}`)
}


const handleChange = (event) => {
const { name, value } = event.target;
setBlogData((prevData) => ({
  ...prevData,
  [name]: value,
}));
setErrors((prevErrors) => ({
  ...prevErrors,
  [name]: "",
}));
};

console.log(blogdata,'blogdata');

    
    const handleFileCoverChange = (image) => {
        if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
          const error = "Only upload JPG JPEG PNG GIF file type ";
          setErrorCover(error);
          return;
        }
        setImage(URL.createObjectURL(image));
        setErrorCover(null);
        setBlogData({ ...blogdata, image });
      };
      console.log(blogdata.image,'pic');


      const validateForm = () => {
        const newErrors = {};

        if (!blogdata.title) newErrors.title = "Job name is required";
        if (!blogdata.author) newErrors.author = "Author is required";
        if (!blogdata.content) newErrors.content = "Content is required";
        if (!blogdata.category) newErrors.category = "Category is required";
        // if (!blogdata.date) newErrors.date = "Posted On Date is required";



        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

      const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        const updatedData = new FormData();
        updatedData.append('title', blogdata.title);
        updatedData.append('author', blogdata.author);
        updatedData.append('content', blogdata.content);
        updatedData.append('category', blogdata.category);
        // updatedData.append('date', blogdata.date);
        updatedData.append('image',blogdata.image)
        
        axiosInstance.post(`updateBlog/${blog_id}`,updatedData,{
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((result) => {
                console.log(result);
                if (result.data.status === 200) {
                    setBlogData(result.data.data);
                    alert(result.data.msg)
                    window.location.reload()
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    

  return (
    <>
        <div className="container editblog-maindiv mx-2">
        <div className='mt-3' onClick={navigateToViewallBlog} style={{cursor:'pointer'}}>
            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" 
            width="28px" height="28px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xmlspace="preserve">
            <path d="M48.6,23H15.4c-0.9,0-1.3-1.1-0.7-1.7l9.6-9.6c0.6-0.6,0.6-1.5,0-2.1l-2.2-2.2c-0.6-0.6-1.5-0.6-2.1,0L2.5,25c-0.6,0.6-0.6,1.5,0,2.1L20,44.6c0.6,0.6,1.5,0.6,2.1,0l2.1-2.1c0.6-0.6,0.6-1.5,0-2.1l-9.6-9.6C14,30.1,14.4,29,15.3,29h33.2c0.8,0,1.5-0.6,1.5-1.4v-3C50,23.8,49.4,23,48.6,23z"/>
            </svg> View Blogs
        </div>
        <div className=' mt-3 '>
        <img 
                    src={
                        `${url}/${blogdata.image.filename}` || 
                        image} 
                    alt="Counselor" 
                    className="viewblog-profile-pic"
                />
                <FaEdit
                        className="editblog-editimage-icon mx-3 mt-5"
                        onClick={() =>
                          document.getElementById("image").click()
                        }
                      />
                        <input
                        type="file"
                        style={{ display: "none" }}
                        name="image"
                        onChange={(event) => {
                          handleFileCoverChange(event.target.files[0]);
                        }}
                        id="image"
                />

                
                
            </div>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
            <div className='mx-5'>
                
        <div className='row viewblog-row '>
            <div className='col-2'>

            </div>
            <div className='col-1'>
                    <p className='viewblog-head-p'>Title </p>
            </div>
            <div className='col-9'>
                    <input 
                    style={{width:'100%',borderRadius:'5px'}}
                    className='viewblog-value-p'
                    value={blogdata?.title}
                    placeholder={blogdata?.title}
                    onChange={handleChange}
                    name='title'
                    />
                    <p className='text-danger'>{errors.title}</p>
                        
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>

            </div>
            <div className='col-1'>
                    <p className='viewblog-head-p'>Author </p>
            </div>
            <div className='col-9'>
                <input 
                    style={{width:'100%',borderRadius:'5px'}}
                    className='viewblog-value-p'
                    value={blogdata?.author}
                    placeholder={blogdata?.author}
                    onChange={handleChange}
                    name='author'
                />
                <p className='text-danger'>{errors.author}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>

            </div>
            <div className='col-1'>
                    <p className='viewblog-head-p mt-3'>Content</p>
            </div>
            <div className='col-9 viewblog-content-p mt-3'>
                <textarea 
                    className='viewblog-value-p'
                    style={{width:'100%',height:'400px',borderRadius:'5px',padding:'20px'}}
                    value={blogdata?.content}
                    placeholder={blogdata?.content}
                    onChange={handleChange}
                    name='content'
                /> 
                <p className='text-danger'>{errors.content}</p>   
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>

            </div>
            <div className='col-1 '>
                    <p className='viewblog-head-p mt-3'>Category </p>
            </div>
            <div className='col-9 mt-3'>
                <input 
                    style={{width:'100%',borderRadius:'5px'}}
                    className='viewblog-value-p'
                    value={blogdata?.category}
                    placeholder={blogdata?.category}
                    onChange={handleChange}
                    name='category'
                />
                <p className='text-danger'>{errors.category}</p>
            </div>
        </div>
        <div className='row'>
            <div className='col-2'>

            </div>
            {/* <div className='col-1 mt-3'>
                    <p className='viewblog-head-p'>Posted On </p>
            </div> */}
            {/* <div className='col-9 mt-3'>
                <input 
                    style={{width:'100%',borderRadius:'5px'}}
                    className='viewblog-value-p'
                    value={blogdata?.date}
                    placeholder={blogdata?.date}
                    onChange={handleChange}
                    name='date'
                />
                <p className='text-danger'>{errors.date}</p>
            </div> */}
        </div>
        </div>
        <div className=' mt-3 viewblog-editbtn-div mb-3'>
            <button className='viewblog-editbtn'>Update</button>
            <button className='viewblog-editbtn mx-5' onClick={navigateToViewallBlog} >Cancel</button>
        </div>
        </form>
    </div>
    </>
  )
}

export default CounsellorEditBlog