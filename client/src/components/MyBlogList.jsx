import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function MyBlogList({ post, onPostDeleted }) {
  const token = useSelector((state) => state.user.token);
  const [showFullContent, setShowFullContent] = useState(false);

  const onDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post deleted successfully ✅");
      if (onPostDeleted) onPostDeleted(id);
    } catch (err) {
      console.error("Error deleting post:", err.response?.data || err.message);
      alert("Failed to delete post ❌");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden mb-8 hover:shadow-lg transition">
      {post.image_url && (
        <img
          src={post.image_url}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
      )}

      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>

        <p className="text-gray-700 mb-2">
          {showFullContent
            ? post.content
            : `${post.content.slice(0, 150)}${
                post.content.length > 150 ? "..." : ""
              }`}
        </p>

        {post.content.length > 150 && (
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="text-blue-500 text-sm font-medium mb-4 hover:underline"
          >
            {showFullContent ? "Show Less" : "Show More"}
          </button>
        )}

        <div className="flex justify-between items-center text-gray-500 text-sm border-t pt-3 mb-4">
          <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
          <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
            Update
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
