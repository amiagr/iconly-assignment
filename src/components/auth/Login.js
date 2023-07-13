import React, { useState } from 'react';
import '../../styles/auth/Login.css';
import { GoogleLogin } from 'react-google-login';
import Snackbar from "../global/Snackbar";

const Login = ({ onLogin }) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('password');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "user" && password === "password") {
      onLogin();
    }
  };
  const onSuccess = (response) => {
    openSnackbar(response.profileObj.email + ' Logged in successfully!');
    onLogin();
  };

  const onFailure = (error) => {
    openSnackbar('Error logging in:', error);
  };


  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  return (
    <div>
      <div className="login-container">
        <div className="form-container">
          <h1 className="form-title">Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="username" id="username" name="username" value={username} onChange={handleUsernameChange} required />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required />
            <button type="submit">Login</button>
          </form>
          <div className="google-signin">
            <GoogleLogin
              clientId="646263942180-6rii0ki94o9k04m4sq5oiefgfcoqadg9.apps.googleusercontent.com"
              buttonText="Sign in with Google"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
          </div>
        </div>
      </div>
      <Snackbar message={snackbarMessage} show={showSnackbar} onClose={handleSnackbarClose} />
    </div>
  );
};

export default Login;
