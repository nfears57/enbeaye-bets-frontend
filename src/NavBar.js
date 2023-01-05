import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css"
import logo from "../src/NJFbetsLogo.png"
import Wallet from './Wallet';

function NavBar({onLogout, isLoggedIn, bettor, balanceChange}) {
  const [balance, setBalance] = useState(0);


  function handleLogout() {
    // const logout = onLogout
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      // Reset the balance to 0 when the logout is successful
      setBalance(0);
      // Call the onLogout callback
      onLogout();
      window.location.href = '/login';
  })
  }

    return (
      <nav className="nav">
        <img src={logo} className="logo" alt="NJFbets logo" />
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/rules">Rules</Link>
        <Link to="/login">Login</Link>
        
        {isLoggedIn && (
        <Wallet bettor={bettor} balance={balance} balanceChange={balanceChange}/>
          )}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default NavBar;









    // function handleAddToWallet() {
    //   setBalance(Number(balance) + Number(amount));
    // }
  
    // const handleChange = (event) => {
    //   setAmount(event.target.value);
    // };
  
    // function handleWithdraw(e){
    //   e.preventDefault()
    //   if (amount > balance) {
    //     alert("Insufficient balance!");
    //   } else {
    //     setBalance(balance - amount);
    //   }
    // }

      // function updateBalance(newBalance, id) {
  //   // Make a PATCH request to the server to update the balance
  //   fetch(`/update-balance/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ balance: newBalance }),
  //   }).then((response) => {
  //     if (!response.ok) {
  //       alert("Error updating balance");
  //     }
  //   });
  // }
  
  // function handleAddToWallet() {
  //   // Update the balance
  //   const newBalance = Number(balance) + Number(amount);
  //   setBalance(newBalance);
  //   // Call the updateBalance function to update the balance on the server
  //   updateBalance(newBalance);
  // }
  // function handleChange(event) {
  //   setAmount(event.target.value);
  // }

  // function handleWithdraw(e) {
  //   e.preventDefault();
  //   if (amount > balance) {
  //     alert("Insufficient balance!");
  //   } else {
  //     // Update the balance
  //     const newBalance = balance - amount;
  //     setBalance(newBalance);
  //     // Call the updateBalance function to update the balance on the server
  //     updateBalance(newBalance);
  //   }
  // }
