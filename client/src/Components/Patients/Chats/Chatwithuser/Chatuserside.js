import React, { useEffect, useState } from 'react'
import img from "../../../../Assets/doctorimg.jpg";
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../../Constants/Baseurl';

function Chatuserside() {
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const url = axiosInstance.defaults.url;

    const navbck=()=>{
        navigate("/patient-viewallpatientrchat")
    }

    const patientId = localStorage.getItem("patientid");
const fetchAllRescueMembers=(()=>{
  axiosInstance.post(`viewChatRecipientsforUserByUserId/${patientId}`)
  .then((res)=>{
    console.log(res);
    setData(res.data.users)
  })
})

useEffect(() => {
  fetchAllRescueMembers();
}, []);
const [searchInput, setSearchInput] = useState('');

const handleSearch = (e) => {
  const value = e.target.value;
  setSearchInput(value);

  if (value.trim() === '') {
    fetchAllRescueMembers();
  } else {
    const filteredData = data.filter(a =>
      a.name.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData);
  }
};



  return (
    <div className='col-3'>
        <div className='viewallprevchats-main'>
        <div className='viewallprevchats-head '>
            <p className='ri-arrow-left-line' onClick={navbck}><i>Chat</i></p>
        </div>
        <div
          className=" searchnav-adminhomemain"
        >
          <div className="search-containeradminnav">
            <i className="ri-search-line"></i>
            <input
              type="text"
              className="search-inputadminnav"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearch}
              style={{width:"300px"}}
            />
          </div>
        </div>
        <hr className="chat-viewco-hr"/>
        
        <div className='container chatviewallchat-content'>

            <div className='row'>

            {data&&data.map?(
            data.map((users, index) => (
              <Link to={`/patient-chatwithpatient/${users?._id}`} style={{textDecoration:"none"}}>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={`${url}/${users?.image?.filename}`} /><span>{users?.name}</span> </p>
                </div></Link>
            ))):(
              <div>No Users Found</div>
            )}

            </div>

        </div>


        </div>
    </div>
  )
}

export default Chatuserside