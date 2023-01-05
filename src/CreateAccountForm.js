import React from 'react';
import axios from 'axios'
import './CreateAccountForm.css';
import img from '../src/diggingmeme.jpg'
class CreateAccountForm extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    date_of_birth: '',
    account_balance: 0
  };

  

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios.post('/bettors', {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      date_of_birth: this.state.date_of_birth,
      account_balance: this.state.account_balance
    })
    .then(response => {
      console.log(this.state.name)
      console.log(response.data);
      alert('Account Created!')
    })
    .catch(error => {
      console.log(error);
    });
  };

  // confirmEmail = () => {
  //   // Send a request to the server to confirm the email
  //   axios.post('/confirm-email', { email: this.state.email })
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  render() {
    const { name, email, password, date_of_birth, account_balance} = this.state;
    return (
      
      <form onSubmit={this.handleSubmit}>
      
        <label>
          Name:
          <input
            type="name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </label>
        {/* <button onClick={this.confirmEmail}>Confirm Email</button> */}
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="date_of_birth"
            value={date_of_birth}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Starting Balance:
          <input 
          type= "number"
          name= "account_balance"
          value= {account_balance}
          onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Create Account" />
        <div className='img'>
        <img src={img} />
        </div>
      </form>
    );
  }
}

export default CreateAccountForm
