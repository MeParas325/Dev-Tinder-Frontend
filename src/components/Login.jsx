import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BASE_URL } from "../constants/constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // state variables
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  // it is used to dispatch an action which changes the state of our store
  const dispatch = useDispatch();
  // navigate to different routes in our application
  const navigate = useNavigate();

  // handle the login
  const handleLogin = async () => {
    try {
      // API call for user login
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // add login user to the store
      dispatch(addUser(res.data.data));
      setError("");

      // redirect to / page
      return navigate("/");
    } catch (error) {
      // set error message
      setError(error.response.data);
    }
  };

  // handle sign up
  const handleSignup = async () => {
    try {
      // API call for user signup
      const res = await axios.post(
        `${BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      // add signup user to the store
      dispatch(addUser(res?.data?.data));
      setError("");

      // redirect to / page
      return navigate("/profile");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          {/* heading */}
          <h2 className="card-title flex justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <div>
            {/* First Name */}
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    // change the email according to user input
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    type="text"
                    // bind input with emailid
                    value={firstName}
                    className="input"
                    placeholder="Enter First Name"
                  />
                </fieldset>

                {/* Last Name */}
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    // change the email according to user input
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    // bind input with emailid
                    value={lastName}
                    className="input"
                    placeholder="Enter Last Name"
                  />
                </fieldset>
              </>
            )}

            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                // change the email according to user input
                onChange={(e) => {
                  setEmailId(e.target.value);
                }}
                type="text"
                // bind input with emailid
                value={emailId}
                className="input"
                placeholder="Enter Email"
              />
            </fieldset>

            {/* Password */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                // change the password according to user password
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                // bind input with password
                value={password}
                className="input"
                placeholder="Enter Password"
              />
            </fieldset>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {/* button */}
          <div className="card-actions justify-center">
            <button
              onClick={isLoginForm ? handleLogin : handleSignup}
              className="btn btn-primary"
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>

          <p
            onClick={() => setIsLoginForm(!isLoginForm)}
            className="cursor-pointer hover:text-blue-400 text-center"
          >
            {isLoginForm
              ? "New User? Signup here"
              : "Existing User? Login here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
