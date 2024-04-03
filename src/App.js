import React, { useState } from 'react';
import Calendar from './Calendar';
import calendarLogo from './calendarLogo.png';
import './App.css';
import Communities from './Communities';
import RequestConfirmation from './RequestConfirmation';

function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [accounts, setAccounts] = useState([
    { username: 'Tyten1', password: 'Tyten1' },
  ]);
  
  const toggleSignIn = () => {
    setShowSignIn(!showSignIn);
  };

  const toggleCreateAccount = () => {
    setShowCreateAccount(!showCreateAccount);
  };

  const handleSignIn = () => {
    const isValidUser = accounts.some(
      (user) => user.username === username && user.password === password
    );

    if (isValidUser) {
      setIsLoggedIn(true);
      setCurrentUser(username);
    } else {
      alert('Invalid username or password');
    }
  };

  const handleCreateAccount = () => {
    if (username && password) {
      const existingUser = accounts.find((user) => user.username === username);
      if (existingUser) {
        alert('Username already exists');
      } else {
        setAccounts([...accounts, { username, password }]);
        setUsername('');
        setPassword('');
        setShowCreateAccount(false);
        alert('Account created successfully. Please sign in.');
      }
    } else {
      alert('Please enter a username and password');
    }
  };

  const signOut = () => {
    setIsLoggedIn(false);
    setCurrentUser('');
  };

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
              Create New Account
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
      </header>
      <main>
        <section id="communities">
          <h4>Communities</h4>
          <Communities />
        </section>
        <section id="request-confirmation">
          <h4>Request Confirmation</h4>
          <p>You can request to be a confirmed community event leader with the form down below.</p>
            <p>Please fill out and submit and you will review your submission.</p>
          <RequestConfirmation />
          <h4>Please sign in to your Community Calendar account to view the current calendar.</h4>
          <h4>If you do not have an account, you can create one at the top of the right page.</h4>
        </section>
        {isLoggedIn && (
          <section id="calendar">
            <h4>The Community Calendar</h4>
            <p>To navigate through this calendar, use the "Next" and "Previous" buttons.</p>
            <p>The selected day is displayed at the top of the calendar.</p>
            <p>Please include the event name, time, and location.</p>
            <Calendar />
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
