import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { useSelector } from "react-redux";
import axios from "axios";
import MyBlogList from "./MyBlogList"

const MyBlog = () => {
  const token = useSelector((state) => state.user.token);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          " http://127.0.0.1:8000/api/v1/posts/my-posts",
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

  return (
    <div>
      <NavBar></NavBar>
      <div className="py-10 bg-gray-50 min-h-screen">
        {posts.map((post) =>(
            <MyBlogList key={post.id} post={post}></MyBlogList>
        ))}
      </div>
    </div>
  );
};

export default MyBlog;
