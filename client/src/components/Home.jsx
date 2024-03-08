import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate } from 'react-router-dom';
import Post from "./Post";


export default function Home() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();



  useEffect(() => {

    let isMounted = true;
    const controller = new AbortController();

    const getAllPosts = async () => {

      try {
        const res = await axiosPrivate.get('/post/get-all-post');
        console.log("post resp",res);
        isMounted && setPosts(res.data.data);
        setLoading(false);
      } catch (error) {
        navigate('/login');

      }
    }

    getAllPosts();


    return () => {
      isMounted = false;
      controller.abort();
    }

  }, [])

  return (
    <>
    <div className=" min-h-screen m-16">
      {
        loading ? <h2 className="flex justify-center align-middle h-full">Loading...</h2> :
          <>
            <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800">

              {posts.map(post => {
                return (
                  <Post post={post} key={post._id}/>
                )
              })}

            </div>
          </>
      }
    </div>
    </>
  )
}




