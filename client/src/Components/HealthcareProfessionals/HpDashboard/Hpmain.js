import React from 'react'
import HpSibebar from './HpSibebar'
import Healthcarelogin from '../Healthcarelogin'
import Hpdashboard from './Hpdashboard'
import Patientsrequest from '../Requests/Patientsrequest'
import Hpprofileview from '../HpProfile/Hpprofileview'
import ViewhpApprovedPatients from '../Ptient/ViewhpApprovedPatients'
import HpViewPatientrecord from '../Ptient/HpViewPatientrecord'
import AddPrescription from '../Prescription/AddPrescription'
import Hpviewmedicalreport from '../MedicalReport/Hpviewmedicalreport'
import Hpviewhealrecone from '../MedicalReport/Hpviewhealrecone'

function Hpmain({data}) {
  return (
    <div className='d-flex'>
    <HpSibebar/>
    <div>
    {
        data==="health-dashboard"?(<Hpdashboard/>):
         data==="health-viewpatientrequests"?(<Patientsrequest/>):
        data==="health-profile"?(<Hpprofileview/>):
        data==="health-viewpatients"?(<ViewhpApprovedPatients/>):
        data==="health-viewpatientsrecord"?(<HpViewPatientrecord/>):
        data==="health-addprescription"?(<AddPrescription/>):
        data==="health-viewmedicalreport"?(<Hpviewmedicalreport/>):
        data==="health-Hpviewhealrecone"?(<Hpviewhealrecone/>):

        <Healthcarelogin/>
    }

    </div>

</div>
  )
}

export default Hpmain