import React, { useContext, useEffect, useState } from 'react'
import * as PropTypes from 'prop-types'
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AlertContext from '../context/Alerts/AlertContext'
import FriendContext from '../context/Friends/FriendContext';

export default function Navbar(props) {
  let location = useLocation();

  const {showAlert} = useContext(AlertContext)
  const {getBudget, getBudgetViewSetUId, getUserId} = useContext(FriendContext)

  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('name')
    localStorage.removeItem('UserModelLoginID')
    localStorage.removeItem('budget')
    
    showAlert("Log Out Successful!", "success")
    navigate('/home')
  }

  const [budget, setBudget] = useState(0)

  const setTheBudget = async () => {
      const uid = await getUserId(localStorage.getItem('name'))
      const budgetId = await getBudgetViewSetUId(uid)
      const getBudgetAmount = await getBudget(budgetId)
      setBudget(getBudgetAmount)
  }

  useEffect(() => {
    if(localStorage.getItem('authToken')) {
      setTheBudget()
    }
  })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <Link className="navbar-brand" to='/'>BudgetTracker</Link>
      {/* <Link className="navbar-brand" to="/">
        <img src={require('../images/navlogo.png')} alt='eNoteBook' width={150} height={40} />
      </Link> */}
        {/* <Link className="navbar-brand" to="/">{props.title}</Link> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? "active" : ""} `} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={` nav-link ${location.pathname === '/yourNotes' ? "active" : ""} `} to="/yourNotes">My Transactions</Link>
            </li>
            <li className="nav-item">
              <Link className={` nav-link ${location.pathname === '/yourfriends' ? "active" : ""} `} to="/yourfriends">My Friends</Link>
            </li>
            <li className="nav-item">
              <Link className={` nav-link ${location.pathname === '/addbudget' ? "active" : ""} `} to="/addbudget">Add Budget</Link>
            </li>
            <li className="nav-item">
              <Link className={` nav-link ${location.pathname === '/about' ? "active" : ""} `} to="/about">About us</Link>
            </li>
          </ul>
        </div>
        {
          !localStorage.getItem('authToken') ? 
          <ul className='navbar-nav'>
            <li className="nav-item">
              <Link type="button" className="btn btn-outline-success mx-1" to="/signin">Sign In</Link>
            </li>
            <li className="nav-item">
              <Link type="button" className="btn btn-outline-success mx-1" to="/signup">Sign Up</Link>
            </li>
          </ul>
          :
          <ul className='navbar-nav'>
            <li className="nav-item">
              <span className='nav-link active align-self-center'>Budget: {budget} </span>
            </li>
            <li className="nav-item">
              <span className='nav-link active align-self-center'>User: {localStorage.getItem('name')} </span>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-outline-success mx-2" onClick={handleLogOut}>Log Out</button>
            </li>
          </ul>
        }
      </div>
    </nav>
  )
}

Navbar.prototypes = {
  title: PropTypes.string.isRequired
}

Navbar.defaultProps = {
  title: "Set title here"
}