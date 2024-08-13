const patientinfoschema = require("./PatientinfoSchema");


const regpatientinfo =async (req, res) => {
  const existingHistory=await patientinfoschema.findOne({ patientid:req.body.patientid})
  if(existingHistory){
    return res.json({
      status: 404,
        msg: "You have already added health record",
    })
  }
  const patient = new patientinfoschema({
    patientid:req.body.patientid,
    medicalhistory:req.body.medicalhistory
  });
 await patient
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted Successfully",
        data: data,
      });
    })
    .catch((err) => {
        res.json({
            status:500,
            err:err
        })
    });
};


const viewinfobypId=((req,res)=>{
  patientinfoschema.findOne({patientid:req.params.id})
  .populate("patientid")
  .then((data) => {
    res.json({
      status: 200,
      msg: "Inserted Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });
})

editinfobyid=((req,res)=>{
  patientinfoschema.findByIdAndUpdate({_id:req.params.id},{
    medicalhistory:req.body.medicalhistory
  })
  .then((data) => {
    res.json({
      status: 200,
      msg: "Inserted Successfully",
      data: data,
    });
  })
  .catch((err) => {
      res.json({
          status:500,
          err:err
      })
  });
})

const diseasesData = require('./disease.json'); 

// const getDiseaseBySymptoms = (req, res) => {
//     try {
//         const { symptoms } = req.body;
// console.log("here");

//         if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
//             return res.status(400).json({ message: 'Please provide an array of symptoms.' });
//         }

//         // Initialize a set to avoid duplicate disease names
//         const diseaseSet = new Set();

//         // Iterate over each symptom
//         symptoms.forEach(symptom => {
//             // Iterate over each disease in the diseasesData
//             for (const [disease, diseaseSymptoms] of Object.entries(diseasesData)) {
//               console.log(symptom,"pp");
              
//                 if (diseaseSymptoms.includes(symptom)) {
//                   console.log("dain loop",disease);

//                     diseaseSet.add(disease);
//                 }
//             }
//         });
// console.log("data",diseaseSet);

//         // Convert the set to an array
//         const diseases = Array.from(diseaseSet);

//         res.status(200).json({
//             status: 200,
//             message: 'Diseases retrieved successfully',
//             data: diseases,
//         });
//     } catch (error) {
//         console.error('Error processing symptoms:', error);
//         res.status(500).json({
//             message: 'Error processing symptoms',
//             error: error.message,
//         });
//     }
// };
const getDiseaseBySymptoms = (req, res) => {
  try {
    const { symptoms } = req.body;

      if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
          return res.status(400).json({ message: 'Please provide an array of symptoms.' });
      }

      // Initialize a set to avoid duplicate disease names
      const diseaseSet = new Set();

      // Normalize symptoms
      const normalizedSymptoms = symptoms.map(symptom => symptom.toLowerCase().trim());

      // Function to check if a symptom exactly matches any disease symptom
      const isExactMatch = (symptom, diseaseSymptoms) => {
          const normalizedSymptom = symptom.toLowerCase().trim();
          // Check if the entire normalized symptom is found as a complete match
          return diseaseSymptoms.some(diseaseSymptom => {
              const normalizedDiseaseSymptom = diseaseSymptom.toLowerCase().trim();
              return normalizedDiseaseSymptom === normalizedSymptom;
          });
      };

      // Flag to check if any match is found
      let matchFound = false;

      // Iterate over each symptom
      normalizedSymptoms.forEach(symptom => {
          // Iterate over each disease in the diseasesData
          for (const [disease, diseaseSymptoms] of Object.entries(diseasesData)) {
              // Normalize disease symptoms
              const normalizedDiseaseSymptoms = diseaseSymptoms.map(s => s.toLowerCase().trim());

              // Check if the symptom exactly matches any of the disease symptoms
              if (isExactMatch(symptom, normalizedDiseaseSymptoms)) {
                  diseaseSet.add(disease);
                  matchFound = true;
              }
          }
      });

      // Convert the set to an array
      const diseases = Array.from(diseaseSet);

      if (!matchFound) {
          // Return a message if no matching symptoms are found
          return res.status(200).json({
              status: 200,
              message: 'No diseases found matching the provided symptoms.',
              data: [],
          });
      }

      console.log(diseases);
      res.status(200).json({
          status: 200,
          message: 'Diseases retrieved successfully',
          data: diseases,
      });
  } catch (error) {
      console.error('Error processing symptoms:', error);
      res.status(500).json({
          message: 'Error processing symptoms',
          error: error.message,
      });
  }
};




module.exports={
    regpatientinfo,
    viewinfobypId,
    editinfobyid,
    getDiseaseBySymptoms
}