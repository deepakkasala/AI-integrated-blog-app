import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";
import toast from "react-hot-toast";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
  const { setToken } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/admin/login`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              <span className="text-primary">Admin</span> Login
            </h1>
            <p className="font-light text-gray-700 dark:text-gray-300">
              Enter your credentials to access admin panel.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="mt-6 w-full sm:max-w-md text-gray-600 dark:text-gray-300"
          >
            <div className="flex flex-col">
              <label className="text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your email id"
                className="border-b-2 border-gray-300 dark:border-gray-600 p-2 outline-none mb-6 bg-transparent dark:text-gray-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="your password"
                className="border-b-2 border-gray-300 dark:border-gray-600 p-2 outline-none mb-6 bg-transparent dark:text-gray-200"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white mt-2 py-3 w-full font-medium rounded cursor-pointer hover:bg-primary/90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
