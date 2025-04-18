
import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import axios from 'axios'
import { BASE_URL } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../store/userSlice'

const Body = () => {

  // it is used to dispatch an event to our store
  const dispatch = useDispatch()
  // it is used to navigate through different routes of our application
  const navigate = useNavigate()  

  // get the user from the store
  const user = useSelector(store => store.user)

  // fetch the user
  const fetchUser = async () => {

    try {

      // getting the user data
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true
      })
      
      // adding the user to the store
      dispatch(addUser(res.data))

    } catch (error) {

      // redirect to login page if user is not authorized
      if(error.status === 401) navigate("/login")
      console.log("Error aa gyi: ", error.message)
    }

  }

  // use effect will run only first time when our component is completely rendered
  useEffect(() => {
    // only call the fetch user when user is not exist on the store
    if(!user) fetchUser()
      
  }, [])

  return <>
    <Navbar />
    <Outlet />
    <Footer />

  </>
}

export default Body