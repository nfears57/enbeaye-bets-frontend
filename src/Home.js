import React from 'react';
import GameList from './GameList';
import './Home.css'

function Home({bettor, balance, balanceChange}) {
  return (
    <div>
      <h1>Welcome to the betting platform!</h1>
      <h1>Please Gamble Responsibly</h1>
      {bettor === null ? null : <GameList bettor={bettor} balance={balance} balanceChange={balanceChange}/>}
      
    </div>
  );
}

export default Home;
