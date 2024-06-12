import logo from './logo.svg';
import './App.css';
import {BrowserRouter ,Routes,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'remixicon/fonts/remixicon.css'
import Patientsignin from './Components/Patients/Patientsignin';
import Patientnav from './Components/Navbar/Patientnav';
import Patientlogin from './Components/Patients/Patientlogin';
import Patientforgrtpswd from './Components/Patients/Patientforgrtpswd';
import Healthcaresignup from './Components/HealthcareProfessionals/Healthcaresignup';
import Healthcarelogin from './Components/HealthcareProfessionals/Healthcarelogin';
import Healthcareforgetpswd from './Components/HealthcareProfessionals/Healthcareforgetpswd';
import Counsellorsignin from './Components/Counsellor/Counsellorsignin';
import Counselorlogin from './Components/Counsellor/Counselorlogin';
import Counsellorforgetpswd from './Components/Counsellor/Counsellorforgetpswd';
import Homepage from './Components/Common/Homepage';
import Homepage2 from './Components/Common/Homepage2';
import Aboutuspage from './Components/Common/Aboutuspage';
import Homenav from './Components/Navbar/Homenav';
import Footer from './Components/Footer/Footer';
import Adminlogin from './Components/Admin/Adminlogin';


function App() {
  return (
    <BrowserRouter basename="/rare_disease">
      
  <div>
  <Routes>

    {/* Hompage */}
    <Route path='/' element={[<Homenav/>,<Homepage/>]}/>


    {/* Patients */}
    <Route path='/patientnav' element={<Patientnav/>}/>
    <Route path='/patient_signin' element={[<Patientnav/>,<Patientsignin/>]}/>
    <Route path='/patinet-login' element={[<Patientnav/>,<Patientlogin/>]}/>
    <Route path='/patient-forgetpswd' element={[<Patientnav/>,<Patientforgrtpswd/>,<Footer/>]}/>
    <Route path='/aboutus' element={<Aboutuspage/>}/>
    <Route path='/homenav' element={<Homenav/>}/>
    <Route path='/footer' element={<Footer/>}/>


    {/* Healthcare Professional */}
    <Route path='/healthcare-signin' element={[<Homenav/>,<Healthcaresignup/>,<Footer/>]}/>
    <Route path='/health-login' element={[<Homenav/>,<Healthcarelogin/>,<Footer/>]}/>
    <Route path='/health-forgetpswd' element={[<Patientnav/>,<Healthcareforgetpswd/>]}/>


    {/* counsellor */}
    <Route path='/counsellor-signin' element={[<Counsellorsignin/>]}/>
    <Route path='/counsellor-login' element={[<Patientnav/>,<Counselorlogin/>]}/>
    <Route path='/counselor-forgetpswd' element={[<Patientnav/>,<Counsellorforgetpswd/>]}/>


    {/* Admin */}
    <Route path='/admin-login' element={[<Homenav/>,<Adminlogin/>,<Footer/>]}/>

  </Routes>


  </div>
</BrowserRouter>
 );
}

export default App;
