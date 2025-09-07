import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { useSelector } from "react-redux";
import FeedCard from "./FeedCard";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/posts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(res.data);
        setAllPosts(res.data); 
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (token) fetchPosts();
  }, [token]);

  const onSearchResults = (results, query) => {
    if (!query || query.trim() === "") {
      setPosts(allPosts); 
    } else {
      setPosts(results);
    }
  };

  return (
    <div>
      <NavBar onSearchResults={onSearchResults} />
      <div className="py-10 bg-gray-50 min-h-screen">
        {posts.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
