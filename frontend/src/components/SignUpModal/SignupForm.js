import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useInput } from "../../hooks";
import * as sessionActions from "../../store/session";
import './SignupForm.css';



const SignUpForm = (props) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const { setShowSignupModal } = props;


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");


  const handleSubmit = (e) => {
      e.preventDefault();
      if (password) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, password, firstName, lastName }))
          .catch(async (res) => {
          let data;
          try {
          data = await res.clone().json();
          } catch {
          data = await res.text(); 
          }
          if (data?.errors) setErrors(data.errors);
          else if (data) setErrors([data]);
          else if (password !== confirmPassword) setErrors(['Confirmed password must be the same as password']);
          else setErrors([res.statusText]);
      });
      }
  };


  return (
      <div className="signup-modal">
        <div onClick={() => setShowSignupModal(false)} className="close-button">
          <i className="fa-solid fa-x"></i>
        </div>
      
      <header className="signup-header">
        <div className="signup-header-text">Sign up</div>
      </header>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="first-name-div">
            <input
              className="first-name-input"
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="last-name-div">
            <input
              className="last-name-input"
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

         
          <div className="email-div">
            <input
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>

          <div className="password-div">
            <input
              className="password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>

          <div className="password-div">
            <input 
              className="password-conf-input"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          <ul className="error-message">
            {errors.map(error => {
                return <li key={error}>{error}</li>               
            })}
          </ul>

          <div className="agree-message">            
            By clicking <span className="continue-span"> Continue </span>
            
            I agree to Airbbc's 
            
            <span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.airbnb.com/help/article/2908">  Terms of Service</a></span>
            {/* ,<span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.airbnb.com/help/article/2855"> Privacy Policy</a></span>, 
            <span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.airbnb.com/help/article/2868"> Guest Refund Policy</a></span>, and
            <span className="bold" target="_blank" rel="noopener noreferrer"><a href="https://www.airbnb.com/help/article/2869"> Host Damage Protection Terms</a></span>. 
             */}
          </div>
          
          

          <button type="submit" className="continue-button">Continue</button>
        </form>

      </div>
  );
}

export default SignUpForm;