import { useState } from "react";
import NoteContext from "./noteContext";

export default function NoteState(props) {
    const host = "http://127.0.0.1:8000/"

    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)
    
    // Get all notes
    const getNotes = async () => {
      const url = `${host}api/transactions/`
      const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        }
      });
      const json = await response.json()
      setNotes(json)
    }

    // Add a note
    const addNote = async (body) => {
      const url = `${host}api/transactions/`
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify( {body} )
      });
      const note = await response.json()
      setNotes(notes.concat(note))
    }

    // Delete a Note
    const deleteNote = async (id) => {
      const url = `${host}api/transactions/${id}/`
      await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        }
      });
      const newNotes = notes.filter((note) => {return note.id !== id})
      setNotes(newNotes)
    }

    // Read a note
    const readNote = async (id) => {
      const url = `${host}api/transactions/${id}/`
      await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        }
      });
    }

    // Update/Edit a Note
    const updateNote = async (id, body) => {
      const url = `${host}api/transactions/${id}/`
      await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify( {body} ) // body data type must match "Content-Type" header
      });
      // const json = response.json();
      // setNotes(json)
      for (let i = 0; i < notes.length; i++) {
        const element = notes[i];
        if(element.id === id) {
          element.body = body
          break
        }
      }
    }

    return ( 
      <NoteContext.Provider value={ {notes, addNote, deleteNote, updateNote, getNotes, readNote} }>
        {props.children}
      </NoteContext.Provider>
    )
}