import { Link, Outlet, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth";
import { useState } from "react";

export default function Navbar() {

  const { auth } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false)

  

  return (
    <>
      <nav className="bg-gray-100 w-full z-20 top-0 start-0 border-b border-gray-200 rounded-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-black text-2xl font-semibold whitespace-nowrap ">Your Posts</span>
          </Link>
          {auth.userId?
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {toggle===false?<button onClick={()=>{ navigate('/add-post');setToggle(!toggle)}} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600  ">Add Post</button>:
            <button onClick={()=>{ navigate('/posts');setToggle(!toggle)}} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600  ">All Posts</button>}
          </div>:null}
          

        </div>
        
      </nav>
      
        <Outlet />
    </>
  )
}
