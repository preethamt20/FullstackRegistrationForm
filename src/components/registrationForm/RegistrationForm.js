import React from 'react'
import './RegistrationForm.css'
import {useForm} from 'react-hook-form' 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsFillTelephonePlusFill } from "react-icons/bs";   
import { IoPersonAddSharp } from "react-icons/io5";


function RegistrationForm() {
  let [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


 let addNewUser=(user)=>{
    console.log(user)

    axios.post('http://localhost:3500/userData/createaccount',user)
    .then((res)=>{
    console.log("Result :", res);
      if(res.data.success===true) 
        {
          navigate('/login');
        }
      else{ window.location.reload();}
    })
    .catch((err)=>{
        console.log("Error : ", err)
        setError("Something went wrong")
          })
 }
 let Goto=()=>{
  navigate('/login')
 }
  
  return (
    
       <div className=' container mt-5'>
       <div className="signUp row ">

       <h1 className=" display-4 text-center" style={{
        color: "#0dde18 " 
       }}>
       <RiAccountCircleFill className='inputIcon'/>
        Create an Account</h1>
      {/* form submission error */}
      {error.length !== 0 && (
        <p className="display-3 text-danger text-center">{error}</p>
      )}

        <div className="col-8 col-sm-6 col-md-4 mx-auto">
          <form  className=" p-3" onSubmit={handleSubmit(addNewUser)}>
            {/* username */}
            <div className="inputBox mb-4">    
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder=" username "
                {...register("username", { required: true })}
              />
               <IoPersonAddSharp className='inputIcon'/>
              {/* validation errors for name */}
              {errors.username?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  * Username is required
                </p>
              )}
            </div>
            
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
          
            <div className="inputBox mb-4">
            <BsFillTelephonePlusFill className='inputIcon'/>
              <input
               type="tel"
                id="tel"
                className="form-control"
                placeholder='Mobile Number'
                {...register("Telephone", { required: true , length:10 })}
              />
              {/* validation errors for name */}
              {errors.dob?.type === "required" && (
                <p className="text-danger fw-bold fs-5">
                  *Telephone number is required
                </p>
              )}
              {
                errors.telephone?.type === "length" &&
                <p className="text-danger fw-bold fs-5">
                  *Invalid phone number
                </p>
              }
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
              Regsiter
            </button>
          </form>
          <div>
          <h3 style={{
        color: "white" 
       }}>Already have one..</h3>
          <button onClick={Goto} className='btn btn-success'>Click here</button>
          </div>
        </div>
      </div>
       </div>
  
  )
}

export default RegistrationForm