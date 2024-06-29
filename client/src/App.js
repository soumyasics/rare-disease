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
import Adminsidebar from './Components/Admin/Adminsidebar';
import Adminmain from './Components/Admin/Adminmain';
import Viewuserpopup from './Components/Admin/Viewuserpopup';
import Counsellorreq from './Components/Admin/Requests/Counsellorreq';
import Adminhome from './Components/Navbar/Adminhome';
import Counsellorsidebar from './Components/Counsellor/Dashboard/Counsellorsidebar';
import Counsellormain from './Components/Counsellor/Dashboard/Counsellormain';
import HpSibebar from './Components/HealthcareProfessionals/HpDashboard/HpSibebar';
import Hpmain from './Components/HealthcareProfessionals/HpDashboard/Hpmain';
import Patienthome from './Components/Patients/Homepage/Patienthome';
import Patienthomenav from './Components/Navbar/Patient/Patienthomenav';
import Hcpapoinment from './Components/Patients/PatientAppoinments/Hcpapoinment';
import Viewhpappoinments from './Components/Patients/Viewappoinments/Viewhpappoinments';


function App() {
  return (
    <BrowserRouter basename="/rare_disease">
      
  <div>
  <Routes>

    {/* Hompage */}
    <Route path='/' element={[<Homenav/>,<Homepage/>]}/>


    {/* Patients */}
    <Route path='/patientnav' element={<Patientnav/>}/>
    <Route path='/patient_signin' element={[<Homenav/>,<Patientsignin/>,<Footer/>]}/>
    <Route path='/patinet-login' element={[<Homenav/>,<Patientlogin/>,<Footer/>]}/>
    <Route path='/patient-forgetpswd' element={[<Homenav/>,<Patientforgrtpswd/>,<Footer/>]}/>
    <Route path='/aboutus' element={[<Homenav/>,<Aboutuspage/>,<Footer/>]}/>
    <Route path='/homenav' element={<Homenav/>}/>
    <Route path='/footer' element={<Footer/>}/>
    <Route path='/patient-home' element={[<Patienthomenav/>,<Patienthome/>]}/>
    <Route path='/patient-hcpappoinment' element={[<Patienthomenav/>,<Hcpapoinment/>]}/>
    <Route path='/patient-viewhrappoinment' element={[<Patienthomenav/>,<Viewhpappoinments/>]}/>


    {/* Healthcare Professional */}
    <Route path='/healthcare-signin' element={[<Homenav/>,<Healthcaresignup/>,<Footer/>]}/>
    <Route path='/health-login' element={[<Homenav/>,<Healthcarelogin/>,<Footer/>]}/>
    <Route path='/health-forgetpswd' element={[<Homenav/>,<Healthcareforgetpswd/>,<Footer/>]}/>
    <Route path='/health-dashboard' element={[<Adminhome/>,<Hpmain data="health-dashboard"/>]}/>
    <Route path='/health-dashboard' element={[<Adminhome/>,<Hpmain data="health-dashboard"/>]}/>
    <Route path='/health-viewpatientrequests' element={[<Adminhome/>,<Hpmain data="health-viewpatientrequests"/>]}/>
  


    {/* counsellor */}
    <Route path='/counsellor-signin' element={[<Homenav/>,<Counsellorsignin/>,<Footer/>]}/>
    <Route path='/counsellor-login' element={[<Homenav/>,<Counselorlogin/>,<Footer/>]}/>
    <Route path='/counselor-forgetpswd' element={[<Homenav/>,<Counsellorforgetpswd/>,<Footer/>]}/>
    <Route path='/counsellor-dashboard' element={[<Adminhome/>,<Counsellormain data="counsellor-dashboard"/>]}/>
    <Route path='/counsellor-priofile' element={[<Adminhome/>,<Counsellormain data="counsellor-profile"/>]}/>


    {/* Admin */}
    <Route path='/admin-login' element={[<Homenav/>,<Adminlogin/>,<Footer/>]}/>
    <Route path='/admin-dashboard' element={[<Adminhome/>,<Adminmain data="admin-dashboard"/>]}/>
    <Route path='/admin-counsellorreq' element={[<Adminhome/>,<Adminmain data="admin-counsellorreq"/>]}/>
    <Route path='/admin-hprequest' element={[<Adminhome/>,<Adminmain data="admin-hprequest"/>]}/>


  </Routes>


  </div>
</BrowserRouter>
 );
}

export default App;
