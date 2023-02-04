import React, {useContext, useEffect, useMemo, useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import FriendContext from '../context/Friends/FriendContext';
import Modal from './Modal';
import SplitBillFriendsItem from './SplitBillFriendsItem';

export default function SplitBill() {

  const {friendJson, getFriends, getUserName} = useContext(FriendContext)
  // const [payamount, setPayamount] = useState(0)
  const [billaftersplit, setBillaftersplit] = useState(0)
  const [selectedFriends, setSelectedFriends] = useState([])
  const refToLaunchModal = useRef()

  const navigate = useNavigate()

  useEffect (() => {
    if(localStorage.getItem('authToken')) {
      getFriends()
      setSelectedFriends([...selectedFriends, localStorage.getItem('name')])
    }
    else navigate('/signin')
  }, [])


  const handleOnChangeofCheckBox = (event) => {
    const {value} = event.target
    // If its already present and still onChange is Triggered then the Item was unSelected and we have to remove it
    if(selectedFriends.includes(value)) {
        setSelectedFriends(selectedFriends.filter(name => name !== value))
    }
    else {
        setSelectedFriends([...selectedFriends, value])
    }
  }


  const handlePay = (event) => {
    event.preventDefault()

    let size = selectedFriends.length

    let amount = localStorage.getItem('payamount')
    setBillaftersplit(Math.round(amount/size))

    refToLaunchModal.current.click()
  }

  return (
    <>
    <button ref={refToLaunchModal} type="button" modal-backdrop="false" data-backdrop="false" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button>
    <Modal billaftersplit={billaftersplit} selectedFriends={selectedFriends}/>

    <div className="container">
      <h2 className="text-center">Choose the Friends you want to Split with</h2>
      {friendJson.length === 0 && <div className="text-conter">You don't have any friends</div>}
      {friendJson.map((element) => {
        return element.friends.map((eachFriend) => {
          return (
            <SplitBillFriendsItem key={eachFriend} friendId={eachFriend} handleOnChangeofCheckBox={handleOnChangeofCheckBox}/>
          );
        });
      })}
      <button type="submit" className="btn btn-primary my-3" onClick={handlePay}>Pay</button>
    </div>
    </>
  )
}
