import React from 'react'
import "./Allprevchat.css"
import img from "../../../../Assets/doctorimg.jpg";

function Allprevchat() {
  return (
    <div className='col-2.5'>
        <div className='viewallprevchats-main'>
        <div className='viewallprevchats-head '>
            <p className='ri-arrow-left-line'><i>Chat</i></p>
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
              style={{width:"325px"}}
            />
          </div>
        </div>
        <hr className="chat-viewco-hr"/>
        
        <div className='container chatviewallchat-content'>

            <div className='row'>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>
                <div className='col-12 chat-viewprev-data'>
                <p><img src={img} /><span>Dr.Vinayak</span> </p>
                </div>

            </div>

        </div>


        </div>
    </div>
  )
}

export default Allprevchat