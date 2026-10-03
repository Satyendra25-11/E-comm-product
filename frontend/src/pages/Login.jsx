import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import useApi from "../shared/api";
import { useAuth } from "../context/MyContext";

const Login = () => {

  const api = useApi()
  const navigate = useNavigate()
  const [errors, setErrors] = useState(null)


  const {setAccessToken, setLoggedInUser} = useAuth()

 

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null)

    try {
      
      const response = await api.post("/auth/login",formData)
      setAccessToken(response.data.data.accessToken)
      setLoggedInUser(true)
      navigate("/main")
      
    } catch (error) {
      setErrors(errors?.response?.data?.message || "Login failed")
      alert("Invalid Username or Password")
    }

    // API Call
    // axios.post("/auth/login", formData)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?
          <span className="text-blue-600 cursor-pointer ml-1 hover:underline">
            <Link to={'/auth/register'} >Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;