import React from 'react'
import img from "../../Assets/forgetpswd.jpg"
import {Link} from "react-router-dom"


function Healthcareforgetpswd() {
  return (
    <div className='patient-login'>
    <div className='container'>
        <div className='row'>
            <div className='col-sm-12 col-md-6 col-lg-6 patient-login-img'>
                <img src={img} alt='login image' width="570px" height="600px"/>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6 patient-login-box'>
                <p className='patient-login-p'>Reset Password</p>
                <form>
                    <div className='row'>
                        <div className='col-12 pb-3 patient-login-input'>
                            <input type='email' placeholder='Email'/>
                        </div>
                        <div className='col-12 pb-3 patient-login-input'>
                            <input type='password' placeholder='Password'/>
                        </div>
                        <div className='col-12 pb-3 patient-login-input'>
                            <input type='password' placeholder='Re-enter Password'/>
                        </div>
                        <div className='col-12 pb-3 patient-login-input'>
                            <button type='submit' className='btn btn-primary'>Change Update</button>
                            <Link to="/health-login"> <p className='forget-link-new' style={{textAlign:"center"}}>Back To Login</p></Link>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>

  )
}

export default Healthcareforgetpswd