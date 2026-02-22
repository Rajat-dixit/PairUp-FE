import React from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

const Navbar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
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
                    src="https://c.saavncdn.com/346/Giga-Chad-English-2022-20230623063017-500x500.jpg"
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
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
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
