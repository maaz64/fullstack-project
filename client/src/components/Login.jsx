import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from '../axios/axios';



const Login = () => {


    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });
    
      const {auth,setAuth} = useAuth();
      const navigate = useNavigate();
      const [terms, setTerms] = useState(false);
     
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Terms and condition accepted" + terms)
        if(terms === false){
            navigate('/login');
            toast.success("Accept Terms and Conditions")
            return;
        }
        try {
          const res = await axiosInstance.post('/sign-in', formData);
          const accessToken = res?.data?.data?.accessToken;
          const refreshToken = res?.data?.data?.refreshToken;
          const userId = res?.data?.data?.userId;
          const name = res?.data?.data?.name;
          console.log(`accessToken:${accessToken} refreshToken:${refreshToken} userId: ${userId} name:${name}`)
          console.log("res in signin page",res);
          setAuth({ userId, name, refreshToken, accessToken});
          clearInput();
      
          navigate('/posts');
          toast.success(res.data.message)
    
        } catch (error) {
    
          if (!error?.response) {
            toast.error('No Server Response');
          }
          else if (error?.response.status === 400) {
            toast.error('Missing Email/password');
    
          }
          else if (error?.response.status === 401) {
            toast.error('Invalid Email/password');
    
          }
          else{
            toast.error('Login Failed');
    
          }
    
        }
      };
    
      const clearInput = () => {
        setFormData({
          email: "",
          password: "",
        })
        setTerms(false);
      }


    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt=""
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <div className="text-center md:text-left">
                    <h2 className="mb-8 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">

                        LOGIN
                    </h2>
                </div>
                <input
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
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
                <div className="mt-4 flex justify-between font-semibold text-sm">
                    <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                        <input className="mr-1" type="checkbox" name='terms'  onChange={(e)=>{setTerms(e.target.checked)}}
                        />
                        <span>Terms and Condition</span>
                    </label>
                    {/* <Link
                        to='/'
                        className="text-blue-400 hover:text-blue-700 hover:underline hover:underline-offset-4"
                    >
                        Forgot Password?
                    </Link> */}
                </div>
                <div className="text-center md:text-left">
                    <button
                        onClick={handleSubmit}
                        className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                    Dont't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-blue-400 hover:underline hover:underline-offset-4"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Login;