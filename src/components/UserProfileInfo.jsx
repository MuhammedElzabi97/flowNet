import React from "react";
import { Calendar, PenBox, Verified, MapPin } from "lucide-react";
import moment from "moment";

const UserProfileInfo = ({ user, posts = [], profileId, setShowEdit }) => {
  return (
    <div className="relative py-4 px-6 md:px-8 bg-white">
      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Avatar */}
        <div className="w-32 h-32 border-4 border-white shadow-lg absolute -top-16 rounded-full overflow-hidden bg-gray-100">
          {user?.profile_picture && (
            <img
              src={user.profile_picture}
              className="w-full h-full object-cover"
              alt="Profile"
            />
          )}
        </div>

        <div className="w-full pt-20 md:pt-4 md:pl-36">
          <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            {/* Name + username */}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.full_name || "Unnamed user"}
                </h1>

                {user?.is_verified && (
                  <Verified className="w-6 h-6 text-blue-500" />
                )}
              </div>

              <p className="text-gray-500 text-sm">
                {user?.username ? `@${user.username}` : "Add a username"}
              </p>
            </div>

            {/* Edit button (only if this is my profile) */}
            {!profileId && (
              <button
                onClick={() => setShowEdit?.(true)}
                className="flex items-center gap-2 border border-gray-300
                           hover:bg-gray-50 py-2 px-4 rounded-lg font-medium
                           transition-colors mt-2 md:mt-0 cursor-pointer"
              >
                <PenBox className="w-4 h-4" />
                Edit
              </button>
            )}
          </div>

          {/* Bio */}
          <p className="text-gray-700 text-sm max-w-md mt-4">
            {user?.bio || "Add a short bio about yourself."}
          </p>

          {/* Location + joined date */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {user?.location || "Add location"}
            </span>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Joined {moment(user?.createdAt).fromNow()}</span>
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-6 border-t border-gray-200 pt-4">
            <div>
              <span className="sm:text-xl font-bold text-gray-900">
                {posts?.length ?? 0}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                Posts
              </span>
            </div>
            <div>
                <span>{user?.followers?.length ?? 0}</span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                    Followers
                </span>
            </div>
            <div>
                <span>{user?.following?.length ?? 0}</span>
                <span className="text-xs sm:text-sm text-gray-500 ml-1.5">
                    Following
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileInfo;
