import React, { useState, useEffect } from "react";

const PostForm = ({ initialData = { title: "", content: "", image: null }, onSubmit, buttonText = "Submit" }) => {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert("Title and Content are required!");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      setFormData({ title: "", content: "", image: null }); // reset after submit
    } catch (err) {
      console.error(err);
      alert("Failed to submit post!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">{buttonText}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter title"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter content"
            rows={5}
          />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white ${
            loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
          } transition`}
        >
          {loading ? "Submitting..." : buttonText}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
