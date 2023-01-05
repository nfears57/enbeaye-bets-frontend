import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [bets, setBets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/bets')
      .then(response => response.json())
      .then(data => setBets(data));
  }, []);

  const filteredBets = bets.filter(bet =>
    bet.pick.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return (
    <div>
      <h2>Transaction History</h2>
      <input
        type="text"
        placeholder="Search by pick"
        value={searchQuery}
        onChange={event => setSearchQuery(event.target.value)}
      />
      <ul>
        {filteredBets.map(bet => (
          <ol key={bet.id}>
            <p>Pick: {bet.pick}</p>
            <p>Odds: {bet.odds}</p>
            <p>Wager: {bet.wager}</p>
            {/* <p>Payout: {bet.total_payout}</p> */}
          </ol>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
