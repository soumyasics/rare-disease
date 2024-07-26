import React from 'react'
import Patientlogin from '../../Patientlogin'
import Allprevchat from './Allprevchat'
import Chat from './Chat'

function Chathome({data}) {
  return (
    <div className='d-flex'>
    <Allprevchat/>
    <div>
    {
        data==="patient-chatrecipients"?(<Chat/>):
        //  data==="health-viewpatientrequests"?(<Patientsrequest/>):

        <Patientlogin/>
    }

    </div>

</div>

  )
}

export default Chathome