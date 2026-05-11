import React, { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Base_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age||"");
  const [gender, setGender] = useState(user.gender||"");
  const [about, setAbout] = useState(user.about||"");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl||"");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        Base_URL+"/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-4">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center text-xl">
                Edit profile
              </h2>

              <div>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="firstName"
                    value={firstName}
                    className="input input-bordered w-full mt-2 px-3"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="lastName"
                    value={lastName}
                    className="input input-bordered w-full mt-2 px-3"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="number"
                    value={age || ""}
                    className="input input-bordered w-full mt-2 px-3 "
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-4">
                  <legend className="fieldset-legend mb-1">Gender</legend>

                  <select
                    value={gender}
                    className="select select-bordered w-full mt-2 px-3"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </fieldset>

               <fieldset className="fieldset my-4">
  <legend className="fieldset-legend mb-1">About</legend>

  <textarea
    value={about}
    className="textarea textarea-bordered w-full mt-2 px-3 py-2 h-24 resize-none"
    placeholder="Tell something about yourself..."
    onChange={(e) => setAbout(e.target.value)}
  ></textarea>
</fieldset>


                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Photo URL</legend>
                  <input
                    type="string"
                    value={photoUrl}
                    className="input input-bordered w-full mt-2 px-3 "
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>

              <p className="text-red-600 flex justify-center">{error}</p>
              <div className="card-actions justify-center m-2">
                <button
                  className="btn btn-secondary w-40"
                  onClick={saveProfile}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, gender, photoUrl, about, age }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Data Updated successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
