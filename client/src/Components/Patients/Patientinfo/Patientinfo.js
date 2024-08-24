import React, { useEffect, useState } from "react";
import "./Patientinfo.css";
import axiosInstance from "../../Constants/Baseurl";
import { toast } from "react-toastify";

function Patientinfo() {
  const patientid = localStorage.getItem("patientid");

  const [data, setData] = useState({
    patientid: patientid,
    medicalhistory: "",
    image:""
  });

  const [patient, setPatient] = useState({});
  const [predictions, setPredictions] = useState("");

  const calculateAge = (dobString) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    axiosInstance.post(`viewallpatientbyid/${patientid}`)
      .then((res) => {
        const patientData = res.data.data;
        patientData.age = calculateAge(patientData.dob);
        setPatient(patientData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [patientid]);

  const changefn = (e) => {
    const { name, value } = e.target;
    setData({
      ...data, [name]: value
    });

    if (name === "medicalhistory") {
      // Split the medical history text into an array by commas
      const symptomsArray = value
      .split(" ")
      .map(symptom => symptom.trim());

      axiosInstance.post(`getDiseaseBySymptoms`, { symptoms: symptomsArray })
        .then((res) => {
          console.log(res);
          if(res.data.data.length===0){
            setPredictions("No predictions available.");
          }
          else if (res.data.status === 200) {
            setPredictions(res.data.data.join(", "));
          } else {
            setPredictions("No predictions available.");
          }
        })
        .catch((err) => {
          console.error('Error fetching predictions:', err);
          setPredictions("Error fetching predictions.");
        });
    }
  };
  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   setData({
  //     ...data,
  //     image: file,
  //   });
  // };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];
  
    if (file && allowedTypes.includes(file.type)) {
      setData({
        ...data,
        image: file,
      });
    } else {
      toast.error("Please upload a valid image (JPG or PNG).");
      // Clear the file input if the file type is not valid
      event.target.value = null;
    }
  };

  const submitfn = (a) => {
    a.preventDefault();
    
    const formData = new FormData();
    formData.append("patientid", data.patientid);
    formData.append("medicalhistory", data.medicalhistory);
    formData.append("image", data.image); 
  
    axiosInstance.post(`regpatientinfo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        console.log(res);
        
        if (res.data.status === 200) {
          toast.success("Added Successfully");
          // window.location.reload()

        } else {
          toast.error(res.data.msg);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred while uploading.");
      });
  };

  return (
    <div className="patientinfo-container">
      <div className="patient-info-main">
        <form onSubmit={submitfn}>
          <div className="patient-info-head container">
            <p>Patient Information</p>
          </div>
          <div className="row patient-info-details">
            <div className="col-4">
              <p>Name</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.name} readOnly />
            </div>
            <div className="col-4">
              <p>Age</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.age} readOnly />
            </div>
            <div className="col-4">
              <p>Gender</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.gender} readOnly />
            </div>
            <div className="col-4">
              <p>Address</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.city} readOnly />
            </div>
            <div className="col-4">
              <p>Contact info</p>
            </div>
            <div className="col-8">
              : <input type="text" value={patient.phone} readOnly />
            </div>
          </div>
          <div className="container profileinfo-bottm-textarea">
            <div className="col-12 profileinfo-bottm">
              <p>Medical History</p>
            </div>
            <div className="col-12">
              <textarea 
                placeholder="Enter your medical history here.." 
                name="medicalhistory"
                value={data.medicalhistory}
                onChange={changefn}
                required
              />
            </div>
          </div>
          <div className="prediction-content">
            <div className="col-12 profileinfo-bottm">
              <p>Prediction of your disease using AI</p>
              <div className="col-12">
                <textarea 
                  value={predictions}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="prediction-content">
            <div className="col-12 profileinfo-bottm">
              <p>Upload Image of Medical Report</p>
              <div className="col-12 input_file">
                <input type="file"
                name="image"
                onChange={handleImageChange}
                />
              </div>
            </div>
          </div>
          <div className="profileinfo-button">
            <button type="submit">Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Patientinfo;
