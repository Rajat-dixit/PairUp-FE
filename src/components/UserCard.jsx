import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, emailId, gender, photoUrl, about, age } = user;
  return (
    <div className="flex justify-center">
  <div className="card bg-base-300 w-96 shadow-2xl hover:shadow-purple-500/30 transition-all duration-300">

    {/* Image */}
    <figure className="h-72 overflow-hidden">
      <img
        src={user.photoUrl}
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
        <button className="btn btn-outline btn-error px-6">
          Ignore
        </button>

        <button className="btn btn-secondary px-8">
          Send Request
        </button>
      </div>

    </div>
  </div>
</div>

  );
};

export default UserCard;
