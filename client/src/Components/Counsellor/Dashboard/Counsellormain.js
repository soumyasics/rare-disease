import React from 'react'
import Counsellorsidebar from './Counsellorsidebar'
import Counsellordashboard from './Counsellordashboard'
import Counselorlogin from '../Counselorlogin'
import Counsellorprofile from '../Profile/Counsellorprofile'
import PatientAppoinment from '../Appoinments/PatientAppoinment'
import CounsellorBlogadd from '../BlogAdd/CounsellorBlogadd'
import CounsellorPatientrecord from '../Patients/CounsellorPatientrecord'
import CounPatientHealthRecord from "../Patients/CounPatientHealthRecord"

function Counsellormain({data}) {
  return (
    <div className='d-flex'>
    <Counsellorsidebar/>
    <div>
    {
        data==="counsellor-dashboard"?(<Counsellordashboard/>):
         data==="counsellor-profile"?(<Counsellorprofile/>):
        data==="counsellor-viewpatientappoinmnt"?(<PatientAppoinment/>):
        data==="counsellor-addblog"?(<CounsellorBlogadd/>):
        data==="counsellor-viewpatientrecord"?(<CounsellorPatientrecord/>):
        data==="counsellor-healthrecord"?(<CounPatientHealthRecord/>):

        <Counselorlogin/>
    }

    </div>

</div>

  )
}

export default Counsellormain