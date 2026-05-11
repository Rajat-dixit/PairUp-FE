import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Base_URL } from "../utils/constants";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(Base_URL+"/user/connections", {
        withCredentials: true,
      });

      console.log(res.data);
      dispatch(addConnections(res.data));
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0)
    return (
      <div className="flex justify-center my-10">
        <h1 className="text-2xl">No Connections Found</h1>
      </div>
    );

  return (
    <div  className="flex flex-col items-center my-10">
      <h1 className="text-3xl font-bold mb-6">Your Connections</h1>

      <div className="w-full max-w-2xl space-y-4">
        {connections.map((connection) => {
          const {_id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 p-4 bg-base-200 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <img
                src={photoUrl}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover border"
              />

              <div className="flex-1 text-left">
                <h2 className="text-xl font-semibold">
                  {firstName} {lastName}
                </h2>

                <p className="text-sm text-gray-500">
                  {age} • {gender}
                </p>

                <p className="mt-1 text-gray-700">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
