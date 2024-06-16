import React from 'react'
import Adminsidebar from './Adminsidebar'
import Admindashboard from './Admindashboard'
import Adminlogin from './Adminlogin'
import Counsellorreq from './Requests/Counsellorreq'
import Hprequest from './Requests/Hprequest'

function Adminmain({data}) {
  return (
    <div className='d-flex'>
        <Adminsidebar/>
        <div>
        {
            data==="admin-dashboard"?(<Admindashboard/>):
            data==="admin-counsellorreq"?(<Counsellorreq/>):
            data==="admin-hprequest"?(<Hprequest/>):
           
            <Adminlogin/>
        }

        </div>

    </div>
  )
}

export default Adminmain