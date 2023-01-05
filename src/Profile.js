import React, { useState, useEffect } from 'react';
// import UserInfo from './UserInfo';
// import Betcard from './Betcard';
import TransactionHistory from './TransactionHistory';
// import html2canvas from 'html2canvas';
import './Profile.css'
import img from '../src/download.jpg'

function Profile(props) {
  const { formValues, bettor } = props;
  const [bets, setBets] = useState([]);

  useEffect(() => {
    // Load the bet information from local storage
    const storedBets = localStorage.getItem('bets');
    if (storedBets) {
      setBets(JSON.parse(storedBets));
    }
  }, []);

  useEffect(() => {
    // Save the bet information to local storage
    localStorage.setItem('bets', JSON.stringify(bets));
  }, [bets]);



  return (
    <div className='profile' >
       
      <div >
        <h1>My Bets</h1>
          <TransactionHistory />
        </div>
        <img src={img} />
    </div>
  );
}

export default Profile;


// import React, { useState, useEffect } from 'react';
// import UserInfo from './UserInfo';
// import Betcard from './Betcard';
// import html2canvas from 'html2canvas';
// // import GameList from './GameList';

// function Profile() {
//   const [balance, setBalance] = useState(0);
//   const [bets, setBets] = useState([]);
//   const [screenshot, setScreenshot] = useState(null);

//   useEffect(() => {
//     // Load the bet information from local storage
//     const storedBets = localStorage.getItem('bets');
//     if (storedBets) {
//       setBets(JSON.parse(storedBets));
//     }
//   }, []);

//   useEffect(() => {
//     // Save the bet information to local storage
//     localStorage.setItem('bets', JSON.stringify(bets));
//   }, [bets]);

//   const handleAddBet = (formValues) => {
//     // Take a screenshot of the Betcard component
//     html2canvas(document.querySelector('.betcard')).then((canvas) => {
//       // Save the screenshot data in the state
//       setScreenshot(canvas.toDataURL());
//     });

//     setBets([...bets, formValues]);
//   }
//   const handleAddToWallet = () => {
//     setBalance(balance + 100);
//   };

//   const handleDeleteAccount = () => {
//     // Delete the user's account information from local storage
//     localStorage.removeItem('bets');

//     // Redirect the user to the login page
//     window.location.href = '/login';
//   };

//   const sortedBets = bets.sort((a, b) => a.date - b.date);

//   return (
//     <div>
//       <div className="user-info-container">
//         <div>
//           <UserInfo
//             username=""
//             email=""
//             balance={balance}
//             handleAddToWallet={handleAddToWallet}
//           />
//         </div>
//         <button onClick={handleDeleteAccount}>Delete Account</button>
//         {screenshot && (
//           <div className="screenshot-container">
            
//             <img src={screenshot} alt="Screenshot of bet" />
//           </div>
//         )}
//         <div className="bet-list" style={{display: 'block', float: 'right'}}>
//         <h2>My Bets</h2>
//         {sortedBets.map(bet => (
//           <li key={bet.id}>
//             <Betcard bet={bet} />
//           </li>
//         ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;
