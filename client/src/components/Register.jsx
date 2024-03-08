import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../axios/axios";
import { toast } from "react-toastify";



const Register = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password:'',
    });

    const  navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleSubmit = async(e) => {
        try {
          e.preventDefault();
          const res =  await axiosInstance.post('/sign-up',formData);
          navigate('/login');
          clearInput();
          toast.success("Registration Successfull");

        } 
        catch (error) {
        if (!error?.response) {
          toast.error('No Server Response');
        }
        else if (error?.response.status === 422) {
          toast.error("Password Doesn't Match");
  
        }
        else if (error?.response.status === 409) {
          toast.error('Email Already Registered');
  
        }
        else{
          toast.error('Registration Failed');
  
        }
      }
    };
  
    const clearInput = () => {
      setFormData({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
      })
    }


    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample image"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <div className="text-center md:text-left">
                    <h2 className="mb-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">

                        SIGN UP
                    </h2>
                </div>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                    type="text"
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="text"
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                />
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                    type="password"
                    name='confirm_password'
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                />
                <div className="text-center md:text-left ">
                    <button onClick={handleSubmit}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                    >
                        SignUp
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Already have an account!{" "}
                    <Link
                        to="/login"
                        className="text-blue-400 hover:underline hover:underline-offset-4"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Register;