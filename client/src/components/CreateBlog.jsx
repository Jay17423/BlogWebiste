import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "./NavBar";
import PostForm from "./PostForm";

const CreateBlog = () => {
  const token = useSelector((state) => state.user.token);

  const handleCreate = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    if (data.image) formData.append("image", data.image);

    await axios.post("http://127.0.0.1:8000/api/v1/posts", formData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });

    alert("Post created successfully!");
  };

  return (
    <div>
      <NavBar />
      <PostForm onSubmit={handleCreate} buttonText="Create Post" />
    </div>
  );
};

export default CreateBlog;
