import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../store/requestSlice";

const Requests = () => {

  const dispatch = useDispatch();

  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {

    try {
        const res = await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {withCredentials: true})
        dispatch(removeRequest(_id))
    } catch (error) {
        console.log("")
        
    }

  }

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });

      dispatch(addRequests(res?.data?.connectionRequests));
    } catch (error) {}
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="text-bold text-2xl text-center">No Requests Found</h1>
    );

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-3xl text-white">Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="m-4 p-4 rounded-lg bg-base-300 flex w-2/3 mx-auto"
          >
            <div>
              <img
                alt="photo"
                src={photoUrl}
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">
                {firstName} {lastName}
              </h2>
              {age && gender && <p>{age + " " + gender}</p>}
              <p>{about}</p>
            </div>
            <div className="flex justify-between items-center">
                <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
