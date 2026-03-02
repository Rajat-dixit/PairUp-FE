import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { Base_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //this is login form switch will tell us whether we are signing in or we are logging in
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        Base_URL + "/login",
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        Base_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "SignUp"}
          </h2>

          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="String"
                    value={firstName}
                    className="input input-bordered w-full mt-2 text-center"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset my-2">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="String"
                    value={lastName}
                    className="input input-bordered w-full mt-2 text-center"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Email Address</legend>
              <input
                type="email"
                value={emailId}
                className="input input-bordered w-full mt-2 text-center"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                value={password}
                className="input input-bordered w-full mt-2 text-center"
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>

          <p className="text-red-600 flex justify-center">{error}</p>
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-secondary w-40"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            <span
              className="cursor-pointer font-medium hover:underline transition"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Sign up here"
                : "Existing User? Login here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
