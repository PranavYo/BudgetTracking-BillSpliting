import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alerts/AlertContext'


export default function Signup() {

    const host = "http://127.0.0.1:8000/"

    const navigate = useNavigate()

    const {showAlert} = useContext(AlertContext)

    const [credentails, setCredentials] = useState( {username: "", password: ""} )
    
    const onChange = (event) => { // Keeping other key values unchanged, only changing the key values of the event fired input name
        setCredentials( {...credentails, [event.target.name]: event.target.value} ) 
        // So what "[event.target.name]: event.target.value" this means is setting email: input, password: input of the credentials
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        try {
          const url = `${host}api/users/`
          const response = await fetch(url, {
              method: 'POST', // *GET, POST, PUT, DELETE, etc.
              mode: 'cors', // no-cors, *cors, same-origin
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify( {username: credentails.username, password: credentails.password} )
          });
          const json = await response.json()
          if(json.id) {
            localStorage.setItem("authToken", json.token)
            localStorage.setItem("name", json.username)
            localStorage.setItem('budget', 10000)
            // localStorage.setItem("UserModelLoginID", json.id)


            showAlert("Sign Up Successful!", "success")
            navigate("/yourNotes")
          }
          else {
            showAlert("A user with that username already exists.", "danger")
          }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div >
      <h3 className='text-center'>Sign Up</h3>
      <form onSubmit={handleOnSubmit}> 
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" name="username" value={credentails.username} onChange={onChange} minLength={3} required />
          </div>
          {/* <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={credentails.email} onChange={onChange} required />
          </div> */}
          <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" autoComplete='on' className="form-control" id="password" name="password" value={credentails.password} onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary">Sign Up</button>
        </form>
    </div>
  )
}
