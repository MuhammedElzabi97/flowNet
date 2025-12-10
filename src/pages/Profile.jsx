import React, { useEffect, useState } from "react";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { useParams } from "react-router-dom";
import { UserProfile } from "@clerk/clerk-react";

const Profile = () => {
  const { profileId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEdit, setShowEdit] = useState(false);

  const fetchUser = async () => {
    setUser(dummyUserData);
    setPosts(dummyPostsData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return user ? (
    <div className="relative h-full overflow-y-scroll bg-green-50 p-6">
      <div className="max-w-3xl mx-auto">

        {/* الغلاف + Clerk User Profile */}
        <div className="rounded-2xl bg-white shadow overflow-hidden">
          <div className="h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
            {user.cover_photo && (
              <img
                src={user.cover_photo}
                className="w-full h-full object-cover"
                alt="cover"
              />
            )}
          </div>
          <UserProfile />
        </div>

        {/* Tabs */}
        <div className="mt-6">
          <div className="bg-white rounded-xl shadow p-1 max-w-md mx-auto flex gap-2">
            {["posts", "media", "likes"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer
                  ${
                    activeTab === tab
                      ? "bg-indigo-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* محتوى التابز */}
        <div className="mt-6">
          {activeTab === "posts" && (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {activeTab === "media" && (
            <div className="text-center text-gray-500 p-6">
              No media to show.
            </div>
          )}

          {activeTab === "likes" && (
            <div className="text-center text-gray-500 p-6">
              No liked posts yet.
            </div>
          )}
        </div>

      </div>
    </div>
  ) : (
    <Loading height="70vh" />
  );
};

export default Profile;
