import React from 'react'
import "./Patientnav.css"
import img from  "../../Assets/rarecarelogo.png"
import { Link, useNavigate } from 'react-router-dom'

function Patientnav() {
    const navigate=useNavigate()
    const myfunc=(()=>{
        navigate("/health-login")
    })
    const myfunc1=(()=>{
        navigate("/patinet-login")
    })
    return (
        <div>
            <nav class="navbar navbar-light bg-light nav-background" >
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">
                    <img src={img} alt="" width="80px" height="70px" class="d-inline-block align-text-top" id='patient-nav-img'/>
                    </a>
                    <div className="patient-nav-dropdown">
                       <select>
                        <option>default</option>
                            <option><Link onClick={myfunc1}>Patient</Link></option>    
                        <option> <Link onClick={myfunc}>Healthcare Professional </Link></option>
                        <option><Link to="/counsellor-login">Counsellor</Link> </option>

                       </select>
                    </div>
                    
                    </div>
            </nav>
        </div>
    )
}

export default Patientnav