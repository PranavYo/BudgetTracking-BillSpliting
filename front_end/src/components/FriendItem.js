import React, { useContext, useState } from 'react'
import FriendContext from '../context/Friends/FriendContext'

export default function FriendItem(props) {

  const {friend} = props
  const {getUserName} = useContext(FriendContext)
  const [userName, setUserName] = useState('')

  const callGetUserName = async () => {
    const userNameRes = await getUserName(friend)
    setUserName(userNameRes)
  }
  callGetUserName()
  return (
    <div>
      
      <div className="col-md-4 my-2">    
      <div className="card my-3">
        <div className="card-body align-self-center">
            {/* <h5 className="card-title">Friend ID: {friend}</h5> */}
            <h5 className="card-title">Friend Name: {userName}</h5>
            {/* <p className="card-text">{friend}.</p> */}
            {/* <i className="fa-solid fa-trash mx-2" onClick={onDeleteClick}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{ updateNote(note)} }></i>
            <i className="fa-solid fa-eye mx-2" onClick={()=>{ readNote(note) } } ></i> */}
        </div>
      </div>
    </div>
    </div>
  )
}
