import * as yup from "yup"

const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
// min 5 char, 1 uppercase, 1 lowercase, 1number, 1 symbol
const pincodeErrorMessage = "Pincode must be a 6 digit number";
const regnoErrorMessage = "Registernumber must be a 6 digit number";


export const hpRegSchema  = yup.object().shape({
    name: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    email:yup.string().email("Please enter a valid email").required("Required"),
    password:  yup.string().min(5).max(16).matches(passwordRule, "1 uppercase, 1 number, 1 symbol").required("Required"),
    confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Password mismatch").required("Required"),
    // buildingname: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    city: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    // street: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    state: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    // pincode:  yup.number().min(100000,pincodeErrorMessage).max(999999,"Pincode must be a 6 digit number") .positive("Pincode must be a positive number").required("Required"),
    licenceno: yup.string()
    .matches(/^\d{9,}$/, "Licence number must be at least 9 digits")
    .required("Licence number is required"),
        phone: yup.string()
    .matches(/^\d{10}$/, "Contact number must be a 10-digit number")
    .required("Contact number is required"),  
    aadharno: yup.string()
    .matches(/^\d{12}$/, "Aadhaar number must be a 12-digit number")
    .required("Aadhaar number is required"),
        specialisation: yup.string()
    .min(3, "Specialization must be at least 3 characters long")
    .required("Specialization is required"),
    yearofexp: yup.number()
    .min(0, "Year of experience cannot be negative")
    .max(50, "Year of experience must be less than or equal to 50")
    .integer("Year of experience must be an integer")
    .required("Year of experience is required"),
    // district: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    image: yup.object().required("Required"),     
})



export const counsellorRegSchema  = yup.object().shape({
    name: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    email:yup.string().email("Please enter a valid email").required("Required"),
    password:  yup.string().min(5).max(16).matches(passwordRule, "1 uppercase, 1 number, 1 symbol").required("Required"),
    confirmpassword: yup.string().oneOf([yup.ref("password"), null], "Password mismatch").required("Required"),
    // buildingname: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    address: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    // street: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    // state: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    // pincode:  yup.number().min(100000,pincodeErrorMessage).max(999999,"Pincode must be a 6 digit number") .positive("Pincode must be a positive number").required("Required"),
    regno: yup.string()
    .matches(/^\d{9,}$/, "Register number must be at least 9 digits")
    .required("Licence number is required"),
        phone: yup.string()
    .matches(/^\d{10}$/, "Contact number must be a 10-digit number")
    .required("Contact number is required"),  
    // aadharno: yup.string()
    // .matches(/^\d{12}$/, "Aadhaar number must be a 12-digit number")
    // .required("Aadhaar number is required"),
    //     specialisation: yup.string()
    // .min(3, "Specialization must be at least 3 characters long")
    // .required("Specialization is required"),
    // yearofexp: yup.number()
    // .min(0, "Year of experience cannot be negative")
    // .max(50, "Year of experience must be less than or equal to 50")
    // .integer("Year of experience must be an integer")
    // .required("Year of experience is required"),
    // district: yup.string().min(2,"Enter minimum 2 characters").required("Required"),
    image: yup.object().required("Required"),     
})