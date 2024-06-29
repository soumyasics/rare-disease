import React from 'react'
import HpSibebar from './HpSibebar'
import Healthcarelogin from '../Healthcarelogin'
import Hpdashboard from './Hpdashboard'
import Patientsrequest from '../Requests/Patientsrequest'

function Hpmain({data}) {
  return (
    <div className='d-flex'>
    <HpSibebar/>
    <div>
    {
        data==="health-dashboard"?(<Hpdashboard/>):
         data==="health-viewpatientrequests"?(<Patientsrequest/>):
        // data==="admin-hprequest"?(<Hprequest/>):
       
        <Healthcarelogin/>
    }

    </div>

</div>
  )
}

export default Hpmain