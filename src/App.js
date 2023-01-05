import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Login from './Login';
import CreateAccountForm from './CreateAccountForm'
import Profile from './Profile';
import Rules from './Rules';
import './App.css'

function App({balance, id, balanceChange}) {
  const [bettor, setBettor] = useState(null)
  console.log("app.js", bettor)

  useEffect(() => {
    fetch(`/me/${id}`)
    .then(res => {
      if (res.ok) {
        res.json().then(bettor => setBettor(bettor))
      }
    })
    console.log(bettor)
  }, [])

  function handleLogOut() {
    fetch('/logout', {
      method: "DELETE"
    }).then(r => {
      if (r.ok) {
        setBettor(null)
      }
    })
  }

  
  function onLogin(bettor){
    setBettor(bettor)
  }
 
  return (
    <Router>
      <NavBar balance={balance} onLogout={handleLogOut} bettor={bettor} balanceChange={balanceChange} isLoggedIn={bettor !== null}/>
      <Routes>
       <Route exact path="/" element={<Home bettor={bettor} balance={balance}/>} />
      <Route path="/profile" element={<Profile bettor={bettor}/>} />
      <Route path="/rules" element={<Rules/>} />
      <Route path="/login" element={<Login setBettor={setBettor} onLogin={onLogin}/>} />
      <Route path="/create-account" element={<CreateAccountForm />} />
      {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

// {isLoggedIn && (
//   <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
//   )}
  
//   <div className="App"></div>
//   <BrowserRouter>
// <Routes>
//   <Route path="/home" element={<Home/>} />
//   <Route path="/login" element={<Login/>} handleLogin={handleLogin}/>
//   <Route path="/create-account" element={<CreateAccountForm/>}/>
// </Routes>
// </BrowserRouter>
// <Outlet />