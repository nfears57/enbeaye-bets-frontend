import React, { useState} from 'react';
import Betcard from './Betcard';
import './BetForm.css'
import './BetCard.css'

function BetForm(props) {
  const { formValues, setFormValues, onSubmit, bettor, selectedGame, balance, setBalance, showWager} = props;
  console.log(selectedGame)
  // Use formValues state to pre-populate form fields
  const [pick, setPick] = useState(formValues.pick);
  const [wager, setWager] = useState('');
  const [odds, setOdds] = useState(formValues.odds);
  // const [payout, setPayout] = useState('')
  const [totalPayout, setTotalPayout] = useState(0);

  function calculateTotalPayout(wager) {
    let totalPayout;
    if (formValues.odds < 0) {
      totalPayout = wager / (formValues.odds / 100);
    } else {
      totalPayout = wager * (formValues.odds / 100);
    }
    return (Number(wager) + Math.abs(Number(totalPayout))).toFixed(2);
  }

  function balanceChange() {
    if (bettor.account_balance > wager) {
      return bettor.account_balance - wager
    }
  }
  // Event handler for when the form is submitted
  function handleSubmit(e) {
    e.preventDefault();
    console.log(bettor.account_balance)
    if (bettor.account_balance - wager < 0) {
     alert("Error Insufficient Funds")
   // Display error message or prevent form submission
   return;
  } 
  showWager(balanceChange())
    console.log(totalPayout)
  fetch('/bets', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      pick: formValues.pick,
      wager: wager,
      odds: formValues.odds,
      totalPayout: formValues.total_payout,
      game_id: selectedGame.id,
      bettor_id: bettor.id,
      title: selectedGame.sport_title,
      home_team: selectedGame.home_team,
      away_team: selectedGame.away_team,
    }),
  })
    .then(response => {
      console.log(response);
      setBalance(bettor.account_balance - wager);
    })
    .catch(error => {
      console.log(error);
    })
  
 
  
    onSubmit({
      pick: formValues.pick,
      wager: wager,
      odds: formValues.odds,
      // payout: totalPayout
    });

    setFormValues({
      pick: formValues.pick,
      wager: wager,
      odds: formValues.odds,
      payout: totalPayout.total_payout,
    });
  
 
  }

  function handleChange(event) {
    const { name, value } = event.target;

    // Update the state variable based on the name of the form field
   if (name === 'pick') {
      setPick(value);
    } else if (name === 'wager') {
      setWager(value);
      setTotalPayout(calculateTotalPayout(value, odds));
      setFormValues({
        ...formValues,
        wager: value,
        totalPayout: calculateTotalPayout(value, odds),
      });
    } else if (name === 'odds') {
      setOdds(value);
      setTotalPayout(calculateTotalPayout(wager, value));
      setFormValues({
        ...formValues,
        odds: value,
        totalPayout: calculateTotalPayout(wager, value),
      });
    } else if (name === 'payout') {
      setTotalPayout(value);
    }
  }


  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Pick:
        <input
          type="text"
          name="pick"
          value={formValues.pick}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Wager:
        <input
          type="number"
          name="wager"
          value={wager}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Odds:
        <input
          type="number"
          name="odds"
          value={formValues.odds}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Submit</button>
      <Betcard
        formValues={formValues}
        wager={wager}
        totalPayout={totalPayout}
        setTotalPayout={setTotalPayout}
        calculateTotalPayout={calculateTotalPayout}
      />
    </form>
  );
}

export default BetForm;

