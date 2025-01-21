import React, { useState } from "react";
import { Form, Input, Button } from "@heroui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { USER_API_END_POINT } from "../utils/utils";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { getUser } from "../store/slices/userSlice";
import { motion } from "framer-motion";

export default function App() {
  const [hasAccount, setHasAccount] = useState(true); // Flag to track if the user has an account
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // const getPasswordError = (value) => {
  //   if (value.length < 4) {
  //     return "Password must be 4 characters or more";
  //   }
  //   if ((value.match(/[A-Z]/g) || []).length < 1) {
  //     return "Password needs at least 1 uppercase letter";
  //   }
  //   if ((value.match(/[^a-z]/gi) || []).length < 1) {
  //     return "Password needs at least 1 symbol";
  //   }
  //   return null;
  // };

  const onSubmitHandle = async (e) => {
    e.preventDefault();
    console.log(name,email,password);
    if (hasAccount) {
      //login logic
      try {
        console.log(USER_API_END_POINT)
        const res = await axios.post(`${USER_API_END_POINT}/login`,{email,password},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
          
        })
        dispatch(getUser(res?.data?.user))
        if(res.data.success){
          navigate("/home")
          toast.success(res.data.message)
        }
        
      } catch (error) {
          toast.error(error.response.data.message)
        console.log(error);
      }
    }else{
      //signup logic
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`,{name,email,password},{
          headers:{
            "Content-Type":"application/json"
          },
          withCredentials:true
        })
        if(res.data.success){
          toast.success(res.data.message)
        }
        
      } catch (error) {
        toast.success(error.response.data.message)
        console.log(error);  
      }
    }

    const newErrors = {};

    // Password validation
    // const passwordError = getPasswordError(data.password);
    // if (passwordError) {
    //   newErrors.password = passwordError;
    // }

    // Username validation for signup
    // if (!hasAccount && data.name === "admin") {
    //   newErrors.name = "Nice try! Choose a different username";
    // }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // setErrors({});
    // setSubmitted(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.form
      whileHover={{scale:1.1}}
        className="w-full max-w-md p-6 bg-gray-900 text-white rounded-lg shadow-md space-y-6"
        validationBehavior="native"
        validationErrors={errors}
        onReset={() => setSubmitted(null)}
        onSubmit={onSubmitHandle}
      >
        <Link to="/" className="text-lg ">
        <motion.div className="w-5"  whileHover={{backgroundColor:"ActiveBorder"}} >

        <IoMdArrowRoundBack />
        </motion.div>
        </Link>
        <div className="space-y-4 text-white">
          {hasAccount ? (
            // Login form (email and password only)
            <>
              <h2 className="text-2xl font-bold">Login</h2>
              <p>If you already have an account, please log in.</p>
              
              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) return "Please enter your email";
                  if (validationDetails.typeMismatch) return "Please enter a valid email address";
                }}
                value={email}
                name="email"
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter your email"
                type="email"
              />

              <Input
                isRequired
                // errorMessage={getPasswordError(password)}
                // isInvalid={getPasswordError(password) !== null}
                onChange={(e)=>setPassword(e.target.value)}
                name="password"
                placeholder="Enter your password"
                type="password"
                value={password}
                onValueChange={setPassword}
              />

              <div className="flex items-center justify-center">
                <motion.button
                whileTap={{scale:0.8, backgroundColor:"red"}}
                transition={{type:"keyframe", stiffness:300}}
                className="w-full h-10 bg-blue-700 text-white rounded-lg" color="primary" type="submit">
                  Login
                </motion.button>
              </div>

              <p className="mt-4 text-center">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() => setHasAccount(false)} // Switch to signup form
                >
                  Create new account
                </button>
              </p>
            </>
          ) : (
            // Signup form (name, email, and password)
            <>
              <h2 className="text-2xl font-bold">Sign Up</h2>
              <p>Enter your details to create a new account.</p>
              
              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) return "Please enter your name";
                  return errors.name;
                }}
                onChange={(e)=>setName(e.target.value)}
                value={name}
                name="name"
                placeholder="Enter your name"
              />

              <Input
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) return "Please enter your email";
                  if (validationDetails.typeMismatch) return "Please enter a valid email address";
                }}
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
                name="email"
                placeholder="Enter your email"
                type="email"
              />

              <Input
                isRequired
                // errorMessage={getPasswordError(password)}
                // isInvalid={getPasswordError(password) !== null}
                onChange={(e)=>setPassword(e.target.value)}
                value={password}
                name="password"
                placeholder="Enter your password"
                type="password"
                onValueChange={setPassword}
              />

              {errors.terms && <span className="text-red-500 text-sm">{errors.terms}</span>}

              <div className="flex items-center justify-center">
                <Button className="w-full bg-blue-700 text-white rounded-lg" type="submit">
                  Sign Up
                </Button>
              </div>

              <p className="mt-4 text-center">
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-500"
                  onClick={() => setHasAccount(true)} // Switch to login form
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>

        {/* {submitted && (
          <div className="mt-6 text-sm text-gray-600">
            Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
          </div>
        )} */}
      </motion.form>
    </div>
  );
}
