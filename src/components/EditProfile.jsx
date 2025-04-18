import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { addUser } from "../store/userSlice";

const EditProfile = ({ user }) => {
  // state variables
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  // it is used to dispatch an action which changes the state of our store
  const dispatch = useDispatch();

  const saveProfile = async () => {
    // clear the error
    setError("");

    try {
      // call this API to update the profile
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        {
          firstName,
          lastName,
          photoUrl,
          about,
          age,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <div className="flex justify-center my-10">
        <div className="card card-border bg-base-300 w-96">
          <div className="card-body">
            {/* heading */}
            <h2 className="card-title flex justify-center">Edit Profile</h2>
            <div>
              {/* First Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  type="text"
                  value={firstName}
                  className="input"
                  placeholder="Enter First Name"
                />
              </fieldset>

              {/* Last Name */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  type="text"
                  value={lastName}
                  className="input"
                  placeholder="Enter Last Name"
                />
              </fieldset>

              {/*  Photo Url */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo Url</legend>
                <input
                  onChange={(e) => {
                    setPhotoUrl(e.target.value);
                  }}
                  type="text"
                  value={photoUrl}
                  className="input"
                  placeholder="Enter Photo Url"
                />
              </fieldset>

              {/* Age */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Age</legend>
                <input
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  type="number"
                  value={age}
                  className="input"
                  placeholder="Enter Age"
                />
              </fieldset>

              {/* About */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  onChange={(e) => {
                    setAbout(e.target.value);
                  }}
                  type="text"
                  value={about}
                  className="input"
                  placeholder="Enter About"
                />
              </fieldset>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {/* button */}
            <div className="card-actions justify-center">
              <button onClick={saveProfile} className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard user={{ firstName, lastName, age, about, photoUrl }} />
      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div> }
    </div>
  );
};

export default EditProfile;
