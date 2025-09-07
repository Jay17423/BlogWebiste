import React, { useState } from "react";

export default function FeedCard({ post }) {
  const [showFullContent, setShowFullContent] = useState(false);
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

        <div className="flex justify-between items-center text-gray-500 text-sm border-t pt-3">
          <span>Created: {new Date(post.created_at).toLocaleDateString()}</span>
          <span>Updated: {new Date(post.updated_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
