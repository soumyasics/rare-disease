import React from 'react'
import HpSibebar from './HpSibebar'
import Healthcarelogin from '../Healthcarelogin'
import Hpdashboard from './Hpdashboard'
import Patientsrequest from '../Requests/Patientsrequest'
import Hpprofileview from '../HpProfile/Hpprofileview'

function Hpmain({data}) {
  return (
    <div className='d-flex'>
    <HpSibebar/>
    <div>
    {
        data==="health-dashboard"?(<Hpdashboard/>):
         data==="health-viewpatientrequests"?(<Patientsrequest/>):
        data==="health-profile"?(<Hpprofileview/>):
       
        <Healthcarelogin/>
    }

    </div>

</div>
  )
}

export default Hpmain