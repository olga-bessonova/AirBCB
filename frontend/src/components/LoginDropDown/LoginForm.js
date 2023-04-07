import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm(props) {
  // const [credential, onCredentialChange] = useInput("");
  // const [password, onPasswordChange] = useInput("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const {setShowLoginModal, setShowSignupModal, setLoginMessage} = props;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({email, password}))
    .catch(async (res) => {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  const handleDemo = (e) => {
    setLoginMessage(true);
    return dispatch(sessionActions.login({ 
      email: 'demo@user.io', 
      password: 'password' 
    })); 
  };

  const toggleSignup = (e) => {
    e.preventDefault();
    setShowLoginModal(false);
    setShowSignupModal(true);
  }

  return (
    <div className="login-modal">
      <div onClick={()=>setShowLoginModal(false)} className="close-button">
        <i className="fa-solid fa-x"></i>
      </div>

      <header className="login-header">
        <div className="login-header-text">Log in</div>
      </header>  

      <div className="welcome-message">
        <h3>Welcome to Airbbc</h3>
      </div>
      
      <form className="login-form" onSubmit={handleSubmit}>
        
        <div className="email-div">
            <input
              className="email-input"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>

        <div className="password-div">
            <input
              className="password-input"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
        </div>

        <div className="error-message">
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
        </div>

        <div className="signup-message">
          <span className="signup-span" onClick={toggleSignup}>Sign up</span>
        </div>

        <button type="submit" className="continue-button">Continue</button>
      </form>

      <div id="demo-button-div">
        <button className="demo-button-login" onClick={handleDemo}>Continue with Demo User</button>
      </div>
    </div>
  );
}

export default LoginForm;