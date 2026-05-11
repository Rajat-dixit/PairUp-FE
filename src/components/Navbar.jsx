import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom"
import { removeUser } from "../utils/userSlice";
import { Base_URL } from "../utils/constants";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const handleLogout = async()=>{
  try{
    axios.post(Base_URL+"/logout",{},{withCredentials:true});
    dispatch(removeUser())
    navigate("/login")
  }
  catch(err){
   res.status(401).send("Unable to logout: "+ err.message)
  }
 }

  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">PairUp</Link>
        </div>

        {user && (
          <div className="flex items-center gap-4 mx-5">
            <p className="font-medium">Welcome {user.firstName}</p>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src={user.photoUrl}
                  />
                </div>
              </div>

              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/connections">Connections</Link>
                </li>
                <li>
                  <Link to="/requests">Requests</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
