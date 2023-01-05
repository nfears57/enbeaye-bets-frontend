import React, { useState, useEffect } from 'react';
import BetForm from './BetForm';
import "./GameList.css"

function GameList({ onAddBet, bettor, game, balance, setBalance, balanceChange }) {
  const [events, setEvents] = useState([]);
  const [selectedGame, setSelectedGame] = useState({});
  const [formValues, setFormValues] = useState({
    pick: '',
    wager: 0,
    odds: 0,
  });
  const [bets, setBets] = useState([])
  useEffect(() => {
    // Fetch the data from the API
    fetch('/games')
      .then((response) => response.json())
      .then((events) => {
        setEvents(events);
      })
      .catch((error) => {
        console.error(error);
        setEvents([]); // Set default value for games state
      });
  }, []);

  const handleButtonData = (outcomeName, outcomePrice, outcomeSpread) => {
    setFormValues({
      ...formValues,
      pick: `${outcomeName} ${outcomeSpread}`,
      odds: outcomePrice,
      point: outcomeSpread,
    });
  }
  console.log(formValues)

  const handleAddBet = (formValues) => {
    setBets([...bets, formValues]);
    // console.log(bets)
  }

  function handleClick(game) {
    setSelectedGame(game.id === selectedGame.id ? {} : game);
  }

  function showWager(wager){
    console.log(wager)
  }

if (!events) return null

  return (
    <div className="game-list" style={{ display: 'block', float: 'left' }}>
      <ul className="api-data">
        {events.map(event => (
          <li key={event.id} style={{ listStyleType: 'none' }}>
            <button onClick={() => handleClick(event)} data-sport={event.sport_title.toLowerCase()}>
              {event.sport_title}: {event.away_team} @ {event.home_team}
            </button>
            {selectedGame.id === event.id && (
              <div>
                <p>Home Team: {event.home_team}</p>
                <p>Away Team: {event.away_team}</p>
                <p>Pick A Book</p>
                <ul className='bookmaker-data' style={{ listStyleType: 'none' }}>
                  {event.bookmakers.map(bookmaker => (
                    <li key={bookmaker.bookmaker_name}>
                      <p>{bookmaker.bookmaker_name}</p>
                      <p>{bookmaker.title}</p>
                      <p>Odds</p>
                      <ul style={{ listStyleType: 'none' }}>
                        {bookmaker.markets.map(market => (
                          <ul key={market.market}>
                            <p>{market.market}</p>
                            <ul>
                              {market.outcomes.map(outcome => (
                                <ul className="market-data">
                                  <button onClick={() => handleButtonData(outcome.name, outcome.price, outcome.point)}>
                                    <p>{outcome.name} {outcome.point}</p>
                                    <p>{outcome.price}</p>
                                  </button>
                                </ul>
                              ))}
                            </ul>
                          </ul>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <div style={{ display: 'block', float: 'right' }}>
        <BetForm
          selectedGame={selectedGame}
          bettor={bettor}
          onSubmit={setBets}
          handleAddBet={handleAddBet}
          formValues={formValues}
          setFormValues={setFormValues}
          handleButtonData={handleButtonData}
          balance={balance}er
          setBalance={setBalance}
          balanceChange={balanceChange}
          showWager={showWager}
        />
      </div>
    </div>
  );
}
export default GameList
