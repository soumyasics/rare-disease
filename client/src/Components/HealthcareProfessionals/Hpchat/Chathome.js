import React from 'react'
import Healthcarelogin from '../Healthcarelogin'

function Chathome() {
  return (
    <div className='d-flex'>
    <Allprevchat/>
    <div>
    {
        data==="patient-chatrecipients"?(<Chat/>):
        //  data==="health-viewpatientrequests"?(<Patientsrequest/>):

        <Healthcarelogin/>
    }

    </div>

</div>  )
}

export default Chathome