import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alerts/AlertContext'
import FriendContext from '../context/Friends/FriendContext'

export default function AddBudget() {

  const navigate = useNavigate()
  const {showAlert} = useContext(AlertContext)
  const {getBudgetViewSetUId, getUserId, updateBudget} = useContext(FriendContext)

  const [updatingBudget, setUpdatingBudget] = useState( {amount: 0} )

  const onChange = (event) => {
    setUpdatingBudget( {...updatingBudget, [event.target.name]: event.target.value} )
  }

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    const uid = await getUserId(localStorage.getItem('name'))
    const budgetId = await getBudgetViewSetUId(uid)
    await updateBudget(budgetId, updatingBudget.amount)
    showAlert('Amount added successfully', 'success')
    navigate('/yournotes')
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
            <h3 htmlFor="description">Add Amount: </h3>
            <textarea className="form-control" id="amount" name="amount" onChange={onChange} required ></textarea>
        </div>
        <button  type="submit" className="btn btn-primary mx-2">Add</button>  {/* onClick={onAddClick} */}
      </form>
    </div>
  )
}
