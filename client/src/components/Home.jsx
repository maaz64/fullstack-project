import { useNavigate } from "react-router-dom"

export default function Home() {

  const navigate = useNavigate();
  // flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse
  return (
    <>

      <>
        <div className="flex justify-center items-center h-screen">
          <div className="flex flex-col justify-center items-center h-2/4 w-2/5 border-2 rounded-md bg-blue-200">
            <div className="">
            <p className="text-2xl">Welcome To Our Web Application</p>
            </div>
            <div className=" flex justify-center items-center mt-2">
            <div className="m-1 flex">
            <button onClick={() => { navigate('/login') }} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600  ">Login</button>
            </div> 
            <div className="m-1">
            <button onClick={() => { navigate('/register') }} type="button" className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-600  ">Sign Up</button>
            </div>
            </div>
          </div>

        </div>
      </>

    </>
  )
}




