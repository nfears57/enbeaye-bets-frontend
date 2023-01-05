import React, {useState, useEffect} from "react";

function Wallet({bettor, wager, balanceChange}) {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [accountBalance, setAccountBalance] = useState(bettor.account_balance)
  console.log(balanceChange)
  console.log(wager)
  useEffect(() => {
    // Load the balance from local storage
    const storedBalance = localStorage.getItem('account_balance');
    if (storedBalance) {
      setBalance(parseFloat(storedBalance));
    }
  }, []);

  useEffect(() => {
    // Save the balance to local storage
    localStorage.setItem('account_balance', parseFloat(bettor.account_balance));
  }, [parseFloat(bettor.account_balance)]);
console.log(balance)
console.log((parseFloat(amount) + parseFloat(bettor.account_balance)))

function updateBalance(newBalance) {
    // Make a PATCH request to the server to update the balance
    fetch(`bettors/${bettor.id}/update-balance`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account_balance: newBalance }),
    }).then((response) => {
      if (!response.ok) {
        alert("Error updating balance");
      }
    });
  }
  
  function handleAddToWallet() {
    // Update the balance
    const newBalance = (parseFloat(amount) + bettor.account_balance);
    console.log(typeof(bettor.account_balance))
    console.log(typeof(newBalance))
    setBalance(newBalance);
    setAccountBalance(newBalance)
    // Call the updateBalance function to update the balance on the server
    updateBalance(newBalance);
  }
  function handleChange(event) {
    setAmount(event.target.value);
  }

  function handleWithdraw() {
    if (amount > bettor.account_balance) {
      alert("Insufficient balance!");
    } else {
      // Update the balance
      const newWithdrawnBalance = (accountBalance - parseFloat(amount));
      console.log(newWithdrawnBalance)
      setBalance(newWithdrawnBalance);
      setAccountBalance(newWithdrawnBalance)
      // Call the updateBalance function to update the balance on the server
      updateBalance(newWithdrawnBalance);
    }
  }

  return (
    
        <>
       <div className="account-balance">Account Balance: {accountBalance}</div>
          <input type="number" value={amount} onChange={handleChange} className="wallet-input" />
          <button className="add-to-wallet-button" onClick={handleAddToWallet}>Add to Wallet</button>
          <button className="withdraw-button" onClick={handleWithdraw}>Withdraw</button>
        </>
  )

}
export default Wallet