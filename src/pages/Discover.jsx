/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { dummyConnectionsData } from "../assets/assets";
import { Search } from "lucide-react";

import UserCard from "../components/UserCard";
import Loading from "../components/Loading";

const Discover = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState(dummyConnectionsData);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setLoading(true);

      const term = input.trim().toLowerCase();

      setTimeout(() => {
        // فلترة حقيقية حسب الاسم/اليوزر/البايو
        const filtered = dummyConnectionsData.filter((user) => {
          const fullName = user.full_name?.toLowerCase() || "";
          const username = user.username?.toLowerCase() || "";
          const bio = user.bio?.toLowerCase() || "";

          return (
            fullName.includes(term) ||
            username.includes(term) ||
            bio.includes(term)
          );
        });

        setUsers(filtered);
        setLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Discover People
          </h1>
          <p className="text-slate-600">
            Connect with amazing people and grow your network
          </p>
        </div>

        <div className="mb-8 shadow-md rounded-md border border-slate-200/60 bg-white">
          <div className="p-6">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5"
              />
              <input
                type="text"
                placeholder="Search people by name, username, bio, or location..."
                className="pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          {users.map((user) => (
            <UserCard user={user} key={user._id} />
          ))}

          {!loading && users.length === 0 && (
            <p className="text-slate-500 text-sm">
              No users found. Try a different keyword.
            </p>
          )}
        </div>

        {loading && <Loading height="60vh" />}
      </div>
    </div>
  );
};

export default Discover;
