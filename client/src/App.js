import Login from "./components/Login";
import Register from "./components/Register";
import { Route, Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./components/RequireAuth";
import Error from "./components/Error";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {



  return (
    <>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Navbar/>}>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/posts" element={<PostList  />} />
          <Route path="/add-post" element={<PostForm  />} />
          
        </Route>

      </Route>
      <Route path="*" element={<Error/>} />
      </Routes>
    </>
  );
}

export default App;
