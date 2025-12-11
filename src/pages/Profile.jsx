import React, { useEffect, useState } from "react";
import { dummyPostsData, dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import UserProfileInfo from "../components/UserProfileInfo";
import ProfileModal from "../components/ProfileModal"; 

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
      <div className="max-w-4xl mx-auto px-4">
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
        </div>

        <UserProfileInfo
          user={user}
          posts={posts}
          profileId={profileId}
          setShowEdit={setShowEdit} // 👈 نمررله setShowEdit
        />

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

        {/* Tabs Content */}
        <div className="mt-6 flex flex-col items-center">
          {/* POSTS TAB */}
          {activeTab === "posts" && (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {/* MEDIA TAB */}
          {activeTab === "media" && (
            <div className="flex flex-wrap gap-4 justify-center p-6">
              {posts
                .filter(
                  (post) => post.image_urls && post.image_urls.length > 0
                )
                .flatMap((post) =>
                  post.image_urls.map((image, index) => (
                    <Link
                      target="_blank"
                      to={image}
                      key={`${post._id}-${index}`}
                      className="relative group"
                    >
                      <img
                        src={image}
                        className="w-64 aspect-video object-cover rounded-lg shadow"
                        alt="post media"
                      />

                      <p
                        className="absolute bottom-0 right-0 text-xs text-white p-1 px-3
                        bg-black/40 backdrop-blur-md rounded-tl-lg
                        opacity-0 group-hover:opacity-100 transition duration-300"
                      >
                        Posted {moment(post.createdAt).fromNow()}
                      </p>
                    </Link>
                  ))
                )}
            </div>
          )}

          {/* LIKES TAB */}
          {activeTab === "likes" && (
            <div className="text-center text-gray-500 p-6">
              No liked posts yet.
            </div>
          )}
        </div>

       
        {showEdit && (
          <ProfileModal
            user={user}                     
            setShowEdit={() => setShowEdit(false)} 
          />
        )}
      </div>
    </div>
  ) : (
    <Loading height="70vh" />
  );
};

export default Profile;
