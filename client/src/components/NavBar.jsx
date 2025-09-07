import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const NavBar = () => {
  const { username } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <nav className="bg-orange-500 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <h1
          onClick={() => navigate("/feed")}
          className="text-2xl font-bold text-white tracking-wide cursor-pointer"
        >
          BlogSite
        </h1>

        <ul className="flex space-x-8 text-white font-medium">
          <li
            onClick={() => navigate("/feed")}
            className="hover:text-orange-200 cursor-pointer transition duration-200"
          >
            Home
          </li>
          <li
            className="hover:text-orange-200 cursor-pointer transition duration-200"
            onClick={() => navigate("/my-blog")}
          >
            My Blogs
          </li>
          <li className="hover:text-orange-200 cursor-pointer transition duration-200"
          onClick={()=>navigate("/create-post")}
          
          >
            Create Blog
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <span className="text-white font-semibold">{username}</span>
          <button
            onClick={handleLogout}
            className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
