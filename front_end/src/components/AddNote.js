import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NoteContext from "../context/notes/noteContext";
import AlertContext from '../context/Alerts/AlertContext';
import FriendContext from '../context/Friends/FriendContext';

export default function AddNote() {

    const {addNote} = useContext(NoteContext)
    const {showAlert} = useContext(AlertContext)
    const {getBudgetViewSetUId, getUserId, SinglePayBudget, getBudget} = useContext(FriendContext)
    const [note, setNote] = useState( {body: ""} )

    // const (setPayamount) = props
    // const [payamount, setPayamount] = useState(0)

    const navigate = useNavigate()

    const onAddClick = async (event) => {
        event.preventDefault()
        // let budget = localStorage.getItem('budget')

        const uid = await getUserId(localStorage.getItem('name'))
        const budgetId = await getBudgetViewSetUId(uid)
        const budget = await getBudget(budgetId)

        let a = note.body
        let valid = true
        for(let i=0;i<a.length;i++) {
            if(a[i] < '0' || a[i] > '9') {
                valid = false
                break
            }
        }
        if(!valid) {
            showAlert("Please enter a valid Amount!", "danger")
        }
        else if(budget-note.body >= 0) {
            addNote(note.body)
            await SinglePayBudget(budgetId, note.body)
            // localStorage.setItem('budget', localStorage.getItem('budget')-note.body)
            showAlert("Transaction Added Successfully!", "success")
            navigate('/yourNotes')
        }
        else {
            showAlert("Out of Budget!", "danger")
        }
    }

    const onSplitClick = (event) => {
        event.preventDefault()
        let a = note.body
        let valid = true
        for(let i=0;i<a.length;i++) {
            if(a[i] < '0' || a[i] > '9') {
                valid = false
                break
            }
        }
        if(!valid) {
            showAlert("Please enter a valid Amount!", "danger")
        }
        else {

            localStorage.setItem('payamount', note.body)
            // setPayamount(note.body)
            navigate('/splitbill')
        }
    }

    const onChange = (event) => { // Keeping other key values unchanged, only changing the key values of the event fired input name
        setNote( {...note, [event.target.name]: event.target.value} )
    }

    return (
    <div className="container">
        <form>
            {/* <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" onChange={onChange} minLength={3} required />
            </div>
            <div className="mb-3">
                <label htmlFor="author" className="form-label">Author</label>
                <input type="text" className="form-control" id="author" name="author" onChange={onChange} minLength={3} required />
            </div> */}
            <div className="mb-3">
                <h3 htmlFor="description">Add Transaction Amount: </h3>
                <textarea className="form-control" id="body" name="body" onChange={onChange} minLength={5} required ></textarea>
            </div>
            <button disabled={note.body.length < 1} type="submit" className="btn btn-primary mx-2" onClick={onAddClick} >Pay</button>
            <button disabled={note.body.length < 1} type="submit" className="btn btn-primary mx-2" onClick={onSplitClick} >Split bill among Friends</button>
        </form>
    </div>
    )
}
