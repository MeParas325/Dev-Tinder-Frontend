import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../store/feedSlice'
import UserCard from './UserCard'

const Feed = () => {

  // get the feed from the store
  const feed = useSelector(store => store.feed)

  // to dispatch an action to the store
  const dispatch = useDispatch()

  // get feed for the user
  const getFeed = async () => {

    try {

      // get the feed from the db
      const res = await axios.get(`${BASE_URL}/user/feed`, {withCredentials: true})

      // dispatch or add the feed to the store
      dispatch(addFeed(res.data.feed))

    } catch (error) {
      console.log(error.response.data)
    }

  }

  // only get called when a component loads for the first time
  useEffect(() => {

    // get feeds if feeds are not in redux store
    if(!feed) getFeed()
    // getFeed()

  }, [])

  if(!feed) return;

  return (
    <div className='flex justify-center my-10'>
         {feed.length <= 0 &&  <h1 className='flex justify-center my-10'>No Feed Found!</h1>}
         {feed.length > 0 &&  feed.map((user, index) => <UserCard key={index} user={user} />)}
    </div>
  )
}

export default Feed