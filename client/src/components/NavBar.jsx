import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const NavBar = ({ onSearchResults }) => {
  const { username } = useSelector((state) => state?.user);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  const handleLogout = () => {
    Cookies.remove("token");
    dispatch(removeUser());
    navigate("/login");
  };

  useEffect(() => {
    if (searchText.trim() === "" && onSearchResults) {
      onSearchResults([], "");
    }
  }, [searchText,onSearchResults]);

  const onSearchHandler = async () => {
    try {
      if (!searchText.trim()) {
        if (onSearchResults) onSearchResults([], "");
        return;
      }

      const res = await axios.get(
        `http://127.0.0.1:8000/api/v1/posts/filter-post?query=${searchText}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (onSearchResults) onSearchResults(res.data, searchText);
    } catch (error) {
      alert(error);
    }
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
        <div className="flex justify-center items-center">
          <input
            placeholder="Search here"
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-amber-50 p-2 rounded-2xl"
          />
          <button
            className="text-2xl ml-3 cursor-pointer hover:scale-110 transition"
            onClick={onSearchHandler}
          >
            🔎
          </button>
        </div>

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
          <li
            className="hover:text-orange-200 cursor-pointer transition duration-200"
            onClick={() => navigate("/create-post")}
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
