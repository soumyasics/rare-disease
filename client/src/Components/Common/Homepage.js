import React from 'react'
import "./Homepage.css"
import img from "../../Assets/homepage.jpg"
import Homepage2 from './Homepage2'
import Aboutuspage from './Aboutuspage'
import Footer from '../Footer/Footer'

function Homepage() {
  return (
    // <div className='homepage-first'>
    <div className='homepage-first-box'>
        <div className='container'>
            <div className='row'>
            <div className='homepage-first-box-contain row'>
                <div className='col-sm-6 col-md-6 col-lg-6 homepage-firsts-conatain'>
                    <p><span id='span1'>We have a </span> 
                    <span id='span2'>Beautiful <br/> & Rare</span> 
                     <span id='span3'> Chance</span></p>
                     <h6>RARE CARE advances practical, meaningful, and enduring change so people with
                         rare diseases can live their fullest and best lives. Every day, we elevate care, advance research,
                         and drive policy in a purposeful and holistic manner to lift up the rare disease community.</h6>
                </div>
                <div className='col-sm-6 col-md-6 col-lg-6 homepage-first-conatain'>
                    <img src={img} alt='image' width='650px' height='400px' style={{objectFit:"cover"}} />
                </div>
                <div className='col-sm-12 col-md-12 col-lg-12 homepage-first-content'>
                    <h5>Find Resources</h5>
                    <hr />
                    <p>You or a loved one has received a diagnosis. Now what? Gaining knowledge, connecting with advocacy 
                        organizations, and learning about<br/>
                         treatment at places like the Centers for Excellence are the next steps.</p>
                </div>

            </div>
            <Homepage2/>
            <Aboutuspage/>
            <div>
                
            </div>

        </div>

    </div>
    <Footer/>

     </div>
  )
}

export default Homepage