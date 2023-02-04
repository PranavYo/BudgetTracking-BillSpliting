import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../context/Alerts/AlertContext'
import Cookies from 'js-cookie'

export default function Signin() {

    const host = "http://127.0.0.1:8000/"

    const {showAlert} = useContext(AlertContext)

    const navigate = useNavigate()

    const [credentails, setCredentials] = useState( {username: "", password: ""} )
    
    const onChange = (event) => { // Keeping other key values unchanged, only changing the key values of the event fired input name
        setCredentials( {...credentails, [event.target.name]: event.target.value} ) 
        // So what "[event.target.name]: event.target.value" this means is setting email: input, password: input of the credentials
    }

    const handleOnSubmit = async (event) => {
        event.preventDefault()
        const url = `${host}auth/`
        // console.log(Cookies.get('csrftoken'))
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken' : `${Cookies.get('csrftoken')}`
            },
            body: JSON.stringify( {username: credentails.username, password: credentails.password} )
        });
        const json = await response.json()
        // console.log(json)
        if(json.token) {
            localStorage.setItem("authToken", json.token)
            localStorage.setItem("name", credentails.username)
            localStorage.setItem('budget', 10000)
            
            // console.log(json.username)
            showAlert("Sign In Sucessful!", "success")
            navigate("/yourNotes")
        }
        else showAlert("Invalid Credentials", "danger")
    }

    return (
    <div>
        <h3 className='text-center'>Sign In</h3>
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="username" className="form-control" id="username" name="username" value={credentails.username} onChange={onChange}/>
            </div>
            {/* <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={credentails.email} onChange={onChange}/>
            </div> */}
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" autoComplete='on' className="form-control" id="password" name="password" value={credentails.password} onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
    </div>
    )
}
