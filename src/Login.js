import React, { useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css'

function Login({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState(null)

  function handleChange(e) {
    const value = e.target.value;
    const keyName = e.target.name;
    setForm({ ...form, [keyName]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).then((r) => {
      if (r.ok) {
        r.json().then((bettor) => {
          onLogin(bettor)
          console.log(bettor)
          setErrors(null);
          window.location.href = '/';
        })
      } else {
        r.json().then(errors => setErrors(errors))
      }
    }).catch((error) => {
      console.error("Error:", error);
    });

    setForm({
      email: "",
      password: "",
    })
  }



  return (
    <div className='login'>
    <form className="Container" onSubmit={handleSubmit}>
  <div>
    <label>
      Email:
      <input type="email" name="email" value={form.email} onChange={handleChange} />
    </label>
  </div>
  <br />
  <div>
    <label>
      Password:
      <input type="password" name="password" value={form.password} onChange={handleChange} />
    </label>
  </div>
  <br />
  <input type="submit" value="Log in" />
  <Link to="/create-account">Not a user? Create an account here!</Link>
</form>
</div>

// {errors && <div className="error">{errors}</div>}

  );
}

export default Login;





 // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   axios.post('/sessions', {
  //     email: email,
  //     password: password
  //   })
  //   .then(response => {
  //     window.location.href = '/';
  //   })
  //   .catch(error => {
  //     alert('Invalid email or password');
  //   });
  // };




// import React, { useState } from "react";
// import axios from 'axios';
// import Route from "react-router-dom"
// import { Link } from 'react-router-dom'

// const Login = (props) => {
//   const { handleLogin } = props;
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleEmailChange = (event) => {
//     setEmail(event.target.value);
//   };

//   // Handle changes to the password input field
//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     axios.post('/sessions', {
//       email: email,
//       password: password
//     })
//     .then(response => {
//       // If the login is successful, redirect the user to the home page
//       window.location.href = '/';
//     })
//     .catch(error => {
//       // If the login fails, display an error message
//       alert('Invalid email or password');
//     });

//   return (
//     <form onSubmit={handleSubmit}>
//     <label>
//       Email:
//       <input type="email" value={email} onChange={handleEmailChange} />
//     </label>
//     <br />
//     <label>
//       Password:
//       <input type="password" value={password} onChange={handlePasswordChange} />
//     </label>
//     <br />
//     <input type="submit" value="Log in" />
//   </form>
// );;

// }
// }