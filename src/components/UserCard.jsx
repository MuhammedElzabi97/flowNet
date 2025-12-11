import React from "react";
import { dummyUserData } from "../assets/assets";
import { MapPin, MessageCircle, Plus, UserPlus } from "lucide-react";

const UserCard = ({ user }) => {
  const currentUser = dummyUserData;

  const isFollowing = currentUser?.following?.includes(user._id);

  const handleFollow = async () => {
    console.log("Follow clicked for:", user._id);
  };

  const handleConnectionRequest = async () => {
  };

  return (
    <div
      className="p-4 pt-6 flex flex-col justify-between border border-green-200 rounded-md mx-auto max-w-xs bg-white shadow-sm"
    >
      <div className="text-center">
        <img
          src={user.profile_picture}
          className="rounded-full w-16 h-16 object-cover shadow-md mx-auto"
          alt={user.full_name}
        />
        <p className="mt-4 font-semibold text-slate-800">
          {user.full_name}
        </p>

        {user.username && (
          <p className="text-gray-500 font-light">
            @{user.username}
          </p>
        )}

        {user.bio && (
          <p className="text-gray-600 mt-2 text-center text-sm px-4">
            {user.bio}
          </p>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-600">
        {user.location && (
          <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
        )}

        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1">
          <span>{user.followers?.length ?? 0}</span>
          <span>Followers</span>
        </div>
      </div>

      <div className="flex mt-4 gap-2">
        <button
          onClick={handleFollow}
          disabled={isFollowing}
          className={`w-full py-2 rounded-md flex justify-center items-center gap-2 
          bg-gradient-to-r from-indigo-500 to-purple-600 
          hover:from-indigo-600 hover:to-purple-700
          active:scale-95 transition text-white cursor-pointer
          disabled:opacity-60 disabled:cursor-default`}
        >
          <UserPlus className="w-4 h-4" />
          {isFollowing ? "Following" : "Follow"}
        </button>

        <button onClick={handleConnectionRequest}
        className="flex items-center justify-center w-16  border text-slate-500 group rounded-md cursor-pointer active:scale-95 transition">
        {
            currentUser?.connections.includes(user._id)?
            <MessageCircle className="h-5  w-5 gruop-hover:scale-105 transition"/>
            :
            <Plus  className="h-5  w-5 gruop-hover:scale-105 transition"/>
        }
        </button>
      </div>
    </div>
  );
};

export default UserCard;
