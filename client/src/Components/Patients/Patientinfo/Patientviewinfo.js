import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../../Constants/Baseurl'

function Patientviewinfo() {
    const id = localStorage.getItem("patientid")
    const [data, setData] = useState({})
    const [editMode, setEditMode] = useState(false)
    const [medicalHistory, setMedicalHistory] = useState("")
    const [selectedImage, setSelectedImage] = useState(null) // State to hold the selected image
    const [validationError, setValidationError] = useState("")
    const [updateSuccess, setUpdateSuccess] = useState(false) // Flag to trigger re-fetch
    const url = axiosInstance.defaults.url;

    useEffect(() => {
        axiosInstance.post(`viewinfobypId/${id}`)
            .then((res) => {
                console.log(res);
                
                setData(res.data.data)
                setMedicalHistory(res.data.data.medicalhistory) // Initialize the textarea with existing medical history
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id, updateSuccess]) // Re-fetch data when updateSuccess changes

    const enableEditMode = () => {
        setEditMode(true)
    }

    const handleMedicalHistoryChange = (e) => {
        setMedicalHistory(e.target.value)
    }

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]) // Capture the selected image
    }

    const validateMedicalHistory = () => {
        if (medicalHistory.trim() === "") {
            setValidationError("Medical history cannot be empty")
            return false
        }
        setValidationError("")
        return true
    }

    const updatePatientInfo = () => {
        if (!validateMedicalHistory()) return

        // Create a FormData object to send the data including the file
        const formData = new FormData();
        formData.append("medicalhistory", medicalHistory);
        if (selectedImage) {
            formData.append("image", selectedImage); // Append the selected image with the field name 'image'
        }

        axiosInstance.post(`editinfobyid/${data?._id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                setData({ ...data, medicalhistory: medicalHistory }) // Update local state
                setEditMode(false)
                setUpdateSuccess(!updateSuccess) // Toggle the updateSuccess flag to trigger data re-fetch
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className='container view-pat-hrec'>
                {data === null ? (
                    <>
                        <div>
                            <h3 style={{ color: "red", textAlign: "center" }}>No Health Record Found</h3>
                        </div>
                    </>
                ) : (
                    <>
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
                                <div className='col-12 sm-6 lg-6 view-pat-hrcontent-main'>
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
                            <div className='view-pat-hrechead'>
                                <h1>Medical Report Image</h1>
                            </div>
                            <div className='row'>
                                <div className='col-12 sm-4 lg-4 view-pat-hrcontent-main'>
                                    <div className='row'>
                                        {editMode ? (
                                            <div>
                                                <input
                                                    type="file"
                                                    accept=".jpg,.png" // Restrict file type
                                                    onChange={handleImageChange} // Handle image selection
                                                />
                                                {/* {validationError && <p className="error">{validationError}</p>} */}
                                            </div>
                                        ) : (
                                            <div className='col-2 view-pat-hrimage'>
                                                <img src={`${url}/${data?.image?.filename}`} alt='image' width="350px" height="400px"/>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {editMode ? (
                                <div>
                                    <div className='edit-pinfo-btn'>
                                        <button type='button' onClick={updatePatientInfo}>Update</button>
                                    </div>
                                </div>
                            ) : (
                                <div className='edit-pinfo-btn'>
                                    <button type='button' onClick={enableEditMode}>Edit</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Patientviewinfo
