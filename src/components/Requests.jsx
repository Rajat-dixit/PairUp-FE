import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9999/user/requests/received",
        {
          withCredentials: true,
        },
      );

      console.log("Boom" + res);
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };
  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        "http://localhost:9999/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id))

    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl">No Requests Found</h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold mb-6">Your Requests</h1>

      <div className="w-full max-w-2xl space-y-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 p-4 bg-base-200 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {/* Profile Image */}
              <img
                src={photoUrl}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border"
              />

              {/* User Info */}
              <div className="flex-1 text-left">
                <h2 className="text-xl font-semibold">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm text-gray-500">
                  {age} • {gender}
                </p>

                <p className="mt-1 text-gray-700">{about}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  className="btn btn-success btn-sm w-24"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>

                <button
                  className="btn btn-error btn-sm w-24"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
