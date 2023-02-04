import './App.css';
import About from './components/About'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom";
import NoteState from './context/notes/noteState';
import YourNotes from './components/YourNotes';
import AddNote from './components/AddNote';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Alert from './components/Alert'
import AlertState from './context/Alerts/AlertState';
import YourFriends from './components/YourFriends';
import FriendState from './context/Friends/FriendState';
import AddFriend from './components/AddFriend';
import SplitBill from './components/SplitBill';
import AddBudget from './components/AddBudget';

function App() {

  return (
    <>
      <AlertState>
        <FriendState>
          <Navbar/>
          <div style={{height: '40px'}}>
            <Alert/>
          </div>
          <NoteState>
            <div className="container">
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/yourNotes" element={<YourNotes />} />
                <Route path="/addNote" element={<AddNote />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path='/yourfriends' element={<YourFriends />} />
                <Route path='/addfriend' element={<AddFriend />} />
                <Route path='/splitbill' element={<SplitBill />} />
                <Route path='/addbudget' element={<AddBudget />} />
              </Routes>
            </div>
          </NoteState>
        </FriendState>
      </AlertState>
    </>
  );
}

export default App;
