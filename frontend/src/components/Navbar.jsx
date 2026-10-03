import { Link, useNavigate } from "react-router";
import useApi from "../shared/api";
import { useContext, useState } from "react";
import AuthContext, { useAuth } from "../context/MyContext";


const Navbar = () => {
    
  const api = useApi()
  // const {loggedInUser,setLoggedInUser, setAccessToken, setOpenForm} = useContext(AuthContext)
  const {loggedInUser,setLoggedInUser,accessToken, setAccessToken, setOpenForm} = useAuth()
  const navigate = useNavigate()
  // const { setOpenForm} = useAuth()
  

  const handleLogout = async ()=>{
    await api.post("/auth/logout")

    setAccessToken(null)
    // setLoggedInUser(false)

    navigate("/auth/login")
  }

  const productForm = ()=>{
    if(accessToken){
      setOpenForm(true)
    }
    else{
      navigate("/auth/login")
    }
  }






  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          E-Comm
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          <Link
            to="/products"
            className="text-gray-700 font-medium hover:text-blue-600 transition"
          >
            Products
          </Link>
        </div>

        

        {/* Authentication Button */}
        <div className="gap-4 flex">
          <button
          onClick={()=> (accessToken ? setOpenForm(true) : navigate("/auth/login"))}
            className=" bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create Product
          </button>
          {accessToken ? 
          <button
          onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
           : <Link
            to="/auth/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </Link>
          }
         
        </div>

      </div>
    </nav>
  );
};

export default Navbar;