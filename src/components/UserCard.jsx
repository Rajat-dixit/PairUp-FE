import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { firstName, lastName, _id, gender, photoUrl, about, age } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        "http://localhost:9999/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="card bg-base-300 w-96 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300">
        {/* Image */}
        <figure className="h-72 overflow-hidden">
          <img
            src={user.photoUrl||null}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </figure>

        {/* Body */}
        <div className="card-body space-y-3">
          {/* Name */}
          <h2 className="card-title text-2xl font-bold">
            {firstName} {lastName}
            {user.age && (
              <span className="text-lg font-normal text-gray-400">
                , {user.age}
              </span>
            )}
          </h2>

          {/* About */}
          <p className="text-gray-300 text-sm leading-relaxed">
            {user.about || "No bio available"}
          </p>

          {/* Buttons */}
          <div className="card-actions justify-center gap-4 mt-4">
            <button
              className="btn btn-outline btn-error px-6"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-secondary px-8"
              onClick={() => handleSendRequest("intrested", _id)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
