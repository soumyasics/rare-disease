import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'

function Patientviewinfo() {
    const id = localStorage.getItem("patientid")
    const [data, setData] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [medicalHistory, setMedicalHistory] = useState("")
    const [validationError, setValidationError] = useState("")

    useEffect(() => {
        axiosInstance.post(`viewinfobypId/${id}`)
            .then((res) => {
                setData(res.data.data)
                setMedicalHistory(res.data.data.medicalhistory) // Initialize the textarea with existing medical history
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const enableEditMode = () => {
        setEditMode(true)
    }

    const handleMedicalHistoryChange = (e) => {
        setMedicalHistory(e.target.value)
    }

    const validateMedicalHistory = () => {
        if (medicalHistory.trim() === "") {
            setValidationError("Medical history cannot be empty")
            return false
        }
        setValidationError("")
        return true
    }

    const updateMedicalHistory = () => {
        if (!validateMedicalHistory()) return

        axiosInstance.post(`editinfobyid/${data._id}`, { medicalhistory: medicalHistory })
            .then((res) => {
                setData({ ...data, medicalhistory: medicalHistory })
                setEditMode(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='container view-pat-hrec'>
                <Link to="/patient-home" style={{ textDecoration: "none" }}>
                    <div className='view-pat-hrechead'>
                        <h1 className='ri-arrow-left-line'>Patient Information</h1>
                    </div>
                </Link>
                <div className='row'>
                    <div className='col-2 view-pat-hrimage'>
                        {/* <img src={img} alt='image'/> */}
                    </div>
                    <div className='col-8 sm-4 lg-4 view-pat-hrcontent-main'>
                        <div className='row'>
                            <div className='col-4'>
                                <h3>Name</h3>
                            </div>
                            <div className='col-8'>
                                <p>: {data?.patientid?.name}</p>
                            </div>
                            <div className='col-4'>
                                <h3>Date Of Birth</h3>
                            </div>
                            <div className='col-8'>
                                <p>: {data?.patientid?.dob}</p>
                            </div>
                            <div className='col-4'>
                                <h3>Gender</h3>
                            </div>
                            <div className='col-8'>
                                <p>: {data?.patientid?.gender}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='view-pat-hrechead'>
                        <h1>Medical History of {data?.patientid?.name}</h1>
                    </div>
                    <div className='row'>
                        <div className='col-2 view-pat-hrimage'>
                            {/* <img src={img} alt='image'/> */}
                        </div>
                        <div className='col-8 sm-4 lg-4 view-pat-hrcontent-main'>
                            <div className='row'>
                                {editMode ? (
                                    <div>
                                        <textarea
                                            value={medicalHistory}
                                            onChange={handleMedicalHistoryChange}
                                        />
                                        {validationError && <p className="error">{validationError}</p>}
                                    </div>
                                ) : (
                                    <p>{data?.medicalhistory}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    {editMode ? (
                        <div>
                            <div className='edit-pinfo-btn'>
                                <button type='button' onClick={updateMedicalHistory}>Update</button>
                            </div>
                        </div>
                    ) : (
                        <div className='edit-pinfo-btn'>
                            <button type='button' onClick={enableEditMode}>Edit</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Patientviewinfo
