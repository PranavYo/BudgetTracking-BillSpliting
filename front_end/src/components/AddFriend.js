import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FriendContext from '../context/Friends/FriendContext'
import AlertContext from '../context/Alerts/AlertContext';

export default function AddFriend() {
    const navigate = useNavigate()
    const {addFriends, getUserId, getViewFriendsSetUId} = useContext(FriendContext)
    const {showAlert} = useContext(AlertContext)

    const [friendUsername, setFriendUsername] = useState( {username: ""} )

    const onChange = (event) => {
        setFriendUsername( {...friendUsername, [event.target.name]: event.target.value} )
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        const UIdOfReceiver = await getUserId(friendUsername.username)
        if(UIdOfReceiver === -1) {
            showAlert('This user does not exit', 'danger')
        }
        else {
            const rid = await getViewFriendsSetUId(UIdOfReceiver)
            const UIdOfSender = await getUserId(localStorage.getItem('name'))
            const sid = await getViewFriendsSetUId(UIdOfSender)
            await addFriends(sid, rid)
            showAlert('Friend added successfully', 'success')
            navigate('/yourfriends')
        }
    }


  return (
    <div>
      <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
            <h3 htmlFor="description">Username: </h3>
            <textarea className="form-control" id="username" name="username" onChange={onChange} required ></textarea>
        </div>
        <button disabled={friendUsername.username.length < 1} type="submit" className="btn btn-primary mx-2"  >Add</button>  {/* onClick={onAddClick} */}
      </form>
    </div>
  )
}
