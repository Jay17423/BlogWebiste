import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import MyBlogList from "./MyBlogList";
import { useNavigate } from "react-router-dom";

const MyBlog = () => {
  const token = useSelector((state) => state.user.token);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/v1/posts/my-posts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(res.data);
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };

    if (token) {
      fetchPosts();
    }
  }, [token]);

  const handlePostDeleted = (deletedId) => {
    setPosts((prev) => prev.filter((p) => p.id !== deletedId));
  };

  return (
    <div>
      <NavBar />
      {posts.length != 0 ? (
        <div className="py-10 bg-gray-50 min-h-screen">
          {posts.map((post) => (
            <MyBlogList
              key={post.id}
              post={post}
              onPostDeleted={handlePostDeleted}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20">
          <h1 className="text-3xl font-bold text-orange-500 mb-4 animate-bounce">
            You have no active posts
          </h1>
          <p className="text-gray-500 text-lg mb-6">
            Start creating and share your thoughts with the world 🚀
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg shadow-lg transition"
            onClick={()=> navigate("/create-post")}
          >
            Create Post
          </button>
        </div>
      )}
    </div>
  );
};

export default MyBlog;
