import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/login",
      formData
    );

    dispatch(
      addUser({
        username: res.data.username,
        token: res.data.access_token,
        id: res.data.id,
      })
    );

    alert(res.data.message || "Login successful ✅");
    navigate("/feed")
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);

    alert(err.response?.data?.detail || "Login failed ❌");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-96 border-t-4 border-orange-500"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Login 🔐
        </h2>

        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition"
        >
          Login
        </button>
        <Link to={"/"}>
          <h1 className="text-center text-orange-600 hover:underline">
            Dont have account ? SignUp{" "}
          </h1>
        </Link>
      </form>
    </div>
  );
}
