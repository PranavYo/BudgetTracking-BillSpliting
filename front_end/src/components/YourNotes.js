import React, {useContext, useEffect, useRef, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem'
import AlertContext from '../context/Alerts/AlertContext';

export default function YourNotes() {
  
  const {notes, getNotes, updateNote} = useContext(noteContext)
  const {showAlert} = useContext(AlertContext)

  const navigate = useNavigate()

  useEffect (() => { // To Dynamically render the changes, Display the Notes after Adding, Deleting etc
    const token = localStorage.getItem('authToken')
    if(token && token !== 'undefined') {
      getNotes()
    }
    else {
      localStorage.removeItem('authToken')
      localStorage.removeItem('name')
      localStorage.removeItem('UserModelLoginID')
      localStorage.removeItem('budget')
      navigate('/signin')
    }
  }, [])

  const [note, setNote] = useState( {ebody: ""} )

  const ref3 = useRef(null)
  const onSaveClick = () => {
    // This updateNote() is imported from the noteContext to update the Notes in the back_end using Fetch APIs
    updateNote(note.eid, note.ebody)
    showAlert("Updated Successfully!", "success")
    ref3.current.click()
  }

  const onChange = (event) => { // Keeping other key values unchanged, only changing the key values of the event fired input name
    setNote( {...note, [event.target.name]: event.target.value} )
  }

  const ref1 = useRef(null)
  const readNote = (currNote) => {
    ref1.current.click()
    setNote( {eid: currNote.id, ebody: currNote.body} )
  }

  const ref2 = useRef(null)
  const updateNotelocal = (currNote) => {
    ref2.current.click()
    // To populate the existing values in the input fields of Update Modal
    setNote( {eid: currNote.id, ebody: currNote.body} )
  }

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
        <Link type="button" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="btn btn-success" to="/addNote">
          <i className="fa-solid fa-plus"></i>
        </Link>
        {isHovering && <h6 className='d-flex align-items-center mx-3'>Make a Transaction</h6>}
      </div>

      {/* Button trigger READ modal */}
      <button type="button" ref={ref1} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      {/* READ Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Transaction No: {note.eid}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {note.ebody}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


      {/* Button trigger EDIT modal */}
      <button type="button" ref={ref2} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Launch demo modal2
      </button>

      {/* EDIT Modal */}
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Transaction</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
              {/* <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" value={note.eid} id="etitle" name="etitle" onChange={onChange} minLength={3} required />
              </div> */}
              <div className="mb-3">
                  <label htmlFor="edescription">Body</label>
                  <textarea className="form-control" value={note.ebody} id="ebody" name="ebody" rows="5" onChange={onChange} minLength={5} required ></textarea>
              </div>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={ref3} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.ebody.length < 3} type="button" className="btn btn-primary" onClick={onSaveClick} >Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <h2 className="text-center">Your Transactions</h2>
      {
        notes.length === 0 && <div className="text-center">No notes to display</div>
        // if(notes.length === 0) {
        //   <div className="text-align center">No notes to display</div>
        // }
      }
      <div className="row">
        {/* Writing JavaScript in {} block */}
        {
          notes.map((notess) => { // for all notes in notess(list of notes)
            return <NoteItem key={notess.id} note={notess} readNote={readNote} updateNote={updateNotelocal} /> // Passing the whole "Notess" obj as props to the NoteItem component
          })
        }
      </div>
    </div>
    </>
  )
}
