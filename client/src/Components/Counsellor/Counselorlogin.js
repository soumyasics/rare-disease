import React from 'react'
import {Link} from "react-router-dom"
import img from "../../Assets/counsellor.jpg"

function Counselorlogin() {
  return (
    <div className='patient-login'>
    <div className='container'>
        <div className='row'>
            <div className='col-sm-12 col-md-6 col-lg-6 patient-login-img'>
                <img src={img} alt='login image' width="570px" height="600px" style={{objectFit:"cover"}}/>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6 patient-login-box'>
                <p className='patient-login-p'>Login</p>
                <form>
                    <div className='row'>
                        <div className='col-12 pb-3 patient-login-input'>
                            <input type='text' placeholder='Email'/>
                        </div>
                        <div className='col-12 pb-3 patient-login-input'>
                            <input type='password' placeholder='Password'/>
                           <Link to="/counselor-forgetpswd"> <p className='forget-link'>Forget Password ?</p></Link>
                        </div>
                        <div className='col-12 pb-3 patient-login-input'>
                            <button type='submit' className='btn btn-primary'>Login</button>
                            <Link to="/counsellor-signin"> <p className='forget-link-new'>New User Register Here</p></Link>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

</div>


  )
}

export default Counselorlogin