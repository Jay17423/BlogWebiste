import React from "react";

export default function FeedCard({ post, onUpdate, onDelete }) {
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

        <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

        <div className="flex justify-between items-center text-gray-500 text-sm border-t pt-3 mb-4">
          <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
          <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
        </div>

        
        <div className="flex gap-3">
          <button
            onClick={() => onUpdate(post.id)}
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
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
