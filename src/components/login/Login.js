import React from 'react'
import {useForm} from 'react-hook-form' 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios';
import { RiAccountCircleFill } from "react-icons/ri";
import './Login.css'
function Login() {
    let [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  function submitLogin(data){
    
    axios.post('http://localhost:3500/userData/login',data)
    .then((res)=>{
        console.log("Result :", res);
        if(res.data.success) {
            localStorage.setItem('tokens',res.data.token) 
            navigate('/Home')
        }
        setError(res.data.message)
    })
    .catch((err)=>{
        setError("Something went worng!")
        console.log("Error : ", err)
    })
}

  return (
    <div className='container mt-5'>
        <div className="signUp row">

        <h1 className=" display-4 text-center " style={{
        color: "#0dde18 " 
       }}>
       <RiAccountCircleFill className='inputIcon'/>
       Login</h1>


    {/* form submission error */}
{error.length !== 0 && (
 <p className="display-3 text-danger text-center">{error}</p>
)}

 <div className="col-8 col-sm-6 col-md-4 m-auto">
   <form  className=" p-3" onSubmit={handleSubmit(submitLogin)}> 
     {/* email */}
     <div className="inputBox mb-4">
        <IoMail className='inputIcon'/>
       <input
         type="email"
         placeholder="example@mail.com"
         id="email"
         className="form-control"
         {...register("email", { required: true })}
       />
       {/* validation errors for email */}
       {errors.email?.type === "required" && (
         <p className="text-danger fw-bold fs-5">* Email is required</p>
       )}
     </div>
    

    {/* password */}
    <div className="inputBox mb-4">
    <RiLockPasswordFill className='inputIcon'/>
       <input
         type="password"
         placeholder="*********"
         id="password"
         className="form-control"
         {...register("password", { required: true , minLength:4})}
       />
       {/* validation errors for name */}
       {errors.password?.type === "required" && (
         <p className="text-danger fw-bold fs-5">
           * Password is required
         </p>
       )}
       {
         errors.password?.type==="minLength" &&(
           <p className="text-danger fw-bold fs-5">
           * Minimum length of four is required
         </p>
         )
       }
     </div>
  

     {/* submit button */}
     <button type="submit" className="btn btn-success">
       Login
     </button>
   </form>
 </div>
</div>
     
    </div>
  )
}

export default Login