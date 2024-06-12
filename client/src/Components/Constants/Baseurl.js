import axios from "axios"

const axiosInstance = axios.create({

    //server api
    // baseURL: 'http://hybrid.srishticampus.in:4035/rare_disease_api', 

    // baseURL: '', 
  
  //local api 
  
    baseURL: 'http://localhost:4035/rare_disease_api', 
  
    headers: {
      'Content-Type': 'application/json',
    },

     url :"http://localhost:4035",
    //  url:  "http://hybrid.srishticampus.in:4035/"
    
  });
   
  export default axiosInstance