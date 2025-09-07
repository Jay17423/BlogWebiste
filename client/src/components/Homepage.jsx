import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/posts", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);

  return (
    <div>
      <NavBar></NavBar>
      <div className="py-10 bg-gray-50 min-h-screen">
        {posts.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
