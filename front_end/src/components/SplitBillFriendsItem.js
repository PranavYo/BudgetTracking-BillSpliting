import React, { useContext, useEffect, useState } from 'react'
import FriendContext from '../context/Friends/FriendContext'

export default function SplitBillFriendsItem(props) {

    const {friendId, handleOnChangeofCheckBox} = props
    const {getUserName} = useContext(FriendContext)
    const [userName, setUserName] = useState('')
    
    const callGetUserName = async () => {
        const userNameRes = await getUserName(friendId)
        setUserName(userNameRes)
    }

    useEffect(() => {
        callGetUserName()
    }, [])

  return (
    <div>
        <div className="form-check" key={friendId}>
            <input className="form-check-input" type="checkbox" value={userName} onChange={handleOnChangeofCheckBox}/>
            <h6 className="form-check-label" htmlFor="flexCheckDefault" id="flexCheckDefault">
                Friend Name: {userName}
            </h6>
        </div>
    </div>
  )
}
