import React, {useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import FriendContext from '../context/Friends/FriendContext';
import FriendItem from './FriendItem'

export default function YourFriends() {

  const {friendJson, getFriends} = useContext(FriendContext)

  const navigate = useNavigate()

  useEffect (() => {
    if(localStorage.getItem('authToken')) {
      getFriends()
    }
    else navigate('/signin')
  }, [])

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <>
      <div className="container">
        <div className="d-inline-flex">
          <Link type="button" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="btn btn-success" to="/addfriend">
            <i className="fa-solid fa-plus"></i>
          </Link>
          {isHovering && <h6 className='d-flex align-items-center mx-3'>Add Friend</h6>}
        </div>
        <h2 className="text-center">Your Friends</h2>
        {
          friendJson.length === 1 && friendJson[0].friends.length === 0 && <div className="text-center">You don't have any friends</div>
        }
        {
          // friendJson is an array of objects

          // For some reason this doesn't work
          // friendJson[0].friends.map((eachFriend) => {
          //   return <FriendItem key={eachFriend} friend={eachFriend}/>
          // }) 

          // Accessing friends inside friendJson object array be like
          friendJson.map((element) => {
            return element.friends.map((eachFriend) => {
              return <FriendItem key={eachFriend} friend={eachFriend}/>
            })
          })
        }
      </div>
    </>
  )
}
