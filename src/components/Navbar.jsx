import { Link, useNavigate } from "react-router-dom"
import React from "react";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { BASE_URL } from "../constants/constants"
import { removeUser } from "../store/userSlice";

const Navbar = () => {
  // get the user from the store
  const user = useSelector((store) => store.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // handle log out
  const handleLogout = async () => {

    try {
      // logout the user
      const res = await axios.post(`${BASE_URL}/logout`, {}, {withCredentials: true})

      // dispatch the remove user action to the store
      dispatch(removeUser())

      // navigate to login page
      return navigate("/login")
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">👨‍💻DevTinder</Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mr-3"> 
          <span className="mr-4">Welcome, {user.firstName}</span>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
               
              <div className="w-10 rounded-full">
               
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" >Connections</Link>
              </li>
              <li>
                <Link to="/requests" >Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
