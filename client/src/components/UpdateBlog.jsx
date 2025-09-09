import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import NavBar from "./NavBar";

export default function UpdateBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.user.token);

  // post data aaya hoga navigate se: navigate(`/update/${post.id}`, { state: post })
  const { title: initTitle, content: initContent, image_url } = location.state || {};

  const [title, setTitle] = useState(initTitle || "");
  const [content, setContent] = useState(initContent || "");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState(image_url || "");
  const [updating, setUpdating] = useState(false);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await axios.patch(
        `http://127.0.0.1:8000/api/v1/posts/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Post updated ✅");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Update failed ❌");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <>
      <NavBar />

      <div className="flex justify-center py-10 bg-gray-50 min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            ✏️ Update Blog Post
          </h2>

          <label className="block mb-2 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:ring focus:ring-blue-300"
          />

          <label className="block mb-2 font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content"
            rows="5"
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:ring focus:ring-blue-300"
          />

          {currentImage && !image && (
            <div className="mb-4">
              <p className="text-gray-600 mb-2">Current Image:</p>
              <img
                src={currentImage}
                alt="Current Blog"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          )}


          <label className="block mb-2 font-medium text-gray-700">
            Upload New Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full mb-4"
          />

      
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/feed")}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
