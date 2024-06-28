import React from 'react'
import "../../Counsellor/Dashboard/Counsellordash.css"
import { Link } from 'react-router-dom'

function Counsellordashboard() {
  return (
    <div className="col-9 counsellordash-main">
            <div className="admindash">
        <header className="Admindash-header">
          <div className="stats">
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">1300</div>
              </div>
              <div className="stat-label">Total Patients</div>
            </div>
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">111</div>
              </div>
              <div className="stat-label">Total Health Care Professionals</div>
            </div>
            <div className="stat-item col-4">
              <div className="stat-circle">
                <div className="stat-number">11</div>
              </div>
              <div className="stat-label">Total Counsellors</div>
            </div>
          </div>
          {/* <h2 className="admindash-headh2">Recent Request</h2> */}
        </header>

        <div className="counsellordash-counsellor">
          <div className="admindash-shrink">Appointments</div>
          <div className="row d-flex">
            {/* {counsellor && counsellor.length ? (
              counsellor.slice(0, 3).map((a) => {
                return ( */}
                  <div  className="col-4 counsellordash-counsellorcount">
                    <div className="counsellor-dashdetails row d-flex">
                      <div className="col-2">
                        <p>Name</p>
                        <p>Gender</p>
                        <p>Date</p>
                        <p style={{width:"100px"}}>Time Slot</p>

                      </div>
                      <div className="col-4 counsellor-dashpdata">
                        <p>:Vinayak </p>
                        <p>:Male</p>
                        <p>:22/08/2001</p>
                        <p>:23/09/3993</p>

                      </div>

                    </div>
                    <div
                      className="view-morecounsellordash"
                    //   onClick={() => openModal(a?._id, 'counsellor')}
                    >
                      view more
                    </div>
                  </div>
                  <div  className="col-4 counsellordash-counsellorcount">
                    <div className="counsellor-dashdetails row d-flex">
                      <div className="col-2">
                        <p>Name</p>
                        <p>Gender</p>
                        <p>Date</p>
                        <p style={{width:"100px"}}>Time Slot</p>

                      </div>
                      <div className="col-4 counsellor-dashpdata">
                        <p>:Vinayak </p>
                        <p>:Male</p>
                        <p>:22/08/2001</p>
                        <p>:23/09/3993</p>

                      </div>

                    </div>
                    <div
                      className="view-morecounsellordash"
                    //   onClick={() => openModal(a?._id, 'counsellor')}
                    >
                      view more
                    </div>
                  </div>
                  <div  className="col-4 counsellordash-counsellorcount">
                    <div className="counsellor-dashdetails row d-flex">
                      <div className="col-2">
                        <p>Name</p>
                        <p>Gender</p>
                        <p>Date</p>
                        <p style={{width:"100px"}}>Time Slot</p>

                      </div>
                      <div className="col-4 counsellor-dashpdata">
                        <p>:Vinayak </p>
                        <p>:Male</p>
                        <p>:22/08/2001</p>
                        <p>:23/09/3993</p>

                      </div>

                    </div>
                    <div
                      className="view-morecounsellordash"
                    //   onClick={() => openModal(a?._id, 'counsellor')}
                    >
                      view more
                    </div>
                  </div>

                {/* );
              })
            ) : (
              <div className="viewcounsellor-lottie">
              <Lottie animationData={lottieimg} style={{ width: 150, height: 150 }} />
            </div>       
               )} */}

            {/* {counsellor?.length > 0 && counsellor?.length >= 3 && ( */}
             <Link to="" style={{textDecoration:"none"}}><p className="admindash-counsellorviewall">
                View all
                <span className="ri-arrow-right-s-line" />
              </p></Link> 
            {/* )} */}
          </div>
        </div>
        <br />

      </div>

        </div>
  )
}

export default Counsellordashboard