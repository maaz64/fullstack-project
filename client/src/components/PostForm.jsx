import { useState } from "react";
import { toast } from "react-toastify";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";


function PostForm() {

  const [postData, setPostData] = useState({title:"", content:""})
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const res = await axiosPrivate.post('/posts', postData);

      console.log("postData",postData);
      console.log("res",res);
      toast.success(res.data.message);
      navigate("/posts")
      setPostData({title:"", content:""})

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

  return (
    <>
    <div className="flex justify-center items-center">
      <div className="w-full max-w-2xl mt-6">
        <form className="bg-blue-200 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Post Title
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white" id="title" name="title" value={postData.title} onChange={handleChange} type="text" required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Post Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:text-white" 
              id="content"
              type="text" 
              name="content"
              value={postData.content} 
              onChange={handleChange}
              required >
              </textarea> 
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="select-none rounded-lg bg-gray-700 hover:bg-gray-800  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Create Post
            </button>
          </div>
        </form>
      </div>
      </div>

    </>

  )
}

export default PostForm;
