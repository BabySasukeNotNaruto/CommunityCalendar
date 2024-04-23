import React, { useState, useEffect } from 'react';
import Calendar from './Calendar';
import calendarLogo from './calendarLogo.png';
import './App.css';
import Communities from './Communities';
import RequestConfirmation from './RequestConfirmation';

function App() {
  // State variables for managing user authentication and account creation
  const [showSignIn, setShowSignIn] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [accounts, setAccounts] = useState(() => {
    const storedAccounts = localStorage.getItem('accounts');
    return storedAccounts ? JSON.parse(storedAccounts) : [{ username: 'Tyten1', password: 'Tyten1' }];
  });

  useEffect(() => {
    const storedCurrentUser = localStorage.getItem('currentUser');
    if (storedCurrentUser) {
      setCurrentUser(storedCurrentUser);
      setIsLoggedIn(true);
    }
  }, []);

  // Function to toggle the sign-in form visibility
  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  // Function to toggle the create account form visibility
  const toggleCreateAccount = () => {
    setShowCreateAccount(!showCreateAccount);
  };

  // Function to handle user sign-in
  const handleSignIn = () => {
    const isValidUser = accounts.some(
      (user) => user.username === username && user.password === password
    );

    if (isValidUser) {
      setIsLoggedIn(true);
      setCurrentUser(username);
      localStorage.setItem('currentUser', username);
    } else {
      alert('Invalid username or password');
    }
  };

  // Function to handle user account creation
  const handleCreateAccount = () => {
    if (username && password) {
      const existingUser = accounts.find((user) => user.username === username);
      if (existingUser) {
        alert('Username already exists');
      } else {
        const newAccounts = [...accounts, { username, password }];
        setAccounts(newAccounts);
        localStorage.setItem('accounts', JSON.stringify(newAccounts));
        setUsername('');
        setPassword('');
        setShowCreateAccount(false);
        alert('Account created successfully. Please sign in.');
      }
    } else {
      alert('Please enter a username and password');
    }
  };

  // Function to handle user sign-out
  const signOut = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('currentUser');
  };

  // App component JSX
  return (
    <div className="App">
      <div className="top-bar">
        <img src={calendarLogo} alt="Logo" className="logo" />
        {!isLoggedIn && (
          <>
            <button className="sign-in-button" onClick={toggleSignIn}>
              Sign In
            </button>
            <button className="create-account-button" onClick={toggleCreateAccount}>
              Create
            </button>
          </>
        )}
        {showSignIn && !isLoggedIn && (
          <div className="sign-in-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Log In</button>
          </div>
        )}
        {showCreateAccount && !isLoggedIn && (
          <div className="create-account-box">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleCreateAccount}>Create Account</button>
          </div>
        )}
        {isLoggedIn && (
          <div className="signed-in-box">
            <span>{currentUser}</span>
            <button onClick={signOut}>Sign Out</button>
          </div>
        )}
      </div>
      <nav className="navbar">
        <a href="#communities">Communities</a>
        <a href="#request-confirmation">Request Confirmation</a>
        {isLoggedIn && <a href="#calendar">Calendar</a>}
      </nav>
      <header className="App-header">
        <h5>Welcome to the Community Calendar</h5>
        <p>Please scroll down and explore some communities and check out the community calendar!</p>
      </header>
      <main>
        <section id="communities">
          <h4>Communities</h4>
          <Communities />
        </section>
        <section id="request-confirmation">
          <h4>Request Confirmation</h4>
          <p>You can request to be a confirmed community event leader with the form down below.</p>
          <p>Please fill out and submit and we will review your submission.</p>
          <RequestConfirmation />
          <h4>Please sign in to your Community Calendar account to view the current calendar.</h4>
          <h4>If you do not have an account, you can create one at the top of the right page.</h4>
        </section>
        {isLoggedIn && (
          <section id="calendar">
            <h4>The Community Calendar</h4>
            <p2>- To navigate through this calendar, use the "Next" and "Previous" buttons or click on a day with your cursor.</p2>
            <p2> Please include the event name, time, and location.</p2>
            <Calendar currentUser={currentUser} />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
