import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './signIn.css'

function SignIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Login attempt:', { email, password });
    //  authentication or API call
    axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      withCredentials: true,
      data: {
        email,
        password,
      },
    }
    ).then((res) => {
      console.log(res.status)
        if (res.status===200) {
          console.log(res.data);
          alert(res.data)
          
        } else {
          console.log(res.data.user);
          
          navigate('/home')
          
        }
      })
      .catch((err) => {
        console.log(err);
      });


    
  };
    return (
        <div className="login-page">
      <div className="login-container">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
  
    </div>
       
        
    );
}

export default SignIn;
