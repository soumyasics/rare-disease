import React from 'react'
import "../Patients/Patientsignin.css"
import img from "../../Assets/patientimg.jpg"
import {Link} from "react-router-dom"

function Patientsignin() {
  return (
    <div className='patient-signin'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-12 col-md-6 col-lg-6 patient-signin_img'>
            <img src={img} alt='image' width="550px" height="600px"/>
          </div>
          <div className='col-sm-12 col-md-6 col-lg-6 patient-signin'>
            <p className='patient-signin'>Create Your Account</p>
            <form>
              <div className='row'>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='text' placeholder='Firstname'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='text' placeholder='Lastname'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='text' placeholder='Age'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <select>
                  <option>Patients</option>
                  <option>Caregivers</option>
                </select>
              </div>
              <div className='col-12 pb-3 patient-signin-radio'>
                <label for="gender" className='pb-3' >Gender : </label>
                <label for="male"> &nbsp;Male &nbsp;</label>
                <input type='radio' id='male'/>
                <label for="female">&nbsp;Female&nbsp;</label>
                <input type='radio' id='female'/>
                <label for="others">&nbsp;Others&nbsp;</label>
                <input type='radio' id='others'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='number' placeholder='Number'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='email' placeholder='Email'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='text' placeholder='Housename'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='text' placeholder='Street'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='text' placeholder='City'/>
              </div><div className='col-6 pb-3 patient-signin-input'>
                <input type='text' placeholder='State'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='number' placeholder='Pincode'/>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <select>
                  <option>Nationality</option>
                  <option>Indian</option>
                  <option>America</option>
                  <option>London</option>
                  <option>Japan</option>
                  <option>Uk</option>
                  <option>Australia</option>
                  <option>England</option>
                </select>
              </div>
              <div className='col-6 pb-3 patient-signin-input'>
                <input type='password' placeholder='Password'/>
              </div><div className='col-6 pb-3 patient-signin-input'>
                <input type='password' placeholder='ConfirmPassword'/>
              </div>
              <div className='col-12 pb-3 patient-signin-inputbutton '>
                <button type='submit' className="btn btn-primary">Register</button>
                <button type='reset' className="btn btn-primary">Cancel</button>
              </div>
              <div className='col-12 pb-3 patient-signin-account'>
                <h6>Already have an account?<Link to="/patinet-login"> Login </Link></h6>
              </div>
              </div>
            </form>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Patientsignin