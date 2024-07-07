import React from 'react'
import Adminsidebar from './Adminsidebar'
import Admindashboard from './Admindashboard'
import Adminlogin from './Adminlogin'
import Counsellorreq from './Requests/Counsellorreq'
import Hprequest from './Requests/Hprequest'
import AdiminViewallpatient from './AllPatients/AdiminViewallpatient'
import Singlepatientview from './AllPatients/Singlepatientview'
import Allcounsellors from './AllCounsellors/Allcounsellors'
import Viewallhp from './Allhps/Viewallhp'

function Adminmain({data}) {
  return (
    <div className='d-flex'>
        <Adminsidebar/>
        <div>
        {
            data==="admin-dashboard"?(<Admindashboard/>):
            data==="admin-counsellorreq"?(<Counsellorreq/>):
            data==="admin-hprequest"?(<Hprequest/>):
            data==="admin-allpatients"?(<AdiminViewallpatient/>):
            data==="admin-singlepatient"?(<Singlepatientview/>):
            data==="admin-allcounsellors"?(<Allcounsellors/>):
            data==="admin-allhp"?(<Viewallhp/>):

            <Adminlogin/>
        }

        </div>

    </div>
  )
}

export default Adminmain