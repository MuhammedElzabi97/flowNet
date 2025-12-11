/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { dummyUserData } from "../assets/assets";
import toast from "react-hot-toast";
import { X, Image as ImageIcon } from "lucide-react";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = dummyUserData;

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500)); // محاكاة API
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Create Post
          </h1>
          <p className="text-slate-600">
            Share your thoughts with the world
          </p>
        </div>

        <div className="max-w-xl p-4 sm:p-8 rounded-xl bg-white shadow-md space-y-4">
          {/* User info */}
          <div className="flex items-center gap-3">
            <img src={user.profile_picture} className="w-12 h-12 rounded-full" />
            <div>
              <h2 className="font-semibold">{user.full_name}</h2>
              <p className="text-sm text-gray-500">@{user.username}</p>
            </div>
          </div>

          {/* Post content */}
          <textarea
            className="w-full resize-none max-h-32 mt-4 text-sm outline-none placeholder-gray-400"
            placeholder="What's happening?"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />

          {/* Preview images */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {images.map((image, i) => (
                <div key={i} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    className="h-20 rounded-md object-cover"
                    alt=""
                  />
                  <div
                    onClick={() =>
                      setImages((prev) =>
                        prev.filter((_, index) => index !== i)
                      )
                    }
                    className="absolute inset-0 hidden group-hover:flex justify-center items-center bg-black/40 rounded-md cursor-pointer"
                  >
                    <X className="w-6 h-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t text-gray-300">
            <label
              htmlFor="images"
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition cursor-pointer"
            >
              <ImageIcon className="w-6 h-6" />
              Add photos
            </label>

            <input
              type="file"
              id="images"
              accept="image/*"
              hidden
              multiple
              onChange={(e) =>
                setImages((prev) => [...prev, ...e.target.files])
              }
            />

            <button
              onClick={() =>
                toast.promise(handleSubmit(), {
                  loading: "Uploading...",
                  success: <p>Post Added</p>,
                  error: <p>Post Not Added</p>,
                })
              }
              disabled={loading || (!content && images.length === 0)}
              className={`text-sm bg-gradient-to-r from-indigo-500 to-purple-600 
              hover:from-indigo-600 hover:to-purple-700 
              active:scale-95 transition text-white font-medium px-8 py-2 rounded-md
              ${loading || (!content && images.length === 0)
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              }`}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
