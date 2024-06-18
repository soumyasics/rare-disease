import React from 'react'
import Counsellorsidebar from './Counsellorsidebar'
import Counsellordashboard from './Counsellordashboard'
import Counselorlogin from '../Counselorlogin'
import Counsellorprofile from '../Profile/Counsellorprofile'

function Counsellormain({data}) {
  return (
    <div className='d-flex'>
    <Counsellorsidebar/>
    <div>
    {
        data==="counsellor-dashboard"?(<Counsellordashboard/>):
         data==="counsellor-profile"?(<Counsellorprofile/>):
        // data==="admin-hprequest"?(<Hprequest/>):
       
        <Counselorlogin/>
    }

    </div>

</div>

  )
}

export default Counsellormain