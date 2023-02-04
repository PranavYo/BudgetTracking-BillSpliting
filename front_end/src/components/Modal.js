import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alerts/AlertContext'
import FriendContext from '../context/Friends/FriendContext'
import noteContext from '../context/notes/noteContext'

export default function Modal(props) {

    const {addNote} = useContext(noteContext)
    const {getBudget, getUserId, getBudgetViewSetUId, SinglePayBudget} = useContext(FriendContext)
    const {billaftersplit, selectedFriends} = props
    const navigate = useNavigate()
    const {showAlert} = useContext(AlertContext)

    const handlePay = async () => {
        let allfriendsCanPay = true
        for(let i=0;i<selectedFriends.length;i++) {
            const uid = await getUserId(selectedFriends[i])
            const budgetId = await getBudgetViewSetUId(uid)
            const budget = await getBudget(budgetId)
            if(budget < billaftersplit) {
                allfriendsCanPay = false;
                break;
            }
        }
        if(allfriendsCanPay) {
            localStorage.removeItem('payamount')
            addNote(billaftersplit)
            for(let i=0;i<selectedFriends.length;i++) {
                const uid = await getUserId(selectedFriends[i])
                const budgetId = await getBudgetViewSetUId(uid)
                await SinglePayBudget(budgetId, billaftersplit)
            }
            showAlert('Payment is successful!', 'success')
            navigate('/yourNotes')
        }
        else {
            showAlert('Your Friends Budget is low', 'danger')
        }
    }

  return (
    <div>
        <div className="modal" id="exampleModal" modal-backdrop="false" data-backdrop="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Bill Amount for each Friend</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {billaftersplit}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handlePay}>Pay</button>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}
