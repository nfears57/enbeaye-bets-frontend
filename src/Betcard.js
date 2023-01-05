import React from 'react';
import html2canvas from 'html2canvas';
// import './BetCard.css'
function Betcard({ formValues, wager, totalPayout }) {
  // const betcardElement = useRef(null);

  // function handleScreenshot() {
  //   html2canvas(betcardElement.current).then(canvas => {
  //     const dataURI = canvas.toDataURL();
  //     onScreenshot(dataURI);
  //   });
console.log(totalPayout)
  return (
    <div className="betcard">
      <p className="betcard__pick">Pick: {formValues.pick}</p>
      <p className="betcard__wager">Wager: {wager}</p>
      <p className="betcard__odds">Odds: {formValues.odds}</p>
      <p className="betcard__payout">Payout: {totalPayout}</p>
      {/* <button onClick={handleScreenshot}>Take Screenshot</button> */}
    </div>
  );
}

export default Betcard;
